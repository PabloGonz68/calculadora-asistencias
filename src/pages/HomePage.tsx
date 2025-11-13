import { useEffect, useState } from 'react';
import type { Asignatura } from '../utils/calculations';
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
        setAsignaturas(cargarAsignaturas());
    }, []);

    const handleAgregarAsignatura = (nuevaAsignatura: Asignatura) => {
        const nuevas = [...asignaturas, nuevaAsignatura];
        setAsignaturas(nuevas);
        guardarAsignaturas(nuevas);
    };

    const handleEliminarAsignatura = (id: string) => {
        const nuevas = asignaturas.filter(a => a.id !== id);
        setAsignaturas(nuevas);
        guardarAsignaturas(nuevas);
    };

    return (
        <div className="relative min-h-screen">
            <BackgroundEfecto />
            <div className="relative z-10 py-8">
                <InfoFlotante />
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex justify-center items-center flex-col mb-8 gap-1">
                        <img src="/logo.webp" alt="Logo" className="w-24 h-24 bg-fondo/10 backdrop-blur-sm rounded-full p-2 object-cover" />
                        <h1 className="text-3xl font-bold text-primary text-center">Calculadora de Asistencias</h1>
                        <div className="relative rounded-3xl border-2 border-primary bg-secondary-light/40 backdrop-blur-sm p-3 w-full md:w-2/3 flex gap-3 justify-center items-center shadow-lg">
                            <div className="absolute inset-0 rounded-3xl border-2 border-primary opacity-30 animate-pulse"></div>
                            <Flame size={22} className="text-primary fill-primary/40 animate-bounce-slow" />
                            <span className="text-center text-primary font-medium tracking-wide">
                                Sigue tu asistencia, controla tus faltas y mejora tu rendimiento.
                            </span>
                        </div>
                    </div>

                    <FormularioAsignatura onAgregarAsignatura={handleAgregarAsignatura} />
                    <ListaAsignaturas asignaturas={asignaturas} onEliminarAsignatura={handleEliminarAsignatura} />
                </div>
            </div>
            <Footer />
        </div>
    );
};
