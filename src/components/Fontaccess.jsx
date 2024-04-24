import React, { useState, useEffect } from "react";

const FontSizeToggle = () => {
  const [fontSize, setFontSize] = useState("normal");

  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "normal" ? "100%" : fontSize === "large" ? "125%" : "150%";
  }, [fontSize]);

  return (
    <div className="space-x-2">
      <button
        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => setFontSize("normal")}
      >
        Normal Font
      </button>
      <button
        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => setFontSize("large")}
      >
        Large Font
      </button>
      <button
        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => setFontSize("x-large")}
      >
        Extra Large Font
      </button>
    </div>
  );
};

export default FontSizeToggle;
