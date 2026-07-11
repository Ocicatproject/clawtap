import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Song from './Song'
import ReSave from './ReSave';
import UpdateBalance from './UpdateBalance';

function App() {


  // ======== ⬇️ Add these lines ABOVE your Home component definition (outside function) ========
   if (!window.batteryRefillStarted) {
    window.batteryRefillStarted = true;

    setInterval(() => {
      const currentBattery = parseInt(localStorage.getItem("battery")) || 500;
      
      // ✅ energyLimit-level অনুযায়ী max battery calculation
      const energyLimitLevel = parseInt(localStorage.getItem("energyLimit-level")) || 1;
      let maxBattery = 500;
      switch(energyLimitLevel) {
        case 1: maxBattery = 500; break;
        case 2: maxBattery = 1000; break;
        case 3: maxBattery = 2000; break;
        case 4: maxBattery = 5000; break;
        case 5: maxBattery = 10000; break;
        default: maxBattery = 500;
      }
      
      if (currentBattery < maxBattery) {
        // ✅ প্রতি সেকেন্ডে 2 করে বাড়বে
        const newBattery = Math.min(currentBattery + 1, maxBattery);
        localStorage.setItem("battery", newBattery);
      }
    }, 1000);
  }

 
  return (
  <div className='bg-black geist'>
    <div className='max-w-lg text-white text-center mx-auto'>
      <Song></Song>
      <ReSave></ReSave>
      <UpdateBalance></UpdateBalance>
      <Outlet></Outlet>
      <Nav></Nav>
    </div>
  </div>
    
  )
}

export default App
