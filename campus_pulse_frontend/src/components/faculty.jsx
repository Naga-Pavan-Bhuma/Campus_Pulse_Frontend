import React from "react";

const Faculty = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-700 p-6">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-2xl border border-white/20">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Faculty Forum
        </h2>
        <p className="text-gray-300 text-center">
          Engage in discussions, collaborate on research, and share insights.
        </p>

        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 bg-[#FFD700] text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition-all">
            Post Announcement
          </button>
          <button className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all">
            View Discussions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faculty;