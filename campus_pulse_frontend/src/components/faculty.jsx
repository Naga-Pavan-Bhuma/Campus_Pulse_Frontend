import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaBullhorn,
  FaClock,
  FaUsers,
  FaBookOpen,
  FaCalendarAlt
} from "react-icons/fa";
import PostAnnouncementModal from "./PostAnnouncementModal"; // ✅ Import modal

const facultyOptions = [
  {
    title: "Post Announcement",
    icon: FaBullhorn,
    description: "Keep students and staff updated with the latest info.",
    bg: "from-yellow-500 to-yellow-600"
  },
  {
    title: "Upload Timetable",
    icon: FaClock,
    description: "Add and manage class schedules for your department.",
    bg: "from-blue-500 to-blue-600"
  },
  {
    title: "Schedule Meetings",
    icon: FaCalendarAlt,
    description: "Coordinate departmental or student meetings easily.",
    bg: "from-green-500 to-green-600"
  },
  {
    title: "Discussion Forum",
    icon: FaUsers,
    description: "Engage with faculty and share ideas.",
    bg: "from-purple-500 to-purple-600"
  },
  {
    title: "Share Resources",
    icon: FaBookOpen,
    description: "Upload PDFs, slides, and notes for your students.",
    bg: "from-pink-500 to-pink-600"
  }
];

const Faculty = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ State

  const handleCardClick = (title) => {
    if (title === "Post Announcement") {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Faculty Dashboard
          </h1>
          <p className="mt-3 text-gray-300 text-lg">
            Manage academic and collaboration tools at one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`bg-gradient-to-br ${option.bg} rounded-2xl p-6 shadow-lg backdrop-blur-lg hover:shadow-white/30 transform transition duration-300`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <Icon className="text-gray-800 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{option.title}</h3>
                    <p className="text-sm text-white/80 mt-1">{option.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCardClick(option.title)}
                  className="mt-6 w-full bg-white/20 text-white py-2 rounded-lg hover:bg-white/30 transition-all duration-300 font-medium"
                >
                  Go to {option.title}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block bg-white/10 border border-white/20 px-8 py-4 rounded-2xl backdrop-blur-md text-white text-lg font-semibold shadow-lg hover:shadow-white/20 transition-all"
          >
            <FaChalkboardTeacher className="inline mr-2 text-yellow-300 text-2xl" />
            Welcome, Faculty! Let’s make learning better together.
          </motion.div>
        </div>
      </motion.div>

      {/* ✅ Add Modal */}
      <PostAnnouncementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Faculty;
