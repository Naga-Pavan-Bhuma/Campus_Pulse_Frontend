import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import FacultySidebar from "./FacultySidebar";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";
import axios from "axios";
import AnnouncementPopup from "./AnnouncemetPopup";

const MainLayout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

    // Close sidebar when route changes
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderSidebar = () => {
    if (location.pathname.startsWith("/faculty")) return <FacultySidebar />;
    if (location.pathname.startsWith("/student")) return <StudentSidebar />;
    if (location.pathname.startsWith("/admin")) return <AdminSidebar />;
    return null;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gray-100 border-r border-gray-300 p-5
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        {renderSidebar()}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-grow w-full lg:ml-64 overflow-auto">
        <Navbar
          userName={userName}
          announcementCount={announcementCount}
          onNotificationClick={handleNotificationClick}
          onMenuClick={toggleSidebar}
        />
        <main className="p-6 bg-gray-100 flex-grow overflow-auto">
          <Outlet />
        </main>
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
