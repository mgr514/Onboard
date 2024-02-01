import "./style.css"
import React, { useState, useEffect } from 'react';

function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState('localStorage.getItem'); 
  const [selectedItem, setSelectedItem] = useState(''); 


  //========================== FUNCTIONS =============================================
  //this is a hook, is that different from a typical function or is a hook a type of function? confused on language.
  useEffect(() => {
    const storedTitle = ('formTitle');
    if (storedTitle) {
      setFormTitle(storedTitle);
    }
  }, []);


  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  }


const handleSelectChange= (e) => {
  setSelectedItem(e.target.value);
};


//ADD DROP DOWN HANDLER ->troubleshoot required, does not currently add drop down like required
  const handleAddDropdown = () => {
    setSelectedItems([...selectedItems, '']); 
  };
  //currently only allows user to add new item to drop down menu, not actually add a new drop down menu?

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

        <div className="form-row">
          <label htmlFor="item">Add Education Point</label>
          <select id="item" value={selectedItem} onChange={handleSelectChange}>
            {/*Add education options here */}
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <button type="button" onClick={handleAddDropdown}> + </button>
      </form>
  </>
}

export default App