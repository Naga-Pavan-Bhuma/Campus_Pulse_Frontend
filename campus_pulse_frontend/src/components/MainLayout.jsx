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
  const [announcements, setAnnouncements] = useState([]); // <-- NEW STATE
  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/me", {
          withCredentials: true,
        });
        setUserName(`${res.data.user.firstName} ${res.data.user.lastName}`);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    const fetchAnnouncementCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/announcements");
        setAnnouncementCount(res.data.length);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchUserDetails();
    fetchAnnouncementCount();
  }, [location.pathname]);

  // ✅ Fetch announcements when notification is clicked
  const handleNotificationClick = async () => {
    try {
      const res = await axios.get("http://localhost:5000/announcements");
      setAnnouncements(res.data);
      setShowPopup(true);
      setAnnouncementCount(0); // ✅ Reset the count after showing
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };
  

  const renderSidebar = () => {
    if (location.pathname.startsWith("/faculty")) return <FacultySidebar />;
    if (location.pathname.startsWith("/student")) return <StudentSidebar />;
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
        />
        <div className="p-6 bg-gray-100 h-full overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* ✅ Pass announcements to the popup */}
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
