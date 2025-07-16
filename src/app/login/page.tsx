"use client";
import React, { useState, FormEvent } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/torneos");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#272a37', fontFamily: 'Fredoka, sans-serif', color: '#c8d2ff', padding: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 18, position: 'relative' }}>
          <svg width="110" height="30" style={{ position: 'absolute', left: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#ebecef"/></svg>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ebecef', letterSpacing: '0.03em', textShadow: '0 2px 8px #272a37', margin: 0, zIndex: 2, position: 'relative' }}>Iniciar Sesión</h2>
          <svg width="110" height="30" style={{ position: 'absolute', right: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#c8d2ff"/></svg>
          <div style={{height:2, background:'#c8d2ff', width:120, margin:'16px auto 0 auto', borderRadius:2}}></div>
        </div>
        <form
          onSubmit={handleLogin}
          style={{
            background: '#2c3042',
            padding: 40,
            borderRadius: 28,
            boxShadow: '0 2px 16px #1b1c23',
            width: '100%',
            maxWidth: 420,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            fontFamily: 'Fredoka, sans-serif',
            color: '#c8d2ff'
          }}
        >
          {/* Estrella decorativa */}
          <svg width="36" height="36" style={{ position: 'absolute', left: 12, top: 12 }}><polygon points="18,3 20,13 30,13 21,19 24,29 18,23 12,29 15,19 6,13 16,13" fill="#ebecef"/></svg>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            style={{
              border: '2px solid #c8d2ff',
              borderRadius: 16,
              padding: '14px 18px',
              fontSize: 18,
              background: '#272a37',
              color: '#ebecef',
              outline: 'none',
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 500
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            style={{
              border: '2px solid #c8d2ff',
              borderRadius: 16,
              padding: '14px 18px',
              fontSize: 18,
              background: '#272a37',
              color: '#ebecef',
              outline: 'none',
              fontFamily: 'Fredoka, sans-serif',
              fontWeight: 500
            }}
          />
          <button
            type="submit"
            style={{
              background: '#c8d2ff',
              color: '#2c3042',
              border: '2px solid #ebecef',
              borderRadius: 16,
              fontWeight: 700,
              fontSize: 18,
              padding: '14px 0',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, color 0.2s',
              boxShadow: '0 2px 8px #1b1c23',
              position: 'relative',
              outline: 'none'
            }}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
            <svg width="16" height="16" style={{position:'absolute', top: -10, right: -10}}><polygon points="8,2 9,6 13,6 9.5,9 11,13 8,10.5 5,13 6.5,9 3,6 7,6" fill="#ebecef"/></svg>
          </button>
          {error && <div style={{ color: '#ff4d4f', fontWeight: 600, marginTop: 10 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};
