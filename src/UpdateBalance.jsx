import { useEffect, useState } from "react";

const UpdateBalance = () => {
  const [lastBalance, setLastBalance] = useState(
    Number(localStorage.getItem("balance")) || 0
  );

  // 🔄 Function to update user balance in backend
  const updateUserBalance = async () => {
    const localBalance = Number(localStorage.getItem("balance")) || 0;
    const localEmail = localStorage.getItem("email") || "";
    const localWallet = localStorage.getItem("wallet") || "";
    const localName = localStorage.getItem("name") || "";

    try {
      let query = "";
      if (localEmail) query = `email=${localEmail}`;
      else if (localWallet)
        query = localName
          ? `wallet=${localWallet}&name=${localName}`
          : `wallet=${localWallet}`;

      if (query) {
        const res = await fetch(
          `https://claw-server-six.vercel.app/users/single?${query}`
        );
        if (res.ok) {
          const user = await res.json();
          if (user && user._id) {
            await fetch(`https://claw-server-six.vercel.app/users/${user._id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ balance: localBalance }),
            });
            console.log("✅ Balance updated on server:", localBalance);
          }
        }
      }
    } catch (error) {
      console.error("❌ Error updating balance:", error);
    }
  };

  useEffect(() => {
    // 🔁 Run once when component mounts
    updateUserBalance();

    // 👂 Listen for localStorage changes (from other tabs or same app)
    const handleStorageChange = (e) => {
      if (e.key === "balance") {
        const newBalance = Number(e.newValue) || 0;
        setLastBalance(newBalance);
        updateUserBalance();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // 🔁 Also watch balance changes within same tab (polling every 3s)
    const interval = setInterval(() => {
      const currentBalance = Number(localStorage.getItem("balance")) || 0;
      if (currentBalance !== lastBalance) {
        setLastBalance(currentBalance);
        updateUserBalance();
      }
    }, 3000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [lastBalance]);

  return null; // 🧠 No UI needed — this runs in background
};

export default UpdateBalance;
