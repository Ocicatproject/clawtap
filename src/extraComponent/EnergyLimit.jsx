import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import telegrambg from "../assets/telegrambg.png";
import coin from "../assets/coin.png";
import energyImg from "../assets/btry.png";
import star from "../assets/star.png";
import congratselip from "../assets/congratselip.png";
import purchaseSuccess from "../assets/purchasesuccess.wav";
import purchaseFailed from "../assets/purchasefailed.wav";
import tapmore from '../assets/lvlmld.png';

const EnergyLimit = () => {
  const navigate = useNavigate();

  // Load saved values
  const savedBalance = parseInt(localStorage.getItem("balance"));
  const savedLevel = parseInt(localStorage.getItem("energyLimit-level"));

  const [balance, setBalance] = useState(isNaN(savedBalance) ? 0 : savedBalance);
  const [level, setLevel] = useState(isNaN(savedLevel) ? 1 : savedLevel);
  const [showCongrats, setShowCongrats] = useState(false);
  const [lastBought, setLastBought] = useState(null);

  // ❗ only for level requirement fail
  const [showLevelFailModal, setShowLevelFailModal] = useState(false);

  // user main level (stone / bronze / silver / gold)
  const userLevel = localStorage.getItem("level") || "stone";

  const LEVEL_MIN_BALANCE = {
    stone: 1_000_000,
    bronze: 10_000_000,
    silver: 100_000_000,
    gold: 1_000_000_000,
  };

  // Coin cost per level
  const coinCosts = {
    1: 200000,
    2: 4000000,
    3: 20000000,
    4: 1000000000,
    5: 20000000000,
  };

  // Handle purchase
  const handleBuy = (lvl) => {
    const successAudio = new Audio(purchaseSuccess);
    const failAudio = new Audio(purchaseFailed);

    // Prevent skipping levels (UNCHANGED)
    if (lvl > 1 && level < lvl) {
      failAudio.play();
      alert("Please purchase previous levels first!");
      return;
    }

    const cost = coinCosts[lvl];

    // Not enough balance (UNCHANGED)
    if (balance < cost) {
      failAudio.play();
      alert("Not enough balance!");
      return;
    }

    // 🔐 LEVEL REQUIREMENT CHECK (NEW)
    const minRequired = LEVEL_MIN_BALANCE[userLevel] || 0;
    const balanceAfterPurchase = balance - cost;

    if (balanceAfterPurchase < minRequired) {
      failAudio.play();
      setShowLevelFailModal(true);
      return;
    }

    // ✅ SUCCESS
    const newBalance = balanceAfterPurchase;
    const newLevel = lvl + 1;

    setBalance(newBalance);
    setLevel(newLevel);
    setLastBought(lvl);
    setShowCongrats(true);

    localStorage.setItem("balance", newBalance);
    localStorage.setItem("energyLimit-level", newLevel);

    successAudio.play();
  };

  return (
    <div className="relative w-full h-screen">
      <img src={telegrambg} className="absolute inset-0 w-full h-full object-cover" alt="" />

      <div className="absolute top-24 left-0 w-full rounded-t-3xl border-t border-[#40FF54] bg-[#141318] backdrop-blur-md shadow-lg p-4 flex flex-col items-center z-20">
        <img src={star} className="absolute top-1 -left-[3px] ml-1 rounded-2xl" alt="" />
        <img src={star} className="absolute rotate-180 bottom-0 right-0 rounded-2xl" alt="" />

        <button
          onClick={() => navigate("/boost")}
          className="absolute top-3 right-5 text-gray-300 text-3xl"
        >
          ×
        </button>

        <p className="text-center text-[22px] font-bold text-[#E5E5E5] pt-5 mb-10">
          Energy Limit
        </p>

        {/* Cards UI — UNCHANGED */}
        {[ [1,2], [3,4] ].map((group, i) => (
          <div key={i} className="flex gap-3 w-full mb-3">
            {group.map((lvl) => (
              <div key={lvl} className="border-2 border-[#383260] flex-1 rounded-xl p-3">
                <p className="font-semibold text-center text-[#E5E5E5]">Level {lvl}</p>
                <img src={energyImg} className="mx-auto h-36 -mt-7" alt="" />
                <p className="flex justify-center gap-1 text-[#E5E5E5] font-semibold -mt-6">
                  <img src={coin} className="h-7" alt="" /> {coinCosts[lvl].toLocaleString()}
                </p>
                <button
                  onClick={() => handleBuy(lvl)}
                  disabled={level > lvl}
                  className="w-full py-2 mt-3 rounded-lg text-sm text-white"
                  style={{ background: level > lvl ? "#5555" : "#782AF9" }}
                >
                  {level > lvl ? "Purchased" : "Buy Item"}
                </button>
              </div>
            ))}
          </div>
        ))}

        <div className="flex justify-center w-full">
          <div className="border-2 border-[#383260] w-1/2 rounded-xl p-3">
            <p className="font-semibold text-center text-[#E5E5E5]">Level 5</p>
            <img src={energyImg} className="mx-auto h-36 -mt-7" alt="" />
            <p className="flex justify-center gap-1 text-[#E5E5E5] font-semibold -mt-5">
              <img src={coin} className="h-7" alt="" /> {coinCosts[5].toLocaleString()}
            </p>
            <button
              onClick={() => handleBuy(5)}
              disabled={level > 5}
              className="w-full py-2 mt-3 rounded-lg text-sm text-white"
              style={{ background: level > 5 ? "#5555" : "#782AF9" }}
            >
              {level > 5 ? "Purchased" : "Buy Item"}
            </button>
          </div>
        </div>
      </div>

      {/* ❗ LEVEL FAIL MODAL (NEW, UI SIMPLE, DOESN’T TOUCH MAIN DESIGN) */}
      {showLevelFailModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div
            className="relative p-6 w-full h-full flex justify-center items-center text-center text-white rounded-2xl"
            style={{
              background: "linear-gradient(180deg, #141318 0%, #0C082A 100%)",
              boxShadow: "0 34px 82.7px 0 rgba(0, 132, 193, 0.25)",
            }}
          >
           

            <div>
              <img src={tapmore} alt="Energy" className="mx-auto " />
              <p className="text-xl text-center -mt-8 font-semibold text-gray-100 pt-3">Can’t Purchase</p>
              <p className="text-xs text-gray-200 opacity-90 mt-[6px] pb-1">
                Tap more to level up!{lastBought + 1}
              </p>

              <button
               onClick={() => setShowLevelFailModal(false)}
                className="w-[240px] mt-4 rounded-lg text-sm text-white shadow-lg hover:opacity-90 transition px-5 py-4"
                style={{ background: "#782AF9" }}
              >
                Okay
              </button>
            </div>
            <img src={congratselip} className="absolute bottom-0" alt="" />
          </div>
        </div>
      )}

      {/* Congrats Modal — UNCHANGED */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div
            className="relative p-6 w-full h-full flex justify-center items-center text-center text-white rounded-2xl"
            style={{
              background: "linear-gradient(180deg, #141318 0%, #0C082A 100%)",
              boxShadow: "0 34px 82.7px 0 rgba(0, 132, 193, 0.25)",
            }}
          >
            <button
              onClick={() => setShowCongrats(false)}
              className="absolute top-8 left-5 border border-[#48407B] bg-[#261D61] text-white px-3 py-1 rounded-md text-xs"
            >
              Back
            </button>

            <div>
              <img src={energyImg} alt="Energy" className="mx-auto h-42" />
              <p className="text-xl text-center -mt-8 font-semibold text-gray-100">Congrats! 🎉</p>
              <p className="text-xs text-gray-200 opacity-90 mt-[6px] pb-1">
                You unlocked Energy Limit Level {lastBought + 1}
              </p>

              <button
                onClick={() => navigate("/home")}
                className="w-[240px] mt-4 rounded-lg text-sm text-white shadow-lg hover:opacity-90 transition px-5 py-4"
                style={{ background: "#782AF9" }}
              >
                Back Home
              </button>
            </div>
            <img src={congratselip} className="absolute bottom-0" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyLimit;
