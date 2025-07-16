import "./globals.css";
import { Fredoka } from "next/font/google";
import Navbar from "../components/Navbar";
import { UserProvider } from "../components/UserContext";


const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
  weight: ["400","500","700"]
});

export const metadata: Metadata = {
  title: "Torneos Gamer",
  description: "App de torneos gamer con Next.js y Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${fredoka.variable} antialiased`} style={{background: '#272a37', minHeight: '100vh', position: 'relative', overflowX: 'hidden', fontFamily: 'Fredoka, sans-serif'}}>
  {/* Patrón de estrellas SVG en el fondo */}
  <svg style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none'}}>
    <defs>
      <pattern id="stars" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="#c8d2ff"/>
        <circle cx="40" cy="30" r="1" fill="#ebecef"/>
        <circle cx="30" cy="50" r="1.2" fill="#c8d2ff"/>
        <polygon points="20,30 22,35 18,35" fill="#ebecef"/>
        <line x1="0" y1="0" x2="60" y2="60" stroke="#c8d2ff" strokeWidth="0.2" />
        <line x1="60" y1="0" x2="0" y2="60" stroke="#ebecef" strokeWidth="0.1" />
      </pattern>
    </defs>
    <rect width="100vw" height="100vh" fill="url(#stars)" />
  </svg>
  <div style={{position: 'relative', zIndex: 1}}>
    <UserProvider>
      <Navbar />
      {children}
    </UserProvider>
  </div>
</body>
    </html>
  );
}
