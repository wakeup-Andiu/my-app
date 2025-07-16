import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow">
      <div className="font-bold text-lg">GamerTorneos</div>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-400">Inicio</Link>
        <Link href="/register" className="hover:text-blue-400">Registro</Link>
        <Link href="/login" className="hover:text-blue-400">Login</Link>
        <Link href="/torneos" className="hover:text-blue-400">Torneos</Link>
        <Link href="/admin" className="hover:text-blue-400">Admin</Link>
      </div>
    </nav>
  );
}
