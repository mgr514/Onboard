import "./style.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react";
import Point from "./components/Point";
import {
  PencilSimple,
  Trash,
  PlusCircle,
  CaretCircleRight,
  CaretCircleLeft,
  House,
} from "@phosphor-icons/react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import FontSizeToggle from "./components/Fontaccess";

function mod(n, m) {
  return ((n % m) + m) % m;
}

function Booklet() {
  const { bookletId } = useParams();
  const parsedBookletId = parseInt(bookletId, 10);
  const [booklets, setBooklets] = useLocalStorage("booklets", []);
  const [params] = useSearchParams();

  const currentBookletIndex = booklets.findIndex(
    ({ id }) => id === parsedBookletId
  );
  const currentBooklet = booklets[currentBookletIndex];

  const [formTitle, setFormTitle] = useState(currentBooklet.title || "");
  const [pointType, setPointType] = useState("text");
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const setCurrentBooklet = (cb) => {
    const newBooklet = cb(currentBooklet);
    const newBooklets = [...booklets];
    newBooklets[currentBookletIndex] = newBooklet;
    setBooklets(newBooklets);
  };

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;

    setCurrentBooklet((prevBooklet) => ({
      ...prevBooklet,
      title: newTitle,
    }));
  };

  const handlePointUpdate = (newValue, key) => {
    setCurrentBooklet((prevBooklet) => {
      const updatedPoints = prevBooklet.points.map((point, idx) =>
        idx === currentPointIndex ? { ...point, [key]: newValue } : point
      );
      return { ...prevBooklet, points: updatedPoints };
    });
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
  };

  const handlePointClick = (index) => {
    setCurrentPointIndex(index);
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-black">
        <div className="flex flex-col p-4 space-y-4 absolute top-0 left-0">
          <div className="flex space-x-2">
            <Link
              to="/"
              className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <House size={32} weight="thin" />
            </Link>
            <FontSizeToggle />
          </div>
          <Link
            to="/library"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Booklet Library
          </Link>
          <div className="pt-4">
            <h2 className="font-bold mb-2 underline">Points</h2>
            <ul className="list-disc pl-4">
              {currentBooklet.points.map((point, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handlePointClick(index)}
                >
                  Point {index + 1} - {point.type.replace("_", " ")}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="new-item max-w-2xl bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:shadow-2xl dark:text-white flex flex-col justify-center">
            <form className="flex flex-col justify-center items-center h-full w-full">
              <div className="flex justify-end space-x-2 w-full mb-4">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold px-2 rounded py-1"
                  onClick={handleDelete}
                >
                  <Trash size={24} weight="thin" />
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-2 rounded py-1"
                  onClick={handleToggleEditing}
                >
                  {isEditing ? (
                    "Finish Editing"
                  ) : (
                    <PencilSimple size={24} weight="thin" />
                  )}
                </button>
              </div>
              <h1 className="mb-4">Patient Education</h1>

              <div className="form-row py-2">
                <label htmlFor="formTitle"></label>
                <input
                  type="text"
                  className="text-lg font-bold border border-gray-900 border-solid focus:outline-none rounded p-1 dark:border-gray-500"
                  id="formTitle"
                  placeholder="Enter Education Title"
                  value={currentBooklet.title}
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

              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2"
                  onClick={handlePreviousPoint}
                >
                  <CaretCircleLeft size={32} weight="thin" />
                </button>
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white text-lg font-bold px-4 rounded py-2"
                  onClick={handleAddPoint}
                >
                  <PlusCircle size={32} weight="thin" />
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2"
                  onClick={handleNextPoint}
                >
                  <CaretCircleRight size={32} weight="thin" />
                </button>
              </div>
            </form>
          </div>
          <div className="text-center mt-4 text-gray-500 w-full">
            <p>Booklets will automatically save.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booklet;
