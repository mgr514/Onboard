import "./style.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState } from "react";

//ISSUES
//1. can only enter one letter at a time
//2. what is going on with the hash router?
//3. since hash router issue unable to confirm youtube video function

function mod(n, m) {
  return ((n % m) + m) % m;
}

function TextPoint({ point, isEditing, onChange }) {
  return isEditing ? (
    <input
      type="text"
      placeholder="Enter text"
      value={point.text}
      onChange={onChange}
    />
  ) : (
    <div>{point.text}</div>
  );
}

function ImagePoint({ point, isEditing, onChange }) {
  return (
    <>
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder="Enter image URL"
            value={point.imageUrl}
            onChange={(e) => onChange(e, "imageUrl")}
          />
          <input
            type="text"
            placeholder="Enter text"
            value={point.text}
            onChange={(e) => onChange(e, "text")}
          />
        </>
      ) : (
        <>
          <div>{point.text}</div>
          {point.imageUrl && (
            <img
              src={point.imageUrl}
              alt="Education Point Image"
              style={{ maxWidth: "480px", maxHeight: "250px" }}
            />
          )}
        </>
      )}
    </>
  );
}

function VideoPoint({ point, isEditing, onChange }) {
  return isEditing ? (
    <input
      type="text"
      placeholder="Enter video URL"
      value={point.videoUrl}
      onChange={(e) => onChange(e, "videoUrl")}
    />
  ) : (
    <>
      <div>{point.text}</div>
      <video controls>
        <source src={point.videoUrl} type="video/mp4" />
      </video>
    </>
  );
}

function extractYouTubeVideoID(url) {
  const pattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = url.match(pattern);
  return match ? match[1] : null;
}

const videoURL = "";
const videoID = extractYouTubeVideoID(videoURL);
console.log(videoID);

function App() {
  const [formTitle, setFormTitle] = useState(
    localStorage.getItem("formTitle") || ""
  );
  const [pointType, setPointType] = useState("text");
  const [points, setPoints] = useLocalStorage("points", []);

  const [currentPoint, setCurrentPoint] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle);
    localStorage.setItem("formTitle", newTitle);
  };

  const handleNextPoint = () => {
    if (points.length > 1) {
      setCurrentPoint((prevPoint) => mod(prevPoint + 1, points.length));
    }
  };

  const handlePreviousPoint = () => {
    if (points.length > 1) {
      setCurrentPoint((prevPoint) => mod(prevPoint - 1, points.length));
    }
  };

  const handleAddPoint = () => {
    const newPoint = { type: pointType, text: "", imageUrl: "", videoUrl: "" };
    const newPoints = [...points, newPoint];
    setPoints(newPoints);
    setCurrentPoint(newPoints.length - 1);
    setIsEditing(true);
    setFormTitle("");
  };

  const handleToggleEditing = () => {
    setIsEditing((editing) => !editing);
  };

  const handleDelete = () => {
    setPoints((currentPoints) => {
      const newPoints = currentPoints.filter(
        (_, index) => index !== currentPoint
      );

      if (newPoints.length === 0) {
        setCurrentPoint(0);
        return newPoints;
      } else {
        const newCurrentPoint =
          (currentPoint === 0 ? 0 : currentPoint - 1) % newPoints.length;
        setCurrentPoint(newCurrentPoint);

        return newPoints;
      }
    });
  };

  function Point() {
    if (currentPoint < 0 || currentPoint >= points.length);

    const point = points[currentPoint];

    const onChange = (e, key) => {
      const updatedPoints = [...points];
      updatedPoints[currentPoint][key] = e.target.value;
      setPoints(updatedPoints);
    };

    switch (point.type) {
      case "text":
        return (
          <TextPoint
            point={points[currentPoint]}
            isEditing={isEditing}
            onChange={(e) => onChange(e, "text")}
          />
        );

      case "text_and_image":
        return (
          <ImagePoint
            point={points[currentPoint]}
            isEditing={isEditing}
            onChange={(e, key) => onChange(e, key)}
          />
        );

      case "video":
        return (
          <VideoPoint
            point={points[currentPoint]}
            isEditing={isEditing}
            onChange={(e) => onChange(e, "videoUrl")}
          />
        );

      // default:
      //   throw new Error(`Unrecognized Type: ${currentPoint.type}`);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="new-item mx-auto max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1>Patient Education</h1>

          <div className="form-row py-2">
            <label htmlFor="formTitle"></label>
            <input
              type="text"
              className="text-lg font-bold border border-gray-900 border-solid focus:outline-none rounded p-1"
              id="formTitle"
              placeholder="Enter Education Title"
              value={formTitle}
              onChange={handleFormTitleChange}
            />
          </div>

          <div className="form-row py-2">
            <label htmlFor="item" className="mr-2">
              Add Education Point:
            </label>

            <select
              id="educationPoint"
              className="py-1 border border-gray-300 border-solid"
              value={pointType}
              onChange={(e) => setPointType(e.target.value)}
            >
              <option value="text">Text</option>
              <option value="text_and_image">Text and Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {currentPoint !== null && points[currentPoint] && (
            <div className="form-row py-4 border border-gray-300 rounded mb-4">
              <Point />
            </div>
          )}

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-1"
            onClick={handleAddPoint}
          >
            +
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-4"
            onClick={handleToggleEditing}
          >
            {isEditing ? "Finish Editing" : "Edit"}
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 mr-1"
            onClick={handlePreviousPoint}
          >
            👈
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2"
            onClick={handleNextPoint}
          >
            👉
          </button>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold px-4 rounded py-2 ml-4"
            onClick={handleDelete}
          >
            🗑
          </button>
        </form>
      </div>
    </>
  );
}

export default App;

{
  /* <div className="form-row py-4 border border-gray-300 rounded mb-4"> */
}

{
  /* //       className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none"
                //       type="text"
                //       placeholder="Enter text"
                //       value={points[currentPoint].text}
                //       onChange={(e) => { */
}
{
  /* //         const newPoints = [...points];
                //         newPoints[currentPoint].text = e.target.value;
                //         setPoints(newPoints);
                //       }}
                //     />
                //   ) : (
                //     <div>{points[currentPoint].text}</div>
                //   )}
                // </> */
}

{
  /* //           type="text"
              //           className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none"
              //           placeholder="Enter image URL"
              //           value={points[currentPoint].imageUrl}
              //           onChange={(e) => { */
}
{
  /* //           
              //           }}
              //         />

}
{
  /* //           type="text"
              //           className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none"
              //           placeholder="Enter text"
              //           value={points[currentPoint].text}
              //           onChange={(e) => { */
}
{
  /* //             const newPoints = [...points];
              //             newPoints[currentPoint].text = e.target.value;
              //             setPoints(newPoints);
              //           }}
              //         />
              //       </>
              //     ) : (
              //       <>
              //         <div>{points[currentPoint].text}</div>
              //         {points[currentPoint].imageUrl && ( */
}
{
  /* //           <img */
}
{
  /* //             src={points[currentPoint].imageUrl}
              //             alt="Education Point Image"
              //             width="480"
              //             height="360"
              //             max-height="250"
              //             margin-inline="auto"
              //           />
              //         )}
              //       </>
              //     )}
              //   </>

              //       <>
          //         {isEditing ? ( */
}
{
  /* //           <input */
}
{
  /* //             type="text"
          //             className="bg-white text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-2"
          //             placeholder="Enter video URL"
          //             value={points[currentPoint]?.videoUrl || ""}
          //             onChange={(e) => { */
}
{
  //             }}
  //           />
  //         ) : (
  //           <div>
  //             {points[currentPoint].text}
  //             <video width="480" height="360" controls>
  //               <source */
}
{
  /* //                 src={points[currentPoint].videoUrl}
          //                 type="video/mp4"
          //               />
          //             </video>
          //           </div>
          //         )}
          //       </>
          //     )}
          //   </div> */

  {
    /* {currentPoint !== null && points[currentPoint] && (
            <div className="form-row py-4 border border-gray-300 rounded mb-4">
              {points[currentPoint].type === "text" && (
                <TextPoint
                  point={points[currentPoint]}
                  isEditing={isEditing}
                  onChange={(newValue, point, key) => {
                    const newPoints = [...points];
                    newPoints[currentPoint].text = e.target.value;
                    setPoints(newPoints);
                  }}
                />
              )}

              {points[currentPoint].type === "text_and_image" && (
                <ImagePoint
                  point={points[currentPoint]}
                  isEditing={isEditing}
                  onChange={(newValue, point, key) => {
                    const newPoints = [...points];
                    newPoints[currentPoint].imageUrl = e.target.value;
                    setPoints(newPoints);
                  }}
                />
              )}

              {points[currentPoint].type === "video" && (
                <VideoPoint
                  point={points[currentPoint]}
                  isEditing={isEditing}
                  onChange={(newValue, point, key) => {
                    const newPoints = [...points];
                    newPoints[currentPoint].videoUrl = e.target.value;
                    setPoints(newPoints);
                  }}
                />
              )}
            </div>
          )} */
  }
}
