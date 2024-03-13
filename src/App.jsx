import "./style.css"
import React, { useState } from 'react';

//========================== TO DO ====================================

// 2. User UI:
    //switch between textbox/just text under each of these conditional renders


function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState(localStorage.getItem('formTitle')); 
  const [pointType, setPointType] = useState(); 
  const [points, setPoints] = useState([
    { 
      type:"text",
      text: "hello",
      imageUrl: "",
    },
  ]);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  //========================== FUNCTIONS =============================================

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  };

  const handleNextPoint = () => {
    setCurrentPoint(prevPoint => (prevPoint === points.length - 1 ? 0 : prevPoint + 1));
};

  const handlePreviousPoint = () => {
    setCurrentPoint(prevPoint => (prevPoint === points.length - 1 ? 0 : prevPoint + 1));
  }

  const handleAddPoint = () => {
  const newPoints = [...points, { type: pointType, text: pointTitle, imageUrl: "", videoUrl: "" }];
    setPoints(newPoints); 
    setCurrentPoint(newPoints.length - 1)
    setIsEditing(true);
  };

  const handleToggleEditing = () => {
    setIsEditing (editing => !editing)
  }
//============================= BUILD FORM =====================================
  return (<>
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
          <select id="pointSelect" value={currentPoint}
           onChange={(e) => setCurrentPoint(e.target.value)}>

            {points.map((point, index) => (
              <option key={index} value={index}>
                {point.text}
                {point.imageUrl}
              </option> 
            ))}
          </select>

          <select id="educationPoint" value={pointType} onChange={(e) => setPointType(e.target.value)}>
            <option value="text">Text</option>
            <option value="text_and_image">Text and Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {currentPoint !== null && (
        <div className="form-row">
          {points[currentPoint].type === "text" && isEditing &&(
            <>
            // 2. UI BIT HERE
          {isEditing ? (
            <input
              type="text"
              placeholder="Enter text"
              value={points[currentPoint].text}
              onChange={(e) => {
                const newPoints = {...points};
                newPoints[currentPoint].text = e.target.value;
                setPoints(newPoints)
              }}
            /> 
            ) : ( )}
            </>
          )}

          {points[currentPoint].type === "text_and_image" && isEditing && (
            <>
            {isEditing ? (
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
            ) : ( )}
          </>
          )}
         
         {points[currentPoint].type === "video" && isEditing && (
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
          ) : ( )}
          </>
         )}
        </div>
      )}
        <button type="button" onClick={handleAddPoint}> + </button>

        <button onClick={handlePreviousPoint}> 👈 </button>
        <button onClick={handleNextPoint}> 👉 </button> 

        <button onClick={handleToggleEditing}> {isEditing ? "Finish Editing" : "Edit"} </button> 
      </form>
  </>
  )
}

export default App

  // const handlePointSelect = (e) => {
  //   const option = e.target.value;
  //   const newPoints = [...points, { type, text: "", imageUrl: "", videoUrl: "" }]
  //   //newPoints[index].type = option
  //   setPoints(newPoints);
  //   setCurrentPoint(newPoints.length - 1);
  // };
