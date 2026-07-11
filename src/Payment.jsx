import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const RECEIVER = "0xb438fce307429889cc8660106d186a3060703491".toLowerCase();

const NETWORK = {
  chainId: "0x38",
  rpc: "https://bsc-dataseed.binance.org/",
  name: "BNB Smart Chain Mainnet",
  nativeSymbol: "BNB",
};

const products = [
  { id: 1, name: "Basic Pack", priceBNB: "0.001" },
  { id: 2, name: "Pro Pack", priceBNB: "0.01" },
  { id: 3, name: "Ultimate Pack", priceBNB: "0.05" },
];

const getMetaMaskProvider = () => {
  if (!window.ethereum) throw new Error("MetaMask not installed!");
  const providers = Array.isArray(window.ethereum.providers)
    ? window.ethereum.providers
    : [window.ethereum];
  const metaMask = providers.find(p => p.isMetaMask && !p.isTrust && !p.isPhantom);
  if (!metaMask) throw new Error("Please select MetaMask.");
  return metaMask;
};

export default function PaymentBNBMainnet() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const txHash = urlParams.get("txHash");

    if (status === "cancelled") {
      alert("Transaction cancelled / rejected.");
      window.history.replaceState({}, "", window.location.pathname);
    } else if (status === "success" && txHash) {
      alert(`Payment Successful! Tx: ${txHash}`);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Auto check polling (যদি selectedProduct থাকে + mobile)
  useEffect(() => {
    if (!selectedProduct || !/Android|iPhone/i.test(navigator.userAgent)) return;

    const interval = setInterval(() => {
      checkPaymentStatus(true); // silent = true → no alert, শুধু status update
    }, 15000); // 15 sec interval (rate limit avoid)

    return () => clearInterval(interval);
  }, [selectedProduct]);

  const ensureMainnet = async (provider) => {
    try {
      await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: NETWORK.chainId }] });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: NETWORK.chainId,
            chainName: NETWORK.name,
            nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
            rpcUrls: [NETWORK.rpc],
            blockExplorerUrls: ["https://bscscan.com"],
          }],
        });
      } else {
        throw switchError;
      }
    }
  };

  const handleBuy = async (product) => {
    setSelectedProduct(product);
    setLoading(true);
    setStatusMessage("");

    try {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const hasInjected = !!window.ethereum;

      if (isMobile && !hasInjected) {
        const valueHex = ethers.parseUnits(product.priceBNB, 18).toString(16);
        const deepLink = `https://link.metamask.io/send/${RECEIVER}@56?value=0x${valueHex}`;
        window.location.href = deepLink;
        setStatusMessage("MetaMask খুলেছে। Confirm/Cancel করে ফিরে এসো। Auto চেক হচ্ছে...");
        setLoading(false);
        return;
      }

      // Desktop logic...
      const provider = getMetaMaskProvider();
      await provider.request({ method: "eth_requestAccounts" });
      await ensureMainnet(provider);

      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const value = ethers.parseUnits(product.priceBNB, 18);

      alert(`Confirm in MetaMask: ${product.priceBNB} BNB + gas`);

      const txResponse = await signer.sendTransaction({ to: RECEIVER, value, gasLimit: 21000 });
      await txResponse.wait();

      alert(`Success!\nTx: ${txResponse.hash}\nhttps://bscscan.com/tx/${txResponse.hash}`);
    } catch (err) {
      console.error(err);
      if (err.code === 4001) alert("Rejected.");
      else if (err.message?.includes("insufficient")) alert("BNB কম।");
      else alert(`Error: ${err.message}`);
    } finally {
      if (!isMobile || hasInjected) setLoading(false);
    }
  };

  const checkPaymentStatus = async (silent = false) => {
    if (!selectedProduct) return;

    if (!silent) {
      setChecking(true);
      setStatusMessage("Checking recent payments...");
    }

    try {
      const provider = new ethers.JsonRpcProvider(NETWORK.rpc);
      const latestBlock = await provider.getBlockNumber();
      const fromBlock = latestBlock - 200; // আরও বেশি blocks

      let foundTx = null;

      for (let blockNum = latestBlock; blockNum >= fromBlock; blockNum--) {
        const block = await provider.getBlock(blockNum, true);
        if (!block) continue;

        // v6 fix: prefetchedTransactions if available, else fetch tx individually
        const txs = block.prefetchedTransactions || block.transactions || [];

        for (const txOrHash of txs) {
          let tx;
          if (typeof txOrHash === 'string') {
            // If only hash, fetch full tx
            tx = await provider.getTransaction(txOrHash);
          } else {
            tx = txOrHash;
          }

          if (tx && tx.to && tx.to.toLowerCase() === RECEIVER && tx.value && tx.value.eq(ethers.parseUnits(selectedProduct.priceBNB, 18))) {
            foundTx = tx;
            break;
          }
        }
        if (foundTx) break;
      }

      if (foundTx) {
        const msg = `Payment Success!\nTx Hash: ${foundTx.hash}\nView: https://bscscan.com/tx/${foundTx.hash}`;
        if (!silent) alert(msg);
        setStatusMessage("Success! " + msg);
        // Optional: reset selectedProduct after success
        // setSelectedProduct(null);
      } else {
        const msg = "No matching payment found yet (cancelled or pending). Try later.";
        if (!silent) alert(msg);
        setStatusMessage(msg);
      }
    } catch (err) {
      console.error("Check error:", err);
      const msg = "Check failed (RPC/network issue). Try BSCScan manually.";
      if (!silent) alert(msg);
      setStatusMessage(msg);
    } finally {
      if (!silent) setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">BNB Payment (Mainnet)</h1>
      <p className="text-gray-400 mb-8">
        Network: {NETWORK.name} | Receiver: {RECEIVER.slice(0, 6)}...{RECEIVER.slice(-4)}
      </p>

      {statusMessage && <p className="text-yellow-300 mb-6 text-center">{statusMessage}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 border border-gray-700 p-5 rounded-2xl text-center hover:border-yellow-500 transition-all">
            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
            <p className="text-2xl font-bold text-yellow-400 mb-4">{p.priceBNB} {NETWORK.nativeSymbol}</p>
            <button
              disabled={loading}
              onClick={() => handleBuy(p)}
              className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
                loading && selectedProduct?.id === p.id ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg"
              }`}
            >
              {loading && selectedProduct?.id === p.id ? "Opening..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

      {/Android|iPhone/i.test(navigator.userAgent) && (
        <div className="mt-10 text-center">
          <p className="text-sm text-yellow-300 mb-4">
            MetaMask অ্যাপ খুলবে। Confirm/Cancel করে ফিরে এসো। Auto চেক চলছে (15s)।
          </p>
          <button
            onClick={() => checkPaymentStatus(false)}
            disabled={checking || !selectedProduct || loading}
            className={`px-8 py-4 rounded-xl font-bold text-xl mt-4 ${
              !selectedProduct || checking || loading ? "bg-gray-700 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {checking ? "Checking..." : "Manual Check Now"}
          </button>
        </div>
      )}
    </div>
  );
}