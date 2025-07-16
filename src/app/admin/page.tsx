"use client";
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function AdminPage() {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [juego, setJuego] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Debes iniciar sesión como admin para crear torneos.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("torneos").insert({
      nombre,
      fecha,
      juego,
      descripcion,
      created_by: user.id,
    });
    setLoading(false);
    if (error) {
      setError("No se pudo crear el torneo: " + error.message);
    } else {
      setSuccess("¡Torneo publicado!");
      setNombre("");
      setFecha("");
      setJuego("");
      setDescripcion("");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', fontFamily: 'Fredoka, sans-serif', color: '#c8d2ff', padding: '32px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 32, position: 'relative' }}>
        <svg width="110" height="30" style={{ position: 'absolute', left: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#ebecef"/></svg>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ebecef', letterSpacing: '0.03em', textShadow: '0 2px 8px #272a37' }}>Crear Torneo</h2>
        <svg width="110" height="30" style={{ position: 'absolute', right: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#c8d2ff"/></svg>
        <div style={{height:2, background:'#c8d2ff', width:150, margin:'16px auto 0 auto', borderRadius:2}}></div>
      </div>
      <AdminFormClient
        onSubmit={({ nombre, juego, fecha, descripcion }) => handleSubmit({ target: { nombre, juego, fecha, descripcion } })}
        loading={loading}
        mensaje={mensaje}
        initial={{ nombre, juego, fecha, descripcion }}
      />
      {error && <div style={{ color: '#ff4d4f', fontWeight: 600, marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: '#25e67c', fontWeight: 600, marginTop: 10 }}>{success}</div>}
    </div>
  );
}
