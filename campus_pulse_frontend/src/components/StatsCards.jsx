import React from "react";
import { FaUsers, FaClipboardList, FaPizzaSlice } from "react-icons/fa";

const stats = [
  { title: "Total Users", value: 1200, icon: <FaUsers className="text-4xl text-green-500" /> },
  { title: "Mess Menus", value: 50, icon: <FaClipboardList className="text-4xl text-blue-500" /> },
  { title: "Orders Today", value: 350, icon: <FaPizzaSlice className="text-4xl text-yellow-500" /> },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <div className="p-4 bg-blue-100 rounded-full mb-2">{stat.icon}</div>
          <h3 className="text-xl font-semibold">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
