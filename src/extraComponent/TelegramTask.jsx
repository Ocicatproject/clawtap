import React from "react";
import { useNavigate } from "react-router-dom";
import telegrambg from "../assets/telegrambg.png";
import coin from "../assets/coin.png";

const TelegramTask = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen">
            {/* Background */}
            <img
                src={telegrambg}
                alt="Telegram Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0  "></div>

            {/* Bottom Modal */}
            <div className="absolute bottom-0 left-0 w-full rounded-t-3xl border-t border-[#40FF54] bg-[#141318]  backdrop-blur-md shadow-lg p-6 flex flex-col items-center z-10">

                    {/* Close Button */}
        <button
          onClick={() => navigate("/task")}
          className="absolute cursor-pointer top-3 right-5 text-gray-300 text-3xl font-light hover:text-red-500"
        >
          ×
        </button>

                <p className="text-center text-[20px] font-bold text-[#E5E5E5] pt-5 opacity-90">Join our Telegram <br /> channel</p>
                <p className="text-[#C4C4C4] text-[12px] pt-6">Reward</p>
                {/* Icon / Image */}
                <p className="pb-12 flex justify-center items-center gap-1 text-[#E5E5E5] text-[22px] font-bold"> <img src={coin} alt="Coin" className=" " />
                    + 2000</p>
                

                {/* Button */}
                <button
                    onClick={() => navigate("/telegramclaim")}
                    className="w-full py-3 rounded-lg cursor-pointer text-sm text-white shadow-lg hover:opacity-90 transition"
                    style={{
                        borderRadius: "9px",
                        background: "#782AF9",
                    }}
                >
                    Start Task
                </button>
            </div>
        </div>
    );
};

export default TelegramTask;
