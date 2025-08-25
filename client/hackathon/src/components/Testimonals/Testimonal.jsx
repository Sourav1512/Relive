import React from "react";
import feedbacks from "../../data/testimonialsData.json";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";


export default function PatientFeedback() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Patient <span className="text-blue-600">Feedback</span>
      </h2>

      {/* pauseOnHover if u want can be added */}
      <Marquee gradient={false} speed={25}>
        {feedbacks.map((f) => (
          <div
            key={f.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 m-4 w-80 h-64 flex-shrink-0 flex flex-col justify-between
                       transition-transform transform hover:scale-105 hover:shadow-xl
                       cursor-pointer"
          >
            <p className="text-gray-700 italic mb-6 line-clamp-4">"{f.text}"</p>

            {/* Rating Stars */}
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < f.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center space-x-4 mt-auto">
              <img
                src={f.img}
                alt={f.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-gray-900 font-semibold">{f.name}</h4>
                <p className="text-gray-500 text-sm">({f.role})</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
