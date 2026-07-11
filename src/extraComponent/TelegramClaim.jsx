import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import telegrambg from "../assets/telegrambg.png";
import coin from "../assets/coin.png";
import copyicon from "../assets/copyicon.svg";

const TelegramClaim = () => {
  const navigate = useNavigate();

  const [claimed, setClaimed] = useState(false);
  const [telegramJoin, setTelegramJoin] = useState(false);

  // 🔹 Load telegramJoin status
  useEffect(() => {
    const joined = localStorage.getItem("telegramJoin") === "true";
    setTelegramJoin(joined);
  }, []);

  // 🎁 Claim handler
  const handleClaim = () => {
    if (telegramJoin) return;

    // balance update
    const currentBalance = Number(localStorage.getItem("balance")) || 0;
    localStorage.setItem("balance", currentBalance + 25000);

    // telegram joined true
    localStorage.setItem("telegramJoin", "true");
    setTelegramJoin(true);

    setClaimed(true);

    // redirect after 1 sec
    setTimeout(() => {
      navigate("/task");
    }, 300);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background */}
      <img
        src={telegrambg}
        alt="Telegram Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom Modal */}
      <div className="absolute bottom-0 left-0 w-full rounded-t-3xl border-t border-[#40FF54] bg-[#141318] backdrop-blur-md shadow-lg p-6 flex flex-col items-center z-10">
        {!claimed ? (
          <>
            {/* Close */}
            <button
              onClick={() => navigate("/task")}
              className="absolute top-3 right-5 text-gray-300 text-3xl font-light hover:text-red-500"
            >
              ×
            </button>

            <p className="text-center text-[20px] font-bold text-[#E5E5E5] pt-5 opacity-90">
              Join our Telegram <br /> channel
            </p>

            <p className="text-[#C4C4C4] text-[12px] pt-6">Reward</p>

            <p className="pb-12 flex justify-center items-center gap-1 text-[#E5E5E5] text-[22px] font-bold">
              <img src={coin} alt="Coin" />
              + 25000
            </p>

            {/* Claim Button */}
            <button
              onClick={handleClaim}
              disabled={telegramJoin}
              className={`w-full py-3 rounded-lg text-sm text-white shadow-lg transition ${
                telegramJoin
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-90"
              }`}
              style={{ background: "#782AF9" }}
            >
              {telegramJoin ? "Already Claimed" : "Claim Reward"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-10">
            <img src={copyicon} alt="Success Icon" className="w-12 h-12 mb-4" />
            <p className="text-[#40FF54] text-[16px] font-semibold">
              Reward Claim Successfully
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramClaim;
