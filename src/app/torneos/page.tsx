"use client";
import React, { useState } from "react";

const mockTorneos = [
  { id: 1, nombre: "Torneo Valorant", fecha: "2025-08-01", juego: "Valorant", descripcion: "Torneo 5v5 eliminatoria simple." },
  { id: 2, nombre: "Torneo LoL", fecha: "2025-08-10", juego: "League of Legends", descripcion: "Competencia abierta para todos los niveles." },
];

export default function TorneosPage() {
  const [inscritos, setInscritos] = useState<number[]>([]);

  const handleInscribirse = (id: number) => {
    setInscritos([...inscritos, id]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-6">Torneos Disponibles</h2>
      <div className="space-y-6 w-full max-w-2xl">
        {mockTorneos.map((torneo) => (
          <div key={torneo.id} className="p-6 bg-white rounded shadow flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{torneo.nombre}</h3>
            <p><span className="font-medium">Juego:</span> {torneo.juego}</p>
            <p><span className="font-medium">Fecha:</span> {torneo.fecha}</p>
            <p>{torneo.descripcion}</p>
            <button
              className={`mt-2 px-4 py-2 rounded text-white ${inscritos.includes(torneo.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={() => handleInscribirse(torneo.id)}
              disabled={inscritos.includes(torneo.id)}
            >
              {inscritos.includes(torneo.id) ? "Inscrito" : "Inscribirse"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
