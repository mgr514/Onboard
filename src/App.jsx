import "./style.css"
import React, { useState, useEffect } from 'react';
//import SeparatePage from './SeparatePage';

//TO DO
// render option 2 text and image as page
  //set-up react router
  //create file for page and import file?? (ex above)

function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState('localStorage.getItem'); 
  const [selectedItems, setSelectedItems] = useState([
    { 
      text: "",
      imageUrl: "https://media.sciencephoto.com/image/m5510541/800wm/M5510541.jpg"
    }
  ])
  const [dropdownCount, setDropdownCount] = useState(1);
 


  //========================== FUNCTIONS =============================================
  useEffect(() => {
    const storedTitle = localStorage.getItem('formTitle');//('');
    if (storedTitle) {
      setFormTitle(storedTitle);
    }
  }, []);


  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  }

const handleSelectChange= (index, e) => {
  const value = e.target.value;
  console.log('Option selected:', value);
    setSelectedItems(prevItems => ({
      ...prevItems,
      [index]: { 
        text: value,
        imageUrl: value === "option2" ? "https://media.sciencephoto.com/image/m5510541/800wm/M5510541.jpg" : undefined
      }
    }));
  };

  const handleTextboxChange = (index, e) => {
    const newText = e.target.value;
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [index]: {
        ...prevItems[index],
        textbox: newText
      }
    }));
  };

  const handleAddDropdown = () => {
    setDropdownCount(dropdownCount + 1);
    console.log('Button Clicked!')
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

       {Array.from({ length: dropdownCount }).map((_, index) => (  
        <div className="form-row" key={index}>
          <label htmlFor={`item${index}`}>Add Education Point</label>
          <select 
            id={`item${index}`}
            value={selectedItems[index]?.text || ''}
            onChange={(e) => handleSelectChange(index, e)}>
            {/*Add education options here */}
            <option value="option1">Dietary Guidelines</option> {/*text*/}
            <option value="option2"> Incision Care</option> {/*text and image*/}
            <option value="option3">Exercise Guidelines</option> {/*text and video*/}
          </select>
          {selectedItems[index]?.text === "option2" && (
              <>
                <div className="form-row">
                  <label htmlFor={`textbox${index}`}>Textbox:</label>
                  <input 
                  type="text" 
                  id={`textbox${index}`} 
                  placeholder="Incision placement and care."
                  onChange={(e) => handleTextboxChange(index, e)} />
                </div>
                <div className="form-row">
                  <img
                    src={selectedItems[index]?.imageUrl}
                    alt="Predefined Image"
                  />
                </div>
              </>
            )}
        </div>
      ))}
        <button type="button" onClick={handleAddDropdown}> + </button>
      </form>
  </>
  )
}

export default App