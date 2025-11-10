import { motion } from "framer-motion";
import { Trash2, CalendarDays, LibraryBig, Notebook } from "lucide-react";
import type { Asignatura } from "../utils/calculations";
import { calcularAsistencia } from "../utils/calculations";
import { GraficoFaltas } from "./GraficoFaltas";

interface ListaAsignaturasProps {
    asignaturas: Asignatura[];
    onEliminarAsignatura: (id: string) => void;
}

export const ListaAsignaturas = ({
    asignaturas,
    onEliminarAsignatura,
}: ListaAsignaturasProps) => {
    return (
        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <LibraryBig size={22} className="text-primary" />
                Asignaturas Registradas
            </h2>

            {asignaturas.length === 0 && (
                <p className="text-gray-500 text-center italic">
                    No hay asignaturas registradas todavía 🔍
                </p>
            )}

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 items-stretch">
                {asignaturas.map((asignatura, index) => {
                    const { horasSemanales, horasRestantes, limiteFaltas } =
                        calcularAsistencia(asignatura);

                    const percentOfLimit =
                        limiteFaltas > 0
                            ? (asignatura.horasFaltadas / limiteFaltas) * 100
                            : 0;
                    const percentForWidth = Math.min(Math.max(percentOfLimit, 0), 100);

                    return (

                        <motion.div
                            key={asignatura.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="hover:-translate-y-2 hover:shadow-xl transition-all flex flex-col h-full"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start rounded-t-2xl border-t-2 border-x-2 border-primary bg-primary shadow-md p-6">
                                <h3 className="text-lg font-semibold text-secondary-light flex items-center gap-2">
                                    <Notebook size={18} className="text-secondary-light" />
                                    {asignatura.nombre}
                                </h3>
                                <button
                                    onClick={() => onEliminarAsignatura(asignatura.id)}
                                    className="text-acento hover:text-white hover:bg-acento rounded-full p-2 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="relative bg-secondary-light/80 backdrop-blur-sm border-2 border-primary rounded-b-2xl shadow-md pb-6 px-6 transition-all flex-1 flex flex-col justify-between min-h-[350px]">



                                {/* Horario */}
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <h4 className="font-medium text-gray-700 flex items-center gap-1">
                                            <CalendarDays size={16} /> Horario semanal
                                        </h4>
                                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                                            {asignatura.horario.filter((d) => d.activo).length > 0 ? (
                                                asignatura.horario
                                                    .filter((d) => d.activo)
                                                    .map((dia) => (
                                                        <div
                                                            key={dia.dia}
                                                            className="flex justify-between capitalize"
                                                        >
                                                            <span>{dia.dia}</span>
                                                            <span>{dia.horas} h</span>
                                                        </div>
                                                    ))
                                            ) : (
                                                <p className="text-gray-400 italic">
                                                    No hay días asignados
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Datos */}
                                    <dl className="grid grid-cols-2 gap-3 text-sm">
                                        <DataItem label="Horas totales" value={asignatura.horasTotales} />
                                        <DataItem label="Horas semanales" value={horasSemanales} />
                                        <DataItem label="Faltadas" value={asignatura.horasFaltadas} />
                                        <DataItem label="Restantes" value={horasRestantes} />
                                    </dl>

                                    {/* Límite y gráfico */}
                                    <div className="pt-3 border-t border-gray-200 space-y-4">
                                        <div className="text-primary">
                                            <p className="font-medium">Límite de faltas</p>
                                            <p className="text-lg font-semibold">
                                                {limiteFaltas} horas{" "}
                                                <span className="text-sm text-gray-500">
                                                    ({Math.floor(limiteFaltas / horasSemanales)} sem.)
                                                </span>
                                            </p>
                                        </div>

                                        <GraficoFaltas
                                            horasFaltadas={asignatura.horasFaltadas}
                                            limiteFaltas={limiteFaltas}
                                            totalHoras={asignatura.horasTotales}
                                        />

                                        <div className="mt-2">
                                            <div className="text-sm font-medium text-gray-700 mb-1">
                                                Progreso hacia el límite
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentForWidth}%` }}
                                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                                    className={`h-3 rounded-full ${asignatura.horasFaltadas > limiteFaltas
                                                        ? "bg-acento"
                                                        : "bg-primary"
                                                        }`}
                                                />
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {Math.round(percentOfLimit)}% del límite
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// Subcomponentes
const DataItem = ({ label, value }: { label: string; value: number }) => (
    <div>
        <dt className="font-medium text-gray-700">{label}:</dt>
        <dd className="text-gray-600">{value}</dd>
    </div>
);

