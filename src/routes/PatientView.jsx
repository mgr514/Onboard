import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Point from "../components/Point";
import FontSizeToggle from "../components/Fontaccess";

function PatientView() {
  const location = useLocation();
  const { booklet, isEditing } = location.state || {
    booklet: null,
    isEditing: false,
  };
  const [currentPointIndex, setCurrentPointIndex] = useState(0);

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const themeClass = darkMode ? "dark" : "light";

  const handleNextPoint = () => {
    if (currentPointIndex < booklet.points.length - 1) {
      setCurrentPointIndex(currentPointIndex + 1);
    }
  };

  const handlePreviousPoint = () => {
    if (currentPointIndex > 0) {
      setCurrentPointIndex(currentPointIndex - 1);
    }
  };

  if (!booklet) {
    return <div>No booklet found...</div>;
  }

  const currentPoint = booklet.points[currentPointIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between min-h-screen">
      <div>
        <FontSizeToggle />
        <h1 className="text-3xl font-bold text-center text-gray-900 my-5">
          {booklet.title}
        </h1>
        <div className="space-y-4 p-5 flex flex-col items-center justify-center">
          <Point point={currentPoint} isEditing={isEditing} />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePreviousPoint}
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 ml-2"
          >
            👈
          </button>
          <button
            onClick={handleNextPoint}
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 ml-2"
          >
            👉
          </button>
        </div>
      </div>
      <div className="flex justify-end pb-4">
        <Link
          to="/library"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Booklet Library
        </Link>
      </div>
    </div>
  );
}

export default PatientView;
