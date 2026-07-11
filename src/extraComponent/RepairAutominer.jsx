import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

// Assets
import telegrambg from "../assets/telegrambg.png";
import bnb from "../assets/bnb.svg";
import coin from "../assets/coin.png";
import autominer from "../assets/Side box.png";

// Receiver wallet address
const RECEIVER_WALLET_ADDRESS = "0xb0024dfd24899dc37d023321b9b65fb69d3fd336".toLowerCase();

// BSC Mainnet
const NETWORK = {
  chainId: "0x38",
  rpc: "https://bsc-dataseed.binance.org/",
  name: "BNB Smart Chain Mainnet",
  nativeSymbol: "BNB",
};

// LocalStorage keys
const STORAGE_KEY = "miningStartTime";
const REPAIR_KEY = "repair";
const CLAIM_KEY = "claimPending";

const RepairAutominer = () => {
  const navigate = useNavigate();

  const [cooldown, setCooldown] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [miningBalance, setMiningBalance] = useState(0);
  const [isClaimAvailable, setIsClaimAvailable] = useState(false);
  const [repair, setRepair] = useState(false);
  const [miningPurchase, setMiningPurchase] = useState(false);
  const [pendingRepair, setPendingRepair] = useState(false); // mobile polling flag

  const MINING_DURATION = 10 * 60 * 60; // 10 hours
  const TEN_DAYS = 10 * 24 * 60 * 60; // 10 days in seconds

  // Helper to check purchaseDate
  const isWithinTenDays = () => {
    const purchaseDate = localStorage.getItem("purchaseDate");
    if (!purchaseDate) return false;
    const purchaseTime = new Date(purchaseDate).getTime();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - purchaseTime) / 1000);
    return elapsedSeconds < TEN_DAYS;
  };

  // Load states on mount
  useEffect(() => {
    const storedMining = localStorage.getItem("mining") === "true";
    const storedBalance = Number(localStorage.getItem("mining-balance")) || 0;
    const storedRepair = localStorage.getItem(REPAIR_KEY) === "true";
    const storedPurchase = ["true", "yes"].includes(localStorage.getItem("miningPurchase"));

    setRepair(storedRepair);
    setMiningPurchase(storedPurchase);
    setMiningBalance(storedBalance);

    const withinTenDays = isWithinTenDays();

    // Mining cooldown check
    if (storedMining && localStorage.getItem(STORAGE_KEY)) {
      const elapsed = Math.floor((Date.now() - Number(localStorage.getItem(STORAGE_KEY))) / 1000);
      const remaining = MINING_DURATION - elapsed;
      if (remaining > 0) {
        setCooldown(remaining);
        setIsMining(true);
      } else {
        setCooldown(0);
        setIsMining(false);
        setIsClaimAvailable(true);
        localStorage.setItem("mining", "false");
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(CLAIM_KEY, "true");
      }
    }

    // Disable mining button if 10 days passed
    if (!withinTenDays) setIsMining(false);

    // Disable repair button if 10 days not finished
    if (withinTenDays) setRepair(true);
  }, []);

  // Mining loop
  useEffect(() => {
    if (!isMining) return;

    const interval = setInterval(() => {
      const storedStart = Number(localStorage.getItem(STORAGE_KEY));
      if (!storedStart) return;

      const elapsed = Math.floor((Date.now() - storedStart) / 1000);
      const remaining = MINING_DURATION - elapsed;

      if (remaining <= 0) {
        setCooldown(0);
        setIsMining(false);
        setIsClaimAvailable(true);
        localStorage.setItem("mining", "false");
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(CLAIM_KEY, "true");
        return;
      }

      setCooldown(remaining);

      // Increment mining balance
      const lastIncrement = Number(localStorage.getItem("lastIncrementTime")) || storedStart;
      const secondsPassed = Math.floor((Date.now() - lastIncrement) / 1000);
      if (secondsPassed > 0) {
        const profit = Number(localStorage.getItem("profit-per-click")) || 1;
        const upgrade = Number(localStorage.getItem("upgrade-earn")) || 0;
        const speed = Number(localStorage.getItem("speed-level")) || 1;
        const add = secondsPassed * (profit + upgrade) * speed;

        const newBalance = miningBalance + add;
        setMiningBalance(newBalance);
        localStorage.setItem("mining-balance", newBalance);
        localStorage.setItem("lastIncrementTime", Date.now().toString());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMining, miningBalance]);

  // Start Mining
  const handleMining = () => {
    const withinTenDays = isWithinTenDays();
    if (!withinTenDays) return;
    if (!(repair || miningPurchase)) return;
    if (localStorage.getItem(CLAIM_KEY) === "true") return;

    const startTime = Date.now();
    localStorage.setItem(STORAGE_KEY, startTime.toString());
    localStorage.setItem("mining", "true");
    localStorage.setItem("lastIncrementTime", startTime.toString());
    setCooldown(MINING_DURATION);
    setIsMining(true);
    setIsClaimAvailable(false);
  };

  // Claim Mining Balance
  const handleClaim = () => {
    const mainBalance = Number(localStorage.getItem("balance")) || 30000000;
    localStorage.setItem("balance", mainBalance + miningBalance);
    setMiningBalance(0);
    localStorage.setItem("mining-balance", 0);
    setCooldown(0);
    setIsClaimAvailable(false);
    localStorage.removeItem(CLAIM_KEY);
  };

  // Repair & Payment (updated with mobile deep link + polling)
  const handleRepair = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const hasInjected = !!window.ethereum;

      if (isMobile && !hasInjected) {
        // Mobile deep link - MetaMask app খুলবে
        const valueHex = ethers.parseEther("0.00002").toString(16);
        const deepLink = `https://link.metamask.io/send/${RECEIVER_WALLET_ADDRESS}@56?value=0x${valueHex}`;
        window.location.href = deepLink;

        setIsProcessing(false);
        setPendingRepair(true); // polling শুরু
        return;
      }

      // Desktop / injected MetaMask (আগের logic একদম same)
      const provider = getMetaMaskProvider();
      await provider.request({ method: "eth_requestAccounts" });
      await ensureMainnet(provider);

      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const value = ethers.parseEther("0.00002");
      const tx = { to: RECEIVER_WALLET_ADDRESS, value, gasLimit: 21000 };

      alert(`Confirm in MetaMask: 0.00002 BNB`);

      const txResponse = await signer.sendTransaction(tx);
      await txResponse.wait();

      alert(`Payment Successful! Tx: ${txResponse.hash}`);

      // Success flow (আগের মতোই)
      setRepair(true);
      localStorage.setItem(REPAIR_KEY, "true");
      localStorage.setItem("repairTime", Date.now().toString());
      localStorage.setItem("purchaseDate", new Date().toISOString());
    } catch (err) {
      console.error("Payment failed:", err);

      let msg = "Payment cancelled or failed. Try again.";
      if (err.code === 4001) {
        msg = "Payment Cancelled / Rejected.";
      } else if (err.message?.includes("insufficient")) {
        msg = "Insufficient BNB balance (need payment + gas).";
      }
      alert(msg);
    } finally {
      setIsProcessing(false);
      setPendingRepair(false);
    }
  };

  const getMetaMaskProvider = () => {
    if (!window.ethereum) throw new Error("MetaMask not installed!");
    const providers = Array.isArray(window.ethereum.providers)
      ? window.ethereum.providers
      : [window.ethereum];
    const metaMask = providers.find((p) => p.isMetaMask && !p.isTrust && !p.isPhantom);
    if (!metaMask) throw new Error("Please select MetaMask in your wallet.");
    return metaMask;
  };

  const ensureMainnet = async (provider) => {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORK.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
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
      } else throw switchError;
    }
  };

  // Mobile polling: repair tx success check (background)
  const checkRepairSuccess = async () => {
    if (!pendingRepair) return;

    try {
      const provider = new ethers.JsonRpcProvider(NETWORK.rpc);
      const latestBlock = await provider.getBlockNumber();
      const fromBlock = latestBlock - 400;

      let found = false;

      for (let blockNum = latestBlock; blockNum >= fromBlock; blockNum--) {
        const block = await provider.getBlock(blockNum, true);
        if (!block) continue;

        const txs = block.prefetchedTransactions || block.transactions || [];
        for (const txOrHash of txs) {
          let tx = typeof txOrHash === "string" ? await provider.getTransaction(txOrHash) : txOrHash;

          if (
            tx &&
            tx.to?.toLowerCase() === RECEIVER_WALLET_ADDRESS &&
            tx.value && tx.value.toString() === ethers.parseEther("0.00002").toString()
          ) {
            found = true;
            break;
          }
        }
        if (found) break;
      }

      if (found) {
        // Success flow (আগের মতোই)
        setRepair(true);
        localStorage.setItem(REPAIR_KEY, "true");
        localStorage.setItem("repairTime", Date.now().toString());
        localStorage.setItem("purchaseDate", new Date().toISOString());
        setPendingRepair(false);
      }
    } catch (err) {
      console.error("Repair polling error:", err.message);
    }
  };

  const formatTimeForButton = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="relative w-full h-screen">
      <img src={telegrambg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full rounded-t-3xl border-t border-[#40FF54] bg-[#141318] backdrop-blur-md shadow-lg p-6 flex flex-col items-center ">
        <button
          onClick={() => navigate("/home")}
          className="absolute top-3 right-5 text-gray-300 text-3xl font-light cursor-pointer hover:text-red-500"
        >
          ×
        </button>

        <p className="text-[20px] font-bold text-[#E5E5E5] pt-5 pb-1 opacity-90">AutoMiner</p>
        <p className="text-[18px] flex items-center justify-center gap-2">
          <img src={coin} alt="coin" className="h-7" /> {miningBalance.toLocaleString()}
        </p>
        <img src={autominer} alt="autominer" className="mt-4 pb-8 mx-auto" />

        <div className="flex gap-2 w-full">
          {/* Mining Button */}
          <button
            onClick={handleMining}
            disabled={!isWithinTenDays() || !(repair || miningPurchase) || cooldown > 0}
            className={`w-full py-4 rounded-lg text-sm text-white shadow-lg transition ${
              !isWithinTenDays() || !(repair || miningPurchase) || cooldown > 0
                ? "bg-[#782AF9]/50 cursor-not-allowed"
                : "bg-[#782AF9] hover:opacity-90"
            }`}
            style={{ borderRadius: "9px" }}
          >
            {isMining ? `Mining ${formatTimeForButton(cooldown)}` : "Start Mining"}
          </button>

          {/* Repair Button */}
          <button
            onClick={handleRepair}
            disabled={isProcessing || isMining || isWithinTenDays()}
            className={`w-full flex border border-[#782AF9] justify-center items-center gap-2 py-4 rounded-lg text-sm text-white shadow-lg transition ${
              isProcessing || isMining || isWithinTenDays()
                ? "cursor-not-allowed bg-[#0E0B24]/50"
                : "bg-[#782AF9] cursor-pointer hover:opacity-90"
            }`}
            style={{ borderRadius: "9px" }}
          >
            {isProcessing ? "Processing..." : <>Repair |0.00002<img src={bnb} alt="bnb" /></>}
          </button>
        </div>

        <p className="bg-[#854607] p-3 rounded-xl text-sm mt-3 mb-5 text-left font-light">
          Repair autominer every 10 days, Come back to claim every 10 hours
        </p>
      </div>
    </div>
  );
};

export default RepairAutominer;