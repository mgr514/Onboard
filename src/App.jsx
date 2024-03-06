import "./style.css"
import React, { useState } from 'react';

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
  const [currentPoint, setCurrentPoint] = useState(0);

  //========================== FUNCTIONS =============================================

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  };

  const handlePointSelect = (index, e) => {
    const newPoints = [...points]
    newPoints[index].text = e.target.value
    setPoints(newPoints);
    setCurrentPoint(index);
  };

  const handleAddPoint = () => {
  const newPoints = [...points, { text: "", imageUrl: "" }];
    setPoints(newPoints); 
  };
const titles = Array.from (Array(points.length), (_,i) => `${i+ 1}`)
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
          <select id="educationPoint" onChange={(e) => handlePointSelect(parseInt(e.target.value, e))}>
            {/* {points.map((point, index) => (
              <option key={index} value={index}>
                {point.text}
                {point.imageUrl}
              </option> */}
            {titles.map((title, index) => (
            <option key={index} value={index}>
              {title}
            </option>
            ))}
          </select>
        </div>

        {currentPoint !== null && (
        <div className="form-row">
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
        </div>
      )}
        <button type="button" onClick={handleAddPoint}> + </button>
      </form>
  </>
  )
}

export default App
