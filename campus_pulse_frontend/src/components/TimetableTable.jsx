import React from 'react';
const TimetableTable = ({ timetable }) => {
  return (
    <div className="overflow-x-auto mt-8 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 p-8 rounded-xl shadow-lg">
      <table className="min-w-full table-auto text-white">
        <thead>
          <tr>
            <th className="px-6 py-3 text-center text-lg font-bold uppercase">Time Slot</th>
            <th className="px-6 py-3 text-center text-lg font-bold uppercase">Monday</th>
            <th className="px-6 py-3 text-center text-lg font-bold uppercase">Tuesday</th>
            <th className="px-6 py-3 text-center text-lg font-bold uppercase">Wednesday</th>
            <th className="px-6 py-3 text-center text-lg font-bold uppercase">Thursday</th>
            <th className="px-6 py-3 text-center text-lg font-bold uppercase">Friday</th>
            <th className="px-6 py-3 text-center text-lg font-bold uppercase">Saturday</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the time slots */}
          {Object.keys(timetable).map((timeSlot, index) => (
            <tr key={index} className="hover:bg-purple-700 hover:scale-105 transition-transform duration-300 ease-in-out">
              {/* Display the time slot in the first column */}
              <td className="px-6 py-3 text-center">{timeSlot}</td>

              {/* Display the class for each day */}
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <td key={day} className="px-6 py-3 text-center">
                  {/* Display class or 'No Class' if no class is scheduled */}
                  {timetable[day][index] || 'No Class'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default TimetableTable;
