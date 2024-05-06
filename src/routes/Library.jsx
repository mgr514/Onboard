import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

function Library() {
  const [booklets, setBooklets] = useLocalStorage("booklets", []);
  const navigate = useNavigate();

  useLocalStorage(() => {
    const storedBooklets = localStorage.getItem("booklets") || "[]";
    setBooklets(JSON.parse(storedBooklets));
  }, []);

  const handleCreateBooklet = () => {
    const newId =
      booklets.reduce((maxId, booklet) => Math.max(maxId, booklet.id), 0) + 1; //chatGPt...what is this???
    const newBooklet = {
      title: "",
      points: [],
      id: newId,
    };
    setBooklets((prevBooklets) => {
      const updatedBooklets = [...prevBooklets, newBooklet];
      navigate(`/booklet/${newId}`);
      return updatedBooklets;
    });
  };

  const handleDeleteBooklet = (index) => {
    setBooklets((prevBooklets) => prevBooklets.filter((_, i) => i !== index));
  };

  return (
    <div className="library flex min-h-screen bg-gray-100 dark:bg-black">
      <div className="booklets flex flex-col w-1/3 p-4 overflow-y-auto">
        {booklets.map((booklet, index) => (
          <div
            key={index}
            className="booklet mb-4 p-4 bg-white dark:bg-gray-800 rounded shadow"
          >
            <div className="font-bold mb-2">{booklet.title}</div>
            <div className="flex space-x-2">
              <Link
                to={`/booklet/${index}`}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 text-sm rounded"
              >
                Edit
              </Link>
              <Link
                to={`/booklet/${index}/PatientView`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
              >
                View
              </Link>
              <button
                onClick={() => handleDeleteBooklet(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-sm rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex justify-end items-end p-4">
        <button
          onClick={handleCreateBooklet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Booklet
        </button>
      </div>
    </div>
  );
}

export default Library;
