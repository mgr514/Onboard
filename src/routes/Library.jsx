import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import FontSizeToggle from "../components/Fontaccess";
import { PencilSimple, Trash, PlusCircle, House } from "@phosphor-icons/react";

function Library() {
  const [booklets, setBooklets] = useLocalStorage("booklets", []);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooklets = localStorage.getItem("booklets") || "[]";
    setBooklets(JSON.parse(storedBooklets));
  }, []);

  const handleCreateBooklet = () => {
    const newId =
      booklets.reduce((maxId, booklet) => Math.max(maxId, booklet.id), 0) + 1;
    const newBooklet = {
      title: "",
      points: [],
      id: newId,
    };
    setBooklets((prevBooklets) => [...prevBooklets, newBooklet]);
    navigate(`/booklet/${newId}`);
  };

  const handleDeleteBooklet = (idToDelete) => {
    setBooklets((prevBooklets) =>
      prevBooklets.filter((booklet) => booklet.id !== idToDelete)
    );
  };

  const renderFirstPointPreview = (point) => {
    switch (point.type) {
      case "text":
        return (
          <div className="border-2 border-gray-400 p-2 w-full h-full flex items-center justify-center rounded-md">
            {point.text}
          </div>
        );
      case "image":
        return (
          <img
            src={point.imageUrl}
            alt="Preview"
            className="border-2 border-gray-400 w-full h-full object-cover rounded-md"
          />
        );
      case "video":
        return (
          <video
            className="border-2 border-gray-400 w-full h-full rounded-md"
            controls
          >
            <source src={point.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return (
          <div className="border-2 border-gray-400 p-2 w-full h-full flex items-center justify-center rounded-md">
            Unknown point type
          </div>
        );
    }
  };

  return (
    <div className="library min-h-screen bg-gray-100 dark:bg-black flex flex-col">
      <div className="p-4 flex justify-start space-x-2">
        <Link
          to="/"
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <House size={32} weight="thin" />
        </Link>
        <FontSizeToggle />
      </div>
      <div className="flex flex-grow">
        <div className="booklets flex flex-wrap justify-center w-full overflow-y-auto">
          {booklets.map((booklet, index) => (
            <div
              key={index}
              className="booklet m-4 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col justify-between relative border-2 border-blue-500"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/patientview/${booklet.id}`, {
                  state: { booklet, isEditing: false },
                })
              }
            >
              <div className="flex justify-end space-x-2 absolute top-2 right-2 mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/booklet/${booklet.id}?edit=true`, {
                      state: { booklet, isEditing: true },
                    });
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 text-sm rounded"
                >
                  <PencilSimple size={24} weight="thin" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBooklet(booklet.id);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-sm rounded"
                >
                  <Trash size={24} weight="thin" />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-grow mt-2">
                <div className="font-bold mb-2 mt-8 text-center text-xl underline">
                  {booklet.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center w-full h-full flex items-center justify-center">
                  <div className="border-2 border-gray-400 w-40 h-40 flex items-center justify-center rounded-md">
                    {booklet.points.length > 0
                      ? renderFirstPointPreview(booklet.points[0])
                      : "No points available"}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleCreateBooklet}
            className="booklet m-4 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-500"
          >
            <PlusCircle size={48} weight="thin" className="text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Library;
