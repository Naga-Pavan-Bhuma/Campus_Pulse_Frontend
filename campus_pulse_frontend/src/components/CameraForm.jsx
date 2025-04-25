import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};

const CameraForm = ({ onClose }) => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);  // New state for error handling

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setLoading(true);
    setError(null);  // Reset error state

    try {
        const formData = new FormData();
        const blob = await (await fetch(imageSrc)).blob();  // Convert base64 to blob
        const file = new File([blob], "capturedImage.jpg", { type: "image/jpeg" });
        formData.append("image", file);  // Append the image to form data
      // Step 1: Send image to the backend for facial recognition
      const response = await axios.post("http://192.168.221.213:8000/details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
     });

      const identifiedUser = response.data;
      setUserDetails(identifiedUser);  // Set the user details

    } catch (error) {
      console.error("Error during image processing or details fetch:", error);
      setError("Failed to identify user or fetch full details.");  // Display error message
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-xl p-6 w-[360px] text-center shadow-2xl relative">
        <h2 className="text-xl font-semibold mb-4 text-black">Capture Image</h2>

        {error && (
          <div className="mb-4 text-red-500">{error}</div> // Display error message
        )}

        {!userDetails ? (
          <>
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={videoConstraints}
              className="mx-auto rounded-md border"
            />
            <button
              onClick={captureAndSend}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span> // Optionally show a spinner
              ) : (
                "Capture & Identify"
              )}
            </button>
          </>
        ) : (
          <div className="text-left space-y-2 text-black">
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>ID:</strong> {userDetails.id}</p>
            <p><strong>CGPA:</strong> {userDetails.cgpa}</p>
            <p><strong>Attendance Percentage:</strong> {userDetails.attendance}</p>
            {/* Add more fields from detailsResponse if needed */}
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CameraForm;
