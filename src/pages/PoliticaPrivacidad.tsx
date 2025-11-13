import { BackgroundEfecto } from "../components/BackgroundEfecto";

export const PoliticaPrivacidad = () => {
    return (
        <div className="relative min-h-screen">
            <BackgroundEfecto />

            <div className="max-w-3xl mx-auto p-6 text-primary bg-fondo/30 backdrop-blur-sm rounded-2xl mt-10 mb-20 shadow-lg">
                <h1 className="text-3xl font-bold text-primary-dark mb-4 text-center">
                    Política de Privacidad
                </h1>
                <p className="mb-4">
                    En <strong>Calculadora de Asistencias</strong> respetamos tu privacidad. No recopilamos, almacenamos ni compartimos
                    información personal identificable.
                </p>
                <p className="mb-4">
                    Toda la información que ingreses (asignaturas, horas, faltas, etc.) se guarda únicamente en tu navegador
                    mediante <strong>almacenamiento local</strong> y nunca se envía a ningún servidor.
                </p>
                <p className="mb-4">
                    Este sitio puede utilizar cookies propias o de terceros para mejorar la experiencia de uso o mostrar anuncios.
                    Podés deshabilitarlas desde la configuración de tu navegador.
                </p>
                <p className="mt-6 italic text-sm text-primary/50">
                    Última actualización: {new Date().toLocaleDateString("es-ES")}
                </p>
            </div>
        </div>
    );
};
