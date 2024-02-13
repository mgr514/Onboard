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
  const [formTitle, setFormTitle] = useState(localStorage.getItem('formTitle')); 
  const [points, setPoints] = useState([
    { 
      text: "",
      imageUrl: ""
    }
  ]);
  //const [currentPoint, setCurrentPoint] = useState(0);

  //========================== FUNCTIONS =============================================

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  };

  const handleTextChange = (index, e) => {
    const newPoints = [...points]
    newPoints[index].text = e.target.value
    setPoints(newPoints);
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
          <input>
            id={`item${index}`}
            value={points[index]?.text || ''}
            onChange={(e) => handleText(index, e)}
            {points.map((point, index) => <option value={i}>{point.text}</option>)}
          </input>
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
        <button type="button" onClick={handleAddPoint}> + </button>
      </form>
  </>
  )
}

export default App
