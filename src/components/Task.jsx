import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import task from '../assets/taskimg.png';
import taskreward from '../assets/taskreward.svg';
import telegram from '../assets/telegram.svg';
import youtube from '../assets/youtube.svg';
import coin from '../assets/coin.png';
import arrow from '../assets/arrow-right.svg';
import x from '../assets/x.png'
import insta from '../assets/insta.png'
import tiktok from '../assets/tiktok.png'
import UpdateTask from '../UpdateTask';

const Task = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  
  // Daily reward & task completion status
  const [dailyRewardCompleted, setDailyRewardCompleted] = useState(false);
  const [dailyTaskCompleted, setDailyTaskCompleted] = useState(false);
  
  // Social tasks completion status
  const [telegramJoin, setTelegramJoin] = useState(false);
  const [youtubeSubscribed, setYoutubeSubscribed] = useState(false);
  const [xFollow, setXFollow] = useState(false);
  const [instaFollow, setInstaFollow] = useState(false);
  const [tiktokFollow, setTiktokFollow] = useState(false);
  const [ocicatFollow, setOcicatFollow] = useState(false);

  useEffect(() => {
    // Load balance
    const savedBalance = localStorage.getItem("balance");
    setBalance(savedBalance ? Number(savedBalance) : 30000000);

    // Daily Reward - check if completed within last 24 hours
    const dailyRewardDate = localStorage.getItem("dailyReward");
    if (dailyRewardDate) {
      const storedTime = new Date(dailyRewardDate).getTime();
      const currentTime = new Date().getTime();
      const elapsedHours = (currentTime - storedTime) / (1000 * 60 * 60);
      setDailyRewardCompleted(elapsedHours < 24);
    }

    // Daily Task - check if completed within last 24 hours
    const dailyTaskDate = localStorage.getItem("dailyTask");
    if (dailyTaskDate) {
      const storedTime = new Date(dailyTaskDate).getTime();
      const currentTime = new Date().getTime();
      const elapsedHours = (currentTime - storedTime) / (1000 * 60 * 60);
      setDailyTaskCompleted(elapsedHours < 24);
    }

    // Load social tasks from localStorage
    setTelegramJoin(localStorage.getItem("telegramJoin") === "true");
    setYoutubeSubscribed(localStorage.getItem("youtubeSubscribed") === "true");
    setXFollow(localStorage.getItem("xFollow") === "true");
    setInstaFollow(localStorage.getItem("instaFollow") === "true");
    setTiktokFollow(localStorage.getItem("tiktokFollow") === "true");
    setOcicatFollow(localStorage.getItem("ocicatFollow") === "true");
  }, []);

  // Telegram click
  const handleTelegramClick = () => {
    window.open("https://t.me/joinclaw", "_blank");
    localStorage.setItem("telegramClicked", "true");
    navigate("/telegramclaim");
  };

  // YouTube Subscribe click
  const handleYoutubeClick = () => {
    window.open("https://youtube.com/@clawlaboratory", "_blank");
    localStorage.setItem("youtubeClicked", "true");
    navigate("/youtubesubscribe");
  };

  // X (Twitter) follow click
  const handlexClick = () => {
    window.open("https://x.com/JoinClaw", "_blank");
    localStorage.setItem("xClicked", "true");
    navigate("/xReward");
  };

  // Instagram follow click
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/joinclaw", "_blank");
    localStorage.setItem("instagramClicked", "true");
    navigate("/instagramReward");
  };

  // Tiktok follow click
  const handleTiktokClick = () => {
    window.open("https://www.tiktok.com/@joinclaw", "_blank");
    localStorage.setItem("tiktokClicked", "true");
    navigate("/tiktokReward");
  };

  // Ocicat Telegram follow click
  const handleOcicatClick = () => {
    window.open("https://t.me/ocicat_ann", "_blank");
    localStorage.setItem("ocicatClicked", "true");
    navigate("/ocicatReward");
  };

  // Daily Task click
  const handleDailyClick = () => {
    window.open("https://youtube.com/@clawlaboratory", "_blank");
    localStorage.setItem("dailyClicked", "true");
    navigate("/dailyTask");
  };

  return (
    <div>
      <div className='pt-9 min-h-screen'>
        <img src={task} alt="" className='w-full mx-auto' />
        <p className='flex items-center justify-center gap-1 text-[24px] font-bold my-7'>
          <img src={coin} alt="" /> {balance.toLocaleString()}
        </p>

        {/* Daily reward */}
        <div
          onClick={() => navigate("/dailyReward")}
          className='mx-3 py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl cursor-pointer'
        >
          <div className='flex items-center gap-4'>
            <img src={taskreward} alt="" className='h-8' />
            <div>
              <div className='flex gap-3 items-center'>
                <p className='text-[14px] pb-2'> Daily reward</p>
                {dailyRewardCompleted && (
                  <p className='text-[10px] text-green-500 border border-green-500/60 -mt-2 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center gap-1 text-[#E5E5E5] text-xs opacity-90'>
                <img src={coin} alt="" className='h-4' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>

        <p className='text-left px-4 pt-5 pb-3 font-[200] text-[15px]'>Tasks list</p>

        {/* Telegram task */}
        <div
          onClick={handleTelegramClick}
          className='mx-3 mb-2 cursor-pointer py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl'
        >
          <div className='flex items-center gap-4'>
            <img src={telegram} alt="" className='h-8' />
            <div>
              <div className='flex gap-3 items-center'>
                <p className= 'flex-1 text-[14px] max-w-[120px]  pb-2 text-gray-300 text-left'> Join our telegram channel</p>
                {telegramJoin && (
                  <p className=' text-[10px] text-green-500 border border-green-500/60 -mt-6 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center font-bold gap-1 text-[#E5E5E5] text-sm '>
                <img src={coin} alt="" className='h-5' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>

        {/* YouTube subscribe */}
        <div
          onClick={handleYoutubeClick}
          className='mx-3 py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl cursor-pointer'
        >
          <div className='flex items-center gap-4'>
            <img src={youtube} alt="" className='h-8' />
            <div>
              <div className='flex gap-3 items-center'>
                <p className='max-w-[108px] text-left text-[14px] pb-2 text-gray-300'>Subscribe to our YouTube channel</p>
                {youtubeSubscribed && (
                  <p className='text-[10px] text-green-500 border border-green-500/60 -mt-6 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center font-bold gap-1 text-[#E5E5E5] text-sm '>
                <img src={coin} alt="" className='h-4' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>

        {/* x subscribe */}
        <div
          onClick={handlexClick}
          className='mx-3 mt-2 mb-2 cursor-pointer py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl'
        >
          <div className='flex items-center gap-4'>
            <div className='bg-black rounded-full'>
              <img src={x} alt="" className='h-9 rounded-full ' />
            </div>
            <div>
              <div className='flex gap-3 items-center'>
                <p className='text-[14px] pb-2 text-gray-300'> Follow Claw on X</p>
                {xFollow && (
                  <p className='text-[10px] text-green-500 border border-green-500/60 -mt-2 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center font-bold gap-1 text-[#E5E5E5] text-sm '>
                <img src={coin} alt="" className='h-5' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>

        {/* instagram subscribe */}
        <div
          onClick={handleInstagramClick}
          className='mx-3 mb-2 cursor-pointer py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl'
        >
          <div className='flex items-center gap-4'>
            <div className='rounded-full'>
              <img src={insta} alt="" className='h-8 rounded-3xl' />
            </div>
            <div>
              <div className='flex gap-3 items-center'>
                <p className='max-w-[100px] text-left text-[14px] pb-2 text-gray-300'> Follow Claw on Instagram</p>
                {instaFollow && (
                  <p className='text-[10px] text-green-500 border border-green-500/60 -mt-6 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center font-bold gap-1 text-[#E5E5E5] text-sm '>
                <img src={coin} alt="" className='h-5' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>

        {/* tiktok subscribe */}
        <div
          onClick={handleTiktokClick}
          className='mx-3 mb-2 cursor-pointer py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl'
        >
          <div className='flex items-center gap-4'>
            <img src={tiktok} alt="" className='h-9 rounded-3xl' />
            <div>
              <div className='flex gap-3 items-center'>
                <p className='text-[14px] pb-2 text-gray-300'>Follow Claw on Tiktok</p>
                {tiktokFollow && (
                  <p className='text-[10px] text-green-500 border border-green-500/60 -mt-2 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center font-bold gap-1 text-[#E5E5E5] text-sm '>
                <img src={coin} alt="" className='h-5' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>

        {/* ocicat subscribe */}
        <div
          onClick={handleOcicatClick}
          className='mx-3 mb-2 cursor-pointer py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl'
        >
          <div className='flex items-center gap-4'>
            <img src={telegram} alt="" className='h-8' />
            <div>
              <div className='flex gap-3 items-center'>
                <p className='text-left max-w-[110px] text-[14px] pb-2 text-gray-300'> Follow Ocicat on Telegram</p>
                {ocicatFollow && (
                  <p className='text-[10px] text-green-500 border border-green-500/60 -mt-6 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center font-bold gap-1 text-[#E5E5E5] text-sm '>
                <img src={coin} alt="" className='h-5' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>

        <p className='text-left px-4 pt-5 pb-3 font-[200] text-[15px]'>Daily Tasks </p>

        {/* Daily task */}
        <div
          onClick={handleDailyClick}
          className='mb-36 mx-3 py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl cursor-pointer'
        >
          <div className='flex items-center gap-4'>
            <img src={youtube} alt="" className='h-8' />
            <div>
              <div className='flex gap-3 items-center'>
                <p className='text-left max-w-[100px] text-[14px] pb-2 text-gray-300'>Watch and like YouTube Video</p>
                {dailyTaskCompleted && (
                  <p className='text-[10px] text-green-500 border border-green-500/60 -mt-6 bg-green-900/10 rounded-full px-1 py-[1px]'>
                    Completed
                  </p>
                )}
              </div>
              <p className='flex items-center font-bold gap-1 text-[#E5E5E5] text-sm '>
                <img src={coin} alt="" className='h-4' />+ 25,000
              </p>
            </div>
          </div>
          <div>
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
      <UpdateTask></UpdateTask>
    </div>
  );
};

export default Task;