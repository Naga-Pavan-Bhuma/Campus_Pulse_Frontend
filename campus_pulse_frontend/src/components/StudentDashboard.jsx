import React from "react";
import { motion } from "framer-motion";
import {
  FaUserFriends,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaCalendarAlt,
  FaUtensils,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const navOptions = [
  {
    title: "Clubs",
    icon: <FaUserFriends />,
    description: "Explore campus clubs and student communities.",
    color: "from-pink-500 to-pink-700",
    link: "/student/clubs", // Add the link for this section
  },
  {
    title: "Careers",
    icon: <FaLaptopCode />,
    description: "Get updates on internships, jobs, and workshops.",
    color: "from-green-500 to-green-700",
    link: "/careers", // Add the link for this section
  },
  {
    title: "Exam Schedule",
    icon: <FaCalendarAlt />,
    description: "View upcoming exams and assessment timelines.",
    color: "from-yellow-500 to-yellow-600",
    link: "/student/examschedule", // Add the link for this section
  },
  {
    title: "Food Menu",
    icon: <FaUtensils />,
    description: "Check the daily and weekly food menu.",
    color: "from-red-500 to-red-700",
    link: "/student/foodmenu", // Add the link for this section
  },
  {
    title: "Timetable",
    icon: <FaClock />,
    description: "See your class and lab schedule by department.",
    color: "from-blue-500 to-blue-700",
    link: "/student/timetable", // Add the link for this section
  },
];

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold mb-6 text-center tracking-wide drop-shadow-lg"
      >
        Campus Pulse Dashboard
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-300 text-lg mb-12 text-center max-w-3xl"
      >
        Navigate your student life with ease. Stay informed, engaged, and connected.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {navOptions.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              rotate: [0, 1], // Only two keyframes
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-300 border border-white/10"
          >
            <div
              className={`bg-gradient-to-br ${option.color} p-4 rounded-full shadow-lg mb-4 w-fit`}
            >
              <div className="text-white text-2xl">{option.icon}</div>
            </div>
            <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
            <p className="text-white/80">{option.description}</p>
            {/* Link added for each Explore button */}
            <Link to={option.link}>
              <button className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 rounded-lg transition-all">
                Explore {option.title}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16 text-center text-white/60"
      >
        © {new Date().getFullYear()} Campus Pulse · Empowering Campus Life ✨
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
