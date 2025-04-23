import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import FacultySidebar from "./FacultySidebar";
import Navbar from "./Navbar";
import axios from "axios";
import AnnouncementPopup from "./AnnouncemetPopup";

const MainLayout = () => {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [userName, setUserName] = useState("");
  const [announcementCount, setAnnouncementCount] = useState(0); // Store announcement count
  const location = useLocation();

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/me", {
          withCredentials: true,
        });
        console.log("User details:", res.data); // Debugging user details
        setUserName(`${res.data.user.firstName} ${res.data.user.lastName}`);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    // Fetch announcement count
    const fetchAnnouncementCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/announcements");
        setAnnouncementCount(res.data.length); // Assuming response contains array of announcements
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchUserDetails();
    fetchAnnouncementCount();
  }, [location.pathname]);

  // Function to show the popup
  const handleNotificationClick = () => {
    setShowPopup(true); // Show the popup when the notification icon is clicked
  };

  // Render sidebar based on path
  const renderSidebar = () => {
    if (location.pathname.startsWith("/faculty")) {
      return <FacultySidebar />;
    } else if (location.pathname.startsWith("/student")) {
      return <StudentSidebar />;
    }
    return null;
  };

  return (
    <div className="flex h-screen">
      {renderSidebar()}
      <div className="flex flex-col flex-grow">
        <Navbar
          userName={userName}
          announcementCount={announcementCount}
          onNotificationClick={handleNotificationClick} // Pass the function to Navbar
        />
        <div className="p-6 bg-gray-100 h-full overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Display popup when showPopup is true */}
      {showPopup && (
        <AnnouncementPopup
          announcements={[]} // You can pass actual announcements here
          onClose={() => setShowPopup(false)} // Close popup when close button is clicked
        />
      )}
    </div>
  );
};

export default MainLayout;
