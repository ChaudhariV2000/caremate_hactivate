import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    navigate(`/room/${value}`);
  }, [navigate, value]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100  from-indigo-500 to-blue-300">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Join Room</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700 mb-1">
              Room Code
            </label>
            <input
              type="text"
              value={value}
              onChange= {(e) => setValue(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              placeholder="Enter room code"
              aria-label="Room Code"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all`}
            >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Video;