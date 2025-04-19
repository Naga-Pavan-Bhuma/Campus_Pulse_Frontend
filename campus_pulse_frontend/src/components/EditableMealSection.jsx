import React, { useState } from "react";

const EditableMealSection = ({ day, meal, items, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [mealItems, setMealItems] = useState(items.join(", "));

  const handleSave = () => {
    const updatedItems = mealItems.split(",").map(item => item.trim()).filter(Boolean);
    onSave(day, meal, updatedItems);
    setEditMode(false);
  };

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-700 capitalize">{meal}</h4>
      {editMode ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={mealItems}
            onChange={(e) => setMealItems(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="self-start bg-green-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <ul className="list-disc list-inside text-gray-600">
            {items.length ? items.map((item, i) => <li key={i}>{item}</li>) : <li>No items listed</li>}
          </ul>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableMealSection;
