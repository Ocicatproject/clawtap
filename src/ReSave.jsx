import React, { useEffect } from "react";
import axios from "axios";

const ReSave = () => {
  // ✅ Function to save all user data into localStorage
  const saveUserDataToLocalStorage = (userData) => {
    // Clear old data to avoid conflicts
    const keys = [
      "name", "wallet", "email", "loginDate", "userData", "level",
      "balance", "profit-per-click", "upgrade-earn", "speed-level",
      "energyLimit-level", "miningPurchase", "repair",
      "treasureone", "treasuretwo", "treasurethree",
      "treasurefour", "treasurefive", "treasuresix",
      "id",
      "dailyTask", "dailyReward", "telegramJoin", "youtubeSubscribed,", "xFollow", "instaFollow", "tiktokFollow", "ocicatFollow", "purchaseDate", "dailyTap", "lastDate"
    ];
    keys.forEach(key => localStorage.removeItem(key));

    // Save main info
    localStorage.setItem("name", userData.name || "");
    localStorage.setItem("wallet", userData.wallet || "");
    localStorage.setItem("email", userData.email || "");
    localStorage.setItem("loginDate", userData.signUpDate || new Date().toISOString());
    localStorage.setItem("userData", JSON.stringify(userData));

    // Individual fields
    localStorage.setItem("level", (userData.level ?? "wood").toString());
    localStorage.setItem("balance", (userData.balance ?? 0).toString());
    localStorage.setItem("profit-per-click", (userData["profit-per-click"] ?? 1).toString());
    localStorage.setItem("upgrade-earn", (userData["upgrade-earn"] ?? 0).toString());
    localStorage.setItem("speed-level", (userData["speed-level"] ?? 1).toString());
    localStorage.setItem("energyLimit-level", (userData["energyLimit-level"] ?? 1).toString());
    localStorage.setItem("miningPurchase", userData["miningPurchase"] ?? "no");
    localStorage.setItem("repair", userData["repair"] ?? "no");
    localStorage.setItem("treasureone", userData.treasureone ?? "0");
    localStorage.setItem("treasuretwo", userData.treasuretwo ?? "0");
    localStorage.setItem("treasurethree", userData.treasurethree ?? "0");
    localStorage.setItem("treasurefour", userData.treasurefour ?? "0");
    localStorage.setItem("treasurefive", userData.treasurefive ?? "0");
    localStorage.setItem("treasuresix", userData.treasuresix ?? "0");
    localStorage.setItem("id", userData?._id);

    localStorage.setItem("dailyTask", userData?.dailyTask);
    localStorage.setItem("dailyReward", userData?.dailyReward);
    localStorage.setItem("telegramJoin", userData?.telegramJoin);
    localStorage.setItem("youtubeSubscribed", userData?.youtubeSubscribed);
    localStorage.setItem("xFollow", userData?.xFollow);
    localStorage.setItem("instaFollow", userData?.instaFollow);
    localStorage.setItem("tiktokFollow", userData?.tiktokFollow);
    localStorage.setItem("ocicatFollow", userData?.ocicatFollow);
    localStorage.setItem("purchaseDate", userData?.purchaseDate);
    localStorage.setItem("dailyTap", userData?.dailyTap);
    localStorage.setItem("lastDate", userData?.lastDate);
  };

  // ✅ Fetch user info from DB and save to localStorage
  useEffect(() => {
    const fetchAndSaveUser = async () => {
      try {
        const wallet = localStorage.getItem("wallet");
        const email = localStorage.getItem("email");

        if (!wallet && !email) return; // No user info in localStorage

        // Fetch all users from DB
        const response = await axios.get("https://claw-server-six.vercel.app/users");
        const allUsers = response.data;
        if (!allUsers || allUsers.length === 0) return;

        // Match user by wallet first, else email
        let currentUser = null;
        if (wallet) currentUser = allUsers.find(user => user.wallet === wallet);
        if (!currentUser && email) currentUser = allUsers.find(user => user.email === email);

        if (currentUser) {
          saveUserDataToLocalStorage(currentUser);
          console.log("✅ User data refreshed from DB:", currentUser);
        } else {
          console.warn("⚠️ User not found in DB");
        }
      } catch (err) {
        console.error("❌ Failed to fetch user data:", err);
      }
    };

    // Run once on component mount
    fetchAndSaveUser();
  }, []);

  return null; // No UI needed
};

export default ReSave;
