import React, { useState, useEffect } from "react";
import Point from "../components/Point";

function PatientView() {
  const [formTitle, setFormTitle] = useState("");
  const [points, setPoints] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const themeClass = darkMode ? "dark" : "light";

  useEffect(() => {
    const storedData = localStorage.getItem("points");
    console.log({ storedData });
    if (storedData) {
      const data = JSON.parse(storedData);
      //setFormTitle(data.formTitle);
      setPoints(data || []);
    }
  }, []);

  if (!formTitle && points.length === 0) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-white">
      <h1 className="text-3xl font-bold text-center text-gray-900 my-5">
        {formTitle}
      </h1>
      <ul className="list-disc space-y-2 p-5">
        {points.map((point, index) => (
          <li key={index} className="text-gray-700 text-base">
            <Point
              points={points}
              currentPoint={0}
              setPoints={setPoints}
              isEditing={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientView;
