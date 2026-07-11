import { useEffect, useState } from "react";
import wallet from '../assets/walletimg.png';
import bnb from '../assets/bnb.svg';
import swap from '../assets/swap.svg';
import treasureone from '../assets/treasureone.png';
import treasuretwo from '../assets/treasuretwo.png';
import treasurethree from '../assets/treasurethree.png';
import treasurefour from '../assets/treasurefour.png';
import treasurefive from '../assets/treasurefive.png';
import treasuresix from '../assets/treasuresix.png';

const Wallet = () => {
  const [clawBalance, setClawBalance] = useState(0);
  const [ocicatBalance] = useState(0); // demo
  const [isSwapped, setIsSwapped] = useState(false);
  const [inputValue, setInputValue] = useState("0");
  const [transactions, setTransactions] = useState([]);

  // Gems list definition
  const gemsList = [
    { key: "treasureone", img: treasureone, gems: 20, price: "0.02" },
    { key: "treasuretwo", img: treasuretwo, gems: 50, price: "0.04" },
    { key: "treasurethree", img: treasurethree, gems: 120, price: "0.08" },
    { key: "treasurefour", img: treasurefour, gems: 250, price: "0.16" },
    { key: "treasurefive", img: treasurefive, gems: 750, price: "0.32" },
    { key: "treasuresix", img: treasuresix, gems: 2000, price: "0.64" },
  ];

  // Load balances and transactions from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance") || "0";
    setClawBalance(parseFloat(savedBalance));
    setInputValue(savedBalance);

    // Load transactions
    let tempTransactions = [];
    gemsList.forEach(item => {
      const value = parseInt(localStorage.getItem(item.key)) || 0;
      for (let i = 0; i < value; i++) {
        tempTransactions.push(item);
      }
    });
    setTransactions(tempTransactions);
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    setInputValue(isSwapped ? clawBalance : ocicatBalance);
  };

  const handleMax = () => {
    const savedBalance = localStorage.getItem("balance") || "0";
    setInputValue(savedBalance);
  };

  const balanceTitle = isSwapped ? "Ocicat Balance" : "$Claw Balance";
  const displayBalance = isSwapped ? ocicatBalance : clawBalance;

  return (
    <div className='bg-black pb-32'>
      <div className='pt-9'>
        <img src={wallet} alt="" className='w-full mx-auto' />

        <div className='relative'>
          <div className='border border-[#48407B] flex items-center justify-between bg-[#261D61] mt-7 mx-3 px-4 py-3 rounded-xl '>
            <div>
              <p className='text-[#C4C4C4]  text-left'>{balanceTitle}</p>
              <input
                type="number"
                value={inputValue}
                onChange={handleChange}
                className="bg-transparent text-[#FFBA00] text-[24px] text-left outline-none w-full"
              />
            </div>
            <div className='space-y-1 text-right'>
              <p className='text-[#C4C4C4] text-[11px]'>{displayBalance}</p>
              <button
                onClick={handleMax}
                className='text-[#C4C4C4] text-xs px-3 py-1 rounded-md cursor-pointer bg-[#48407B]'
              >
                Max
              </button>
            </div>
          </div>
          <div className='border border-[#48407B] bg-[#261D61] mt-2 mx-3 px-4 py-3 rounded-xl '>
            <p className='text-[#C4C4C4]  text-left'>{isSwapped ? "$Claw Balance" : "Ocicat Balance"}</p>
            <p className='text-[#FFBA00] text-[24px] text-left '>
              {isSwapped ? clawBalance : ocicatBalance}
            </p>
          </div>
          <img
            src={swap}
            alt=""
            onClick={handleSwap}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-97 transition"
          />
        </div>

        <div className='mt-3 space-x-3 mb-10'>
          <button className='border border-[#48407B] bg-[#261D61] px-3 py-2 rounded-xl'>Convert</button>
          <button className='border border-[#48407B] bg-[#261D61] px-3 py-2 rounded-xl'>Withdraw</button>
        </div>
      </div>

      {/* Transaction History */}
      <p className='font-medium text-lg text-left px-4 pb-1'> Transaction History</p>
      <div className='bg-[#0C082A] py-3 mx-2 space-y-2'>
        {transactions.length === 0 ? (
          <p className='text-[#C4C4C4] px-4 py-3'>No transaction history available</p>
        ) : (
          transactions.map((item, idx) => (
            <div key={idx} className='mx-3 py-4 px-5 flex justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl'>
              <div className='flex items-center gap-5'>
                <img src={item.img} alt="" className="h-14" />
                <div>
                  <p className=''>{item.gems} Gems</p>
                  <p className='flex items-center gap-1'> <img src={bnb} alt="" /> {item.price}</p>
                </div>
              </div>
              <div>
                <button className='bg-[#48407B] text-[#E5E5E5] text-sm px-3 py-1 rounded-md'>active</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wallet;
