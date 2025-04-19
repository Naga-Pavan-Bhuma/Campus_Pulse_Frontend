import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, subMonths, addMonths } from 'date-fns';

const AcademicCalendar = () => {
  const [events, setEvents] = useState([]);
  const [branch, setBranch] = useState('CSE');
  const [year, setYear] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowCalendar(false);
    setEvents([]);

    try {
      const response = await fetch(`http://localhost:5000/academicCalendar/${branch}/${year}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();

      setEvents(data);
      setShowCalendar(true);
    } catch (error) {
      alert("Error fetching events. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center text-2xl font-semibold text-white mb-4">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-yellow-400 hover:text-yellow-500 transition-all duration-300">
        &lt;
      </button>
      <span>{format(currentMonth, 'MMMM yyyy')}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-yellow-400 hover:text-yellow-500 transition-all duration-300">
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 text-sm text-center text-gray-300 mb-2">
        {days.map((day, idx) => (
          <div key={idx} className="font-medium">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const rows = [];

    let day = startDate;
    while (day <= monthEnd) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const formatted = format(day, 'yyyy-MM-dd');
        const dayEvents = events.filter(e => format(new Date(e.date), 'yyyy-MM-dd') === formatted);

        days.push(
          <div key={day} className="p-4 border border-gray-700 min-h-[80px] relative hover:bg-opacity-20 transition-all duration-300">
            <span className="text-sm font-semibold text-white">{format(day, 'd')}</span>
            {dayEvents.map((event, idx) => (
              <div key={idx} className={`text-xs mt-1 px-2 py-1 rounded shadow-md ${event.type === 'exam' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                {event.title.length > 10 ? event.title.slice(0, 10) + '…' : event.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day} className="grid grid-cols-7 gap-px">{days}</div>);
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Academic Calendar 📅
        </h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl backdrop-blur-md mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-full sm:w-48">
              <label className="block text-sm font-semibold text-gray-300 mb-1">Branch</label>
              <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full p-3 rounded-lg text-black">
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
              </select>
            </div>
            <div className="w-full sm:w-48">
              <label className="block text-sm font-semibold text-gray-300 mb-1">Year</label>
              <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="w-full p-3 rounded-lg text-black">
                {[1, 2, 3, 4].map((yr) => (
                  <option key={yr} value={yr}>{yr} Year</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
              {loading ? "Loading..." : "Show Calendar"}
            </button>
          </div>
        </form>

        {/* Calendar View */}
        {showCalendar && (
          <div className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-xl backdrop-blur-md">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        )}

        {/* No Events Message */}
        {showCalendar && events.length === 0 && !loading && (
          <div className="text-center text-red-400 mt-6 font-semibold">No events found for this selection.</div>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendar;
