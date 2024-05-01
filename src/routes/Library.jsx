import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

function Library() {
  const [booklets, setBooklets] = useLocalStorage("booklets", []);

  useLocalStorage(() => {
    const storedBooklets = localStorage.getItem("booklets") || "[]";
    setBooklets(JSON.parse(storedBooklets));
  }, []);

  return (
    <div className="library flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black dark: text-white">
      <div className="mb-4">
        <Link
          to={{
            pathname: "/booklet",
            state: { addBooklet: setBooklets },
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Booklet
        </Link>
      </div>
      {booklets.map((booklet, index) => (
        <div
          key={index}
          className="booklet m-4 p-4 bg-white dark:bg-gray-800 rounded shadow"
        >
          <div className="font-bold">{booklet.formTitle}</div>
          <Link
            to={`/booklet/${index}`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
          >
            Edit
          </Link>
          <Link
            to={`/booklet/${index}/view`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Library;
