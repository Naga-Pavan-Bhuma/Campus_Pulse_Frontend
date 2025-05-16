import { Bell, Menu } from "lucide-react";

const Navbar = ({
  userName = "John Doe",
  announcementCount = 0,
  onNotificationClick,
  onMenuClick,
}) => {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Menu Button: only visible on mobile */}
        <button
          className="lg:hidden text-gray-700 hover:text-blue-600"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        <div className="text-xl font-semibold text-blue-700 tracking-wide">
          Campus Pulse
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-gray-700 font-medium hidden sm:block">
          Welcome, <span className="text-blue-600 font-semibold">{userName}</span>
        </div>

        <button
          className="relative hover:bg-gray-100 p-2 rounded-lg transition"
          onClick={onNotificationClick}
        >
          <Bell size={24} className="text-gray-700" />
          {announcementCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {announcementCount}
            </span>
          )}
        </button>

        <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
          {userName?.[0]?.toUpperCase() || "P"}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
