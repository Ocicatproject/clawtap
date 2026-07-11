import { useState, useEffect } from "react";
import coin from '../assets/coin.png'
import fullenergy from '../assets/fullenergy.svg'
import speed from '../assets/speed.svg';
import doutab from '../assets/doutap.svg';
import battery from '../assets/battery.svg';
import autominer from '../assets/autominer.svg';
import arrow from '../assets/arrow-right.svg';
import bnb from '../assets/bnb.svg';
import { Link, useNavigate } from 'react-router-dom';

const Boost = () => {
    const [balance, setBalance] = useState(0);
    const [level, setLevel] = useState(null);
    const [profitLevel, setProfitLevel] = useState(1);
    const navigate = useNavigate();

    const profitCosts = {
        1: 10000,
        2: 20000,
        3: 40000,
        4: 100000,
        5: 200000,
    };

    useEffect(() => {
        const storedBalance = parseInt(localStorage.getItem("balance")) || 0;
        setBalance(storedBalance);

        const storedLevel = localStorage.getItem("level") || null;
        setLevel(storedLevel);

        const storedProfit = parseInt(localStorage.getItem("profit-per-click")) || 1;
        setProfitLevel(storedProfit);

        const handleStorageChange = (e) => {
            if (e.key === "balance") {
                setBalance(parseInt(e.newValue) || 0);
            }
            if (e.key === "level") {
                setLevel(e.newValue || null);
            }
            if (e.key === "profit-per-click") {
                setProfitLevel(parseInt(e.newValue) || 1);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // AutoMiner click validation
    // AutoMiner click validation (UPDATED LOGIC ONLY)
const handleAutoMinerClick = () => {
    const mining = localStorage.getItem("mining") === "true";

    if (level === "wood") {
        alert("You must complete Wood level before unlocking Auto Miner!");
        return;
    }

    if (!level) {
        alert("Please upgrade to a level first!");
        return;
    }

    // 🔥 main logic you asked
    if (mining) {
        navigate("/repairMiner");
    } else {
        navigate("/buyautoMiner");
    }
};


    // ✅ Speed click validation
    const handleSpeedClick = () => {
        if (level === "wood") {
            alert("You must finish Wood level before purchasing Speed!");
        } else {
            navigate("/speed");
        }
    };

    return (
        <div className="relative w-full min-h-screen flex justify-center bg-cover bg-center">
            <div
                className="relative mt-16 rounded-3xl shadow-xl w-full max-w-md text-center border-t"
                style={{
                    background: "var(--Gradient, linear-gradient(180deg, #141318 0%, #0C082A 100%))",
                    borderColor: "#40FF54",
                }}
            >
                <h2 className="text-white text-[24px] font-bold mb-8 pt-14 flex items-center gap-2 justify-center">
                    <img src={coin} alt="coin" /> {balance.toLocaleString()}
                </h2>

                <p className='text-[#E5E5E5] font-[200] text-[14px] px-4 text-left'>Free daily boosters </p>

                <Link to="/energyLimit">
                    <div className='mx-4 cursor-pointer py-5 mt-3 px-5 flex justify-between text-left items-center bg-[#19162C] border border-[#48407B] rounded-xl'>
                        <div className='flex items-center gap-4'>
                            <img src={fullenergy} alt="" />
                            <div>
                                <p className='text-[14px] pb-[2px] font-bold text-[#E5E5E5] '>Full Energy</p>
                                <p className='text-xs text-[#E5E5E5]'>1/6 available, Refills every 24 hours</p>
                            </div>
                        </div>
                        <img src={arrow} alt="" />
                    </div>
                </Link>

                {/* ✅ Speed button with validation */}
                <div
                    onClick={handleSpeedClick}
                    className='mx-4 cursor-pointer py-5 mt-3 px-5 flex justify-between text-left items-center bg-[#19162C] border border-[#48407B] rounded-xl'
                >
                    <div className='flex items-center gap-4'>
                        <img src={speed} alt="" />
                        <div>
                            <p className='text-[14px] pb-[2px] font-bold text-[#E5E5E5] '>Speed</p>
                            <p className='text-xs text-[#E5E5E5]'>Upgrade it in every level</p>
                        </div>
                    </div>
                    <img src={arrow} alt="" />
                </div>

                <p className='text-[#E5E5E5] font-[200] text-[14px] px-4 text-left pt-6 pb-3'>Boosters</p>

                <Link to="/combo">
                    <div className='mx-4 cursor-pointer py-5 px-5 flex justify-between text-left items-center bg-[#19162C] border border-[#48407B] rounded-xl'>
                        <div className='flex items-center gap-4'>
                            <img src={doutab} alt="" />
                            <div>
                                <p className='text-[14px] pb-[2px] font-bold text-[#E5E5E5] '>Duo Tap</p>
                                <p className='text-xs text-[#E5E5E5]'>
                                    {(profitCosts[profitLevel] || 0).toLocaleString()} • level {profitLevel}
                                </p>
                            </div>
                        </div>
                        <img src={arrow} alt="" />
                    </div>
                </Link>

                <div className='mx-4 py-5 mt-3 px-5 flex justify-between text-left items-center bg-[#19162C] border border-[#48407B] rounded-xl'>
                    <div className='flex items-center gap-4'>
                        <img src={battery} alt="" />
                        <div>
                            <p className='text-[14px] pb-[2px] font-bold text-[#E5E5E5] '>Battery Limit</p>
                            <p className='text-xs text-[#E5E5E5]'>Refills automatically</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={handleAutoMinerClick}
                    className='mx-4 cursor-pointer mb-3 py-5 mt-3 px-5 flex justify-between text-left items-center bg-[#19162C] border border-[#48407B] rounded-xl'
                >
                    <div className='flex items-center gap-4'>
                        <img src={autominer} alt="" />
                        <div>
                            <p className='text-[14px] pb-[2px] font-bold text-[#E5E5E5] '>AutoMiner</p>
                            <p className='text-xs text-[#E5E5E5] gap-1 flex items-center'>0.05 <img src={bnb} alt="" /></p>
                        </div>
                    </div>
                    <img src={arrow} alt="" />
                </div>

                <div className='mt-5 mb-4'>
                    <Link to="/home">
                        <button className='bg-[#782AF9] cursor-pointer w-11/12 mx-auto py-4 px-4 rounded-lg'>Back Home</button>
                    </Link>
                </div>

                <Link to="/home">
                    <button className="cursor-pointer absolute top-3 right-4 text-white text-xl">✕</button>
                </Link>
            </div>
        </div>
    );
};

export default Boost;
