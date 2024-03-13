import "./style.css";
import React, { useState } from "react";

function mod(n, m) {
  return ((n % m) + m) % m;
}

function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState(localStorage.getItem("formTitle"));
  const [pointType, setPointType] = useState();
  const [points, setPoints] = useState([
    {
      type: "text",
      text: "hello",
      imageUrl: "",
    },
  ]);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  //========================== FUNCTIONS =============================================

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle);
    localStorage.setItem("formTitle", newTitle);
  };

  const handleNextPoint = () => {
    setCurrentPoint((prevPoint) => mod(prevPoint + 1, points.length));
  };

  const handlePreviousPoint = () => {
    setCurrentPoint((prevPoint) => mod(prevPoint - 1, points.length));
  };
  console.log(currentPoint);

  const handleAddPoint = () => {
    const newPoints = [
      ...points,
      { type: pointType, imageUrl: "", videoUrl: "" },
    ];
    setPoints(newPoints);
    setCurrentPoint(newPoints.length - 1);
    setIsEditing(true);
  };

  const handleToggleEditing = () => {
    setIsEditing((editing) => !editing);
  };
  //============================= BUILD FORM =====================================
  return (
    <>
      <form className="new-item">
        <h1>Patient Education</h1>

        <div className="form-row">
          <label htmlFor="formTitle"></label>
          <input
            type="text"
            id="formTitle"
            placeholder="Enter Education Title"
            value={formTitle}
            onChange={handleFormTitleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor={`item`}>Add Education Point</label>
          <select
            id="pointSelect"
            value={currentPoint}
            onChange={(e) => setCurrentPoint(e.target.value)}
          >
            {points.map((point, index) => (
              <option key={index} value={index}>
                {point.text}
                {point.imageUrl}
              </option>
            ))}
          </select>

          <select
            id="educationPoint"
            value={pointType}
            onChange={(e) => setPointType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="text_and_image">Text and Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {currentPoint !== null && (
          <div className="form-row">
            {points[currentPoint].type === "text" && (
              <>
                {isEditing ? (
                  <input
                    type="text"
                    placeholder="Enter text"
                    value={points[currentPoint].text}
                    onChange={(e) => {
                      const newPoints = { ...points };
                      newPoints[currentPoint].text = e.target.value;
                      setPoints(newPoints);
                    }}
                  />
                ) : (
                  <div>hello world</div>
                )}
              </>
            )}

            {points[currentPoint].type === "text_and_image" && (
              <>
                {isEditing ? (
                  <>
                    <input
                      type="text"
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
                  <div>hello world</div>
                )}
              </>
            )}

            {points[currentPoint].type === "video" && (
              <>
                {isEditing ? (
                  <input
                    type="text"
                    placeholder="Enter video URL"
                    value={points[currentPoint].videoUrl}
                    onChange={(e) => {
                      const newPoints = [...points];
                      newPoints[currentPoint].videoUrl = e.target.value;
                      setPoints(newPoints);
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </>
            )}
          </div>
        )}
        <button
          type="button"
          className="m-4 bg-gray-50 rounded-md p-2"
          onClick={handleAddPoint}
        >
          +
        </button>

        <button onClick={handlePreviousPoint}> 👈 </button>
        <button onClick={handleNextPoint}> 👉 </button>

        <button onClick={handleToggleEditing}>
          {" "}
          {isEditing ? "Finish Editing" : "Edit"}{" "}
        </button>
      </form>
    </>
  );
}

export default App;
