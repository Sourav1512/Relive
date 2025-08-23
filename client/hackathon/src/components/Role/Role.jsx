import React from "react";

const roles = [
  {
    title: "ORGAN DONOR",
    description:
      "Register as an organ donor and help save lives through your generous gift.",
    points: [
      "Quick registration",
      "Medical history tracking",
      "Donation preferences",
      "Family notifications",
    ],
    buttonText: "Register as Donor",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    cardColor: "bg-blue-50",
    icon: "👤",
  },
  {
    title: "PATIENT",
    description:
      "Find compatible organ matches and track your position on the waiting list.",
    points: [
      "Waiting list status",
      "Match notifications",
      "Medical updates",
      "Priority tracking",
    ],
    buttonText: "Register as Patient",
    buttonColor: "bg-green-600 hover:bg-green-700",
    cardColor: "bg-green-50",
    icon: "🧑‍⚕️",
  },
  {
    title: "HOSPITAL",
    description:
      "Access our network to coordinate organ transplants and manage patient cases.",
    points: [
      "Patient management",
      "Real-time matching",
      "Coordination tools",
      "Analytics dashboard",
    ],
    buttonText: "Register as Hospital",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    cardColor: "bg-gray-50",
    icon: "🏥",
  },
  {
    title: "MEDICAL PROFESSIONAL",
    description:
      "Facilitate organ matching and coordinate between donors, patients, and hospitals.",
    points: [
      "Case management",
      "Medical assessments",
      "Priority decisions",
      "Team coordination",
    ],
    buttonText: "Register as Medical Professional",
    buttonColor: "bg-red-600 hover:bg-red-700",
    cardColor: "bg-red-50",
    icon: "⚕️",
  },
];

function RoleSelection() {
  return (
    <section className="py-12 px-6 mt-15">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl ">
          Choose Your <span className="text-blue-700">Role</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:px-3 max-w-7xl mx-auto px-10 cursor-pointer">
        {roles.map((role, index) => (
          <div
            key={index}
            className={` rounded-xl shadow-md p-6 flex flex-col justify-between  ${role.cardColor}`}
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg">
                <span className="text-3xl">{role.icon}</span></div>
              <h3 className="text-lg font-semibold uppercase mb-3">
                {role.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <ul className="text-sm text-gray-700 text-left list-disc list-inside mb-6">
                {role.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <button
              className={`${role.buttonColor} text-white font-medium py-2 px-4 text-sm rounded-lg transition duration-300 whitespace-nowrap w-full cursor-pointer`}
            >
              {role.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RoleSelection;
