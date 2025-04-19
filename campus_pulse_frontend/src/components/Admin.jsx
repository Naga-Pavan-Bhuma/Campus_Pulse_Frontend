import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaUsers, FaClipboardList, FaCogs, FaSignOutAlt, FaCalendarAlt, FaBell, FaPizzaSlice } from "react-icons/fa";

// Sidebar navigation items
const sidebarItems = [
  { icon: <FaUsers />, label: "User Management" },
  { icon: <FaClipboardList />, label: "Mess Menu" },
  { icon: <FaCogs />, label: "Settings" },
  { icon: <FaCalendarAlt />, label: "Timetable & Attendance" },
  { icon: <FaBell />, label: "Notifications" },
  { icon: <FaSignOutAlt />, label: "Logout" },
];

// Statistics Cards
const stats = [
  { title: "Total Users", value: 1200, icon: <FaUsers className="text-4xl text-green-500" /> },
  { title: "Mess Menus", value: 50, icon: <FaClipboardList className="text-4xl text-blue-500" /> },
  { title: "Orders Today", value: 350, icon: <FaPizzaSlice className="text-4xl text-yellow-500" /> },
];

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState("User Management");
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" });
  const [message, setMessage] = useState("");

  // Fetch user data (students and faculty) from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users"); // Replace with your API endpoint for GET
        const studentsData = response.data.filter(user => user.role === "student");
        const facultyData = response.data.filter(user => user.role === "faculty");

        setStudents(studentsData);
        setFaculty(facultyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle form submission for adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", newUser); // Replace with your API endpoint for POST
      setMessage(response.data.message || "User added successfully!");
      setNewUser({ name: "", email: "", role: "student" });
      setLoading(true);
      setTimeout(() => {
        setMessage("");
        setLoading(false);
      }, 3000); // Hide message after 3 seconds
    } catch (error) {
      setMessage("Error adding user.");
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-64 bg-gray-900 text-white flex flex-col items-center p-6"
      >
        <motion.h1
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Campus Pulse Admin
        </motion.h1>
        <ul className="space-y-6 w-full">
          {sidebarItems.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center justify-start text-lg space-x-4 hover:bg-gray-700 p-4 rounded-md transition-all"
              whileHover={{ scale: 1.1, backgroundColor: "#374151" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSection(item.label)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        {/* Header */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {selectedSection}
          </motion.h2>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center space-y-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="p-4 bg-blue-100 rounded-full"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {stat.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-gray-800"
                whileHover={{ scale: 1.1 }}
              >
                {stat.title}
              </motion.h3>
              <motion.p
                className="text-2xl font-bold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* User Management Section */}
        {selectedSection === "User Management" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 bg-white p-6 rounded-xl shadow-lg"
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Registered Users
            </motion.h3>

            {/* Message */}
            {message && <div className="text-center text-lg text-gray-700 mb-4">{message}</div>}

            {loading ? (
              <div className="text-center text-lg text-gray-700">Loading users...</div>
            ) : (
              <div>
                <motion.h4
                  className="text-xl font-semibold text-gray-800 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Students
                </motion.h4>
                <div className="space-y-4">
                  {students.map((student, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                      <div className="text-sm text-gray-500">{student.status}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.h4
                  className="text-xl font-semibold text-gray-800 mt-8 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Faculty
                </motion.h4>
                <div className="space-y-4">
                  {faculty.map((facultyMember, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <p className="font-semibold">{facultyMember.name}</p>
                        <p className="text-sm text-gray-600">{facultyMember.email}</p>
                      </div>
                      <div className="text-sm text-gray-500">{facultyMember.status}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Add User Form Section */}
        {selectedSection === "User Management" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 bg-white p-6 rounded-xl shadow-lg"
          >
            <motion.h3
              className="text-2xl font-semibold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Add New User
            </motion.h3>

            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-lg font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md mt-4"
              >
                Add User
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
