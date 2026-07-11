// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../firebase.init";
// import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const AuthContext = createContext();

// const googleProvider = new GoogleAuthProvider();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // ✅ Firebase auth state track
//   // useEffect(() => {
//   //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
//   //     if (currentUser) {
//   //       setUser({
//   //         name: currentUser.displayName || "User",
//   //         email: currentUser.email,
//   //         wallet: currentUser.uid,
//   //       });
//   //     } else {
//   //       setUser(null);
//   //     }
//   //   });

//   //   return () => unSubscribe();
//   // }, []);

//   // ✅ Google login
//   const googleSignIn = () => {
//     return signInWithPopup(auth, googleProvider);
//   };

//   // ✅ Logout
//   const logoutUser = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   // ✅ Manual login (Wallet / Apple)
//   const loginUser = (userData) => {
//     setUser(userData);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loginUser, googleSignIn, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
