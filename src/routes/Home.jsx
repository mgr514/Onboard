import React from "react";

function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mt-10 mb-5">
        Welcome to the Home Page
      </h1>
      <p className="text-base text-gray-700 mb-4">
        I currently work as a nurse in a hospital. Patients requiring education
        about procedures, surgeries, and/or recovery are provided paper
        booklets.
      </p>
      <p className="text-base text-gray-700 mb-4">
        Unfortunately the standardized booklet is not accessible for all
        patients. Patients have increasing complex needs that a booklet cannot
        address, as well some patients are illiterate, blind, or non-english
        speaking.{" "}
      </p>
      <p className="text-base text-gray-700 mb-4">
        This project is a patient education tool to be used when onboarding a
        patient with their health plan is needed. Editable fields allow the
        educator to change and update any information for individualized patient
        education, allowing us to easily address individual and complex needs.
      </p>
    </div>
  );
}

export default Home;
