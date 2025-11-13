import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Ayuda } from "./pages/Ayuda";
import { Sobre } from "./pages/SobreNosotros";
import { PoliticaPrivacidad } from "./pages/PoliticaPrivacidad";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 font-semibold text-primary transition-all duration-300
     ${isActive ? "text-white bg-primary rounded-lg shadow-lg" : "hover:text-white hover:bg-primary/50 hover:shadow-lg hover:rounded-lg"} 
     after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:from-primary after:to-acento after:transition-all after:duration-300 hover:after:w-full`;

  return (
    <Router>
      <nav className="p-4 flex justify-center gap-4 bg-secondary-light/20 backdrop-blur-md shadow-md rounded-b-xl sticky top-0 z-50">
        <NavLink to="/" className={linkClasses}>Inicio</NavLink>
        <NavLink to="/ayuda" className={linkClasses}>Ayuda</NavLink>
        <NavLink to="/sobre" className={linkClasses}>Sobre Nosotros</NavLink>
        <NavLink to="/privacidad" className={linkClasses}>Privacidad</NavLink>
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
