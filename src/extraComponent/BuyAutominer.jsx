import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import telegrambg from "../assets/telegrambg.png";
import coin from "../assets/bnb.svg";
import autominer from "../assets/Side box.png";

// Receiver wallet address (MetaMask wallet)
const RECEIVER_WALLET_ADDRESS = "0xb0024dfd24899dc37d023321b9b65fb69d3fd336".toLowerCase();

// BSC Mainnet
const NETWORK = {
  chainId: "0x38",
  rpc: "https://bsc-dataseed.binance.org/",
  name: "BNB Smart Chain Mainnet",
  nativeSymbol: "BNB",
};

const BuyAutominer = () => {
  const navigate = useNavigate();
  const [claimed, setClaimed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  useEffect(() => {
    const alreadyPurchased = localStorage.getItem("miningPurchase");
    if (alreadyPurchased === "yes") {
      navigate("/repairMiner", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!pendingPayment) return;
    const interval = setInterval(async () => {
      await checkPaymentSuccess();
    }, 20000);
    return () => clearInterval(interval);
  }, [pendingPayment]);

  const getMetaMaskProvider = () => {
    if (!window.ethereum) throw new Error("MetaMask not installed!");
    const providers = Array.isArray(window.ethereum.providers)
      ? window.ethereum.providers
      : [window.ethereum];
    const metaMask = providers.find(p => p.isMetaMask && !p.isTrust && !p.isPhantom);
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
      } else {
        throw switchError;
      }
    }
  };

  const handleClaim = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const hasInjected = !!window.ethereum;

      const valueToSend = ethers.parseEther("0.0005"); // <<--- Test amount

      if (isMobile && !hasInjected) {
        const valueHex = valueToSend.toString(16);
        const deepLink = `https://link.metamask.io/send/${RECEIVER_WALLET_ADDRESS}@56?value=0x${valueHex}`;
        window.location.href = deepLink;
        setIsProcessing(false);
        setPendingPayment(true);
        return;
      }

      const provider = getMetaMaskProvider();
      await provider.request({ method: "eth_requestAccounts" });
      await ensureMainnet(provider);

      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const tx = { to: RECEIVER_WALLET_ADDRESS, value: valueToSend, gasLimit: 21000 };
      alert(`Confirm in MetaMask: 0.0005 BNB`);

      const txResponse = await signer.sendTransaction(tx);
      await txResponse.wait();

      alert(`Payment Successful! Tx: ${txResponse.hash}`);

      localStorage.setItem("miningPurchase", "yes");
      localStorage.setItem("purchaseDate", new Date().toISOString());

      setClaimed(true);
      setTimeout(() => navigate("/repairMiner", { replace: true }), 1000);
    } catch (err) {
      console.error("Payment failed:", err);
      let msg = "Payment cancelled or failed. Try again.";
      if (err.code === 4001) msg = "Payment Cancelled / Rejected.";
      else if (err.message?.includes("insufficient")) msg = "Insufficient BNB balance (need payment + gas).";
      alert(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const checkPaymentSuccess = async () => {
    if (!pendingPayment) return;
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
            tx.value && tx.value.toString() === ethers.parseEther("0.0005").toString()
          ) {
            found = true;
            break;
          }
        }
        if (found) break;
      }

      if (found) {
        localStorage.setItem("miningPurchase", "yes");
        localStorage.setItem("purchaseDate", new Date().toISOString());
        setClaimed(true);
        setPendingPayment(false);
        setTimeout(() => navigate("/repairMiner", { replace: true }), 1000);
      }
    } catch (err) {
      console.error("Polling error:", err.message);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img src={telegrambg} alt="Telegram Background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full rounded-t-3xl border-t border-[#40FF54] bg-[#141318] backdrop-blur-md shadow-lg p-6 flex flex-col items-center ">
        {!claimed && (
          <>
            <button
              onClick={() => navigate("/boost")}
              className="absolute top-3 right-5 text-gray-300 text-3xl font-light hover:text-red-500"
            >
              ×
            </button>
            <p className="text-center text-[20px] font-bold text-[#E5E5E5] pt-5 opacity-90 pb-3">AutoMiner</p>
            <img className="pb-8 mt-4 mx-auto" src={autominer} alt="" />
            <button
              onClick={handleClaim}
              disabled={isProcessing}
              className="w-full flex justify-center items-center gap-2 py-4 rounded-lg cursor-pointer text-sm text-white shadow-lg hover:opacity-90 transition disabled:opacity-50"
              style={{ borderRadius: "9px", background: "#782AF9" }}
            >
              {isProcessing ? "Processing..." : <>Buy Item <img src={coin} alt="" /> 0.0005</>}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyAutominer;