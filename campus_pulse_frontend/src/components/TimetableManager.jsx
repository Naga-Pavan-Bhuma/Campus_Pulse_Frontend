import React, { useState, useEffect } from "react";

const departments = {
  CSE: ["CSE-A", "CSE-B", "CSE-C", "CSE-D", "CSE-E"],
  ECE: ["ECE-A", "ECE-B", "ECE-C", "ECE-D", "ECE-E"],
  EEE: ["EEE-A", "EEE-B", "EEE-C", "EEE-D", "EEE-E"],
  ME: ["ME-A", "ME-B", "ME-C", "ME-D", "ME-E"],
  CE: ["CE-A", "CE-B", "CE-C", "CE-D", "CE-E"]
};

const sampleTimetable = {
  "CSE-A": {
    Monday: ["Math", "Physics", "English", "Break", "C++", "DSA"],
    Tuesday: ["Math", "English", "Physics", "Break", "C++", "DSA"],
    Wednesday: ["DSA", "Physics", "Math", "Break", "English", "C++"],
    Thursday: ["Math", "C++", "DSA", "Break", "Physics", "English"],
    Friday: ["English", "DSA", "Math", "Break", "Physics", "C++"],
    Saturday: ["Lab", "Lab", "Lab", "Break", "Sports", "Library"]
  },
  // Add similar data for other classes...
};

const TimetableManager = () => {
  const [selectedDept, setSelectedDept] = useState("CSE");
  const [selectedClass, setSelectedClass] = useState("CSE-A");

  useEffect(() => {
    setSelectedClass(departments[selectedDept][0]);
  }, [selectedDept]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["9-10", "10-11", "11-12", "12-1", "2-3", "3-4"];

  const timetable = sampleTimetable[selectedClass];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">📅 Timetable Manager</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-lg font-medium mb-2">Department</label>
            <select
              className="w-full p-3 rounded border border-gray-300"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {Object.keys(departments).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Class</label>
            <select
              className="w-full p-3 rounded border border-gray-300"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {departments[selectedDept].map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr>
                <th className="border border-gray-300 p-3 bg-gray-200 text-left">Day</th>
                {timeSlots.map((slot, idx) => (
                  <th key={idx} className="border border-gray-300 p-3 bg-gray-200 text-center">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">{day}</td>
                  {timetable && timetable[day] ? (
                    timetable[day].map((subject, idx) => (
                      <td key={idx} className="border border-gray-300 p-3 text-center">
                        {subject}
                      </td>
                    ))
                  ) : (
                    <td colSpan={timeSlots.length} className="p-3 text-center text-gray-500">
                      No data
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableManager;
