import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import friends from "../assets/friends.png";
import coin from "../assets/hitcoin.svg";

const BONUS_AMOUNT = 10000;

const Friends = () => {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState([]);

  const userId = localStorage.getItem("id");
  const inviteLink = `https://claw-airdrop.netlify.app/login/${userId}`;

  // Fetch referrals
  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://claw-server-six.vercel.app/users");
      const data = await res.json();
      const myRefs = data.filter((u) => u.refer === userId);
      setReferrals(myRefs);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userId) return;
    fetchReferrals();
  }, [userId]);

  // Copy invite link
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    navigate("/copy");
  };

  // Claim bonus
  const handleClaim = async (ref) => {
    if (ref.level.toLowerCase() === "wood" || ref.bonus === true) return;

    setProcessingIds((prev) => [...prev, ref._id]);

    // Add balance instantly
    const currentBalance = Number(localStorage.getItem("balance")) || 0;
    localStorage.setItem("balance", currentBalance + BONUS_AMOUNT);

    // Update bonus on server
    try {
      await fetch(
        `https://claw-server-six.vercel.app/users/update-other/${ref._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bonus: true }),
        }
      );
    } catch (err) {
      console.error("Failed to update bonus on server", err);
    }

    // Refetch referrals to update UI
    await fetchReferrals();

    // Remove processing
    setProcessingIds((prev) => prev.filter((id) => id !== ref._id));
  };

  return (
    <div className="bg-black pb-32">
      <div className="pt-9">
        <img src={friends} alt="Friends" className="w-full h-auto pb-4" />
        <h2 className="text-center text-[22px]">Invite a Friend</h2>
        <p className="text-center text-sm">
          You and your friend will receive bonuses
        </p>

        {/* Invite link */}
        <div className="mx-auto mt-5">
          <div className="flex px-3 py-4 mx-3 justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl">
            <div className="text-left">
              <p className="font-medium pb-1">My invite link</p>
              <p className="text-[#C4C4C4] text-xs break-all">{inviteLink}</p>
            </div>
            <button
              className="bg-[#48407B] px-3 py-2 rounded-lg text-sm cursor-pointer"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Referral list */}
        <p className="px-4 font-medium text-left mt-10 pb-3">
          My Referral list
        </p>

        {loading ? (
          <p className="px-4 text-[#C4C4C4] text-left text-sm">
            Loading referrals...
          </p>
        ) : referrals.length === 0 ? (
          <p className="px-4 text-[#C4C4C4] text-left text-sm">
            No referral history
          </p>
        ) : (
          referrals.map((ref) => {
            const isWood = ref.level.toLowerCase() === "wood";
            const isProcessing = processingIds.includes(ref._id);
            const isClaimed = ref.bonus === true;

            return (
              <div
                key={ref._id}
                className="flex px-3 py-4 mx-3 justify-between items-center bg-[#19162C] border border-[#48407B] rounded-xl mt-3"
              >
                <div className="text-left">
                  <p className="text-[15px] text-gray-300 pb-1">{ref.name}</p>
                  <p className="text-[#C4C4C4] text-sm flex items-center gap-1">
                    <img src={coin} alt="" className="h-5" />
                    {ref.level}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[#FFBA00] text-sm pb-2">+10,000</p>
                  <button
                    onClick={() => handleClaim(ref)}
                    disabled={isWood || isProcessing || isClaimed}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      isWood || isProcessing || isClaimed
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-[#48407B]"
                    }`}
                  >
                    {isProcessing
                      ? "Processing..."
                      : isClaimed
                      ? "Claimed"
                      : "Claim"}
                  </button>
                </div>
              </div>
            );
          })
        )}

        <p className="bg-[#864607] p-3 rounded-md text-sm mt-10 text-left text-gray-200 mx-4">
          Referral must have graduated from wood before you can be credited.
        </p>
      </div>
    </div>
  );
};

export default Friends;
