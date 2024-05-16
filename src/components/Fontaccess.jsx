import React, { useState, useEffect } from "react";
import { TextAa } from "@phosphor-icons/react";

const FontSizeToggle = () => {
  const [fontSize, setFontSize] = useState("normal");

  useEffect(() => {
    document.documentElement.style.fontSize =
      fontSize === "normal" ? "100%" : fontSize === "large" ? "125%" : "150%";
  }, [fontSize]);

  const toggleFontSize = () => {
    setFontSize((prevSize) => {
      if (prevSize === "normal") return "large";
      if (prevSize === "large") return "x-large";
      return "normal";
    });
  };

  return (
    <div className="space-x-2">
      <button
        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={toggleFontSize}
      >
        <TextAa size={32} weight="thin" />
      </button>
    </div>
  );
};

export default FontSizeToggle;
