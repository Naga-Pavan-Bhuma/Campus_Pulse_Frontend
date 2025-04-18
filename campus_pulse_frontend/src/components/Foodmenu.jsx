import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCoffee, FaUtensils, FaCookieBite, FaPizzaSlice } from "react-icons/fa";

const messData = {
  Mess1: {
    breakfast: ["Idli", "Sambar", "Chutney", "Boiled Egg", "Coffee"],
    lunch: ["Rice", "Sambar", "Potato Fry", "Curd", "Papad", "Fruit"],
    snacks: ["Samosa", "Tea", "Banana"],
    dinner: ["Chapati", "Dal", "Rice", "Mixed Veg Curry", "Sweet"]
  },
  Mess2: {
    breakfast: ["Dosa", "Chutney", "Boiled Egg", "Milk", "Upma"],
    lunch: ["Rice", "Rasam", "Brinjal Curry", "Butter Milk", "Curd Rice"],
    snacks: ["Vada", "Coffee", "Puffs"],
    dinner: ["Fried Rice", "Gobi Manchurian", "Curd", "Tomato Soup"]
  },
  Mess3: {
    breakfast: ["Upma", "Banana", "Chutney", "Tea", "Pongal"],
    lunch: ["Rice", "Dal", "Beetroot Fry", "Curd", "Pickle", "Lassi"],
    snacks: ["Bajji", "Tea", "Cookies"],
    dinner: ["Poori", "Aloo Kurma", "Rice", "Rasam"]
  },
  Mess4: {
    breakfast: ["Pongal", "Chutney", "Boiled Egg", "Cornflakes"],
    lunch: ["Veg Biryani", "Raita", "Salad", "Sweet", "Papad"],
    snacks: ["Mysore Bonda", "Tea", "Fruit Salad"],
    dinner: ["Rice", "Sambar", "Bitter Gourd Fry", "Kheer"]
  },
  Mess5: {
    breakfast: ["Masala Dosa", "Chutney", "Milk", "Bread Butter"],
    lunch: ["Rice", "Tomato Dal", "Cabbage Fry", "Curd", "Sweet"],
    snacks: ["Mirchi Bajji", "Tea", "Chips"],
    dinner: ["Roti", "Paneer Curry", "Rice", "Veg Soup"]
  },
  Mess6: {
    breakfast: ["Idli", "Vada", "Chutney", "Tea", "Boiled Corn"],
    lunch: ["Rice", "Sambar", "Ladies Finger Fry", "Curd", "Papad"],
    snacks: ["Biscuits", "Milk", "Fruit"],
    dinner: ["Chapati", "Chana Masala", "Rice", "Sweet"]
  },
  Mess7: {
    breakfast: ["Dosa", "Sambar", "Milk", "Upma", "Banana"],
    lunch: ["Rice", "Dal", "Chicken Curry (Non-Veg Day)", "Curd", "Pickle"],
    snacks: ["Puffs", "Juice", "Wafers"],
    dinner: ["Egg Fried Rice", "Paneer Curry", "Salad"]
  },
  Mess8: {
    breakfast: ["Cornflakes", "Bread Omelette", "Juice", "Pancakes"],
    lunch: ["Pasta", "Garlic Bread", "Salad", "Soup"],
    snacks: ["Cookies", "Coffee", "Juice"],
    dinner: ["Grilled Chicken", "Rice", "Veg Soup", "Brownie"]
  }
};

const icons = {
  breakfast: <FaCoffee className="inline mr-2 text-yellow-300" />,
  lunch: <FaUtensils className="inline mr-2 text-green-300" />,
  snacks: <FaCookieBite className="inline mr-2 text-pink-300" />,
  dinner: <FaPizzaSlice className="inline mr-2 text-red-300" />
};

const Foodmenu = () => {
  const [selectedMess, setSelectedMess] = useState("Mess1");
  const messNames = Object.keys(messData);
  const currentMenu = messData[selectedMess];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-blue-950 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-300 text-transparent bg-clip-text"
        >
          🍽 Campus Mess Menu
        </motion.h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <select
            className="text-lg p-3 rounded-full shadow-md bg-white text-gray-900 border-2 border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-500 hover:scale-105 transition-transform duration-200"
            onChange={(e) => setSelectedMess(e.target.value)}
            value={selectedMess}
          >
            {messNames.map((mess) => (
              <option key={mess} value={mess}>
                {mess}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl ring-2 ring-white/20"
        >
          {Object.entries(currentMenu).map(([meal, items]) => (
            <div key={meal} className="mb-8">
              <h2 className="text-2xl font-semibold capitalize border-b-2 border-white/30 pb-2 mb-3 flex items-center">
                {icons[meal] || null}
                {meal}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-4 text-lg">
                {items.map((item, index) => (
                  <li key={index} className="bg-white/20 p-2 rounded-xl backdrop-blur-sm shadow-sm hover:bg-white/30 transition-all">
                    🍴 {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Foodmenu;
