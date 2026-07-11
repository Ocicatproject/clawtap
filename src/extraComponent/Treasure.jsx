import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

import treasury from "../assets/Treasury.png";
import diamond from "../assets/diamond.svg";
import bnb from "../assets/bnb.svg";
import nft from "../assets/nft.png";
import treasureone from "../assets/treasureone.png";
import treasuretwo from "../assets/treasuretwo.png";
import treasurethree from "../assets/treasurethree.png";
import treasurefour from "../assets/treasurefour.png";
import treasurefive from "../assets/treasurefive.png";
import treasuresix from "../assets/treasuresix.png";
import music from "../assets/treasuremusic.wav";
import failmusic from "../assets/purchasefailed.wav";

// Treasure wallet address (like BuyAutominer style)
const TREASURE_WALLET_ADDRESS = "0xb0024dfd24899dc37d023321b9b65fb69d3fd336".toLowerCase();

const NETWORK = {
  chainId: "0x38",
  rpc: "https://bsc-dataseed.binance.org/",
  name: "BNB Smart Chain Mainnet",
  nativeSymbol: "BNB",
};

const Treasure = () => {
  const [diamonds, setDiamonds] = useState(0);
  const [processingButton, setProcessingButton] = useState(null);
  const [pendingPurchase, setPendingPurchase] = useState(null);

  const gemsList = [
    { key: "treasureone", img: treasureone, gems: 20, price: "0.00001" },
    { key: "treasuretwo", img: treasuretwo, gems: 50, price: "0.00001" },
    { key: "treasurethree", img: treasurethree, gems: 120, price: "0.00001" },
    { key: "treasurefour", img: treasurefour, gems: 250, price: "0.00001" },
    { key: "treasurefive", img: treasurefive, gems: 750, price: "0.00001" },
    { key: "treasuresix", img: treasuresix, gems: 2000, price: "0.00001" },
  ];

  const calculateTotalDiamonds = () => {
    let total = 0;
    gemsList.forEach((item) => {
      const count = parseInt(localStorage.getItem(item.key)) || 0;
      total += count * item.gems;
    });
    return total;
  };

  useEffect(() => {
    setDiamonds(calculateTotalDiamonds());
  }, []);

  // Auto polling for mobile & desktop
  useEffect(() => {
    if (!pendingPurchase) return;

    const interval = setInterval(async () => {
      await checkAndProcessPayment();
    }, 20000); // 20 sec

    return () => clearInterval(interval);
  }, [pendingPurchase]);

  const getMetaMaskProvider = () => {
    if (!window.ethereum) throw new Error("MetaMask not installed!");

    const providers = Array.isArray(window.ethereum.providers)
      ? window.ethereum.providers
      : [window.ethereum];

    const metaMask = providers.find(
      (p) => p.isMetaMask && !p.isTrust && !p.isPhantom
    );

    if (!metaMask) throw new Error("Please select MetaMask.");

    return metaMask;
  };

  const ensureMainnet = async (provider) => {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK.chainId }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: NETWORK.chainId,
              chainName: NETWORK.name,
              nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              rpcUrls: [NETWORK.rpc],
              blockExplorerUrls: ["https://bscscan.com"],
            },
          ],
        });
      } else {
        throw err;
      }
    }
  };

  const handleBuy = async (item) => {
    if (processingButton === item.key) return;

    const level = localStorage.getItem("level");

    const levelAccess = {
      wood: [],
      stone: [20, 50, 120],
      bronze: [20, 50, 120, 250],
      silver: [20, 50, 120, 250, 750],
      gold: [20, 50, 120, 250, 750, 2000],
    };

    // ❌ level না থাকলে
    if (!level) {
      alert("Level not found!");
      return;
    }

    // ❌ wood block
    if (level === "wood") {
      alert("❌ You must reach Stone level to buy gems.");
      return;
    }

    // ❌ restriction
    if (!levelAccess[level]?.includes(item.gems)) {
      alert(`❌ Your level (${level}) can't purchase this item.`);
      return;
    }

    setProcessingButton(item.key);
    setPendingPurchase(item);

    
    try {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const hasInjected = !!window.ethereum;

      if (isMobile && !hasInjected) {
        const valueHex = ethers.parseUnits(item.price, 18).toString(16);
        const deepLink = `https://link.metamask.io/send/${TREASURE_WALLET_ADDRESS}@56?value=0x${valueHex}`;
        window.location.href = deepLink;

        setProcessingButton(null);
        setPendingPurchase(item); // ✅ important for auto check
        return;
      }

      // Desktop logic
      const provider = getMetaMaskProvider();
      await provider.request({ method: "eth_requestAccounts" });
      await ensureMainnet(provider);

      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const value = ethers.parseUnits(item.price, 18);
      const tx = { to: TREASURE_WALLET_ADDRESS, value, gasLimit: 21000 };

      alert(`Confirm in MetaMask: ${item.price} BNB`);

      const txResponse = await signer.sendTransaction(tx);
      await txResponse.wait();

      alert(`Payment Successful! Tx: ${txResponse.hash}`);

      new Audio(music).play().catch(() => { });

      const prevItemCount = parseInt(localStorage.getItem(item.key)) || 0;
      localStorage.setItem(item.key, prevItemCount + 1);

      const currentUpgradeEarn = parseInt(localStorage.getItem("upgrade-earn")) || 0;
      localStorage.setItem("upgrade-earn", currentUpgradeEarn + item.gems);

      setDiamonds(calculateTotalDiamonds());
      setPendingPurchase(null);
    } catch (err) {
      console.error("Payment failed:", err);

      let msg = "Payment cancelled or failed. Try again.";
      if (err.code === 4001) {
        msg = "Payment Cancelled / Rejected.";
      } else if (err.message?.includes("insufficient")) {
        msg = "Insufficient BNB balance (need payment + gas).";
      }
      alert(msg);

      new Audio(failmusic).play().catch(() => { });
      setPendingPurchase(null);
    } finally {
      setProcessingButton(null);
    }
  };

  const checkAndProcessPayment = async () => {
    if (!pendingPurchase) return;

    try {
      const provider = new ethers.JsonRpcProvider(NETWORK.rpc);
      const latestBlock = await provider.getBlockNumber();
      const fromBlock = latestBlock - 300;

      let foundTx = null;

      // Parallel scan
      const blockPromises = [];
      for (let i = latestBlock; i >= fromBlock; i--) {
        blockPromises.push(
          provider.getBlock(i, true).then(async (block) => {
            if (!block) return;
            const txs = block.prefetchedTransactions || block.transactions || [];
            for (const txOrHash of txs) {
              let tx = typeof txOrHash === "string" ? await provider.getTransaction(txOrHash) : txOrHash;
              if (
                tx &&
                tx.to?.toLowerCase() === TREASURE_WALLET_ADDRESS &&
                tx.value && tx.value.toString() === ethers.parseUnits(pendingPurchase.price, 18).toString()
              ) {
                foundTx = tx;
                return;
              }
            }
          })
        );
      }

      await Promise.all(blockPromises);

      if (foundTx) {
        new Audio(music).play().catch(() => { });

        const prevItemCount = parseInt(localStorage.getItem(pendingPurchase.key)) || 0;
        localStorage.setItem(pendingPurchase.key, prevItemCount + 1);

        const currentUpgradeEarn = parseInt(localStorage.getItem("upgrade-earn")) || 0;
        localStorage.setItem("upgrade-earn", currentUpgradeEarn + pendingPurchase.gems);

        setDiamonds(calculateTotalDiamonds());
        setPendingPurchase(null);
        alert("Payment Success! Gems added.");
      }
    } catch (err) {
      console.error("Auto check error:", err);
    }
  };

  return (
    <div className="py-3 shadow-[0_0_42px_0_rgba(96,84,183,0.52)]" style={{ background: "linear-gradient(180deg, #141318 0%, #0C082A 100%)" }}>
      <div className="pt-6">
        <div className="flex justify-start px-4">
          <Link to="/home">
            <button className="cursor-pointer bg-[#261D61] border border-[#48407B] px-3 py-2 rounded-xl">Back</button>
          </Link>
        </div>

        <img src={treasury} alt="" className="w-full -mt-1 mx-auto" />

        <p className="bg-[#48407B] p-3 text-justify mt-4 mx-4 rounded-xl text-sm font-[200]">
          Gems users have higher chances of making it into Mythic Rank. They also enjoy extra bonuses at purchase and distribution.
        </p>

        <div className="flex justify-between px-4 mt-5">
          <p className="text-sm font-[300]">Buy with</p>
          <p className="text-sm font-[300]">Total gems</p>
        </div>

        <div className="flex justify-between items-center px-4 mt-2">
          <div className="flex items-center gap-2 bg-[#261D61] pl-1 pr-3 py-1 rounded-3xl">
            <p className="text-sm flex justify-center items-center gap-1 bg-gradient-to-r from-[#6E12D7] via-[#4bffa596] to-[#1f42f4e3] text-white px-2 py-1 rounded-3xl font-semibold">
              <img src={bnb} alt="" /> BNB
            </p>
            <Link to="/nft">
              <p className="text-sm cursor-pointer flex justify-center items-center font-semibold">
                <img src={nft} alt="" className="h-5" /> NFT
              </p>
            </Link>
          </div>

          <div className="flex gap-1 items-center -mt-1">
            <img src={diamond} alt="" className="h-7" />
            <p className="text-[24px]">{diamonds}</p>
          </div>
        </div>

        <div className="px-4 grid grid-cols-2 mt-6 gap-3">
          {gemsList.map((item) => (
            <div key={item.key} className="bg-[#19162C] border rounded-xl border-[#48407B] py-3 text-xs text-[#E5E5E5] shadow-[0_0_82px_0_rgba(96,84,183,0.52)]">
              <div className="flex justify-between items-center px-3 pb-3">
                <p className="bg-[#48407B] px-2 py-1 rounded-lg">0x</p>
                <p className="flex items-center gap-1">
                  <img src={bnb} alt="" /> {item.price}
                </p>
              </div>

              <img src={item.img} alt="" className="mx-auto" />
              <p className="border-t border-[#48407B] mt-2 mb-2"></p>

              <div className="flex justify-between items-center px-3">
                <p>{item.gems} Gems</p>
                <button
                  onClick={() => handleBuy(item)}
                  disabled={processingButton === item.key}
                  className="py-1 px-2 bg-[#782AF9] rounded-md cursor-pointer disabled:opacity-50"
                >
                  {processingButton === item.key ? "Processing..." : "Buy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="bg-[#864607] p-4 mx-4 text-xs rounded-xl mt-5 text-left">
          You cannot buy a gem until you have entered stone level.
        </p>
      </div>
    </div>
  );
};

export default Treasure;