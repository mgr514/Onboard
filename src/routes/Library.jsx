import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import FontSizeToggle from "../components/Fontaccess";

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
    setBooklets((prevBooklets) => [...prevBooklets, newBooklet]);
    navigate(`/booklet/${newId}`);
    //return updatedBooklets;
  };

  const handleDeleteBooklet = (idToDelete) => {
    setBooklets((prevBooklets) =>
      prevBooklets.filter((booklet) => booklet.id !== idToDelete)
    );
  };

  return (
    <div className="library min-h-screen bg-gray-100 dark:bg-black flex flex-col">
      <div className="p-4">
        <FontSizeToggle />
      </div>
      <div className="flex flex-grow">
        <div className="booklets flex flex-col w-full overflow-y-auto">
          {booklets.map((booklet, index) => (
            <div
              key={index}
              className="booklet mb-4 p-4 bg-white dark:bg-gray-800 rounded shadow flex items-center"
            >
              <div className="flex-grow flex items-center space-x-4">
                <div className="font-bold">{booklet.title}</div>
                <div className="flex space-x-2">
                  <Link
                    to={`/booklet/${booklet.id}?edit=true`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 text-sm rounded"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/patientview/${booklet.id}`}
                    state={{ booklet: booklet, isEditing: false }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteBooklet(booklet.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 flex justify-end items-end">
          <button
            onClick={handleCreateBooklet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Booklet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Library;
