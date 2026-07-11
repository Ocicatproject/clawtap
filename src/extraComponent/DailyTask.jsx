import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import telegrambg from "../assets/telegrambg.png";
import coin from "../assets/coin.png";
import copyicon from "../assets/copyicon.svg";

// ✅ 24 hours
const DAILY_TIME = 24 * 60 * 60 * 1000; // 24 hours in ms

const DailyTask = () => {
  const navigate = useNavigate();
  const [canClaim, setCanClaim] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const formatTime = (ms) => {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const checkClaimStatus = () => {
      const lastClaimStr = localStorage.getItem("dailyTask");

      // ✅ First time visit → enable claim
      if (!lastClaimStr) {
        setCanClaim(true);
        setTimeLeft("");
        return;
      }

      const lastClaim = new Date(lastClaimStr).getTime();
      if (isNaN(lastClaim)) {
        setCanClaim(true);
        setTimeLeft("");
        return;
      }

      const now = Date.now();
      const diff = now - lastClaim;

      if (diff >= DAILY_TIME) {
        setCanClaim(true);
        setTimeLeft("");
      } else {
        setCanClaim(false);
        setTimeLeft(formatTime(DAILY_TIME - diff));
      }
    };

    checkClaimStatus();
    const interval = setInterval(checkClaimStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = () => {
    if (!canClaim) return;

    const currentBalance = Number(localStorage.getItem("balance")) || 0;
    localStorage.setItem("balance", currentBalance + 25000);

    localStorage.setItem("dailyTask", new Date().toISOString());

    setClaimed(true);
    setCanClaim(false);

    setTimeout(() => navigate("/task"), 300);
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={telegrambg}
        alt="Telegram Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full rounded-t-3xl border-t border-[#40FF54] bg-[#141318] backdrop-blur-md shadow-lg p-6 flex flex-col items-center z-10">
        {!claimed ? (
          <>
            <button
              onClick={() => navigate("/task")}
              className="absolute top-3 right-5 text-gray-300 text-3xl font-light hover:text-red-500"
            >
              ×
            </button>

            <p className="text-[20px] font-bold text-[#E5E5E5] pt-5 opacity-90 text-center">
              Watch and Like <br /> YouTube Channel Video
            </p>

            <p className="text-[#C4C4C4] text-[12px] pt-6">Reward</p>

            <p className="pb-12 flex items-center gap-1 text-[#E5E5E5] text-[22px] font-bold">
              <img src={coin} alt="Coin" /> + 25000
            </p>

            <button
              onClick={handleClaim}
              disabled={!canClaim}
              className={`w-full py-3 rounded-lg text-sm text-white shadow-lg transition ${
                canClaim
                  ? "cursor-pointer hover:opacity-90"
                  : "cursor-not-allowed opacity-50"
              }`}
              style={{ background: "#782AF9" }}
            >
              {canClaim ? "Claim Reward" : `Claim in ${timeLeft}`}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-10">
            <img src={copyicon} alt="Success Icon" className="w-12 h-12 mb-4" />
            <p className="text-[#40FF54] text-[16px] font-semibold">
              Reward Claimed Successfully
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyTask;
