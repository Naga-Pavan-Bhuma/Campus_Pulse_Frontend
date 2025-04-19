import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import FacultySidebar from "./FacultySidebar";
import Navbar from "./Navbar";
import axios from "axios";
import AnnouncementPopup from "./AnnouncemetPopup";

const MainLayout = () => {
  // State hooks
  const [showPopup, setShowPopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  // ✅ Fetch announcements from backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user", {
          withCredentials: true,
        });
        setUserName(`${res.data.firstName} ${res.data.lastName}`);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
  
    fetchUserDetails();
  }, [location.pathname]);

  const renderSidebar = () => {
    if (location.pathname.startsWith("/faculty")) {
      return <FacultySidebar />;
    } else if (location.pathname.startsWith("/student")) {
      return <StudentSidebar />;
    }
    return null; // Optional fallback for login or public pages
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar based on current route */}
      {renderSidebar()}

      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <Navbar
          userName={userName} // Pass the full name to Navbar
          announcementCount={announcements.length}
          onNotificationClick={() => setShowPopup(true)}
        />

        {/* Announcement Popup */}
        {showPopup && (
          <AnnouncementPopup
            announcements={announcements}
            onClose={() => setShowPopup(false)}
          />
        )}

        {/* Dynamic Content */}
        <div className="p-6 bg-gray-100 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
