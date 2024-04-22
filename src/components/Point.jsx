import React, { useState, useEffect } from "react";

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
  function extractYouTubeVideoID(url) {
    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
    const match = url.match(pattern);
    return match ? match[1] : null;
  }
  const videoID = extractYouTubeVideoID(point.videoUrl);

  return isEditing ? (
    <input
      type="text"
      placeholder="Enter Youtube URL"
      value={point.videoUrl}
      onChange={(e) => onChange(e, "videoUrl")}
    />
  ) : (
    <>
      <div>{point.text}</div>
      {videoID ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoID}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Invalid YouTube URL.</p>
      )}
    </>
  );
}

function Point({ points, currentPoint, setPoints, isEditing }) {
  if (currentPoint < 0 || currentPoint >= points.length) {
    return <div>Invalid point index</div>;
  }

  const point = points[currentPoint];

  if (!point || typeof point.type !== "string") {
    console.error("Invalid or undefined point type");
    return <div>Click add to create new point</div>;
  }

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
    default:
      console.error(`Unrecognized Point Type: ${point.type}`);
      return <div>Unsupported point type</div>;
  }
}
export default Point;
