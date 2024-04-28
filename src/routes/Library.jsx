import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

function Library() {
  const [booklets, setBooklets] = useState([]);

  useLocalStorage(() => {
    const storedBooklets = JSON.parse(localStorage.getItem("booklets") || "[]");
    setBooklets(storedBooklets);
  }, []);

  return (
    <div className="library flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black dark: text-white">
      <div className="">
        <Link
          to="/booklet"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Booklet
        </Link>
      </div>
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
