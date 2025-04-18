import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [user, setUser] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get(`${API_URL}/clubs`, {
          withCredentials: true,
        });
        console.log(res.data);
        setClubs(res.data);
      } catch (err) {
        console.error("Error fetching clubs:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchClubs();
    fetchUser();
  }, []);

  const handleClubClick = (club) => {
    setSelectedClub(club);
    //console.log(user)
    if (user) {
      console.log(club);
      const alreadyRequested = club.members.some(
        (member) =>
          member.userId._id === user._id && member.status === "pending"
      );
      setHasRequested(alreadyRequested);
    }
  };

  const sendJoinReq = async () => {
    try {
      await axios.post(`${API_URL}/${selectedClub._id}/join`, null, {
        withCredentials: true,
      });
      setHasRequested(true);
      alert("Request sent successfully!");
    } catch (err) {
      console.error("Error sending join request:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Clubs
      </h2>

      {clubs.length === 0 ? (
        <p className="text-gray-500 text-center">No clubs available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="p-4 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
              onClick={() => handleClubClick(club)}
            >
              <img
                src={club.imageUrl}
                alt={club.clubName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-blue-600 mt-2">
                {club.clubName}
              </h3>
              <p className="text-gray-700 text-sm">
                <strong>Coordinators:</strong>{" "}
                {club.coordinators.map((c) => c.firstName).join(", ") || "None"}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Members:</strong> {club.members.length}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Club Details */}
      {selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedClub(null)}
            >
              ✖
            </button>
            <img
              src={selectedClub.imageUrl}
              alt={selectedClub.clubName}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold text-blue-600 mt-2">
              {selectedClub.clubName}
            </h2>
            <p className="text-gray-700 mt-2">
              <strong>Coordinators:</strong>{" "}
              {selectedClub.coordinators
                .map((c) => `${c.firstName} ${c.lastName}`)
                .join(", ") || "None"}
            </p>
            <p className="text-gray-700">
              <strong>Faculty Advisors:</strong>{" "}
              {selectedClub.facultyAdvisors.length || "None"}
            </p>
            <p className="text-gray-700">
              <strong>Members:</strong>{" "}
              {selectedClub.members
                .map((m) => `${m.userId.firstName} ${m.userId.lastName}`)
                .join(", ") || "None"}
            </p>
            <p className="text-gray-700">
              <strong>Events:</strong>{" "}
              {selectedClub.events.length || "No events yet"}
            </p>

            {/* Join Request Button - Only Show if User Hasn't Requested */}
            {!hasRequested && (
              <button
                onClick={sendJoinReq}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Send Join Request
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;