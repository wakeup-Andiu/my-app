import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-violet-900 text-white">
      <main className="flex flex-col items-center gap-8 py-20 px-4 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center drop-shadow-lg">Bienvenido a GamerTorneos</h1>
        <p className="text-lg text-center mb-6 max-w-xl">
          Plataforma para gamers donde puedes registrarte, iniciar sesión, ver torneos publicados, inscribirte y crear torneos si eres administrador. ¡Participa y demuestra tu habilidad en tus juegos favoritos!
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <a href="/register" className="px-6 py-3 bg-blue-600 rounded shadow hover:bg-blue-700 font-semibold transition">Registro</a>
          <a href="/login" className="px-6 py-3 bg-green-600 rounded shadow hover:bg-green-700 font-semibold transition">Login</a>
          <a href="/torneos" className="px-6 py-3 bg-purple-600 rounded shadow hover:bg-purple-700 font-semibold transition">Ver Torneos</a>
          <a href="/admin" className="px-6 py-3 bg-yellow-500 rounded shadow hover:bg-yellow-600 font-semibold transition text-gray-900">Admin</a>
        </div>
      </main>
    </div>
  );
}

