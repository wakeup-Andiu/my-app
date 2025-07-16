"use client";
import { useUser } from "./UserContext";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
  <nav style={{
    background: '#272a37',
    borderBottom: '2px solid #c8d2ff',
    color: '#c8d2ff',
    padding: '1.2rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    fontWeight: 700
  }}>
    {/* Estrella decorativa izquierda */}
    <svg width="32" height="32" style={{position: 'absolute', left: 10, top: 14}}><polygon points="16,2 18,12 28,12 19,18 22,28 16,21 10,28 13,18 4,12 14,12" fill="#ebecef"/></svg>
    <div style={{ fontSize: '1.5rem', letterSpacing: '0.05em', color: '#ebecef', textShadow: '0 0 8px #c8d2ff' }}>Torneos Gamer</div>
    <div style={{ display: 'flex', gap: '1.5rem', zIndex: 1 }}>
      <a href="/" style={{ color: '#c8d2ff', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#ebecef')} onMouseOut={e => (e.currentTarget.style.color = '#c8d2ff')}>Inicio</a>
      {!loading && !user && <a href="/register" style={{ color: '#c8d2ff', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#ebecef')} onMouseOut={e => (e.currentTarget.style.color = '#c8d2ff')}>Registro</a>}
      {!loading && !user && <a href="/login" style={{ color: '#c8d2ff', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#ebecef')} onMouseOut={e => (e.currentTarget.style.color = '#c8d2ff')}>Login</a>}
      <a href="/torneos" style={{ color: '#c8d2ff', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#ebecef')} onMouseOut={e => (e.currentTarget.style.color = '#c8d2ff')}>Torneos</a>
      <a href="/admin" style={{ color: '#c8d2ff', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#ebecef')} onMouseOut={e => (e.currentTarget.style.color = '#c8d2ff')}>Admin</a>
      <a href="/perfil" style={{ color: '#c8d2ff', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#ebecef')} onMouseOut={e => (e.currentTarget.style.color = '#c8d2ff')}>Perfil</a>
      {!loading && user && (
        <button onClick={handleLogout} style={{ color: '#c8d2ff', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = '#ebecef')} onMouseOut={e => (e.currentTarget.style.color = '#c8d2ff')}>Cerrar sesión</button>
      )}
    </div>
    {/* Estrella decorativa derecha */}
    <svg width="32" height="32" style={{position: 'absolute', right: 10, top: 14}}><polygon points="16,2 18,12 28,12 19,18 22,28 16,21 10,28 13,18 4,12 14,12" fill="#c8d2ff"/></svg>
  </nav>
);
}
