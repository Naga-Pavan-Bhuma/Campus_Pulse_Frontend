import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import FacultySidebar from "./FacultySidebar";
import AdminSidebar from "./AdminSidebar";
import Navbar from "./Navbar";
import axios from "axios";
import AnnouncementPopup from "./AnnouncementPopup";

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

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const renderSidebar = () => {
    const baseClass = `fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:relative`;

    if (location.pathname.startsWith("/faculty"))
      return <FacultySidebar className={baseClass} onClose={() => setSidebarOpen(false)} />;

    if (location.pathname.startsWith("/student"))
      return <StudentSidebar className={baseClass} onClose={() => setSidebarOpen(false)} />;
    const [selectedSection, setSelectedSection] = useState("Faculty Management");
    
    if (location.pathname.startsWith("/admin"))
return (
  <AdminSidebar
    className={baseClass}
    onClose={() => setSidebarOpen(false)}
    setSelectedSection={setSelectedSection}
    activeLabel={selectedSection}
  />
);

    return null;
  };

  return (
    <div className="flex h-screen">
      {renderSidebar()}
      <div className="flex flex-col flex-grow">
        <Navbar
          userName={userName}
          announcementCount={announcementCount}
          onNotificationClick={handleNotificationClick}
          onMenuClick={toggleSidebar}  // Pass toggle for mobile menu
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
