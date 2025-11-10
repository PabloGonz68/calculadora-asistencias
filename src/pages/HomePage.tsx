import { useEffect, useState } from 'react';
import type { Asignatura } from '../components/FormularioAsignatura';
import { FormularioAsignatura } from '../components/FormularioAsignatura';
import { ListaAsignaturas } from '../components/ListaAsignaturas';
import { guardarAsignaturas, cargarAsignaturas } from '../utils/calculations';
import { Flame } from 'lucide-react';
import { InfoFlotante } from '../components/InfoFlotante';
import { BackgroundEfecto } from '../components/BackgroundEfecto';
import { Footer } from '../components/Footer';

export const HomePage = () => {
    const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);

    useEffect(() => {
        const asignaturasGuardadas = cargarAsignaturas();
        setAsignaturas(asignaturasGuardadas);
    }, []);

    const handleAgregarAsignatura = (nuevaAsignatura: Asignatura) => {
        const asignaturasActualizadas = [...asignaturas, nuevaAsignatura];
        setAsignaturas(asignaturasActualizadas);
        guardarAsignaturas(asignaturasActualizadas);
    };

    const handleEliminarAsignatura = (id: string) => {
        const asignaturasActualizadas = asignaturas.filter(
            (asignatura) => asignatura.id !== id
        );
        setAsignaturas(asignaturasActualizadas);
        guardarAsignaturas(asignaturasActualizadas);
    };

    return (
        <div className="relative min-h-screen">
            <BackgroundEfecto />

            {/* Contenido principal */}
            <div className="relative z-10 py-8">
                <InfoFlotante />
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className='flex justify-center items-center flex-col mb-8 gap-1'>
                        <img src="/logo.webp" alt="Logo" className="w-24 h-24 bg-fondo/10 backdrop-blur-sm rounded-full p-2 object-cover" />
                        <div className='flex justify-center items-center'>

                            <h1 className="text-3xl ml-[-15px] font-bold text-primary text-center">
                                Calculadora de Asistencias
                            </h1>
                        </div>

                        <div className="
  relative rounded-3xl border-2 border-primary 
  bg-secondary-light/40 backdrop-blur-sm 
  p-3 w-full md:w-2/3 flex gap-3 justify-center items-center 
  shadow-lg transition-all duration-300
  overflow-hidden
">
                            {/* Brillo animado alrededor */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-primary opacity-30 animate-pulse"></div>

                            {/* Ícono de fueguito animado */}
                            <Flame size={22} className="text-primary fill-primary/40 animate-bounce-slow" />

                            {/* Texto */}
                            <span className="text-center text-primary font-medium tracking-wide">
                                Sigue tu asistencia, controla tus faltas y mejora tu rendimiento.
                            </span>
                        </div>



                    </div>
                    <FormularioAsignatura onAgregarAsignatura={handleAgregarAsignatura as unknown as (asignatura: import('../components/FormularioAsignatura').Asignatura) => void} />
                    <ListaAsignaturas
                        asignaturas={asignaturas}
                        onEliminarAsignatura={handleEliminarAsignatura}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};
