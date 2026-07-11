import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import musicone from "./assets/Islamic1.mp3";
import musictwo from "./assets/Islamic2.mp3";
import musicthree from "./assets/Jazz1.mp3";
import musicfour from "./assets/Jazz2.mp3";
import musicfive from "./assets/Jazz3..mp3";
import musicsix from "./assets/Jazz4.mp3";
import musicseven from "./assets/Faith1.mp3";
import musiceight from "./assets/Faith2.mp3";
import musicnine from "./assets/Faith3.mp3";
import musicten from "./assets/Faith4.mp3";
import musiceleven from "./assets/Lullaby1.mp3";
import musictwelve from "./assets/Lullaby2.mp3";
import musicthirteen from "./assets/Lullaby3.mp3";
import musicfourteen from "./assets/Lullaby4.mp3";
import musicfivteen from "./assets/Lullaby5.mp3";
import musicsixteen from "./assets/Lullaby6.mp3";
import musicseventeen from "./assets/Lullaby7.mp3";
import musiceightteen from "./assets/Lullaby8.mp3";
import musicnineteen from "./assets/Lullaby9.mp3";
import musictwenty from "./assets/Bolly1.mp3";
import musictwentyone from "./assets/Bolly2.mp3";
import musictwentytwo from "./assets/Bolly3.mp3";
import musictwentythree from "./assets/Bolly4.mp3";
import musictwentyfour from "./assets/Bolly5.mp3";

const Song = () => {
  const location = useLocation();
  const audioRef = useRef(null);

  const [trackNum, setTrackNum] = useState(() => {
    const selectedStr = localStorage.getItem("selectedMusic");
    const num = parseInt(selectedStr);
    // 🔧 Fixed range (0–18)
    if (!selectedStr || isNaN(num) || num < 0 || num > 23) return null;
    return num;
  });

  const musicTracks = [
    musicone,
    musictwo,
    musicthree,
    musicfour,
    musicfive,
    musicsix,
    musicseven,
    musiceight,
    musicnine,
    musicten,
    musiceleven,
    musictwelve,
    musicthirteen,
    musicfourteen,
    musicfivteen,
    musicsixteen,
    musicseventeen,
    musiceightteen,
    musicnineteen,
    musictwenty,
    musictwentyone,
    musictwentytwo,
    musictwentythree, 
    musictwentyfour,
  ];

  const playCurrentTrack = (num) => {
    if (!audioRef.current || num === null || num === undefined) return;

    // login / loader হলে pause
    if (location.pathname === "/login" || location.pathname === "/loader") {
      audioRef.current.pause();
      return;
    }

    // ✅ Prevent restarting on route change
    const currentSrc = audioRef.current.src;
    const targetFile = musicTracks[num];
    if (currentSrc.endsWith(targetFile)) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    audioRef.current.src = targetFile;
    audioRef.current.loop = true;
    audioRef.current
      .play()
      .catch(() => {
        const handleClick = () => {
          audioRef.current.play().catch(() => {});
          document.removeEventListener("click", handleClick);
        };
        document.addEventListener("click", handleClick);
      });
  };

  useEffect(() => {
    if (trackNum !== null) {
      playCurrentTrack(trackNum);
      localStorage.setItem("musicPlaying", "true");
    } else {
      if (audioRef.current) audioRef.current.pause();
      localStorage.setItem("musicPlaying", "false");
    }
  }, [trackNum, location.pathname]);

  useEffect(() => {
    const handleStorageChange = () => {
      const selectedStr = localStorage.getItem("selectedMusic");
      const num = parseInt(selectedStr);
      // 🔧 Fixed range (0–18)
      if (!selectedStr || isNaN(num) || num < 0 || num > 23) {
        setTrackNum(null);
      } else {
        setTrackNum(num);
      }
    };

    const interval = setInterval(handleStorageChange, 200);
    return () => clearInterval(interval);
  }, []);

  return <audio ref={audioRef} />;
};

export default Song;
