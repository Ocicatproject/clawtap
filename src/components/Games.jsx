import games from '../assets/Games.png';
import rolette from '../assets/rolett.png';
import blackjack from '../assets/blackjack.png';
import pokergame from '../assets/pokergame.png';
import slot from '../assets/slot.png';
import coin from '../assets/coin.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Games = () => {
  const savedName = localStorage.getItem("name") || "Guest";
  const [balance, setBalance] = useState(0);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // ✅ Balance
    const savedBalance = localStorage.getItem("balance");
    setBalance(savedBalance ? Number(savedBalance) : 30000000);

    // ✅ Find the avatar key that starts with "avatar_"
    const avatarKey = Object.keys(localStorage).find(key => key.startsWith("avatar_"));
    if (avatarKey) {
      const savedAvatar = localStorage.getItem(avatarKey);
      setAvatar(savedAvatar);
    } else {
      console.log("❌ No avatar found in localStorage");
    }
  }, []);

  return (
    <div className="bg-black pb-36">
      <div>
        <div className='pt-9'>
          <img src={games} alt="" className='mx-auto w-full' />

          <div className='flex justify-between items-center px-3 pt-4'>
            <button className='flex items-center gap-2 bg-[#261D61] border border-[#48407B] pl-2 pr-4 py-2 text-xs rounded-full'>
              {/* ✅ Avatar */}
              {avatar ? (
                <img src={avatar} alt="Avatar" className='w-7 h-7 rounded-full' />
              ) : (
                <div className='w-7 h-7 rounded-full bg-gray-600'></div>
              )}
              {savedName}
            </button>

            <div className='text-right mt-1'>
              <p className='text-[#C4C4C4] text-xs'>Current balance</p>
              <p className='flex items-center gap-1 text-sm font-bold'>
                <img src={coin} alt="" className='h-9' />
                {balance.toLocaleString()}
              </p>
            </div>
          </div>

          <div className='mt-8 space-y-3'>

            <div className='mx-4 p-[6px] object-cover border border-[#48407B] rounded-xl [background:var(--Box-color,#19162C)] [box-shadow:0_0_19.5px_0_#2D1DA2]'>
              <img src={rolette} alt="" className='rounded-xl w-full' />
              <div className='flex justify-between items-center px-4 py-2'>
                <p>Rolette</p>
                <Link to="/rolette">
                  <button className='bg-[#50B563] px-4 py-1 rounded-lg cursor-pointer'>Play</button>
                </Link>
              </div>
            </div>

            <div className='mx-4 p-[6px] object-cover border border-[#48407B] rounded-xl [background:var(--Box-color,#19162C)] [box-shadow:0_0_19.5px_0_#2D1DA2]'>
              <img src={blackjack} alt="" className='rounded-xl w-full' />
              <div className='flex justify-between items-center px-4 py-2'>
                <p>Black Jack</p>
                <Link to="/blackjack">
                  <button className='bg-[#50B563] px-4 py-1 rounded-lg cursor-pointer'>Play</button>
                </Link>
              </div>
            </div>

            <div className='mx-4 p-[6px] object-cover border border-[#48407B] rounded-xl [background:var(--Box-color,#19162C)] [box-shadow:0_0_19.5px_0_#2D1DA2]'>
              <img src={pokergame} alt="" className='rounded-xl w-full' />
              <div className='flex justify-between items-center px-4 py-2'>
                <p>Poker</p>
                <Link to="/poker">
                  <button className='bg-[#50B563] px-4 py-1 rounded-lg cursor-pointer'>Play</button>
                </Link>
              </div>
            </div>

            <div className='mx-4 p-[6px] object-cover border border-[#48407B] rounded-xl [background:var(--Box-color,#19162C)] [box-shadow:0_0_19.5px_0_#2D1DA2]'>
              <img src={slot} alt="" className='rounded-xl w-full' />
              <div className='flex justify-between items-center px-4 py-2'>
                <p>Slot</p>
                <Link to="/slot">
                  <button className='bg-[#50B563] px-4 py-1 rounded-lg cursor-pointer'>Play</button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
