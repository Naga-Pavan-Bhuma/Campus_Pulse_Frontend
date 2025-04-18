import React from 'react';

const departments = ['CSE', 'ECE', 'EEE', 'ME', 'CE'];

const TimetableForm = ({ selectedDept, selectedClass, setSelectedDept, setSelectedClass }) => {
  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-purple-600 mb-6">Select Department & Class</h2>

      <form className="space-y-6">
        {/* Department Selection */}
        <div>
          <label htmlFor="department" className="block text-sm font-semibold text-gray-700">Department</label>
          <select
            id="department"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Class Selection */}
        <div>
          <label htmlFor="class" className="block text-sm font-semibold text-gray-700">Class</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {/* Render classes dynamically based on selected department */}
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={`${selectedDept}-${String.fromCharCode(65 + i)}`}>
                {selectedDept}-{String.fromCharCode(65 + i)}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition duration-300"
        >
          Fetch Timetable
        </button>
      </form>
    </div>
  );
};

export default TimetableForm;
