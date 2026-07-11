import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import metamask from "../assets/Metamask.svg";
import phantom from "../assets/Phantom.svg";
import walletconnect from "../assets/Walletconnect.svg";
import trust from "../assets/Trust.svg";
import { auth } from "../firebase.init";
import { GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useLocation } from "react-router-dom";


const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const referCode = pathParts[1] ? pathParts[1] : "00000";
  const finalRefer = referCode.toLowerCase();


  const wallets = [
    { id: "metamask", name: "Metamask", icon: metamask },
    { id: "phantom", name: "Phantom", icon: phantom },
    { id: "walletconnect", name: "WalletConnect", icon: walletconnect },
    { id: "trust", name: "Trust", icon: trust },
  ];

  // ✅ Check localStorage on page load
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedWallet = localStorage.getItem("wallet");
    if (savedName && savedWallet) {
      navigate("/home");
    }
  }, [navigate]);

  // ✅ Save ALL user data to localStorage
  const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem("name", userData.name || "");
    localStorage.setItem("wallet", userData.wallet || "");
    localStorage.setItem("email", userData.email || "");
    // localStorage.setItem("loginDate", new Date().toISOString());
    localStorage.setItem("purchaseDate", userData.purchaseDate);
    localStorage.setItem("dailyReward", userData.dailyReward);
    localStorage.setItem("dailyTask", userData.dailyTask);
    localStorage.setItem("telegramJoin", userData.telegramJoin);
    localStorage.setItem("youtubeSubscribed", userData.youtubeSubscribed);
    localStorage.setItem("xFollow", userData.xFollow);
    localStorage.setItem("instaFollow", userData.instaFollow);
    localStorage.setItem("tiktokFollow", userData.tiktokFollow);
    localStorage.setItem("ocicatFollow", userData.ocicatFollow);
    localStorage.setItem("id", userData._id || "");
    localStorage.setItem("bonus", userData.bonus);
    localStorage.setItem("dailyTap", userData.dailyTap);


    // Save ALL user data
    localStorage.setItem("userData", JSON.stringify(userData));

    // Save individual fields for easy access
    localStorage.setItem("level", userData.level || "wood");
    localStorage.setItem("balance", userData.balance?.toString() || "0");
    localStorage.setItem("profit-per-click", userData["profit-per-click"]?.toString() || "1");
    localStorage.setItem("upgrade-earn", userData["upgrade-earn"]?.toString() || "0");
    localStorage.setItem("speed-level", userData["speed-level"]?.toString() || "1");
    localStorage.setItem("energyLimit-level", userData["energyLimit-level"]?.toString() || "1");
    localStorage.setItem("miningPurchase", userData["miningPurchase"]?.toString() || "no");
    localStorage.setItem("repair", userData["repair"]?.toString() || "no");
    localStorage.setItem("treasureone", userData.treasureone || "0");
    localStorage.setItem("treasuretwo", userData.treasuretwo || "0");
    localStorage.setItem("treasurethree", userData.treasurethree || "0");
    localStorage.setItem("treasurefour", userData.treasurefour || "0");
    localStorage.setItem("treasurefive", userData.treasurefive || "0");
    localStorage.setItem("treasuresix", userData.treasuresix || "0");
    localStorage.setItem("loginDate", userData.signUpDate || new Date().toISOString());
    localStorage.setItem("loginDate", userData.lastDate || new Date().toISOString());
  };

  // ✅ Check if user exists in database by email or wallet
  const checkAndLoginUser = async (identifier, type) => {
    try {
      // First, get ALL users from database
      const response = await axios.get("https://claw-server-six.vercel.app/users");
      const allUsers = response.data;

      if (!allUsers || allUsers.length === 0) {
        return false; // No users in database
      }

      // Find user by email or wallet
      let existingUser = null;

      if (type === "email") {
        existingUser = allUsers.find(user => user.email === identifier);
      } else if (type === "wallet") {
        existingUser = allUsers.find(user => user.wallet?.toLowerCase() === identifier.toLowerCase());

      }

      // If user exists, save their ALL info to localStorage and navigate to home
      if (existingUser) {
        console.log("Existing user found:", existingUser);
        saveUserDataToLocalStorage(existingUser);
        navigate("/home");
        return true; // User exists
      }

      return false; // User doesn't exist
    } catch (err) {
      console.error("Error checking user:", err);
      return false;
    }
  };

  // ✅ Post new user helper
  const postUser = async (data) => {
    try {
      await axios.post("https://claw-server-six.vercel.app/users", {
        ...data,
        refer: finalRefer,
        bonus: false,
        signUpDate: new Date(),
        level: "wood",
        balance: 0,
        "profit-per-click": 1,
        "upgrade-earn": 0,
        "speed-level": 1,
        "energyLimit-level": 1,
        treasureone: '0',
        treasuretwo: '0',
        treasurethree: '0',
        treasurefour: '0',
        treasurefive: '0',
        treasuresix: '0',
        miningPurchase: "no",
        repair: "",
        purchaseDate: new Date(),
        dailyReward: new Date(),
        dailyTask: new Date(),
        telegramJoin: false,
        youtubeSubscribed: false,
        xFollow: false,
        instaFollow: false,
        tiktokFollow: false,
        ocicatFollow: false,
        dailyTap: '0',
        lastDate: new Date(),

      });
    } catch (err) {
      console.error("POST failed:", err);
    }
  };

  const handleWalletClick = async (walletId) => {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (walletId === "metamask") {
        if (isMobile) {
          const metamaskAppLink = `https://metamask.app.link/dapp/${window.location.hostname}`;
          window.location.href = metamaskAppLink;
          return;
        } else {
          if (window.ethereum && window.ethereum.isMetaMask) {
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x38" }],
              });
            } catch (switchError) {
              if (switchError.code === 4902) {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x38",
                      chainName: "BNB Smart Chain",
                      nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                      },
                      rpcUrls: ["https://bsc-dataseed.binance.org/"],
                      blockExplorerUrls: ["https://bscscan.com/"],
                    },
                  ],
                });
              }
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            if (!accounts || accounts.length === 0) return alert("No accounts found");

            const address = accounts[0];

            // Check if wallet already exists in database
            const userExists = await checkAndLoginUser(address, "wallet");

            if (!userExists) {
              // New user - open modal for name
              setWalletAddress(address);
              setIsModalOpen(true);
            }
          } else {
            window.open("https://metamask.io/download/", "_blank");
          }
        }
      }

      else if (walletId === "trust" || walletId === "walletconnect") {
        const provider = await EthereumProvider.init({
          projectId: "3512d1bdac0f4f231647db5b70e056cb",
          chains: [56],
          showQrModal: true,
        });
        await provider.enable();
        const ethersProvider = new ethers.BrowserProvider(provider);
        const accounts = await ethersProvider.send("eth_requestAccounts", []);

        const address = accounts[0];

        // Check if wallet already exists in database
        const userExists = await checkAndLoginUser(address, "wallet");

        if (!userExists) {
          setWalletAddress(address);
          setIsModalOpen(true);
        }
      }

      else if (walletId === "phantom") {
        if (isMobile) {
          const phantomAppLink = `https://phantom.app/ul/browse/${encodeURIComponent(window.location.href)}`;
          window.location.href = phantomAppLink;
          return;
        } else {
          if (window.solana && window.solana.isPhantom) {
            const resp = await window.solana.connect();
            const address = resp.publicKey.toString();

            // Check if wallet already exists in database
            const userExists = await checkAndLoginUser(address, "wallet");

            if (!userExists) {
              setWalletAddress(address);
              setIsModalOpen(true);
            }
          } else {
            window.open("https://phantom.app/download", "_blank");
          }
        }
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    }
  };

  // ✅ Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      

      // Check if email already exists in database
      const userExists = await checkAndLoginUser(user?.email, "email");

      if (!userExists) {
        // New user - create account
        const userData = {
          name: user.displayName || "Google User",
          email: user.email,
          wallet: "", // Empty for social login
        };

        await postUser(userData);

        // Get the newly created user data to save to localStorage
        const allUsersResponse = await axios.get("https://claw-server-six.vercel.app/users");
        const newUser = allUsersResponse.data.find(u => u.email === user.email);
        

        if (newUser) {
          saveUserDataToLocalStorage(newUser);
        }

        console.log("New Google user created:", user.email);
        navigate("/home");
      }
      // If user exists, checkAndLoginUser already navigated to home
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  // ✅ Apple login
  const handleAppleLogin = async () => {
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userEmail = user.email || "no-email@apple.com";

      // Check if email already exists in database
      const userExists = await checkAndLoginUser(userEmail, "email");

      if (!userExists) {
        // New user - create account
        const userData = {
          name: user.displayName || "Apple User",
          email: userEmail,
          wallet: "", // Empty for social login
        };

        await postUser(userData);

        // Get the newly created user data to save to localStorage
        const allUsersResponse = await axios.get("https://claw-server-six.vercel.app/users");
        const newUser = allUsersResponse.data.find(u => u.email === userEmail);

        if (newUser) {
          saveUserDataToLocalStorage(newUser);
        }

        console.log("New Apple user created:", userEmail);
        navigate("/home");
      }
      // If user exists, checkAndLoginUser already navigated to home
    } catch (err) {
      console.error(err);
      alert("Apple login failed");
    }
  };

  // ✅ Set name for NEW wallet user
  const handleSetName = async () => {
    if (!name.trim() || !walletAddress) return;

    try {
      // Check if name already exists - get ALL users first
      const allUsersResponse = await axios.get("https://claw-server-six.vercel.app/users");
      const existingUserWithName = allUsersResponse.data.find(user => user.name === name);

      if (existingUserWithName) {
        setError("Name already taken");
        return;
      }

      setError("");

      // Create new user data
      const userData = {
        name,
        wallet: walletAddress,
        email: "",
        level: "wood",
        balance: 0,
        "profit-per-click": 1,
        "upgrade-earn": 0,
        "speed-level": 1,
        "energyLimit-level": 1,
        treasureone: '0',
        treasuretwo: '0',
        treasurethree: '0',
        treasurefour: '0',
        treasurefive: '0',
        treasuresix: '0',
        miningPurchase: "no",
        repair: "no",
      };

      await postUser(userData);

      // Get the newly created user data to save to localStorage
      const updatedUsersResponse = await axios.get("https://claw-server-six.vercel.app/users");
      const newUser = updatedUsersResponse.data.find(u => u.wallet === walletAddress);

      if (newUser) {
        saveUserDataToLocalStorage(newUser);
      }

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Failed to check name");
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center gap-10"
      style={{
        background: "linear-gradient(180deg, #13121A 0%, #0C0829 100%)",
      }}
    >
      <h1 className="text-white text-[20px] font-bold">Connect Wallet</h1>

      <div className="flex flex-col gap-4 w-full px-4">
        {wallets.map((wallet) => {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const disableOnMobile = isMobile && (wallet.id === "metamask" || wallet.id === "phantom");

          return (
            <div key={wallet.id} className="relative w-full">
              {(wallet.id === "metamask" || wallet.id === "phantom") && (
                <span className="absolute top-2 right-4 text-xs text-gray-300 px-2 py-1 rounded-md bg-gray-800">
                  Desktop only
                </span>
              )}

              <button
                onClick={() => !disableOnMobile && handleWalletClick(wallet.id)}
                disabled={disableOnMobile}
                className={`w-full flex items-center gap-3 px-6 py-5 
                  ${disableOnMobile
                    ? "bg-[#19162C] opacity-50 cursor-not-allowed text-[14px]"
                    : "bg-[#19162C] shadow-lg hover:scale-105 transition"
                  }
                  rounded-xl`}
              >
                <img src={wallet.icon} alt={wallet.name} />
                <span
                  className={`text-white font-semibold ${disableOnMobile ? "text-[14px]" : "text-[18px]"
                    }`}
                >
                  {wallet.name}
                </span>
              </button>
            </div>
          );
        })}

        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-gray-400 text-sm">Or continue with</p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              className="bg-[#19162C] p-3 rounded-lg shadow hover:scale-110 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-6 h-6"
              />
            </button>

            <button
              onClick={handleAppleLogin}
              className="bg-[#19162C] p-3 rounded-lg shadow hover:scale-110 transition flex justify-center items-center"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
                alt="Apple"
                className="w-6 h-6 invert"
              />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#4e45855d] backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-[#13121A] rounded-2xl py-7 px-4 w-[350px] border border-gray-700 shadow-xl relative">
            <button
              onClick={handleSetName}
              className="px-10 text-white py-2 absolute -top-6 left-1/5 -ml-1 rounded-md bg-[#782AF9] hover:bg-[#6924db]"
            >
              Welcome to Claws
            </button>

            <h2 className="text-center text-[#50B563] mb-4 text-xs">
              Set your name to continue
            </h2>

            <input
              type="text"
              placeholder="Enter preferred claw name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 mb-2 bg-[#201C3A] text-white rounded-md placeholder-[#48407B] outline-[#9D63FD] focus:outline-[1px]"
            />

            {error && (
              <p className="text-red-500 text-xs mb-2 text-center">{error}</p>
            )}

            <button
              onClick={handleSetName}
              className="w-full text-white py-2 rounded-md bg-[#782AF9] hover:bg-[#6924db]"
            >
              Set Name
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;