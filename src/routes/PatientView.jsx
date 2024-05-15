import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Point from "../components/Point";

function PatientView() {
  const location = useLocation();
  const { booklet, isEditing = false } = location.state;
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  //const currentBooklet = booklets[currentBookletIndex];

  // const [formTitle, setFormTitle] = useState(booklet.title);
  // const [points, setPoints] = useState(booklet.points);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const themeClass = darkMode ? "dark" : "light";

  // useEffect(() => {
  //   const storedData = localStorage.getItem("points");
  //   console.log({ storedData });
  //   if (storedData) {
  //     const data = JSON.parse(storedData);
  //     //setFormTitle(data.formTitle);
  //     setPoints(data || []);
  //   }
  // }, []);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 my-5">
        {booklet.title}
      </h1>
      <div className="space-y-4 p-5">
        <Point point={currentPoint} isEditing={false} />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPoint}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <button
          onClick={handleNextPoint}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PatientView;
