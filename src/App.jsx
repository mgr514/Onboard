import "./style.css"
import React, { useState } from 'react';

//========================== TO DO ====================================



function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState(localStorage.getItem('formTitle')); 
  const [pointTitle, setPointTitle] = useState("text");
  const [points, setPoints] = useState([
    { 
      text: "",
      imageUrl: ""
    }
  ]);
  const [currentPoint, setCurrentPoint] = useState(0);

  //========================== FUNCTIONS =============================================

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  };

  const handlePointSelect = (index) => {
    const option = e.target.value;
    const newPoints = [...points, { type, text: "", imageUrl: "", videoUrl: "" }]
    //newPoints[index].type = option
    setPoints(newPoints);
    setCurrentPoint(index);
    setPointTitle(e.target.value);
  };

  const handleAddPoint = () => {
  const newPoints = [...points, { type: pointTitle, text: "", imageUrl: "", videoUrl: "" }];
    setPoints(newPoints); 
    setPointTitle("")
  };
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
          <select id="educationPoint" value={pointTitle} onChange={(e) => handlePointSelect(parseInt(e.target.value, e))}>
            {/* {points.map((point, index) => (
              <option key={index} value={index}>
                {point.text}
                {point.imageUrl}
              </option> */}
            {/* {titles.map((title, index) => (
            <option key={index} value={index}>
              {title}
            </option>
            ))} */}
            <option value="text">Text</option>
            <option value="text_and_image">Text and Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {currentPoint !== null && (
        <div className="form-row">
          {points[currentPoint].type === "text" && (
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
          )}
          {points[currentPoint].type === "text_and_image" && (
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
          )}
         
         {points[currentPoint].type === "video" && (
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
         )}
        </div>
      )}
        <button type="button" onClick={handleAddPoint}> + </button>
      </form>
  </>
  )
}

export default App
