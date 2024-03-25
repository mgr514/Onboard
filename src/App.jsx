import "./style.css";
import React, { useState } from "react";

function mod(n, m) {
  return ((n % m) + m) % m;
}

function App() {
  const [formTitle, setFormTitle] = useState(
    localStorage.getItem("formTitle") || ""
  );
  const [pointType, setPointType] = useState();
  const [points, setPoints] = useState([]);

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
      <form className="new-item mx-auto max-w-sm">
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
            {points[currentPoint].type === "text" && (
              <>
                {isEditing ? (
                  <input
                    className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none"
                    type="text"
                    placeholder="Enter text"
                    value={points[currentPoint].text}
                    onChange={(e) => {
                      const newPoints = [...points];
                      newPoints[currentPoint].text = e.target.value;
                      setPoints(newPoints);
                    }}
                  />
                ) : (
                  <div>{points[currentPoint].text}</div>
                )}
              </>
            )}

            {points[currentPoint].type === "text_and_image" && (
              <>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none"
                      placeholder="Enter image URL"
                      value={points[currentPoint].imageUrl}
                      onChange={(e) => {
                        const newPoints = [...points];
                        newPoints[currentPoint].imageUrl = e.target.value;
                        setPoints(newPoints);
                      }}
                    />

                    <input
                      type="text"
                      className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none"
                      placeholder="Enter text"
                      value={points[currentPoint].text}
                      onChange={(e) => {
                        const newPoints = [...points];
                        newPoints[currentPoint].text = e.target.value;
                        setPoints(newPoints);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div>{points[currentPoint].text}</div>
                    {points[currentPoint].imageUrl && (
                      <img
                        src={points[currentPoint].imageUrl}
                        alt="Education Point Image"
                        width="480"
                        height="360"
                        max-height="250"
                        margin-inline="auto"
                      />
                    )}
                  </>
                )}
              </>
            )}

            {points[currentPoint].type === "video" && (
              <>
                {isEditing ? (
                  <input
                    type="text"
                    className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-2"
                    placeholder="Enter video URL"
                    value={points[currentPoint]?.videoUrl || ""}
                    onChange={(e) => {
                      const newPoints = [...points];
                      newPoints[currentPoint].videoUrl = e.target.value;
                      setPoints(newPoints);
                    }}
                  />
                ) : (
                  <div>
                    {points[currentPoint].text}
                    <video width="480" height="360" controls>
                      <source
                        src={points[currentPoint].videoUrl}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white text-lrg font-bold px-4 rounded py-2 mr-4"
          onClick={handleAddPoint}
        >
          +
        </button>

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white text-lrg font-bold px-4 rounded py-2 mr-1"
          onClick={handlePreviousPoint}
        >
          👈
        </button>

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white text-lrg font-bold px-4 rounded py-2 mr-1"
          onClick={handleNextPoint}
        >
          👉
        </button>

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white text-lrg font-bold px-4 rounded py-2 mr-1"
          onClick={handleToggleEditing}
        >
          {isEditing ? "Finish Editing" : "Edit"}
        </button>

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white text-lrg font-bold px-4 rounded py-2 ml-4"
          onClick={handleDelete}
        >
          🗑
        </button>
      </form>
    </>
  );
}

export default App;
