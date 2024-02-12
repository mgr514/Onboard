import "./style.css"
import React, { useState, useEffect } from 'react';

//========================== TO DO ====================================

//1. Create a state for the current point viewed
  // Select a point from the list of points that you're looking at. It should be something like this:
  // First keep track of the current point we're viewing
    // const [currentPoint, setCurrentPoint] = useState(0);
// Grab that point for easier access
  // const point = points[currentPoint];
// Render that point so it's easy to see
  // <div>
    //   {point.text}
    //   {point.imageUrl}
  // </div>

function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState(localStorage.getItem('')); 
  const [points, setPoints] = useState([
    { 
      text: "",
      imageUrl: "https://media.sciencephoto.com/image/m5510541/800wm/M5510541.jpg"
    }
  ]);
  const [currentPoint, setCurrentPoint] = useState(0);

  //========================== FUNCTIONS =============================================

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  };

  const handleText = (index, e) => {
    const newText = e.target.value;
    setCurrentPoint(newText);
  };

  const handleAddPoint = () => {
  const newPoints = [...points, { text: "", imageUrl: "" }];
    setPoints(newPoints); 
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
          <select>
            id={`item${index}`}
            value={points[index]?.text || ''}
            onChange={(e) => handleText(index, e)}
            {points.map((point, i) => <option value={i}>{point.text}</option>)}
          </select>
        </div>

       {Array.from().map((_, index) => (  
        <div className="form-row" key={index}>
          <label htmlFor={`item${index}`}>Add Education Point</label>

          {points[index]?.text === "option2" && (
              <>
                <div className="form-row">
                {point.text}
                {point.imageUrl}
                </div>
              </>
            )}
        </div>
      ))}
        <button type="button" /*onClick={}*/> + </button>
      </form>
  </>
  )
}

export default App

