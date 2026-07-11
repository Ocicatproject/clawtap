import { NavLink, useLocation } from "react-router-dom";
import home from "../src/assets/home.svg";
import task from "../src/assets/task.svg";
import friends from "../src/assets/friend.svg";
import games from "../src/assets/games.svg";
import wallet from "../src/assets/wallet.svg";
import lightone from '../src/assets/lightone.png';
import lighttwo from '../src/assets/lighttwo.png';
import lightthree from '../src/assets/lightthree.png';
import lightfour from '../src/assets/lightfour.png';
import lightfive from '../src/assets/lightfive.png';
 
const Nav = () => {
  const location = useLocation();

  const visibleRoutes = ["/home", "/task", "/friends", "/games", "/wallet"];

  if (!visibleRoutes.includes(location.pathname)) return null;

  const tabs = [
    { id: "mine", label: "Mine", icon: home, path: "/home", activeClass: "bg-[#234F2B] border border-[#40FF54] text-white", light: lightone },
    { id: "task", label: "Task", icon: task, path: "/task", activeClass: "bg-[#644027] border border-[#FA9300] text-white", light: lighttwo },
    { id: "friends", label: "Friends", icon: friends, path: "/friends", activeClass: "bg-[#281A90] border border-[#4F34FC] text-white", light: lightthree },
    { id: "games", label: "Games", icon: games, path: "/games", activeClass: "bg-[#512424] border border-[#D42F55] text-white", light: lightfour },
    { id: "wallet", label: "Wallet", icon: wallet, path: "/wallet", activeClass: "bg-[#2C65BB] border border-[#679EF0] text-white", light: lightfive },
  ];

  return (
    <div className="fixed bottom-0 left-0 max-w-lg mx-auto right-0 z-[9999] bg-gradient-to-b from-[#281A90] to-[#0C082A] px-3 pt-6 pb-5 rounded-t-3xl flex justify-between">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center pt-[10px] pb-2 mx-1 rounded-xl transition-all relative ${
              isActive
                ? tab.activeClass
                : "bg-[#261D61] border border-[#48407B] text-gray-300"
            }`
          }
        >
          {/** শুধুমাত্র active tab এর জন্য light background দেখাবে **/}
          {location.pathname === tab.path && (
            <img
              src={tab.light}
              alt={`${tab.label} light`}
              className="absolute -top-[3px]  h-16  pointer-events-none"
            />
          )}
          
          <img src={tab.icon} alt={tab.label} className="mb-[6px] relative z-10" />
          <span className="text-xs relative z-10">{tab.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Nav;
