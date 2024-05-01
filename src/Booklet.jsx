import "./style.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react";
import Point from "./components/Point";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  const [points, setPoints] = useLocalStorage("points", []);
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

    // localStorage.setItem("formTitle", newTitle);
  };

  const handlePointUpdate = (newValue, key) => {
    const updatedPoints = points.map((point, idx) =>
      idx === currentPointIndex ? { ...point, [key]: newValue } : point
    );
    setCurrentBooklet((prevBooklet) => ({
      ...prevBooklet,
      points: updatedPoints,
    }));
    setPoints(updatedPoints);
  };

  const handleNextPoint = () => {
    if (points.length > 1) {
      setCurrentPointIndex((prevPoint) =>
        mod(currentPointIndex + 1, currentBooklet.points.length)
      );
    }
  };

  const handlePreviousPoint = () => {
    if (points.length > 1) {
      setCurrentPointIndex((prevPoint) =>
        mod(currentPointIndex - 1, currentBooklet.points.length)
      );
    }
  };

  const handleAddPoint = () => {
    const newPoint = { type: pointType, text: "", imageUrl: "", videoUrl: "" };
    const newPoints = [...currentBooklet.points, newPoint];
    setCurrentBooklet((prevBooklet) => ({
      ...prevBooklet,
      points: newPoints,
    }));
    setCurrentPointIndex(newPoints.length - 1);
    setPoints(newPoints);
    setIsEditing(true);
    // setFormTitle("");
  };

  const handleToggleEditing = () => {
    setIsEditing((editing) => !editing);
  };

  const handleDelete = () => {
    setPoints((currentPoints) => {
      const newPoints = currentPoints.filter(
        (_, index) => index !== currentPointIndex
      );

      if (newPoints.length === 0) {
        setCurrentPointIndex(0);
        return newPoints;
      } else {
        const newCurrentPoint =
          (currentPoint === 0 ? 0 : currentPoint - 1) % newPoints.length;
        setCurrentPointIndex(newCurrentPoint);

        return newPoints;
      }
    });
  };
  const saveBooklet = () => {
    const newBooklets = [...booklets];
    const newBookletIndex =
      typeof index !== "undefined" ? parseInt(index, 10) : booklets.length;
    newBooklets[newBookletIndex] = currentBooklet;

    setBooklets(newBooklets);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
        <div className="">
          <Link
            to="/library"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Booklet Library
          </Link>
        </div>
        <form className="new-item mx-auto max-w-2xl bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:shadow-2xl dark: text-white">
          <h1>Patient Education</h1>

          <div className="form-row py-2 dark: text-black">
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
              className="py-1 border border-gray-300 border-solid dark:border-gray-600 dark: text-black"
              value={pointType}
              onChange={(e) => setPointType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="text_and_image">Text and Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {points[currentPointIndex] && (
            <div className="form-row py-4 border border-gray-300 rounded mb-4 dark: bg-white dark: text-black">
              <Point
                point={currentBooklet.points[currentPointIndex]}
                //currentPoint={currentPoint}
                points={points}
                setPoints={setPoints}
                isEditing={isEditing}
                onChangeProp={handlePointUpdate}
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
