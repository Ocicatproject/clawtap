import React from "react";

const Warning = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5">

      <div className="max-w-md w-full bg-[#111] border border-red-600 rounded-2xl p-8 text-center shadow-2xl">


        {/* Warning Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-red-600/20 p-5 rounded-full">

            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.3 2.9L1.8 17a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 2.9a2 2 0 0 0-3.4 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>

          </div>
        </div>



        <h1 className="text-3xl font-bold text-red-500 mb-3">
          SECURITY ALERT
        </h1>


        <p className="text-red-400 font-semibold mb-5">
          Unauthorized Developer Access Detected
        </p>



        <p className="text-gray-300 leading-relaxed mb-6">
          Our security system has detected an attempt to
          access protected developer tools.
          Any attempt to modify, bypass, or manipulate
          this platform is strictly prohibited.
        </p>



        <div className="bg-red-950/40 border border-red-800 rounded-xl p-5 mb-6">


          {/* Lock SVG */}
          <svg
            className="mx-auto mb-4"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              ry="2"
            />

            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>



          <p className="text-red-400 font-bold text-lg">
            Do Not Try To Bypass Security
          </p>


          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            We continuously monitor platform activity
            to protect our users and system integrity.
            Suspicious actions may be recorded and
            appropriate security measures may be taken.
          </p>


        </div>




        <p className="text-gray-500 text-sm mb-6">
          Your safety matters. Please return to the safe zone
          and continue using the platform normally.
        </p>




        <button
          onClick={() => window.location.href="/"}
          className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition"
        >
          Return To Safe Zone
        </button>


      </div>

    </div>
  );
};


export default Warning;