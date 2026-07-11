// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 🔹 add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDkVP9oyzyY9XmmHkp6DB75WeGOuhbBVg",
  authDomain: "claw-airdrop.firebaseapp.com",
  projectId: "claw-airdrop",
  storageBucket: "claw-airdrop.firebasestorage.app",
  messagingSenderId: "430093968806",
  appId: "1:430093968806:web:5316124731381197819b67",
  measurementId: "G-R9EM6DB3RT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // 🔹 Add this

// Export auth so you can use in Login.jsx
export { auth };
