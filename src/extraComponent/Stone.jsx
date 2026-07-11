import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import stone from '../assets/stone.png';
import stonestar from '../assets/stonestar.png';
import arrow from '../assets/arrow-right.svg';

const MAX_POINTS = 10000000; // 10M
const MIN_DAYS_PER_LEVEL = 20; // 20 din

const Stone = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [canLevelUp, setCanLevelUp] = useState(false);

    useEffect(() => {
        const storedBalance = parseInt(localStorage.getItem("balance") || "0");
        const loginDateStr = localStorage.getItem("loginDate"); 
        setBalance(storedBalance);

        if (loginDateStr) {
            const loginDate = new Date(loginDateStr);
            const now = new Date();
            const diffTime = now - loginDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= MIN_DAYS_PER_LEVEL && storedBalance >= MAX_POINTS) {
                setCanLevelUp(true);
            }
        }
    }, []);

    const progressPercent = Math.min((balance / MAX_POINTS) * 100, 100);

    const handleNextLevel = () => {
        if (canLevelUp) {
            navigate("/bronze");
        } else {
            alert(`You need ${MIN_DAYS_PER_LEVEL} days and ${MAX_POINTS.toLocaleString()} points to level up.`);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex justify-center bg-cover bg-center">
            {/* Card */}
            <div
                className="relative mt-20 rounded-3xl shadow-xl w-full max-w-md text-center border-t"
                style={{
                    background: "var(--Gradient, linear-gradient(180deg, #141318 0%, #0C082A 100%))",
                    borderColor: "#40FF54",
                }}
            >
                <h2 className="text-white text-[24px] font-bold mb-8 pt-14">Stone</h2>

                <div className="flex justify-center mb-10 relative">
                    <img src={stone} alt="Stone Trophy" className=" relative z-10  " />
                    <img src={stonestar} alt="Stone Star" className=" absolute -top-16  " />
                    <img
                        src={arrow}
                        alt="Next Level"
                        className={`absolute top-10 right-3 h-7 object-cover cursor-pointer ${canLevelUp ? "" : "opacity-50"}`}
                        onClick={handleNextLevel}
                    />
                    <Link to="/wood">
                        <img src={arrow} alt="Previous Level" className="absolute top-10 left-3 h-7 rotate-180 object-cover" />
                    </Link>
                </div>

                {/* Progress Bar */}
                <div className=" w-11/12 mx-auto  h-[18px] rounded-[17px] border-[1.5px] border-[#9140FC] bg-[#00015E] overflow-hidden flex items-center px-[2px] py-[2px]">
                    <div
                        className="h-full rounded-[17px]"
                        style={{
                            background: "linear-gradient(90deg, #8C35FC 0%, #F0FFFE 100%)",
                            width: `${progressPercent}%`,
                            transition: "width 0.5s ease-in-out",
                        }}
                    ></div>
                </div>

                <div className="flex justify-between text-xs font-semibold px-4  pt-1">
                    <span className="text-[#40FF54]">{balance.toLocaleString()}</span>
                    <span className="text-[#903FFC]">{MAX_POINTS.toLocaleString()}</span>
                </div>

                {/* Pro Tip Section */}
                <div className="mt-6 space-y-3 pb-5 mx-auto">
                    <div className="bg-[#281A90] text-white mx-4 text-sm text-left font-semibold py-3 px-4 rounded-lg">
                        Pro Tip: <span className='font-[300]'>Limit is 1,000,000 points per day</span>
                    </div>
                    <div className="bg-[#281A90] text-white mx-4 text-sm text-left py-3 px-4 rounded-lg space-y-1">
                        <p className='font-[300]'>• Manual </p>
                        <p className='font-[300]'>• Auto miner </p>
                        <p className='font-[300]'>• Can use treasury but only 20 50 120 gems</p>
                    </div>
                </div>

                {/* Close Button */}
                <Link to="/home">
                    <button className="cursor-pointer absolute top-3 right-4 text-white text-xl">✕</button>
                </Link>
            </div>
        </div>
    );
};

export default Stone;
