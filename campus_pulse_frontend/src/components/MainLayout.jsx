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
  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user details based on the current path
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/me`, {
          withCredentials: true,
        });

        // Check if the user is a faculty or student and set the userName accordingly
        if (location.pathname.startsWith("/faculty")) {
          setUserName(res.data.user.name); // Faculty user has `name`
        } else if (location.pathname.startsWith("/student")) {
          setUserName(`${res.data.user.firstName} ${res.data.user.lastName}`); // Student user has `firstName` and `lastName`
        } else if (location.pathname.startsWith("/admin")) {
          setUserName("Admin")
        }
      }
       catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    const fetchAnnouncementCount = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcements`);
        setAnnouncementCount(res.data.length); // Set the number of announcements
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchUserDetails(); // Fetch user details
    fetchAnnouncementCount(); // Fetch the count of announcements
  }, [location.pathname]); // Run whenever the location changes

  // Fetch announcements when notification is clicked
  const handleNotificationClick = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/announcements`);
      setAnnouncements(res.data);
      setShowPopup(true);
      setAnnouncementCount(0); // Reset the announcement count after showing
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  // Render sidebar based on the current path
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

      {/* Pass announcements to the popup */}
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
