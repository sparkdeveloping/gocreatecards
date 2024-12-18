"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Home() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [step, setStep] = useState(1); // To manage steps
  const [currentYear] = useState(new Date().getFullYear()); // Auto-fetch current year

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
      setStep(2); // Move to the form step
    }
  };

  const handleNext = () => {
    if (step === 2 && (!name || !role)) {
      alert("Please fill in all details before proceeding.");
      return;
    }
    setStep(step + 1); // Go to the next step
  };

  const handleBack = () => {
    setStep(step - 1); // Go back to the previous step
  };

  const handlePrint = () => {
    window.print();
  };

  const getBackgroundImage = () => {
    switch (role) {
      case "Student Tech":
        return "/background_blue.svg";
      case "Member":
        return "/background_yellow.svg";
      default:
        return "/background.svg";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 space-y-4">
      {/* Step 1: Take Photo */}
      {step === 1 && (
        <div
          className="relative bg-white rounded-lg shadow-lg w-[2.175in] h-[3.325in] flex items-center justify-center"
          style={{
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full bg-gray-200 rounded">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                width: 300,
                height: 300,
                facingMode: "user",
              }}
            />
          </div>
          <button
            onClick={capturePhoto}
            className="absolute bottom-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Take Photo
          </button>
        </div>
      )}

      {/* Step 2: Form */}
      {step === 2 && (
        <div>
          <div
            className="relative bg-white rounded-lg shadow-lg w-[2.175in] h-[3.325in]"
            style={{
              backgroundImage: `url(${getBackgroundImage()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={photo}
              alt="Captured"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="w-full max-w-md mt-4 space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded text-sm"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
            >
              <option value="">Select Role</option>
              <option value="Staff">Staff</option>
              <option value="Student Tech">Student Tech</option>
              <option value="Member">Member</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Final Preview */}
      {step === 3 && (
        <div
          className="relative bg-white rounded-lg shadow-lg w-[2.175in] h-[3.325in] flex flex-col justify-start pl-4 print:card"
          style={{
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Rounded square photo positioned halfway */}
          <div className="w-28 h-28 overflow-hidden rounded-2xl border-4 border-white mt-12">
            <img
              src={photo}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Details */}
          <div className="w-full text-left text-sm mt-6 space-y-1">
            <div className="font-bold">{name || "Name Here"}</div>
            <div
              className={`w-20 h-1 mt-1 rounded-full ${
                role === "Student Tech"
                  ? "bg-blue-500"
                  : role === "Member"
                  ? "bg-yellow-500"
                  : "bg-black"
              }`}
              aria-hidden="true"
            ></div>
            <div className="uppercase font-semibold">{role || "ROLE HERE"}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              Since {currentYear}
            </div>
          </div>

          {/* Logo */}
          <div className="absolute bottom-4 right-4 print:bottom-2 print:right-2">
            <img
              src="/GCVertical_ColorAndBlack.svg"
              alt="GoCreate Logo"
              className="w-10 h-auto print:w-8"
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Print Card
          </button>
        )}
      </div>
    </div>
  );
}
