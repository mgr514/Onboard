import "./style.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react";
import Point from "./components/Point";
import { Link, useParams, Routes, Route } from "react-router-dom";
import FontSizeToggle from "./components/Fontaccess";

function mod(n, m) {
  return ((n % m) + m) % m;
}

function Booklet({ match }) {
  const { index } = useParams();
  const parsedIndex = parseInt(index, 10);
  const [booklets, setBooklets] = useLocalStorage("booklets", []);
  const [currentBooklet, setCurrentBooklet] = useState({
    formTitle: "",
    points: [],
  });
  const [formTitle, setFormTitle] = useState(booklets[0]?.title || "");
  const [pointType, setPointType] = useState("text");
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (
      !isNaN(parsedIndex) &&
      parsedIndex >= 0 &&
      parsedIndex < booklets.length
    ) {
      setCurrentBooklet(booklets[parsedIndex]);
      setFormTitle(booklets[parsedIndex].title);
    } else if (booklets.length > 0 && parsedIndex === undefined) {
      setCurrentBooklet(booklets[0]);
      setFormTitle(booklets[0].title);
    }
  }, [parsedIndex, booklets]);

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle);
    setCurrentBooklet((prevBooklet) => ({
      ...prevBooklet,
      title: newTitle,
    }));
  };

  const handlePointUpdate = (newValue, key) => {
    const updatedPoints = currentBooklet.points.map((point, idx) =>
      idx === currentPointIndex ? { ...point, [key]: newValue } : point
    );
    setCurrentBooklet((prevBooklet) => ({
      ...prevBooklet,
      points: updatedPoints,
    }));
    setBooklets((previousBooklets) =>
      previousBooklets.map((booklet, idx) =>
        idx === parsedIndex ? { ...booklet, points: updatedPoints } : booklet
      )
    );
  };

  const handleNextPoint = () => {
    if (currentBooklet.points.length > 1) {
      setCurrentPointIndex(
        (prevPoint) => (currentPointIndex + 1) % currentBooklet.points.length
      );
    }
  };

  const handlePreviousPoint = () => {
    if (currentBooklet.points.length > 1) {
      setCurrentPointIndex(
        (prevPoint) =>
          (currentPointIndex - 1 + currentBooklet.points.length) %
          currentBooklet.points.length
      );
    }
  };

  const handleToggleEditing = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleAddPoint = () => {
    const newPoint = { type: pointType, text: "", imageUrl: "", videoUrl: "" };
    const newPoints = [...currentBooklet.points, newPoint];
    setCurrentBooklet((prevBooklet) => ({
      ...prevBooklet,
      points: newPoints,
    }));
    setCurrentPointIndex(newPoints.length - 1);
    setBooklets((previousBooklets) =>
      previousBooklets.map((booklet, idx) =>
        idx === parsedIndex ? { ...booklet, points: newPoints } : booklet
      )
    );
    setIsEditing(true);
  };

  const handleDelete = () => {
    const newPoints = currentBooklet.points.filter(
      (_, index) => index !== currentPointIndex
    );
    setCurrentBooklet((prevBooklet) => ({
      ...prevBooklet,
      points: newPoints,
    }));
    setCurrentPointIndex(0);
    setBooklets((previousBooklets) =>
      previousBooklets.map((booklet, idx) =>
        idx === parsedIndex ? { ...booklet, points: newPoints } : booklet
      )
    );
  };

  const saveBooklet = () => {
    const newBooklets = [...booklets];
    newBooklets[parsedIndex] = currentBooklet;
    setBooklets(newBooklets);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
        {/* Outer container for the top-left items */}
        <div className="absolute top-0 left-0 p-4">
          <FontSizeToggle />
          <div className="mt-4">
            <Link
              to="/library"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Booklet Library
            </Link>
          </div>
        </div>

        <form className="new-item mx-auto max-w-2xl bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:shadow-2xl dark:text-white">
          <h1>Patient Education</h1>

          <div className="form-row py-2">
            <label htmlFor="formTitle"></label>
            <input
              type="text"
              className="text-lg font-bold border border-gray-900 border-solid focus:outline-none rounded p-1 dark:border-gray-500"
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
              className="py-1 border border-gray-300 border-solid dark:border-gray-600"
              value={pointType}
              onChange={(e) => setPointType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="text_and_image">Text and Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {currentBooklet.points[currentPointIndex] && (
            <div className="form-row py-4 border border-gray-300 rounded mb-4">
              <Point
                point={currentBooklet.points[currentPointIndex]}
                isEditing={isEditing}
                onChangeProp={handlePointUpdate}
              />
            </div>
          )}

          <div className="flex items-center justify-center space-x-2">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-2"
              onClick={handlePreviousPoint}
            >
              👈
            </button>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white text-lg font-bold px-4 rounded py-2"
              onClick={handleAddPoint}
            >
              +
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white text-lg font-bold px-4 rounded py-2"
              onClick={handleDelete}
            >
              🗑
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-2"
              onClick={handleToggleEditing}
            >
              {isEditing ? "Finish Editing" : "Edit"}
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 ml-2"
              onClick={handleNextPoint}
            >
              👉
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Booklet;
