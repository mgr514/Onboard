import React from "react";
import { Link } from "react-router-dom";
import FontSizeToggle from "../components/Fontaccess";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black dark: text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-black dark:text-white">
        <FontSizeToggle />
        <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 mb-5 dark:text-white">
          Welcome to MedonBoard
        </h1>
        <div className="flex justify-center mb-8">
          <Link
            to="/library"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Library
          </Link>
        </div>
        <p className="text-base text-gray-700 mb-4 dark:text-white">
          I currently work as a nurse in a hospital. Patients requiring
          education about procedures, surgeries, and/or recovery are provided
          paper booklets.
        </p>
        <p className="text-base text-gray-700 mb-4 dark:text-white">
          Unfortunately the standardized booklet is not accessible for all
          patients. Patients have increasing complex needs that a standard
          booklet does not address, as well some patients are illiterate, blind,
          or non-english speaking.{" "}
        </p>
        <p className="text-base text-gray-700 mb-4 dark:text-white">
          This project is a patient education tool to be used when onboarding a
          patient when an individualized health plan is needed. Editable fields
          allow the educator to change and update any information for
          individualized patient education, allowing us to easily address each
          patient's needs.
        </p>
        <p className="text-base text-gray-700 mb-4 dark:text-white">
          Using Tailwind and React, I have created an app that allows an
          educator to create a form title and add education points that will
          store in local storage. The multimedia options allow an educator to
          maximize patient education by allowing an educator to address the
          multiple learning styles and needs of each person. Each form created
          is saved in local storage as a booklet in a library that can be viewed
          or edited at any time.
        </p>
      </div>
    </div>
  );
}

export default Home;
