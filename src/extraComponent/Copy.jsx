import React from "react";
import { useNavigate } from "react-router-dom";
import blur from "../assets/Blurred.png"; // background image
import copy from "../assets/copyicon.svg"; // copy icon

const Copy = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src={blur}
        alt="Blur Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Copy Icon Box */}
        <div className="p-5 bg-[#48407B] rounded-2xl shadow-lg flex flex-col items-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center">
            <img src={copy} alt="Copy Icon" className=" " />
          </div>

          {/* Text */}
          <p className="mt-1 text-[#40FF54] text-[15px] font-medium">
            Link Copied
          </p>
        </div>
      </div>

      {/* Button (fixed at bottom center) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full ">
        <button
          onClick={() => navigate("/home")}
          className="   text-white w-10/12 h-[50px] text-sm mx-auto cursor-pointer shadow-lg hover:opacity-90 transition"
          style={{
            borderRadius: "9px",
            background: "#4630E5",
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Copy;
