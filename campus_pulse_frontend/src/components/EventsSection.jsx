import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function EventsSection() {
  const events = [
    {
      date: "April 20, 2025",
      title: "Machine Learning Workshop",
      location: "Campus Auditorium",
    },
    {
      date: "April 22, 2025",
      title: "Career Fair",
      location: "Main Campus Grounds",
    },
    {
      date: "April 25, 2025",
      title: "University Research Symposium",
      location: "Research Center",
    },
  ];

  const [open, setOpen] = useState(null);

  const toggleAccordion = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 text-center">
      <motion.h2
        className="text-4xl font-extrabold mb-16 text-gray-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Upcoming Events
      </motion.h2>
      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-blue-200 transition-all"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex flex-col justify-center text-left">
                <div className="text-lg font-semibold text-gray-900">{event.title}</div>
                <div className={`text-sm ${open === index ? "text-gray-700" : "text-transparent"}`}>
                  {event.date}
                </div>
              </div>
              <div>
                {open === index ? (
                  <IoIosArrowUp className="text-gray-500" />
                ) : (
                  <IoIosArrowDown className="text-gray-500" />
                )}
              </div>
            </div>
            {open === index && (
              <div className="mt-4 text-sm text-gray-500 text-left">
                <p>{event.location}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
