import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Ayuda } from "./pages/Ayuda";
import { Sobre } from "./pages/SobreNosotros";
import { PoliticaPrivacidad } from "./pages/PoliticaPrivacidad";
import { HomePage } from "./pages/HomePage";
import { Menu } from "lucide-react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 font-semibold text-primary transition-all duration-300
     ${isActive ? "text-white bg-primary rounded-lg shadow-lg" : "hover:text-white hover:bg-primary/50 hover:shadow-lg hover:rounded-lg"} 
     after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:from-primary after:to-acento after:transition-all after:duration-300 hover:after:w-full`;

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/ayuda", label: "Ayuda" },
    { to: "/sobre", label: "Sobre Nosotros" },
    { to: "/privacidad", label: "Privacidad" },
  ];

  return (
    <Router>
      <nav className="p-4 bg-secondary-light/20 backdrop-blur-md shadow-md rounded-b-xl sticky top-0 z-50">
        {/* Desktop Links */}
        <div className="hidden md:flex justify-center gap-4">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden justify-between items-center">
          <div className="text-lg font-bold text-primary">Menú</div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} className="text-primary" />
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col mt-4 gap-2 md:hidden">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/privacidad" element={<PoliticaPrivacidad />} />
      </Routes>
    </Router>
  );
}
