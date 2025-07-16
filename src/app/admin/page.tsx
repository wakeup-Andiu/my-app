import React from "react";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Crear Torneo</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Nombre del Torneo" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="date" placeholder="Fecha" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" placeholder="Juego" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <textarea placeholder="Descripción" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="submit" className="w-full py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700">Publicar Torneo</button>
        </form>
      </div>
    </div>
  );
}
