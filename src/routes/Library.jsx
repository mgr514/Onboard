import React, { useState, useEffect } from "react";

function Library() {
  const [booklets, setBooklets] = useState([]);

  useEffect(() => {
    const storedBooklets = JSON.parse(localStorage.getItem("booklets") || "[]");
    setBooklets(storedBooklets);
  }, []);

  return (
    <div className="library flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black dark: text-white">
      {booklets.map((booklet, index) => (
        <div key={index} className="booklet">
          <div>{booklet.formTitle}</div>
          <button onClick={() => `/booklet/${index}`}>Edit</button>
          <button onClick={() => `/booklet/${index}/view`}>View</button>
        </div>
      ))}
    </div>
  );
}

export default Library;
