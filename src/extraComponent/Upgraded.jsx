import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/arrow-right.svg';

import bnb from '../assets/bnb.svg';
import walletgmone from '../assets/walletgmone.png';
import walletgmtwo from '../assets/walletgmtwo.png';
import walletgmthree from '../assets/walletgmthree.png';
import gem from '../assets/Gem.png';

const TREASURES = [
  { key: "treasureone", img: walletgmone, gems: 20, price: "0.02" },
  { key: "treasuretwo", img: walletgmtwo, gems: 50, price: "0.04" },
  { key: "treasurethree", img: walletgmthree, gems: 120, price: "0.08" },
  { key: "treasurefour", img: gem, gems: 250, price: "0.16" },
  { key: "treasurefive", img: walletgmone, gems: 750, price: "0.32" },
  { key: "treasuresix", img: walletgmtwo, gems: 2000, price: "0.64" },
];

const Upgraded = () => {
  const [purchased, setPurchased] = useState({});

  useEffect(() => {
    const data = {};
    TREASURES.forEach(t => {
      const count = parseInt(localStorage.getItem(t.key)) || 0;
      if (count > 0) data[t.key] = count;
    });
    setPurchased(data);
  }, []);

  const renderCards = () => {
    const cards = [];
    Object.keys(purchased).forEach(key => {
      const treasure = TREASURES.find(t => t.key === key);
      for (let i = 0; i < purchased[key]; i++) {
        cards.push(
          <div key={`${key}-${i}`} className='mx-3 py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl'>
            <div className='flex items-center gap-5'>
              <img src={treasure.img} alt="" />
              <div>
                <p className=''> {treasure.gems} Gems</p>
                <p className='flex items-center gap-1'> <img src={bnb} alt="" /> {treasure.price}</p>
              </div>
            </div>
            <div>
              <button className='bg-[#48407B] text-[#E5E5E5] text-sm px-3 py-1 rounded-md'>active</button>
            </div>
          </div>
        );
      }
    });
    if (cards.length === 0) {
      return <p className='text-center text-[#E5E5E5] mt-10'>No data available</p>;
    }
    return cards;
  };

  return (
    <div
      className=" min-h-screen"
      style={{
        background: "var(--Gradient, linear-gradient(180deg, #141318 0%, #0C082A 100%))",
      }}
    >
      <div className='pt-9 flex  items-center justify-between px-3 pb-7'>
        <Link to="/home">
          <img className='rotate-180  h-7' src={icon} alt="" />
        </Link>

        <p
          className="  [font-size:25px] [font-style:normal] font-bold   [line-height:normal] bg-[linear-gradient(180deg,#FFE016_0%,#EF6300_100%)] bg-clip-text text-transparent"
        > Upgraded Earning</p>
      </div>

      <div className='space-y-3'>
        {renderCards()}
      </div>
    </div>
  );
};

export default Upgraded;
