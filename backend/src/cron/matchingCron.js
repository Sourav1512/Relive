import cron from "node-cron";
import DonerRequest from "../models/DonerRequest.model.js";
import RecipientRequest from "../models/RecipientRequest.model.js";
import Match from "../models/Match.model.js";
import Doner from "../models/Doner.model.js";
import Recipient from "../models/Recipient.model.js";
import Admin from "../models/Admin.model.js";

// Function to check if donor and recipient are compatible
const areDonorAndRecipientCompatible = async (donorRequest, recipientRequest) => {
    try {
        // Get donor and recipient details
        const donor = await Doner.findById(donorRequest.doner);
        const recipient = await Recipient.findById(recipientRequest.recipient);

        if (!donor || !recipient) {
            return false;
        }

        // Check if both requests are admin confirmed
        if (donorRequest.adminConfirmation !== 'fulfilled' || recipientRequest.adminConfirmation !== 'fulfilled') {
            return false;
        }

        // Check blood group compatibility
        const isBloodGroupCompatible = checkBloodGroupCompatibility(donor.bloodGroup, recipient.bloodGroup);
        if (!isBloodGroupCompatible) {
            return false;
        }

        // Check other criteria: age, weight, height, gender
        if (donor.age !== recipient.age) return false;
        if (donor.weight !== recipient.weight) return false;
        if (donor.height !== recipient.height) return false;
        if (donor.gender !== recipient.gender) return false;

        return true;

    } catch (error) {
        console.error("Error checking compatibility:", error);
        return false;
    }
};

// Blood group compatibility check
const checkBloodGroupCompatibility = (donorBloodGroup, recipientBloodGroup) => {
    const compatibilityMap = {
        'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
        'O+': ['O+', 'A+', 'B+', 'AB+'],
        'A-': ['A-', 'A+', 'AB-', 'AB+'],
        'A+': ['A+', 'AB+'],
        'B-': ['B-', 'B+', 'AB-', 'AB+'],
        'B+': ['B+', 'AB+'],
        'AB-': ['AB-', 'AB+'],
        'AB+': ['AB+']
    };

    return compatibilityMap[donorBloodGroup]?.includes(recipientBloodGroup) || false;
};

// Main matching function
const runMatchingProcess = async () => {
    try {
        console.log("🔍 Starting automatic matching process...");

        // Find all pending donor requests with admin confirmation
        const donorRequests = await DonerRequest.find({ 
            status: 'pending',
            adminConfirmation: 'fulfilled'
        }).populate('organType', 'type');

        // Find all pending recipient requests with admin confirmation
        const recipientRequests = await RecipientRequest.find({ 
            status: 'pending',
            adminConfirmation: 'fulfilled'
        }).populate('organType', 'type');

        let matchesCreated = 0;
        const errors = [];

        // Find the first admin for match assignment
        const firstAdmin = await Admin.findOne().sort({ "user.email": 1 });

        for (const donorRequest of donorRequests) {
            for (const recipientRequest of recipientRequests) {
                try {
                    // Check if organs match
                    const organsMatch = donorRequest.organType.type.toString() === recipientRequest.organType.type.toString();
                    if (!organsMatch) continue;

                    // Check if donor and recipient are compatible
                    const areCompatible = await areDonorAndRecipientCompatible(donorRequest, recipientRequest);
                    if (!areCompatible) continue;

                    // Check if match already exists
                    const existingMatch = await Match.findOne({
                        organ: donorRequest.organType._id,
                        donorRequest: donorRequest._id,
                        recipientRequest: recipientRequest._id,
                        status: 'awaiting-approval'
                    });

                    if (existingMatch) continue;

                    // Create new match
                    await Match.create({
                        organ: donorRequest.organType._id,
                        donor: donorRequest.doner,
                        donorRequest : donorRequest._id,
                        recipient: recipientRequest.recipient,
                        recipientRequest: recipientRequest._id,
                        admin: firstAdmin?._id,
                        status: 'awaiting-approval'
                    });

                    // Update request statuses to 'matched'
                    await DonerRequest.findByIdAndUpdate(
                        donorRequest._id,
                        { status: 'matched' }
                    );

                    await RecipientRequest.findByIdAndUpdate(
                        recipientRequest._id,
                        { status: 'matched' }
                    );

                    matchesCreated++;
                    console.log(`✅ Match created for donor: ${donorRequest.doner} and recipient: ${recipientRequest.recipient}`);

                } catch (error) {
                    errors.push({
                        donorRequest: donorRequest._id,
                        recipientRequest: recipientRequest._id,
                        error: error.message
                    });
                    console.error("❌ Error creating match:", error);
                }
            }
        }

        console.log(`🎉 Matching completed: ${matchesCreated} matches created, ${errors.length} errors`);
        return { matchesCreated, errors };

    } catch (error) {
        console.error("❌ Error in matching process:", error);
        return { matchesCreated: 0, errors: [error.message] };
    }
};

// Schedule to run every minute
cron.schedule("* * * * *", async () => {
    console.log("⏰ Running automatic matching process...");
    await runMatchingProcess();
});

// Export for manual triggering if needed
export { runMatchingProcess };