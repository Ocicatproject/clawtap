import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Loader from './components/Loader.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Task from './components/Task.jsx';
import Friends from './components/Friends.jsx';
import Games from './components/Games.jsx';
import Wallet from './components/Wallet.jsx';
import Rolette from './extraComponent/Rolette.jsx';
import BlackJack from './extraComponent/BlackJack.jsx';
import Poker from './extraComponent/Poker.jsx';
import Slot from './extraComponent/Slot.jsx';
import Copy from './extraComponent/Copy.jsx';
import TelegramTask from './extraComponent/TelegramTask.jsx';
import TelegramClaim from './extraComponent/TelegramClaim.jsx';
import Wood from './extraComponent/Wood.jsx';
import Stone from './extraComponent/Stone.jsx';
import Bronze from './extraComponent/Bronze.jsx';
import Silver from './extraComponent/Silver.jsx';
import Gold from './extraComponent/Gold.jsx';
import HallOfFrame from './extraComponent/HallOfFrame.jsx';
import Upgraded from './extraComponent/Upgraded.jsx';
import Boost from './extraComponent/Boost.jsx';
import BuyAutominer from './extraComponent/BuyAutominer.jsx';
import RepairAutominer from './extraComponent/RepairAutominer.jsx';
import Speed from './extraComponent/Speed.jsx';
import EnergyLimit from './extraComponent/EnergyLimit.jsx';
import Combo from './extraComponent/Combo.jsx';
import Music from './extraComponent/Music.jsx';
import Treasure from './extraComponent/Treasure.jsx';
import Nft from './extraComponent/Nft.jsx';
import Notice from './extraComponent/Notice.jsx';
import Payment from './Payment.jsx';
import DailyTask from './extraComponent/DailyTask.jsx';
import Dailyreward from './extraComponent/Dailyreward.jsx';
import YoutubeSubscribe from './extraComponent/YoutubeSubscribe.jsx';
import X from './extraComponent/X.jsx';
import InstaGram from './extraComponent/InstaGram.jsx';
import Tiktok from './extraComponent/Tiktok.jsx';
import Ocicat from './extraComponent/Ocicat.jsx';
// import { AuthProvider } from './components/Authprovider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
    children:[
      {
        path: "/",
        element:<Loader></Loader>
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/login/*",       
        element:<Login />
      },
      {
        path:"/home",
        element:<Home></Home>
      },
      {
        path:"/task",
        element:<Task></Task>
      },
      {
        path:"/friends",
        element:<Friends></Friends>
      },
      {
        path:"/games",
        element:<Games></Games>
      },
      {
        path:"/wallet",
        element:<Wallet></Wallet>
      },
      {
        path:"/rolette",
        element:<Rolette></Rolette>
      },
      {
        path:"/blackjack",
        element:<BlackJack></BlackJack>
      },
      {
        path:"/poker",
        element:<Poker></Poker>
      },
      {
        path:"/slot",
        element:<Slot></Slot>
      },
      {
        path:"/copy",
        element:<Copy></Copy>
      },
      {
        path:"telegramTask",
        element:<TelegramTask></TelegramTask>
      },
      {
        path:"/telegramClaim",
        element:<TelegramClaim></TelegramClaim>
      },
      {
        path:"/dailyTask",
        element:<DailyTask></DailyTask>
      },
      {
        path:"/dailyReward",
        element:<Dailyreward></Dailyreward>
      },
      {
        path:"/youtubeSubscribe",
        element:<YoutubeSubscribe></YoutubeSubscribe>
      },
      {
        path:"/xReward",
        element:<X></X>
      },
      {
        path:"/instagramReward",
        element:<InstaGram></InstaGram>
      },
      {
        path:"/tiktokReward",
        element:<Tiktok></Tiktok>
      },
      {
        path:"/ocicatReward",
        element:<Ocicat></Ocicat>
      },
      
      {
        path:"/wood",
        element:<Wood></Wood>
      },
      {
        path:"/stone",
        element:<Stone></Stone>
      },
      {
        path:"/bronze",
        element:<Bronze></Bronze>
      }, 
      {
        path:"/silver",
        element:<Silver></Silver>
      },
      {
        path:"/gold",
        element:<Gold></Gold>
      },
      {
        path:"/hallOfFame",
        element:<HallOfFrame></HallOfFrame>,

      },
      {
        path:"/upgraded",
        element:<Upgraded></Upgraded>
      },
      {
        path:"/boost",
        element:<Boost></Boost>
      },
      {
        path:"/buyautoMiner",
        element:<BuyAutominer></BuyAutominer>
      },
      {
        path:"/repairMiner",
        element:<RepairAutominer></RepairAutominer>
      },
      {
        path:"/speed",
        element:<Speed></Speed>
      },
      {
        path:"/energyLimit",
        element:<EnergyLimit></EnergyLimit>
      },
      {
        path:"/combo",
        element:<Combo></Combo>
      },
      {
        path:"/music",
        element:<Music></Music>
      },
      {
        path:"/treasure",
        element:<Treasure></Treasure>
      }, 
      {
        path:"/nft",
        element:<Nft></Nft>
      },
      {
        path:"/notice",
        element:<Notice></Notice>
      },
      {
          path:"/payment",
          element:<Payment></Payment>
      }



    ],
  },


]);
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthProvider>
    </AuthProvider> */}
      <RouterProvider router={router} />
  </StrictMode>,
)
