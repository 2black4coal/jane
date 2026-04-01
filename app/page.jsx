"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import "../styles/home.css";

export default function Home() {
  const router = useRouter();
  const audioRef = useRef(null);

  const [rain, setRain] = useState([]);
  const [splashes, setSplashes] = useState([]);

  useEffect(() => {
    const rainDrops = Array.from({ length: 500 }).map(() => ({
      x: Math.random(),
      delay: Math.random() * 4,
      duration: 1.6 + Math.random() * 1.2,
      opacity: 0.1 + Math.random() * 0.2,
      height: 16 + Math.random() * 18
    }));

    const splashDrops = Array.from({ length: 40 }).map(() => ({
      x: Math.random()
    }));

    setRain(rainDrops);
    setSplashes(splashDrops);
  }, []);

  // ⭐ Unmute audio after first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
  }, []);

  return (
    <div
      className="home-page-container"
      onClick={() => router.push("/gallery")}
    >
      <div className="home-cinema-frame">

        {/* RAIN */}
        <div className="home-rain">
          {rain.map((drop, i) => (
            <span
              key={i}
              className="home-rain-drop"
              style={{
                "--x": drop.x,
                "--delay": drop.delay,
                "--duration": `${drop.duration}s`,
                "--opacity": drop.opacity,
                "--height": `${drop.height}px`
              }}
            />
          ))}
        </div>

        {/* SPLASH */}
        <div className="home-splashes">
          {splashes.map((s, i) => (
            <span
              key={i}
              className="home-splash"
              style={{ "--x": s.x }}
            />
          ))}
        </div>

        {/* IMAGE */}
        <img
          src="/images/rain.png"
          alt="Rain scene"
          className="home-hero-image"
        />

      </div>

      {/* SOUND */}
      <audio ref={audioRef} autoPlay loop muted>
        <source src="/sounds/rain.mp3" type="audio/mpeg" />
      </audio>

    </div>
  );
}
