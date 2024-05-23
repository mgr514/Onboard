//swipey scroll
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Point from "../components/Point";
import FontSizeToggle from "../components/Fontaccess";
import { CaretCircleRight, CaretCircleLeft } from "@phosphor-icons/react";

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
    <div className="flex flex-col justify-between min-h-screen">
      <div className="w-full flex justify-start items-center mb-4 mt-4 space-x-2 px-4 sm:px-6 lg:px-8">
        <Link
          to="/library"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Booklet Library
        </Link>
        <FontSizeToggle />
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-900 my-5">
        {booklet.title}
      </h1>
      <div className="flex items-center justify-center flex-grow">
        <button
          onClick={handlePreviousPoint}
          className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-8 hidden md:block"
        >
          <CaretCircleLeft size={32} weight="thin" />
        </button>
        <div className="w-full max-w-3xl h-[75vh] border border-gray-400 p-5 rounded-lg shadow-md mx-4 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <Point point={currentPoint} isEditing={isEditing} />
          </div>
        </div>
        <button
          onClick={handleNextPoint}
          className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 ml-8 hidden md:block"
        >
          <CaretCircleRight size={32} weight="thin" />
        </button>
      </div>
      <div className="flex justify-center space-x-4 mt-4 md:hidden">
        <button
          onClick={handlePreviousPoint}
          className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2"
        >
          <CaretCircleLeft size={32} weight="thin" />
        </button>
        <button
          onClick={handleNextPoint}
          className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2"
        >
          <CaretCircleRight size={32} weight="thin" />
        </button>
      </div>
    </div>
  );
}

export default PatientView;
