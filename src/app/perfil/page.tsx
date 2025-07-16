"use client";
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/navigation";
import { useUser } from "../../components/UserContext";

interface Torneo {
  id: string;
  nombre: string;
  fecha: string;
  juego: string;
  descripcion: string;
}

export default function PerfilPage() {
  const { user, loading: userLoading } = useUser();
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      if (!user) {
        setError("No has iniciado sesión.");
        setLoading(false);
        return;
      }
      // Obtener torneos inscritos
      const { data: inscripciones, error: inscError } = await supabase
        .from("inscripciones")
        .select("torneo_id, torneo:torneos(id, nombre, fecha, juego, descripcion)")
        .eq("user_id", user.id);
      if (inscError) {
        setError("Error al cargar inscripciones");
        setLoading(false);
        return;
      }
      setTorneos(
        (inscripciones || [])
          .map((i: any) => i.torneo)
          .filter((t: Torneo | null) => t)
      );
      setLoading(false);
    }
    if (!userLoading) fetchData();
  }, [user, userLoading]);

  const handleEliminarCuenta = async () => {
    if (!user) return;
    setDeleting(true);
    setError("");
    await supabase.from("inscripciones").delete().eq("user_id", user.id);
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    setDeleting(false);
    if (deleteError) {
      setError("No se pudo eliminar la cuenta: " + deleteError.message);
    } else {
      router.push("/");
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    setLoggingOut(false);
    router.push("/login");
  };

  if (userLoading || loading) return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', fontFamily: 'Fredoka, sans-serif', color: '#c8d2ff', padding: '32px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 32, position: 'relative' }}>
        <svg width="110" height="30" style={{ position: 'absolute', left: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#ebecef"/></svg>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ebecef', letterSpacing: '0.03em', textShadow: '0 2px 8px #272a37' }}>Perfil de Usuario</h2>
        <svg width="110" height="30" style={{ position: 'absolute', right: 0, top: -10 }}><polygon points="20,20 25,30 15,30" fill="#c8d2ff"/></svg>
        <div style={{height:2, background:'#c8d2ff', width:150, margin:'16px auto 0 auto', borderRadius:2}}></div>
      </div>
      <div style={{ background: '#2c3042', padding: 40, borderRadius: 28, boxShadow: '0 2px 16px #1b1c23', width: '100%', maxWidth: 420, margin: '0 auto 32px auto', position: 'relative', border: '2px solid #c8d2ff', color: '#c8d2ff', fontFamily: 'Fredoka, sans-serif' }}>
        {/* Estrella decorativa */}
        <svg width="36" height="36" style={{ position: 'absolute', left: 12, top: 12 }}><polygon points="18,3 20,13 30,13 21,19 24,29 18,23 12,29 15,19 6,13 16,13" fill="#ebecef"/></svg>
        <p><span style={{ fontWeight: 700, color: '#c8d2ff' }}>Email:</span> <span style={{ color: '#ebecef' }}>{user.email}</span></p>
        <p><span style={{ fontWeight: 700, color: '#c8d2ff' }}>ID:</span> <span style={{ color: '#ebecef' }}>{user.id}</span></p>
        <button
          style={{
            marginTop: 24,
            padding: '14px 0',
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 18,
            background: '#c8d2ff',
            color: '#2c3042',
            border: '2px solid #ebecef',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
            boxShadow: '0 2px 8px #1b1c23',
            position: 'relative',
            outline: 'none',
            width: '100%'
          }}
          onClick={handleLogout}
          onMouseOver={e => { e.currentTarget.style.background='#ebecef'; e.currentTarget.style.color='#2c3042'; }}
          onMouseOut={e => { e.currentTarget.style.background='#c8d2ff'; e.currentTarget.style.color='#2c3042'; }}
        >
          Cerrar sesión
          <svg width="16" height="16" style={{position:'absolute', top: -10, right: -10}}><polygon points="8,2 9,6 13,6 9.5,9 11,13 8,10.5 5,13 6.5,9 3,6 7,6" fill="#ebecef"/></svg>
        </button>
        <button
          className="mt-2 px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300"
          onClick={handleEliminarCuenta}
          disabled={deleting}
        >
          {deleting ? "Eliminando..." : "Eliminar cuenta"}
        </button>
      </div>
    </div>
  );
}
