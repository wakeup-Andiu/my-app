"use client";
import React, { useState } from "react";

interface AdminFormClientProps {
  onSubmit: (data: { nombre: string; juego: string; fecha: string; descripcion: string }) => void;
  loading: boolean;
  mensaje?: string;
  initial?: { nombre: string; juego: string; fecha: string; descripcion: string };
}

export default function AdminFormClient({ onSubmit, loading, mensaje, initial = { nombre: '', juego: '', fecha: '', descripcion: '' } }: AdminFormClientProps) {
  const [nombre, setNombre] = useState(initial.nombre);
  const [juego, setJuego] = useState(initial.juego);
  const [fecha, setFecha] = useState(initial.fecha);
  const [descripcion, setDescripcion] = useState(initial.descripcion);

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit({ nombre, juego, fecha, descripcion }); }}
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
        position: 'relative',
        border: '2px solid #c8d2ff',
        color: '#c8d2ff',
        fontFamily: 'Fredoka, sans-serif'
      }}
    >
      {/* Estrella decorativa */}
      <svg width="36" height="36" style={{ position: 'absolute', left: 12, top: 12 }}><polygon points="18,3 20,13 30,13 21,19 24,29 18,23 12,29 15,19 6,13 16,13" fill="#ebecef"/></svg>
      <input
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
        type="text"
        placeholder="Nombre del Torneo"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <input
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
        type="text"
        placeholder="Juego"
        value={juego}
        onChange={e => setJuego(e.target.value)}
        required
      />
      <input
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
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
        required
      />
      <textarea
        style={{
          border: '2px solid #c8d2ff',
          borderRadius: 16,
          padding: '14px 18px',
          fontSize: 18,
          background: '#272a37',
          color: '#ebecef',
          outline: 'none',
          fontFamily: 'Fredoka, sans-serif',
          fontWeight: 500,
          minHeight: 70
        }}
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        required
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
        onMouseOver={e => { if (!loading) { e.currentTarget.style.background='#ebecef'; e.currentTarget.style.color='#2c3042'; }}}
        onMouseOut={e => { if (!loading) { e.currentTarget.style.background='#c8d2ff'; e.currentTarget.style.color='#2c3042'; }}}
      >
        {loading ? "Creando..." : "Crear Torneo"}
        <svg width="16" height="16" style={{position:'absolute', top: -10, right: -10}}><polygon points="8,2 9,6 13,6 9.5,9 11,13 8,10.5 5,13 6.5,9 3,6 7,6" fill="#ebecef"/></svg>
      </button>
      {mensaje && <div style={{ color: mensaje.startsWith("Error") ? '#ff4d4f' : '#25e67c', fontWeight: 600, marginTop: 10 }}>{mensaje}</div>}
    </form>
  );
}
