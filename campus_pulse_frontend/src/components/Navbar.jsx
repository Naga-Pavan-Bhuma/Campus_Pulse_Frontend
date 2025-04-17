import { Bell, MessageCircle, User } from "lucide-react";

const navbar = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      {/* Left Side - Brand Name */}
      <h1 className="text-2xl font-bold tracking-wide">Campus Pulse</h1>

      {/* Right Side - Icons */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative p-2 hover:bg-blue-500 rounded-lg">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Live Chat Icon */}
        <button className="p-2 hover:bg-blue-500 rounded-lg">
          <MessageCircle size={24} />
        </button>

        {/* Profile Icon */}
        <button className="p-2 hover:bg-blue-500 rounded-lg">
          <User size={24} />
        </button>
      </div>
    </header>
  );
};

export default navbar;