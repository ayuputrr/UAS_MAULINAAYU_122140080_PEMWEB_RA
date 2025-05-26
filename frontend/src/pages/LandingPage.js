import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from '../aset/logo.jpg'; // sesuaikan path logo

export default function LandingPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animasi setelah mount
    setAnimate(true);
  }, []);

  const logoStyle = {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    position: 'relative',
    marginBottom: '20px',
  };

  const logoBlurStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    filter: 'blur(10px) brightness(0.7)',
    zIndex: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const logoImgStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    zIndex: 1,
  };

  return (
    <div
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '20px',
        textAlign: 'center',

        // Animasi fade-in
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 10s ease, transform 10s ease',
      }}
    >
      <div style={logoStyle}>
        <img src={logo} alt="blur" style={logoBlurStyle} />
        <img src={logo} alt="Logo Universitas" style={logoImgStyle} />
      </div>

      <h1
        style={{
          fontWeight: 'bold',
          fontSize: '2.5rem',
          textShadow: '2px 2px 6px #000',
          transition: 'opacity 1s ease',
          opacity: animate ? 1 : 0,
        }}
      >
        Selamat Datang di Pustaka App
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          marginBottom: '30px',
          textShadow: '1px 1px 5px #000',
          transition: 'opacity 1s ease 0.3s',
          opacity: animate ? 1 : 0,
        }}
      >
        Kelola dan pinjam buku dengan mudah kapan saja.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          transition: 'opacity 1s ease 0.5s',
          opacity: animate ? 1 : 0,
        }}
      >
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: '#1e40af',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          }}
        >
          Masuk
        </button>

        <button
          onClick={() => navigate("/user")}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: '#6b7280',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          }}
        >
          Lihat sebagai Tamu
        </button>
      </div>
    </div>
  );
}
