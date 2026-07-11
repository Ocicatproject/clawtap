import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { auth } from "../firebase.init";
import { signOut } from "firebase/auth";
import loaderbg from '../assets/loaderbg.png';
import polygon from '../assets/Polygon 1.png';

// ✅ Global provider ref
let walletProvider = null;

const HallOfFrame = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [wallet, setWallet] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Load wallet from localStorage
  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) setWallet(storedWallet);

    const updateUserBalance = async () => {
      const localBalance = Number(localStorage.getItem("balance")) || 0;
      const localEmail = localStorage.getItem("email") || "";
      const localWallet = localStorage.getItem("wallet") || "";
      const localName = localStorage.getItem("name") || "";

      try {
        let query = "";
        if (localEmail) query = `email=${localEmail}`;
        else if (localWallet) query = localName ? `wallet=${localWallet}&name=${localName}` : `wallet=${localWallet}`;

        if (query) {
          const res = await fetch(`https://claw-server-six.vercel.app/users/single?${query}`);
          if (res.ok) {
            const user = await res.json();
            await fetch(`https://claw-server-six.vercel.app/users/${user._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ balance: localBalance }),
            });
          }
        }

        const resAll = await fetch("https://claw-server-six.vercel.app/users");
        let allUsers = await resAll.json();
        allUsers = allUsers.sort((a, b) => (b.balance || 0) - (a.balance || 0));
        setUsers(allUsers);
        setTotalPlayers(allUsers.length);
      } catch (err) {
        console.error("Error updating/fetching users:", err);
        setUsers([]);
        setTotalPlayers(0);
      }
    };

    updateUserBalance();
  }, []);

  const shortWallet = (addr) => (addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : "");

  const handleConnect = async () => {
    if (wallet) {
      setShowLogoutModal(true); // Already connected → show logout modal
      return;
    }

    try {
      walletProvider = await EthereumProvider.init({
        projectId: "3512d1bdac0f4f231647db5b70e056cb",
        chains: [56],
        showQrModal: true,
        rpc: { 56: "https://bsc-dataseed.binance.org" },
      });

      await walletProvider.enable();
      const walletAddress = walletProvider.accounts[0];

      // Check if wallet exists in DB
      const checkRes = await fetch(`https://claw-server-six.vercel.app/users/single?wallet=${walletAddress}`);
      if (checkRes.ok) {
        const existingUser = await checkRes.json();
        if (existingUser && existingUser.wallet === walletAddress) {
          alert("This wallet already exists in our record");
          if (walletProvider.disconnect) await walletProvider.disconnect();
          walletProvider = null;
          return;
        }
      }

      // Save wallet
      localStorage.setItem("wallet", walletAddress);
      setWallet(walletAddress);
    } catch (error) {
      console.error("Wallet connection failed:", error);
      if (walletProvider && walletProvider.disconnect) {
        await walletProvider.disconnect();
        walletProvider = null;
      }
    }
  };

 const confirmLogout = async () => {
  try {
    // ✅ 1. Wallet disconnect (WalletConnect / MetaMask / etc.)
    if (walletProvider) {
      try {
        await walletProvider.disconnect();
      } catch (e) {
        console.log("wallet disconnect error:", e);
      }
      walletProvider = null;
    }

    // ✅ 2. Remove ALL WalletConnect sessions 🔥
    Object.keys(localStorage).forEach((key) => {
      if (
        key.toLowerCase().includes("walletconnect") ||
        key.toLowerCase().includes("wc@") ||
        key.toLowerCase().includes("wagmi") ||
        key.toLowerCase().includes("web3")
      ) {
        localStorage.removeItem(key);
      }
    });

    // ✅ 3. Clear FULL storage (important)
    localStorage.clear();
    sessionStorage.clear();

    // ✅ 4. Firebase logout (Google login সহ)
    try {
      await signOut(auth);
    } catch (e) {
      console.log("firebase logout error:", e);
    }

    // ✅ 5. IndexedDB clear (advanced – WalletConnect v2)
    if (window.indexedDB) {
      indexedDB.databases &&
        indexedDB.databases().then((dbs) => {
          dbs.forEach((db) => {
            indexedDB.deleteDatabase(db.name);
          });
        });
    }

    // ✅ 6. Force reload + redirect (SPA না)
    window.location.replace("/");

  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loaderbg})`, backgroundRepeat: "no-repeat" }}
    >
      {/* Connect / Wallet Button */}
      <div className="pt-9 flex justify-end mx-4 relative">
        <button
          onClick={handleConnect}
          className="bg-[#261D61] cursor-pointer border border-[#48407B] px-3 py-2 rounded-xl text-white text-sm"
        >
          {wallet ? shortWallet(wallet) : "Connect"}
        </button>
      </div>

      {/* Hall of Fame Title */}
      <div className="text-center">
        <h1 className="mt-3 text-[26px] font-bold bg-[linear-gradient(180deg,#FFE016_0%,#EF6300_100%)] bg-clip-text text-transparent opacity-95">
          Hall Of Fame
        </h1>
        <div className="relative">
          <img src={polygon} alt="" className="mx-auto -mt-9 w-60 h-auto object-cover relative" />
          <p className="text-[#E5E5E5] absolute top-13 text-[13px] font-[200] left-1/2 -translate-x-1/2">
            Total Player
          </p>
        </div>
        <p className="-mt-9 text-[24px] font-bold text-[#E5E5E5]">{totalPlayers.toLocaleString()}</p>
      </div>

      {/* Users List */}
      <div className="mt-6 pb-38 bg-gradient-to-b from-[#0E0C1F] to-[#1B1733] rounded-t-3xl px-8 py-5 border border-[#48407B] shadow-lg max-h-[520px] overflow-y-auto">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="flex justify-between items-center py-2 border-b border-[#2A2345] last:border-none text-[#E5E5E5]"
          >
            <p className="text-sm text-[#E5E5E5]">
              <span className="text-[#E5E5E5] mr-2">{index + 1}.</span> {user.name}
            </p>
            <p className="text-sm text-[#E5E5E5]">{(user.balance || 0).toLocaleString()} claw</p>
          </div>
        ))}
      </div>

      {/* Back Home */}
      <div
        className="flex justify-center -mt-40 pt-20 pb-10 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(61, 39, 222, 0.00) 1%, rgba(43, 28, 158, 0.30) 28%, rgba(37, 24, 136, 0.85) 57%, #211578 91.5%)",
          backdropFilter: "blur(1.05px)",
        }}
      >
        <Link to="/home">
          <button className="cursor-pointer px-10 py-4 w-[320px] mx-4 rounded-xl text-white font-medium bg-[#782AF9] hover:bg-[#6a2ce0] transition-all">
            Back Home
          </button>
        </Link>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/15 backdrop-blur-sm bg-opacity-50 z-50">
          <div className="bg-[#141318] p-6 rounded-xl w-80 text-center shadow-lg border border-[#782AF9]">
            <p className="text-white text-lg font-semibold mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallOfFrame;