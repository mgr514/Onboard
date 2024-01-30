import "./style.css"
import React, { useState, useEffect } from 'react';

function App() {
  // ============================ CONST =======================================
  const [formTitle, setFormTitle] = useState('');   // State to store the form title
  const [selectedItem, setSelectedItem] = useState(''); //State to store selected list item


  //========================== FUNCTIONS =============================================
  //load form title from local storage -> see notes below for useEffect if need refresher
  //this is a hook, is that different from a typical function or is a hook a type of function? confused on language.
  useEffect(() => {
    const storedTitle = localStorage.getItem('formTitle');
    if (storedTitle) {
      setFormTitle(storedTitle);
    }
  }, []);

  //Function that handles form title change and saves to local storage
  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle)
    localStorage.setItem('formTitle', newTitle)
  }


//SELECTION HANDLER
const handleSelectChange= (event) => {
  setSelectedItem(event.target.value);
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


//=====================NOTES===============================

// const handleAddDropdown = () => {
//   setSelectedItems([...selectedItems, '']); 

//setSelectedItems is function provided by useState hook to update state variable selectedItems
//...selectedItems creates new array with elements of existing array and adds empty string '' to the end

//USE EFFECT
//hook called after component is rendered
//[] is a dependency that means it runs once after the initial render
//useEffecr allows you to perform side effects in functional components, side effects
//include dtata fetching, manual DOM manipulations, subscriptions, etc
//it takes 2 arguments: function containing code for side effect, and optional array of dependencies
//in context of local storage:
//1 loading data on mount (initialize state, load from API, retriece from local storage)
//2 persisting data, when a user interacts with component and changes data, data may sruvive page relaods