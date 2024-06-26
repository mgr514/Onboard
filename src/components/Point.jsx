//Text input boxes need to be bigger, currently too narrow. Want more vertical space, maybe a scroll function if lots of tetxt
//need more space between box border and start/end of text.
import React from "react";

function TextPoint({ point, isEditing, onChange }) {
  return isEditing ? (
    <div className="h-full">
      <input
        type="text"
        className="w-full h-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text"
        value={point.text || ""}
        onChange={(e) => onChange(e.target.value, "text")}
      />
    </div>
  ) : (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">{point.text}</div>
    </div>
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
            value={point.imageUrl || ""}
            onChange={(e) => onChange(e.target.value, "imageUrl")}
            className="mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <input
            type="text"
            placeholder="Enter text"
            value={point.text || ""}
            onChange={(e) => onChange(e.target.value, "text")}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </>
      ) : (
        <div className="flex flex-col items-center">
          {point.imageUrl && (
            <img
              src={point.imageUrl}
              alt="Education Point Image"
              className="max-w-full max-h-96 mb-4"
            />
          )}
          <div className="text-center">{point.text}</div>
        </div>
      )}
    </>
  );
}

function VideoPoint({ point, isEditing, onChange }) {
  const videoID = extractYouTubeVideoID(point.videoUrl);

  function extractYouTubeVideoID(url) {
    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
    const match = url.match(pattern);
    return match ? match[1] : null;
  }

  return isEditing ? (
    <input
      type="text"
      placeholder="Enter Youtube URL"
      value={point.videoUrl || ""}
      onChange={(e) => onChange(e.target.value, "videoUrl")}
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

function Point({ point, isEditing, onChangeProp }) {
  if (!point || typeof point.type !== "string") {
    console.error("Invalid or undefined point type");
    return <div>Click add to create new point</div>;
  }

  const onChange = (value, key) => {
    onChangeProp(value, key);
  };

  switch (point.type) {
    case "text":
      return (
        <TextPoint point={point} isEditing={isEditing} onChange={onChange} />
      );

    case "text_and_image":
      return (
        <ImagePoint point={point} isEditing={isEditing} onChange={onChange} />
      );

    case "video":
      return (
        <VideoPoint point={point} isEditing={isEditing} onChange={onChange} />
      );
    default:
      console.error(`Unrecognized Point Type: ${point.type}`);
      return <div>Unsupported point type</div>;
  }
}
export default Point;
