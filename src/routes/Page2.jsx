import React, { useState, useEffect } from "react";

function Page2() {
  const [data, setData] = useState();

  useEffect(() => {
    const data = localStorage.getItem("bookletData");
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 my-5">
        {title}
      </h1>
      <ul className="list-disc space-y-2 p-5">
        {points.map((point, index) => (
          <li key={index} className="text-gray-700 text-base">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page2;
