import { BackgroundEfecto } from "../components/BackgroundEfecto";

export const Sobre = () => {
    return (
        <div className="relative min-h-screen">
            <BackgroundEfecto />

            <div className="max-w-3xl mx-auto p-6 text-primary bg-fondo/30 backdrop-blur-sm rounded-2xl mt-10 mb-20 shadow-lg">
                <h1 className="text-3xl font-bold text-primary mb-4 text-center">
                    Sobre la Calculadora de Asistencias
                </h1>
                <p className="mb-4">
                    Esta aplicación surge debido al cambio actual en la educación española, donde las faltas
                    justificadas e injustificadas cuentan de la misma manera para perder la evaluación continua.
                </p>
                <p className="mb-4">
                    Por ello, es fundamental tener controlada la asistencia, especialmente en casos de inasistencia
                    por salud o compromisos personales importantes. Esta herramienta te permite calcular y organizar
                    tus horas de clase de forma sencilla y visual.
                </p>
                <p className="mb-4">
                    Está desarrollada con <strong>React</strong> y <strong>Vite</strong>, y utiliza almacenamiento local,
                    por lo que tus datos se guardan únicamente en tu dispositivo.
                </p>
                <p className="mt-6 italic text-sm text-primary/50">
                    Creado para facilitarte la vida académica.
                </p>
            </div>
        </div>
    );
};
