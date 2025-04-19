import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCoffee, FaUtensils, FaCookieBite, FaPizzaSlice } from "react-icons/fa";

const icons = {
  breakfast: <FaCoffee className="inline mr-2 text-yellow-400" />,
  lunch: <FaUtensils className="inline mr-2 text-green-400" />,
  snacks: <FaCookieBite className="inline mr-2 text-pink-400" />,
  dinner: <FaPizzaSlice className="inline mr-2 text-red-400" />
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const Foodmenu = () => {
  const [messData, setMessData] = useState({});
  const [selectedMess, setSelectedMess] = useState("Mess1");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/menu");
        console.log("Fetched Data:", response.data); // Log the response to see the structure
        setMessData(response.data);
        console.log("Fetched Data:", response.data);
console.log("Selected Mess:", selectedMess);
console.log("Selected Day:", selectedDay);
console.log("Current Menu:", response.data[selectedMess]?.[selectedDay]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching mess data:", error);
      }
    };
  
    fetchMessData();
  }, []);
  

  const messNames = Object.keys(messData);
  const currentMenu = messData[selectedMess]?.[selectedDay];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading menu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#24243e] text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg"
        >
          🍽 Campus Mess Menu
        </motion.h1>

        {/* Dropdowns */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10 gap-6 flex-wrap"
        >
          {/* Mess Dropdown */}
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold text-cyan-300">Select Mess</label>
            <select
              className="text-lg p-3 rounded-2xl shadow-lg bg-white/80 text-gray-900 border-2 border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500 hover:scale-105 transition-transform duration-200"
              onChange={(e) => setSelectedMess(e.target.value)}
              value={selectedMess}
            >
              {messNames.map((mess) => (
                <option key={mess} value={mess}>
                  {mess}
                </option>
              ))}
            </select>
          </div>
          {/* Day Dropdown */}
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg font-semibold text-purple-300">Select Day</label>
            <select
              className="text-lg p-3 rounded-2xl shadow-lg bg-white/80 text-gray-900 border-2 border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-500 hover:scale-105 transition-transform duration-200"
              onChange={(e) => setSelectedDay(e.target.value)}
              value={selectedDay}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Menu Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl ring-2 ring-white/20 border border-white/10"
        >
          {currentMenu ? (
            Object.entries(currentMenu).map(([meal, items]) => (
              <div key={meal} className="mb-10">
                <h2 className="text-2xl font-bold capitalize border-b-2 border-white/20 pb-2 mb-4 flex items-center drop-shadow-md">
                  {icons[meal] || null}
                  {meal}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 text-lg">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="bg-gradient-to-r from-white/30 to-white/10 p-3 rounded-xl backdrop-blur-md shadow-md hover:bg-white/40 hover:text-blue-900 transition-all font-medium"
                    >
                      🍴 {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-xl text-center text-white/80">No data available for this day.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Foodmenu;