import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../aset/logo.jpg';
import bg from '../aset/bg.jpg'; // import bg

import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`landing-page ${animate ? "animate" : ""}`}
      style={{ backgroundImage: `url(${bg})` }}  // inline style pakai import
    >
      <div className="logo-wrapper">
        <img src={logo} alt="blur" className="logo-blur" />
        <img src={logo} alt="Logo Sekolah" className="logo-img" />
      </div>

      <h1 className={`landing-title ${animate ? "animate" : ""}`}>
        Selamat Datang di Pustaka App
      </h1>
      <p className={`landing-subtitle ${animate ? "animate" : ""}`}>
        Kelola dan pinjam buku dengan mudah kapan saja.
      </p>

      <div className={`landing-buttons ${animate ? "animate" : ""}`}>
        <button
          onClick={() => navigate("/login")}
          className="landing-button login"
        >
          Masuk
        </button>

        <button
          onClick={() => navigate("/user")}
          className="landing-button guest"
        >
          Lihat sebagai Tamu
        </button>
      </div>
    </div>
  );
}
