import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import FacultySidebar from "./FacultySidebar";
import Navbar from "./Navbar";
import axios from "axios";
import AnnouncementPopup from "./AnnouncemetPopup";

const MainLayout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // New state
  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/me`, {
          withCredentials: true,
        });

        if (location.pathname.startsWith("/faculty")) {
          setUserName(res.data.user.name);
        } else if (location.pathname.startsWith("/student")) {
          setUserName(`${res.data.user.firstName} ${res.data.user.lastName}`);
        } else if (location.pathname.startsWith("/admin")) {
          setUserName("Admin");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    const fetchAnnouncementCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcements`);
        setAnnouncementCount(res.data.length);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchUserDetails();
    fetchAnnouncementCount();

    // Close sidebar when route changes (optional UX)
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleNotificationClick = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcements`);
      setAnnouncements(res.data);
      setShowPopup(true);
      setAnnouncementCount(0);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderSidebar = () => {
    if (location.pathname.startsWith("/faculty")) return <FacultySidebar />;
    if (location.pathname.startsWith("/student")) return <StudentSidebar />;
    if (location.pathname.startsWith("/admin")) return <AdminSidebar />; // if you want admin sidebar here
    return null;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-gray-100 border-r border-gray-300 p-5
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        {renderSidebar()}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow lg:ml-64">
        <Navbar
          userName={userName}
          announcementCount={announcementCount}
          onNotificationClick={handleNotificationClick}
          onMenuClick={toggleSidebar} // Pass toggle function to Navbar
        />
        <div className="p-6 bg-gray-100 h-full overflow-auto">
          <Outlet />
        </div>
      </div>

      {showPopup && (
        <AnnouncementPopup
          announcements={announcements}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
