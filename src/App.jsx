import "./style.css"
import React, { useState, useEffect } from 'react';

function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState('localStorage.getItem'); 
  const [selectedItems, setSelectedItems] = useState([]); 
  const [dropdownCount, setDropdownCount] = useState(1);


  //========================== FUNCTIONS =============================================
  //this is a hook, is that different from a typical function or is a hook a type of function? confused on language.
  useEffect(() => {
    const storedTitle = ('');
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
  const newSelectedItems = [...selectedItems];
  newSelectedItems[index] = e.target.value;
  setSelectedItems(newSelectedItems);
};



  const handleAddDropdown = () => {
    setDropdownCount(dropdownCount + 1);
    console.log('Button Clicked!')
  };
  
//============================= BUILD FORM =====================================
  return <>
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
            value={selectedItems[index] || ''}
            onChange={(e) => handleSelectChange(index, e)}>
            {/*Add education options here */}
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      ))}
        <button type="button" onClick={handleAddDropdown}> + </button>
      </form>
  </>
}

export default App