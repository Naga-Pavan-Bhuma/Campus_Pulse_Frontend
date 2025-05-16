import { useState } from "react";
import { Home, Users, Calendar, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/logout`, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <header className="md:hidden flex items-center justify-between bg-gray-100 p-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Campus Pulse</h2>
        <button
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          className="text-gray-700 focus:outline-none"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {sidebarOpen ? (
              // Close icon (X)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-100 border-r border-gray-300 p-5 shadow-md z-40
          w-64
          transform
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide hidden md:block">
            Campus Pulse
          </h2>
        </div>

        <nav className="flex flex-col gap-4">
          <NavItem to="/student" icon={<Home size={22} />} label="Home" />
          <NavItem to="clubs" icon={<Users size={22} />} label="Clubs" />
          <NavItem to="examschedule" icon={<Calendar size={22} />} label="Exam Schedule" />
          <NavItem to="foodmenu" icon={<FaUtensils size={22} />} label="Food Menu" />
          <NavItem to="timetable" icon={<Calendar size={22} />} label="Timetable" />
          <NavItem to="calendar" icon={<Calendar size={22} />} label="Academic Calendar" />
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition duration-200"
          >
            <LogOut size={22} />
            <span className="text-lg font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-lg text-gray-700 transition duration-200 hover:bg-blue-100 hover:text-blue-600 ${
        isActive ? "bg-blue-200 text-blue-600 font-semibold" : ""
      }`
    }
  >
    {icon}
    <span className="text-lg">{label}</span>
  </NavLink>
);

export default StudentSidebar;
