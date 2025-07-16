"use client";
import React from "react";

const buttonBase: React.CSSProperties = {
  padding: "16px 32px",
  borderRadius: 16,
  fontWeight: 700,
  fontSize: 18,
  boxShadow: "0 2px 8px #1b1c23",
  border: "2px solid #ebecef",
  textDecoration: "none",
  position: "relative",
  outline: "none",
  fontFamily: "Fredoka, sans-serif",
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s",
  marginBottom: 0,
};

export default function HomeClient() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        fontFamily: "Fredoka, sans-serif",
        color: "#c8d2ff",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ position: "relative", textAlign: "center", marginBottom: 32 }}>
        <svg width="130" height="40" style={{ position: "absolute", left: -40, top: -20, zIndex: 0 }}>
          <polygon points="20,20 25,30 15,30" fill="#ebecef" />
          <polygon points="110,10 115,20 105,20" fill="#c8d2ff" />
        </svg>
        <h1
          style={{
            fontSize: "2.7rem",
            fontWeight: 700,
            color: "#ebecef",
            letterSpacing: "0.03em",
            textShadow: "0 2px 8px #272a37",
          }}
        >
          Bienvenido a Torneos Gamer
        </h1>
        <svg width="130" height="40" style={{ position: "absolute", right: -40, top: -20, zIndex: 0 }}>
          <polygon points="20,20 25,30 15,30" fill="#c8d2ff" />
          <polygon points="110,10 115,20 105,20" fill="#ebecef" />
        </svg>
        <div
          style={{
            height: 2,
            background: "#c8d2ff",
            width: 180,
            margin: "16px auto 0 auto",
            borderRadius: 2,
          }}
        ></div>
      </div>
      <p
        style={{
          marginBottom: 40,
          fontSize: 20,
          color: "#c8d2ff",
          textShadow: "0 1px 4px #272a37",
        }}
      >
        Regístrate, inicia sesión y participa en torneos de tus juegos favoritos.
      </p>
      <div style={{ display: "flex", gap: "2rem", marginBottom: 24 }}>
        <a
          href="/register"
          style={{
            ...buttonBase,
            background: "#c8d2ff",
            color: "#272a37",
            border: "2px solid #ebecef",
          }}
          className="acubi-btn acubi-btn-primary"
        >
          Registro
          <svg width="18" height="18" style={{ position: "absolute", top: -10, right: -10 }}>
            <polygon points="9,2 10,7 15,7 11,10 13,15 9,12 5,15 7,10 3,7 8,7" fill="#ebecef" />
          </svg>
        </a>
        <a
          href="/login"
          style={{
            ...buttonBase,
            background: "#ebecef",
            color: "#272a37",
            border: "2px solid #c8d2ff",
          }}
          className="acubi-btn acubi-btn-secondary"
        >
          Login
          <svg width="18" height="18" style={{ position: "absolute", top: -10, right: -10 }}>
            <polygon points="9,2 10,7 15,7 11,10 13,15 9,12 5,15 7,10 3,7 8,7" fill="#c8d2ff" />
          </svg>
        </a>
        <a
          href="/torneos"
          style={{
            ...buttonBase,
            background: "transparent",
            color: "#ebecef",
            border: "2px solid #c8d2ff",
          }}
          className="acubi-btn acubi-btn-tertiary"
        >
          Ver Torneos
          <svg width="18" height="18" style={{ position: "absolute", top: -10, right: -10 }}>
            <polygon points="9,2 10,7 15,7 11,10 13,15 9,12 5,15 7,10 3,7 8,7" fill="#c8d2ff" />
          </svg>
        </a>
      </div>
    </main>
  );
}
