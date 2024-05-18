import React from "react";
import { Link } from "react-router-dom";
import FontSizeToggle from "../components/Fontaccess";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FontSizeToggle />
        <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 mb-8 dark:text-white">
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
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About Me:
          </h2>
          <p className="text-base text-gray-700 dark:text-white">
            Hi! My name is Michaela and I'm from St. John's, Newfoundland. I am
            a Get Coding student, but I also have an educational background in
            nursing and business administration. I currently work as a nurse in
            a CVICU caring for patient post heart surgery.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What is this app?
          </h2>
          <p className="text-base text-gray-700 dark:text-white">
            This is a Get Coding project that is meant to be a patient education
            tool. It onboards patients for any medical
            procedure/surgery/recovery they may experience.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Issue:
          </h2>
          <p className="text-base text-gray-700 dark:text-white">
            One of my pain points in my role as a nurse is that patient
            education is not adequate. We currently provide patients paper
            booklets in English and that's the only resource we provide. The
            issue is that many patients do not have the literacy level to
            understand or even read the booklets we provide, as well as patients
            who have poor vision.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Solution:
          </h2>
          <p className="text-base text-gray-700 dark:text-white">
            Using Tailwind and React, I have created an app that allows an
            educator/staff member to create booklets using multiple media types.
            These booklets will store in local storage for recall and editing.
            The multimedia options allow an educator to maximize patient
            education by creating resources that can benefit all learning needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
