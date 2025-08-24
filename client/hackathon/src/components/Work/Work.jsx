import React from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Register",
    desc: "Create your profile as a donor, patient, hospital, or medical professional.",
  },
  {
    id: 2,
    title: "Match",
    desc: "Our AI-powered system finds compatible matches based on medical criteria and location.",
  },
  {
    id: 3,
    title: "Alert",
    desc: "Receive instant notifications when matches are found with detailed compatibility information.",
  },
  {
    id: 4,
    title: "Connect",
    desc: "Coordinate with medical teams to facilitate the life-saving transplant process.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-7xl font-">
          How It <span className="text-blue-600">Works</span>
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Our streamlined process connects all stakeholders in the organ donation ecosystem for maximum efficiency and life-saving impact.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col items-center space-y-10 mt-10">
        {/* Step 1 */}
        <StepBox step={steps[0]} />
        <ConnectorDown />

        {/* Step 2 & 3 */}
        <div className="flex flex-col md:flex-row md:space-x-10 items-center md:items-stretch space-y-10 md:space-y-0 relative">
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <StepBox step={steps[1]} />
            {/* Connector ↓ visible only on mobile */}
            <div className="md:hidden">
              <ConnectorDown />
            </div>
          </div>

          {/* Connector → only for desktop */}
          <div className="hidden md:flex items-center justify-center relative">
            <div className="w-16 h-[2px] bg-blue-300 relative">
              <div className="absolute -right-3 -top-[12.5px] text-blue-500 ">→</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <StepBox step={steps[2]} />
          </div>
        </div>

        <ConnectorDown />

        {/* Step 4 */}
        <StepBox step={steps[3]} />
      </div>
    </section>
  );
}

function StepBox({ step }) {
  return (
    <div className="relative bg-white shadow-md rounded-lg p-6 w-[280px] text-center">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
        {step.id}
      </div>
      <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
      <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
    </div>
  );
}

function ConnectorDown() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[2px] h-10 bg-blue-300 relative">
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-blue-500">↓</div>
      </div>
    </div>
  );
}

