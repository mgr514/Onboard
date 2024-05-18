import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import FontSizeToggle from "../components/Fontaccess";
import Point from "../components/Point";
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

  // const renderFirstPointPreview = (point) => {
  //   if (!point || !point.type) {
  //     return (
  //       <div className="flex items-center justify-center w-full h-full text-center">
  //         Unknown point type
  //       </div>
  //     );
  //   }

  //   switch (point.type) {
  //     case "text":
  //       return (
  //         <div className="flex items-center justify-center w-full h-full text-center">
  //           {point.text || "No text available"}
  //         </div>
  //       );
  //     case "text_and_image":
  //       return point.imageUrl ? (
  //         <img
  //           src={point.imageUrl}
  //           alt="Preview"
  //           className="w-full h-full object-cover rounded-md"
  //           onError={(e) => (e.target.src = "path/to/placeholder-image.jpg")}
  //         />
  //       ) : (
  //         <div className="flex items-center justify-center w-full h-full text-center">
  //           Image not available
  //         </div>
  //       );
  //     case "video":
  //       const videoID = extractYouTubeVideoID(point.videoUrl);
  //       return videoID ? (
  //         <iframe
  //           width="100%"
  //           height="100%"
  //           src={`https://www.youtube.com/embed/${videoID}`}
  //           title="YouTube video player"
  //           className="rounded-md"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowFullScreen
  //         ></iframe>
  //       ) : (
  //         <div className="flex items-center justify-center w-full h-full text-center">
  //           Invalid YouTube URL
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="flex items-center justify-center w-full h-full text-center">
  //           Unknown point type
  //         </div>
  //       );
  //   }
  // };

  // const extractYouTubeVideoID = (url) => {
  //   const pattern =
  //     /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  //   const match = url.match(pattern);
  //   return match ? match[1] : null;
  // };

  const renderFirstPointPreview = (point) => {
    return point ? (
      <div className="w-full h-full overflow-hidden">
        <Point point={point} isEditing={false} />
      </div>
    ) : (
      <div className="flex items-center justify-center w-full h-full text-center">
        No points available
      </div>
    );
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
                <div className="font-bold mb-3 mt-2 text-center text-xl underline">
                  {booklet.title}
                </div>
                <div className="border-2 border-gray-400 w-40 h-40 flex flex-col items-center justify-start rounded-md overflow-hidden">
                  <div className="text-center font-semibold mt-1 mb-1">
                    Preview
                  </div>
                  <div className="flex items-center justify-center w-full h-full text-center">
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
