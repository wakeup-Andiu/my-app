"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface Torneo {
  id: string;
  nombre: string;
  fecha: string;
  juego: string;
  descripcion: string;
}

export default function TorneosPage() {
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [inscritos, setInscritos] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [inscribiendo, setInscribiendo] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTorneos() {
      setLoading(true);
      setError("");
      // Obtener usuario actual
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Debes iniciar sesión para ver e inscribirte en torneos.");
        setLoading(false);
        return;
      }
      setUserId(user.id);
      // Obtener torneos
      const { data: torneosData, error: torneosError } = await supabase
        .from("torneos")
        .select("id, nombre, fecha, juego, descripcion")
        .order("fecha", { ascending: true });
      if (torneosError) {
        setError("Error al cargar torneos");
        setLoading(false);
        return;
      }
      setTorneos(torneosData || []);
      // Obtener inscripciones del usuario
      const { data: inscripcionesData } = await supabase
        .from("inscripciones")
        .select("torneo_id")
        .eq("user_id", user.id);
      setInscritos(inscripcionesData?.map((i: any) => i.torneo_id) || []);
      setLoading(false);
    }
    fetchTorneos();
  }, []);

  const handleInscribirse = async (torneoId: string) => {
    if (!userId) return;
    setInscribiendo(torneoId);
    setError("");
    const { error } = await supabase.from("inscripciones").insert({
      torneo_id: torneoId,
      user_id: userId,
    });
    setInscribiendo(null);
    if (error) {
      setError("No se pudo inscribir: " + error.message);
    } else {
      setInscritos([...inscritos, torneoId]);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;

  return (
  <div style={{ minHeight: '100vh', background: 'transparent', fontFamily: 'Fredoka, sans-serif', color: '#c8d2ff', padding: '32px 0' }}>
    <div style={{ textAlign: 'center', marginBottom: 32, position: 'relative' }}>
      <svg width="110" height="30" style={{ position: 'absolute', left: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#ebecef"/></svg>
      <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ebecef', letterSpacing: '0.03em', textShadow: '0 2px 8px #272a37' }}>Torneos Disponibles</h2>
      <svg width="110" height="30" style={{ position: 'absolute', right: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#c8d2ff"/></svg>
      <div style={{height:2, background:'#c8d2ff', width:150, margin:'16px auto 0 auto', borderRadius:2}}></div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%', maxWidth: 700, margin: '0 auto' }}>
      {torneos.length === 0 && <div style={{ color: '#ebecef', fontSize: 20 }}>No hay torneos publicados.</div>}
      {torneos.map((torneo) => (
        <div key={torneo.id} style={{
          background: '#2c3042',
          borderRadius: 24,
          boxShadow: '0 2px 16px #1b1c23',
          padding: 32,
          width: '100%',
          position: 'relative',
          border: '2px solid #c8d2ff',
          color: '#c8d2ff',
          fontFamily: 'Fredoka, sans-serif',
          overflow: 'hidden'
        }}>
          {/* Estrellas decorativas */}
          <svg width="36" height="36" style={{ position: 'absolute', left: 12, top: 12 }}><polygon points="18,3 20,13 30,13 21,19 24,29 18,23 12,29 15,19 6,13 16,13" fill="#ebecef"/></svg>
          <svg width="24" height="24" style={{ position: 'absolute', right: 20, bottom: 16 }}><polygon points="12,3 13,8 18,8 14,11 16,16 12,13 8,16 10,11 6,8 11,8" fill="#c8d2ff"/></svg>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ebecef', marginBottom: 8 }}>{torneo.nombre}</h3>
          <p><span style={{ fontWeight: 600, color: '#c8d2ff' }}>Juego:</span> <span style={{ color: '#ebecef' }}>{torneo.juego}</span></p>
          <p><span style={{ fontWeight: 600, color: '#c8d2ff' }}>Fecha:</span> <span style={{ color: '#ebecef' }}>{torneo.fecha}</span></p>
          <p style={{ color: '#c8d2ff', marginBottom: 16 }}>{torneo.descripcion}</p>
          <button
            style={{
              marginTop: 12,
              padding: '12px 32px',
              borderRadius: 16,
              fontWeight: 700,
              fontSize: 18,
              background: inscritos.includes(torneo.id) ? '#c8d2ff' : '#272a37',
              color: inscritos.includes(torneo.id) ? '#2c3042' : '#ebecef',
              border: '2px solid #c8d2ff',
              cursor: inscritos.includes(torneo.id) ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, color 0.2s',
              boxShadow: '0 2px 8px #1b1c23',
              position: 'relative',
              outline: 'none'
            }}
            onClick={() => handleInscribirse(torneo.id)}
            disabled={inscritos.includes(torneo.id) || inscribiendo === torneo.id}
            onMouseOver={e => { if (!inscritos.includes(torneo.id)) { e.currentTarget.style.background='#c8d2ff'; e.currentTarget.style.color='#2c3042'; }}}
            onMouseOut={e => { if (!inscritos.includes(torneo.id)) { e.currentTarget.style.background='#272a37'; e.currentTarget.style.color='#ebecef'; }}}
          >
            {inscritos.includes(torneo.id)
              ? "Inscrito"
              : inscribiendo === torneo.id
              ? "Inscribiendo..."
              : "Inscribirse"}
            <svg width="16" height="16" style={{position:'absolute', top: -10, right: -10}}><polygon points="8,2 9,6 13,6 9.5,9 11,13 8,10.5 5,13 6.5,9 3,6 7,6" fill="#ebecef"/></svg>
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
