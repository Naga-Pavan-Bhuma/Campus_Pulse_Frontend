import { Outlet, useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import FacultySidebar from "./FacultySidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  const location = useLocation();

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
        <Navbar />

        {/* Dynamic Content */}
        <div className="p-6 bg-gray-100 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
