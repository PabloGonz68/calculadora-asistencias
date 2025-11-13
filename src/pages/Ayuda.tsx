import { BackgroundEfecto } from "../components/BackgroundEfecto";

export const Ayuda = () => {
    return (
        <div className="relative min-h-screen">
            <BackgroundEfecto />

            <div className="max-w-3xl mx-auto p-6 text-primary bg-fondo/30 backdrop-blur-sm rounded-2xl mt-10 mb-20 shadow-lg">
                <h1 className="text-3xl font-bold text-primary mb-4 text-center">
                    Cómo usar la Calculadora de Asistencias
                </h1>
                <p className="mb-4">
                    Esta herramienta te permite saber cuántas horas podés faltar antes de perder la cursada.
                    Simplemente completá tus datos y el sistema hará los cálculos por vos.
                </p>
                <h2 className="text-xl font-semibold text-primary mt-6 mb-2">Pasos para usarla:</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Ingresa las horas totales del curso.</li>
                    <li>Indica que dias tienes clase en la semana y añade las horas de la asignatura en su dia correspondiente.</li>
                    <li>Agrega las faltas que ya tienes.</li>
                    <li>La calculadora te mostrará cuántas horas te quedan disponibles y todos los datos usados para su cálculo.</li>
                </ol>
                <div className="mt-6 flex p-2 items-center border-2 rounded-2xl border-primary/50 w-fit bg-secondary-light/30">
                    <p className="italic text-sm text-primary/50">
                        💡 Consejo: puedes guardar tus asignaturas y datos localmente, así se mantienen al volver.
                    </p>
                </div>
            </div>
        </div>
    );
};
