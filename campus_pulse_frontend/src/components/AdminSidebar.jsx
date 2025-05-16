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
    <aside className={`w-64 h-screen bg-[#1f2937] text-white p-6 flex flex-col shadow-lg ${className}`}>
      {/* Close Button for Mobile */}
      <button
        onClick={onClose}
        className="sm:hidden mb-4 p-2 bg-[#374151] rounded hover:bg-[#4b5563] self-end text-sm"
        aria-label="Close sidebar"
      >
        ✕
      </button>

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-12 text-center">Campus Pulse Admin</h1>

      {/* Sidebar Items */}
      <ul className="space-y-2 flex-grow">
        {sidebarItems.map((item, index) => {
          const isActive = item.label === activeLabel;
          return (
            <li
              key={index}
              className={`flex items-center space-x-4 p-3 rounded-md cursor-pointer transition-colors duration-200
                ${isActive ? "bg-[#374151] font-semibold" : "hover:bg-[#4b5563]"}`}
              onClick={() => handleItemClick(item.label)}
            >
              <span className="text-lg text-white">{item.icon}</span>
              <span className="text-sm text-white">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
