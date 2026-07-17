import React, { useState, useEffect, useRef } from "react";
import backgroundimage from "../assets/loaderbg.png";
import profileIcon from "../assets/Profile icon.png";
import woodImg from "../assets/wood.png";
import stoneImg from "../assets/stone.png";
import bronzeImg from "../assets/Bronze.svg";
import silverImg from "../assets/SIlver.png";
import goldImg from "../assets/gold.png";
import coin from "../assets/coin.png";
import logo from "../assets/logo.png";
import music from "../assets/Music outline.svg";
import battery from "../assets/battery.svg";
import rocket from "../assets/rocket 1.svg";
import treasury from "../assets/Treasury icon.svg";
import light from "../assets/light.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Update from "../Update";
import modalbg from "../assets/modalbg.png";
import levelupmusic from '../assets/purchasesuccess.wav'

// ✅ import level-up modal images
import stoneCongrats from "../assets/cstone.png";
import bronzeCongrats from "../assets/cbronze.png";
import silverCongrats from "../assets/csilver.png";
import goldCongrats from "../assets/cgold.png";
import celip from '../assets/congratselip.png';
const Home = () => {
const [dailyTap, setDailyTap] = useState(() => {
  const stored = parseInt(localStorage.getItem("dailyTap"));
  return isNaN(stored) ? 0 : stored;
});

console.log("Home Start:", localStorage.getItem("level"));


  const [clicks, setClicks] = useState([]);
  const [animateLogo, setAnimateLogo] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [showLight, setShowLight] = useState(false);

  const [balance, setBalance] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [profitPerClick, setProfitPerClick] = useState(() => {
    const stored = localStorage.getItem("profit-per-click");
    return stored ? parseInt(stored) : 1;
  });

  const [upgradeEarning, setUpgradeEarning] = useState(() => {
    const stored = localStorage.getItem("upgrade-earn");
    return stored ? parseInt(stored) : 0;
  });

  const [level, setLevel] = useState(() => {
    return localStorage.getItem("level") || "wood";
  });

  const [levelStartDate, setLevelStartDate] = useState(() => {
    return localStorage.getItem("levelStartDate") || new Date().toISOString();
  });

  const [loginDate, setLoginDate] = useState(() => {
    return localStorage.getItem("loginDate") || new Date().toISOString();
  });

  const [speed, setSpeed] = useState(() => {
    const stored = localStorage.getItem("speed");
    return stored ? parseInt(stored) : 0;
  });

  const [energyLimitLevel, setEnergyLimitLevel] = useState(() => {
    const stored = localStorage.getItem("energyLimit-level");
    return stored ? parseInt(stored) : 1;
  });

  const [clicksThisMinute, setClicksThisMinute] = useState(0);
  const [lastClickTimestamp, setLastClickTimestamp] = useState(Date.now());
  const navigate = useNavigate();

  const [profile, setProfile] = useState("");

  // ✅ modal state
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [newUnlockedLevel, setNewUnlockedLevel] = useState("");

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    const email = localStorage.getItem("email");
    const userKey = wallet || email || "guest";
    const savedAvatar = localStorage.getItem(`avatar_${userKey}`);

    if (savedAvatar) {
      setProfile(savedAvatar);
    } else {
      const randomAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${Math.floor(
        Math.random() * 10000000
      )}`;
      setProfile(randomAvatar);
      localStorage.setItem(`avatar_${userKey}`, randomAvatar);
    }
  }, []);

  const audioRef = useRef(null);
  const miningIntervalRef = useRef(null);
  const clicksCountRef = useRef(0);

  const getEnergyLimit = () => {
    switch (energyLimitLevel) {
      case 1:
        return 500;
      case 2:
        return 1000;
      case 3:
        return 2000;
      case 4:
        return 5000;
      case 5:
        return 10000;
      default:
        return 500;
    }
  };

  const energyLimit = getEnergyLimit();
  const [batteryLevel, setBatteryLevel] = useState(energyLimit);

  useEffect(() => {
    const newLimit = getEnergyLimit();
    setBatteryLevel(newLimit);
    localStorage.setItem("battery", newLimit);
  }, [energyLimitLevel]);

  const loadLocalStorage = () => {
    const storedName = localStorage.getItem("name");
    if (storedName) setUsername(storedName);
    const storedBalance = parseInt(localStorage.getItem("balance")) || 0;
    setBalance(storedBalance);
    const storedBattery =
      parseInt(localStorage.getItem("battery")) || energyLimit;
    setBatteryLevel(storedBattery);
    const storedProfit =
      parseInt(localStorage.getItem("profit-per-click")) || 1;
    setProfitPerClick(storedProfit);
    const storedUpgrade =
      parseInt(localStorage.getItem("upgrade-earn")) || 0;
    setUpgradeEarning(storedUpgrade);
    const storedLevel = localStorage.getItem("level") || "wood";
    setLevel(storedLevel);
    const storedDate =
      localStorage.getItem("levelStartDate") || new Date().toISOString();
    setLevelStartDate(storedDate);
    const storedLogin =
      localStorage.getItem("loginDate") || new Date().toISOString();
    setLoginDate(storedLogin);
    const storedSpeed = parseInt(localStorage.getItem("speed")) || 0;
    setSpeed(storedSpeed);
    const storedEnergyLimitLevel =
      parseInt(localStorage.getItem("energyLimit-level")) || 1;
    setEnergyLimitLevel(storedEnergyLimitLevel);
  };

  useEffect(() => {
    loadLocalStorage();
    const handleStorageChange = (e) => {
      if (
        [
          "profit-per-click",
          "upgrade-earn",
          "level",
          "balance",
          "levelStartDate",
          "loginDate",
          "speed",
          "energyLimit-level",
        ].includes(e.key)
      ) {
        loadLocalStorage();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  useEffect(() => {
  const savedTap = localStorage.getItem("dailyTap");

  if (savedTap !== null) {
    setDailyTap(parseInt(savedTap));
  } else {
    setDailyTap(0);
    localStorage.setItem("dailyTap", "0");
  }
}, []);



  useEffect(
    () => localStorage.setItem("profit-per-click", profitPerClick),
    [profitPerClick]
  );
  useEffect(
    () => localStorage.setItem("upgrade-earn", upgradeEarning),
    [upgradeEarning]
  );
  useEffect(() => localStorage.setItem("level", level), [level]);
  useEffect(
    () => localStorage.setItem("energyLimit-level", energyLimitLevel),
    [energyLimitLevel]
  );

 useEffect(() => {
  // প্রথমে localStorage থেকে level পড়ে state সেট করো (যদি সেট না থাকে)
  const savedLevel = localStorage.getItem("level") || "wood";
  setLevel(savedLevel);

  // এখন balance-এর ভিত্তিতে শুধু আপগ্রেড চেক করো
  if (!loginDate || balance === undefined) return;

  const levelsOrder = ["wood", "stone", "bronze", "silver", "gold"];
  const currentIdx = levelsOrder.indexOf(savedLevel);

  let calculatedLevel = "wood";
  if (balance >= 1000000 && balance < 10000000) calculatedLevel = "stone";
  else if (balance >= 10000000 && balance < 100000000) calculatedLevel = "bronze";
  else if (balance >= 100000000 && balance < 1000000000) calculatedLevel = "silver";
  else if (balance >= 1000000000) calculatedLevel = "gold";

  const newIdx = levelsOrder.indexOf(calculatedLevel);

  // শুধু আপগ্রেড (newIdx > currentIdx) হলে কাজ করো
  if (newIdx > currentIdx) {
    const diffDays = Math.floor(
      (new Date() - new Date(loginDate)) / (1000 * 60 * 60 * 24)
    );
    const minDays = { stone: 10, bronze: 20, silver: 30, gold: 40 };
    if (diffDays < (minDays[calculatedLevel] || 0)) return;

    // মডাল দেখাও
    const modalKey = `levelModalShown_${calculatedLevel}`;
    if (localStorage.getItem(modalKey) !== "true") {
      setNewUnlockedLevel(calculatedLevel);
      setShowLevelModal(true);
      localStorage.setItem(modalKey, "true");
      const audio = new Audio(levelupmusic);
      audio.play().catch(() => {});
    }

    // আপগ্রেড সেট করো
    setLevel(calculatedLevel);
    localStorage.setItem("level", calculatedLevel);
    localStorage.setItem("levelStartDate", new Date().toISOString());
  }
  // ডাউনগ্রেড (newIdx <= currentIdx) হলে কিছু করো না
}, [balance, loginDate]);


  // ✅ Fetch users count
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://claw-server-six.vercel.app/users");
        if (res.data && Array.isArray(res.data)) setUserCount(res.data.length);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Show light only for highest balance user
 useEffect(() => {
  const checkHighestBalance = async () => {
    try {
      const res = await axios.get("https://claw-server-six.vercel.app/users");
      if (res.data && Array.isArray(res.data)) {
        const users = res.data;
        const currentUserWallet = localStorage.getItem("wallet");
        const currentUserEmail = localStorage.getItem("email");

        const currentUser = users.find(
          (u) =>
            u.wallet === currentUserWallet || u.email === currentUserEmail
        );

        if (!currentUser) {
          setShowLight(false);
          return;
        }

        // ✅ Find user with the max balance
        const highestBalanceUser = users.reduce((max, user) =>
          user.balance > max.balance ? user : max
        );

        // ✅ Only show light if current user is the one with highest balance AND balance > 0
        if (
          currentUser.balance === highestBalanceUser.balance &&
          currentUser.balance > 0
        ) {
          setShowLight(true);
        } else {
          setShowLight(false);
        }
      }
    } catch (err) {
      console.error("Failed to fetch users for light effect:", err);
      setShowLight(false);
    }
  };

  checkHighestBalance();
  const interval = setInterval(checkHighestBalance, 15000);
  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    const interval = setInterval(() => {
      const storedBattery =
        parseInt(localStorage.getItem("battery")) || energyLimit;
      setBatteryLevel(storedBattery);
    }, 1000);
    return () => clearInterval(interval);
  }, [energyLimit]);

  const miningActive = localStorage.getItem("mining") === "true";
  const maxClicks = miningActive
    ? speed > 0
      ? speed === 1
        ? 40
        : speed === 2
        ? 50
        : speed === 3
        ? 60
        : speed === 4
        ? 70
        : 80
      : 40
    : Infinity;

  const limitAlertShown = useRef(false);


 const handleLogoClick = (e) => {
  // 🔥 DAILY LIMIT
  const limits = {
    wood:   100000,
    stone:  1000000,
    bronze: 10000000,
    silver: 100000000,
    gold:   1000000000,
  };

  const maxLimit = limits[level];

  if (dailyTap >= maxLimit) {
    alert("🚫 Daily limit reached! Try again tomorrow 💪");
    return;
  }

  const now = Date.now();
  const elapsed = now - lastClickTimestamp;

  if (elapsed > 60000) {
    setClicksThisMinute(0);
    limitAlertShown.current = false;
  }

   // 👇 এখানে বসাবে
  const currentTap = parseInt(localStorage.getItem("dailyTap"));
  const safeTap = isNaN(currentTap) ? 0 : currentTap;

  if (batteryLevel <= 0) return;

  setAnimateLogo(true);
  setTimeout(() => setAnimateLogo(false), 200);

  let x = 0,
    y = 0;

  if (e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }

  const id = Date.now();

  setClicks((prev) => [
    ...prev,
    { id, x, y, value: profitPerClick + upgradeEarning },
  ]);

  setTimeout(() => {
    setClicks((prev) => prev.filter((c) => c.id !== id));
  }, 1000);

  setBalance((prev) => {
    const newBalance = prev + profitPerClick + upgradeEarning;
    localStorage.setItem("balance", newBalance);
    return newBalance;
  });

  setBatteryLevel((prev) => {
    const newBattery = Math.max(prev - 1, 0);
    localStorage.setItem("battery", newBattery);
    return newBattery;
  });

  // 🔥 DAILY TAP UPDATE
const newTap = safeTap + 1;

setDailyTap(newTap);
localStorage.setItem("dailyTap", newTap);

  setClicksThisMinute((prev) => prev + 1);
  setLastClickTimestamp(now);
};

useEffect(() => {
  if (localStorage.getItem("mining") === "true") {
    clearInterval(miningIntervalRef.current);

    const speedLevel = parseInt(localStorage.getItem("speed-level")) || 1;
    const intervalTime = 1000 / speedLevel;

    miningIntervalRef.current = setInterval(() => {
      const profit = profitPerClick || 1;
      const upgrade = upgradeEarning || 0;

      // ✅ FIXED POSITION (LEFT SIDE)
      const x = 10;      // left side fixed
      const y = 35;     // fixed vertical position

      const id = Date.now() + Math.random();
      setClicks((prev) => [
        ...prev,
        { id, x, y, value: `${profit} + ${upgrade}` },
      ]);

      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id));
      }, 1000);
    }, intervalTime);
  }

  return () => clearInterval(miningIntervalRef.current);
}, [profitPerClick, upgradeEarning]);


  const levelImages = {
    wood: woodImg,
    stone: stoneImg,
    bronze: bronzeImg,
    silver: silverImg,
    gold: goldImg,
  };
  const levelImage = levelImages[level] || woodImg;

  // ✅ modal image map
  const modalImages = {
    stone: stoneCongrats,
    bronze: bronzeCongrats,
    silver: silverCongrats,
    gold: goldCongrats,
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center px-4 py-5 text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundimage})` }}
    >
      <Update></Update>

      {/* ✅ LEVEL-UP MODAL */}
      {showLevelModal && (
        <div className="fixed inset-0   flex items-center justify-center min-h-screen bg-black bg-opacity-70 z-[99999]">
          <div className="relative text-center ">
            <img
              src={modalImages[newUnlockedLevel]}
              alt="Level Up"
              className="h-62 mx-auto mb-4 relative z-10"
            />
            <img className="absolute -top-10" src={modalbg} alt="" />
            <p className="text-sm  text-gray-300  -mt-16 ">
            <span className=" font-semibold text-xl ">  Congrats! 🚀</span>
             <p className="-mt-3">  <br />
              You’ve unlocked{" "}
              <span className="capitalize">{newUnlockedLevel}</span> level!
              <br />
              Keep tapping and keep winning!</p>
            </p>

            <button
              onClick={() => setShowLevelModal(false)}
              className="w-[240px]   mt-4 rounded-lg text-sm text-white shadow-lg hover:opacity-90 transition px-5 py-4 relative z-10 "
              style={{ background: "#782AF9" }}
            >
                Home
            </button>

          </div>
          <img src={celip} className="absolute bottom-0" alt="" />
        </div>
      )}

      <div className="pt-4">
        <div className="flex items-center gap-2">
          {profile && (
            <img src={profile} alt="Profile" className="w-9 h-9 rounded-full" />
          )}
          <span className="text-sm font-semibold">{username}</span>
        </div>

        <div className="flex items-center gap-4 mt-6 justify-center">
          <Link to={`/${level}`}>
            <button className="flex cursor-pointer justify-center items-center gap-1 bg-[#19162C] py-[10px] px-[22px] rounded-lg border border-[#48407B]">
              <img src={levelImage} alt={level} className="w-5 h-5" />
              <span className="ml-2 capitalize text-sm">{level}</span>
            </button>
          </Link>
          <Link to="/hallOfFame">
            <button className="bg-[#19162C] text-sm py-[10px] px-[22px] rounded-lg border border-[#48407B] cursor-pointer">
              Hall of fame
            </button>
          </Link>
        </div>

        <div className="mt-5 bg-[#19162C] rounded-xl p-3 text-xs flex justify-between text-center border border-[#48407B]">
          <div>
            <div className="text-yellow-400 font-bold text-left">
              Profit per click
            </div>
            <div>{profitPerClick}</div>
          </div>
          <div className="flex-1 border-l border-[#48407B] ml-3">
            <div className="text-yellow-400 font-bold text-center">
              Members
            </div>
            <div>{userCount}</div>
          </div>
          <div
            onClick={() => navigate("/upgraded")}
            className="cursor-pointer flex-1 border-l -ml-3 border-[#48407B]"
          >
            <div className="text-yellow-400 text-right font-bold">
              Upgraded earning
            </div>
            <div>{upgradeEarning}</div>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center text-[24px] font-bold text-white drop-shadow-lg relative z-10">
          <img src={coin} alt="Coin" className="mr-2" /> {balance}
        </div>

        <div className="relative">
          <div className="mt-3 flex justify-center relative z-10">
            <img
              src={logo}
              alt="Claw Logo"
              onClick={handleLogoClick}
              className={`w-58 h-auto cursor-pointer transition-transform duration-150 ${
                animateLogo ? "scale-90" : "scale-100"
              }`}
            />
            {clicks.map((c) => (
              <span
                key={c.id}
                className="absolute flex items-center gap-1 text-yellow-400 font-bold text-xl animate-float"
                style={{ left: c.x, top: c.y }}
              >
                <img src={coin} alt="coin" className="w-5 h-5" /> +{c.value}
              </span>
            ))}
          </div>

          {/* ✅ Light only for top user */}
          {showLight && (
            <div className="w-full">
              <img
                src={light}
                alt="Light"
                className="absolute -top-0 left-1/2 max-w-[320px] rounded-full mx-auto scale-100 transform -translate-x-1/2 transition-opacity duration-500"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center -mt-4 relative z-10">
          <div className="shadow-lg cursor-pointer">
            <Link to="/music">
              <img src={music} alt="Music" />
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5 px-4 pb-30 relative z-10">
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={battery} alt="Battery" className="mb-1" />
            <p className="text-xs font-[400] text-gray-200">
              {batteryLevel}/{energyLimit}
            </p>
          </div>
          <Link to="/boost">
            <div className="flex items-center bg-[#19162C] border border-[#48407B] cursor-pointer rounded-lg px-2 py-1">
              <img src={rocket} alt="Booster" className="mb-1" />
              <p className="text-xs font-semibold">Booster</p>
            </div>
          </Link>
          <Link to="/treasure">
            <div className="flex cursor-pointer gap-1 items-center bg-[#19162C] border border-[#48407B] rounded-lg px-2 py-2">
              <img src={treasury} alt="Treasury" className="mb-1" />
              <p className="text-xs font-semibold">Treasury</p>
            </div>
          </Link>
        </div>

        <style>{`
          .animate-float {
            animation: floatUp 1s ease-out forwards;
            position: absolute;
            pointer-events: none;
          }
          @keyframes floatUp {
            0% { opacity: 0; transform: translateY(0) scale(1); }
            30% { opacity: 1; }
            100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
