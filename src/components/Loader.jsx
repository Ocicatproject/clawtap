import { useEffect, useState } from "react";
import loaderbg from "../assets/loaderbg.png";
import loader from "../assets/loaderimg.png";
import { Link, useNavigate } from "react-router-dom";

const Loader = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);

            // ✅ Check if user already logged in
            const savedName = localStorage.getItem("name");
            const savedWallet = localStorage.getItem("wallet");

            if (savedName && savedWallet) {
                navigate("/home"); // Already logged in → go home
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    // ✅ Check if user is new
    const isNewUser = !(
        localStorage.getItem("name") &&
        localStorage.getItem("wallet")
    );

    return (
        <div
            className="w-full h-[780px] bg-cover bg-center flex flex-col justify-center items-center gap-6"
            style={{ backgroundImage: `url(${loaderbg})` }}
        >
            {/* Loader image */}
            <img src={loader} alt="Loading..." className="mt-30" />

            {loading ? (
                // ---------------- LOADER PART ----------------
                <div className="flex flex-col justify-center items-center gap-4 mt-20">
                    <div className="relative w-[200px] h-[14px] rounded-full border border-[#40FF54] bg-[#00015E] overflow-hidden mt-10">
                        <div className="h-full rounded-full animate-fill bg-gradient-to-r from-[#6E12D7] via-[#4BFFA5] to-[#1F41F4]"></div>
                    </div>
                    <p className="font-serif font-thin tracking-wider text-[#ffffffd3]">
                        LOADING
                    </p>
                </div>
            ) : (
                // ---------------- AFTER LOADER ----------------
                isNewUser && (
                    <div className="flex flex-col items-center gap-4 mt-2">
                        <Link to="/login">
                            <button
                                className="flex w-[282px] cursor-pointer py-[17px] justify-center items-center 
                                rounded-[111px] bg-[#782AF9] text-white font-[600] text-[14px] 
                                shadow-[0_0_21.4px_0_#5141C8] transition hover:opacity-90"
                            >
                                Sign In
                            </button>
                        </Link>

                        <p className="text-white text-xs mt-2 text-center">
                            By signing in, you agree to our <br /> 
                            <span className="text-[#40FF54]"> Terms of service</span> and 
                            <span className="text-[#40FF54]">Privacy policy</span>
                        </p>
                    </div>
                )
            )}
        </div>
    );
};

export default Loader;
