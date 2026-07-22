import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Song from './Song'
import ReSave from './ReSave';
import UpdateBalance from './UpdateBalance';
import { useEffect } from 'react';

function App() {

// useEffect(() => {

//   let blocked = false;

//   const blockApp = () => {

//     if (blocked) return;

//     blocked = true;

//     // clear app data
//     localStorage.clear();

//     // redirect
//     window.location.replace("/securityWarning");
//   };


//   // DevTools detect
//   const detectDevTools = () => {

//     const widthDiff =
//       window.outerWidth - window.innerWidth;

//     const heightDiff =
//       window.outerHeight - window.innerHeight;


//     if (
//       widthDiff > 200 ||
//       heightDiff > 200
//     ) {
//       blockApp();
//     }

//   };


//   const devToolsChecker = setInterval(
//     detectDevTools,
//     500
//   );


//   // Disable right click
//   const disableRightClick = (e) => {
//     e.preventDefault();
//   };


//   document.addEventListener(
//     "contextmenu",
//     disableRightClick
//   );


//   // Disable shortcuts
//   const disableKeys = (e) => {

//     const key = e.key.toUpperCase();


//     if (
//       key === "F12" ||

//       (e.ctrlKey &&
//        e.shiftKey &&
//        ["I","J","C"].includes(key)) ||

//       (e.ctrlKey && key === "U")
//     ) {

//       e.preventDefault();

//       blockApp();

//     }

//   };


//   window.addEventListener(
//     "keydown",
//     disableKeys
//   );


//   // Console clear warning
//   const consoleCleaner = setInterval(() => {

//     console.clear();

//     console.log(
//       "%cDeveloper tools are restricted",
//       "color:red;font-size:25px"
//     );

//   },1000);



//   return () => {

//     clearInterval(devToolsChecker);

//     clearInterval(consoleCleaner);


//     document.removeEventListener(
//       "contextmenu",
//       disableRightClick
//     );


//     window.removeEventListener(
//       "keydown",
//       disableKeys
//     );

//   };


// }, []);

// useEffect(() => {

//   const detectExtension = () => {

//     const extensions = [
//       "chrome-extension://"
//     ];

//     const scripts = [...document.scripts];

//     const found = scripts.some(script =>
//       extensions.some(ext =>
//         script.src.includes(ext)
//       )
//     );


//     if(found){
//       window.location.href="/404";
//     }

//   };


//   detectExtension();

// }, []);

// useEffect(() => {

//   const observer = new MutationObserver(() => {

//     console.log("Page modified");

//   });


//   observer.observe(
//     document.body,
//     {
//       childList:true,
//       subtree:true
//     }
//   );


//   return ()=>observer.disconnect();


// },[]);



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
