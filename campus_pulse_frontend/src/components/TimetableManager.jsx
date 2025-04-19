import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimetableForm from './TimetableForm';
import TimetableTable from './TimetableTable';

const TimetableManager = () => {
  const [selectedDept, setSelectedDept] = useState('CSE');
  const [selectedClass, setSelectedClass] = useState('CSE-A');
  const [selectedYear, setSelectedYear] = useState('1st Year'); // Added year state
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/timetable/${selectedDept}/${selectedClass}/${selectedYear}` // Include year in API request
        );
        setTimetable(response.data);
      } catch (err) {
        console.error('Error fetching timetable:', err);
      }
      setLoading(false);
    };

    fetchTimetable();
  }, [selectedDept, selectedClass, selectedYear]); // Added year to the dependency array

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Timetable
        </h1>

        <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl backdrop-blur-md mb-6">
          <TimetableForm
            selectedDept={selectedDept}
            selectedClass={selectedClass}
            selectedYear={selectedYear} // Pass selectedYear to TimetableForm
            setSelectedDept={setSelectedDept}
            setSelectedClass={setSelectedClass}
            setSelectedYear={setSelectedYear} // Pass setSelectedYear to TimetableForm
          />
        </div>

        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
          </div>
        ) : timetable ? (
          <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            <TimetableTable timetable={timetable} />
          </div>
        ) : (
          <p className="text-center mt-10 text-red-400">No timetable found.</p>
        )}
      </div>
    </div>
  );
};

export default TimetableManager;
