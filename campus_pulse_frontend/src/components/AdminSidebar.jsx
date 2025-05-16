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

const AdminSidebar = ({ setSelectedSection, className = "", onClose }) => {
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
    <aside
      className={`w-64 h-screen bg-gray-900 text-white p-6 flex flex-col shadow-md ${className}`}
    >
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="sm:hidden mb-4 p-2 bg-gray-700 rounded hover:bg-gray-600 self-end"
        aria-label="Close sidebar"
      >
        Close
      </button>

      {/* Logo */}
      <h1 className="text-3xl font-bold mb-12 text-center">Campus Pulse Admin</h1>

      {/* Sidebar Items */}
      <ul className="space-y-6 flex-grow">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 hover:bg-gray-700 p-4 rounded-md cursor-pointer transition-all"
            onClick={() => handleItemClick(item.label)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
