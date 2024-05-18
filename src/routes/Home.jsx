import React from "react";
import { Link } from "react-router-dom";
import FontSizeToggle from "../components/Fontaccess";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <FontSizeToggle />
        <h1 className="text-4xl font-extrabold text-center mt-10 mb-10 dark:text-white">
          Welcome to MedonBoard
        </h1>
        <div className="flex justify-center mb-12">
          <Link
            to="/library"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Go to Library
          </Link>
        </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">About Me:</h2>
          <p className="text-lg mb-6">
            Hi! My name is Michaela and I'm from St. John's, Newfoundland. I am
            a Get Coding student, but I also have an educational background in
            nursing and business administration. I currently work as a nurse in
            a CVICU caring for patients post heart surgery.
          </p>
          <img
            src="URL_TO_YOUR_IMAGE"
            alt="IMAGE HERE"
            className="mx-auto rounded-full shadow-lg w-32 h-32 object-cover"
          />
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              What is this app?
            </h2>
            <p className="text-md">
              This Get Coding project is designed as a patient education tool,
              facilitating the onboarding of patients for various medical
              procedures.
            </p>
            <img
              src="URL"
              alt="IMAGE HERE"
              className="mt-4 w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-12 md:mt-0">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Why this app?
            </h2>
            <p className="text-md">
              One of my pain points is in how we provide patient education.
              Addressing a major gap in patient education, this app provides
              customizable booklets to aid understanding across literacy levels
              and other accessibility barriers.
            </p>
            <img
              src="URL"
              alt="IMAGE HERE"
              className="mt-4 w-full rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-6">Solution:</h2>
          <p className="text-lg">
            Using React and Tailwind, this app enables educators to create
            versatile, media-rich educational booklets stored in local storage
            for easy editing and reuse.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
