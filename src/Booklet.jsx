import "./style.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react";
import Point from "./components/Point";

function mod(n, m) {
  return ((n % m) + m) % m;
}

function Booklet() {
  const [formTitle, setFormTitle] = useState(
    localStorage.getItem("formTitle") || ""
  );

  const [pointType, setPointType] = useState("text");
  const [points, setPoints] = useLocalStorage("points", []);
  const booklets = useLocalStorage("booklets", []);

  useEffect(() => {
    const bookletData = {
      formTitle: formTitle,
      points: points,
    };
    localStorage.setItem("bookletData", JSON.stringify(bookletData));
  }, [formTitle, points]);

  const [currentPoint, setCurrentPoint] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle);
    localStorage.setItem("formTitle", newTitle);
  };

  const handleNextPoint = () => {
    if (points.length > 1) {
      setCurrentPoint((prevPoint) => mod(prevPoint + 1, points.length));
    }
  };

  const handlePreviousPoint = () => {
    if (points.length > 1) {
      setCurrentPoint((prevPoint) => mod(prevPoint - 1, points.length));
    }
  };

  const handleAddPoint = () => {
    const newPoint = { type: pointType, text: "", imageUrl: "", videoUrl: "" };
    const newPoints = [...points, newPoint];
    setPoints(newPoints);
    setCurrentPoint(newPoints.length - 1);
    setIsEditing(true);
    setFormTitle("");
  };

  const handleToggleEditing = () => {
    setIsEditing((editing) => !editing);
  };

  const handleDelete = () => {
    setPoints((currentPoints) => {
      const newPoints = currentPoints.filter(
        (_, index) => index !== currentPoint
      );

      if (newPoints.length === 0) {
        setCurrentPoint(0);
        return newPoints;
      } else {
        const newCurrentPoint =
          (currentPoint === 0 ? 0 : currentPoint - 1) % newPoints.length;
        setCurrentPoint(newCurrentPoint);

        return newPoints;
      }
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="new-item mx-auto max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1>Patient Education</h1>

          <div className="form-row py-2">
            <label htmlFor="formTitle"></label>
            <input
              type="text"
              className="text-lg font-bold border border-gray-900 border-solid focus:outline-none rounded p-1"
              id="formTitle"
              placeholder="Enter Education Title"
              value={formTitle}
              onChange={handleFormTitleChange}
            />
          </div>

          <div className="form-row py-2">
            <label htmlFor="item" className="mr-2">
              Add Education Point:
            </label>

            <select
              id="educationPoint"
              className="py-1 border border-gray-300 border-solid"
              value={pointType}
              onChange={(e) => setPointType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="text_and_image">Text and Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {currentPoint !== null && points[currentPoint] && (
            <div className="form-row py-4 border border-gray-300 rounded mb-4">
              <Point
                points={points}
                currentPoint={currentPoint}
                setPoints={setPoints}
                isEditing={isEditing}
              />
            </div>
          )}

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-1"
            onClick={handleAddPoint}
          >
            +
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-4"
            onClick={handleToggleEditing}
          >
            {isEditing ? "Finish Editing" : "Edit"}
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-1"
            onClick={handlePreviousPoint}
          >
            👈
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2"
            onClick={handleNextPoint}
          >
            👉
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 ml-4"
            onClick={handleDelete}
          >
            🗑
          </button>
        </form>
      </div>
    </>
  );
}

export default Booklet;
