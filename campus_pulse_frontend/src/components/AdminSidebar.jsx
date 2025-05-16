import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClipboardList,
  FaCogs,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const sidebarItems = [
  { icon: <FaUsers />, label: "Faculty Management" },
  { icon: <FaCalendarAlt />, label: "Update Academic Calendar" },
  { icon: <FaClipboardList />, label: "Menu Management" },
  { icon: <FaCogs />, label: "Update Events" },
  { icon: <FaCalendarAlt />, label: "Edit Exam Schedule" },
  { icon: <FaSignOutAlt />, label: "Logout" },
];

const AdminSidebar = ({ setSelectedSection, activeLabel, className = "", onClose }) => {
  const navigate = useNavigate();

  const handleItemClick = (label) => {
    if (label === "Logout") {
      localStorage.removeItem("token");
      sessionStorage.clear();
      navigate("/login");
    } else {
      setSelectedSection(label);
    }
  };

  return (
    <aside className={`w-64 h-screen bg-gray-900 text-white p-6 flex flex-col shadow-md ${className}`}>
      {/* Mobile Close Button */}
      <button
        onClick={onClose}
        className="sm:hidden mb-4 p-2 bg-gray-700 rounded hover:bg-gray-600 self-end text-sm"
        aria-label="Close sidebar"
      >
        ✕
      </button>

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-12 text-center text-white">Campus Pulse Admin</h1>

      {/* Sidebar Items */}
      <ul className="space-y-2 flex-grow">
        {sidebarItems.map((item, index) => {
          const isActive = item.label === activeLabel;
          return (
            <li
              key={index}
              className={`flex items-center space-x-4 p-3 rounded-md cursor-pointer transition-colors duration-200
                ${isActive ? "bg-gray-700 text-white font-semibold" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
              onClick={() => handleItemClick(item.label)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
