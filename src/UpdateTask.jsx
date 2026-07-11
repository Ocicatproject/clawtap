import { useEffect, useRef } from "react";

const UpdateTask = () => {
  const prevDataRef = useRef({});

  useEffect(() => {
    const userKeys = [
      "dailyReward",    
      "dailyTask",   
      "telegramJoin",
      "youtubeSubscribed",
      "xFollow",
      "instaFollow",
      "tiktokFollow",
      "ocicatFollow", 
      "purchaseDate"  
    ];

    const updateUserData = async () => {
      try {
        const localEmail = localStorage.getItem("email") || "";
        const localWallet = localStorage.getItem("wallet") || "";
        const localName = localStorage.getItem("name") || "";

        if (!localEmail && !localWallet && !localName) return;

        // Build query
        let query = "";
        if (localEmail) query = `email=${localEmail}`;
        else if (localWallet)
          query = localName
            ? `wallet=${localWallet}&name=${localName}`
            : `wallet=${localWallet}`;

        // Fetch single user
        const res = await fetch(
          `https://claw-server-six.vercel.app/users/single?${query}`
        );
        if (!res.ok) return;

        const user = await res.json();
        if (!user._id) return;

        // Prepare update data
        const updateData = {};
        let hasChange = false;

        userKeys.forEach((key) => {
          const value = localStorage.getItem(key);
          if (value !== null && value !== undefined && value !== "") {
            updateData[key] = value;
            if (prevDataRef.current[key] !== value) hasChange = true;
          }
        });

        if (hasChange) {
          await fetch(
            `https://claw-server-six.vercel.app/users/update-other/${user._id}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updateData),
            }
          );
          console.log("✅ User updated from localStorage");

          // Save current state
          prevDataRef.current = { ...updateData };
        }
      } catch (err) {
        console.error("❌ Failed to update user:", err);
      }
    };

    updateUserData();
    const interval = setInterval(updateUserData, 2000);

    const handleStorage = () => updateUserData();
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
};

export default UpdateTask;
