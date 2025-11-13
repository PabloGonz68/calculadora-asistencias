import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HorarioDia } from '../utils/calculations';
import { DIAS_SEMANA } from '../utils/calculations';
import Swal from 'sweetalert2';
import { ChevronDown, PackagePlus } from 'lucide-react';

export interface Asignatura {
    id: string;
    nombre: string;
    horario: HorarioDia[];
    horasTotalesCurso: number;
    diasCursoSemanales: number;
    horasFaltadas: number;
    porcentaje?: number;
}


interface FormularioAsignaturaProps {
    onAgregarAsignatura: (asignatura: Asignatura) => void;
}

export const FormularioAsignatura = ({ onAgregarAsignatura }: FormularioAsignaturaProps) => {
    const [formData, setFormData] = useState({
        nombre: '',
        horasTotales: '',
        horasFaltadas: '0',
        porcentaje: '20',
        horario: DIAS_SEMANA
    });

    const [abierto, setAbierto] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tieneHorasAsignadas = formData.horario.some(dia => dia.activo && dia.horas && dia.horas > 0);
        if (!tieneHorasAsignadas) {
            Swal.fire({
                icon: 'warning',
                title: 'Horario incompleto',
                text: 'Debes seleccionar al menos un día con horas mayores a 0.',
                confirmButtonColor: '#1D3750',
            });
            return;
        }

        if (Number(formData.horasTotales) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Horas totales inválidas',
                text: 'El total de horas del curso debe ser mayor que 0.',
                confirmButtonColor: '#1D3750',
            });
            return;
        }

        const nuevaAsignatura: Asignatura = {
            id: Date.now().toString(),
            nombre: formData.nombre,
            horario: formData.horario,
            horasTotalesCurso: Number(formData.horasTotales),
            diasCursoSemanales: formData.horario.filter(d => d.activo).length,
            horasFaltadas: Number(formData.horasFaltadas),
            porcentaje: Number(formData.porcentaje),
        };


        onAgregarAsignatura(nuevaAsignatura);

        Swal.fire({
            icon: 'success',
            title: 'Asignatura agregada',
            text: `${formData.nombre} se ha añadido correctamente.`,
            timer: 1500,
            showConfirmButton: false,
        });

        setFormData({
            nombre: '',
            horasTotales: '',
            horasFaltadas: '0',
            porcentaje: '20',
            horario: DIAS_SEMANA
        });
        setAbierto(false);
    };

    const handleHorarioChange = (index: number, campo: keyof HorarioDia, valor: number | boolean) => {
        const nuevoHorario = formData.horario.map((dia, i) => {
            if (i === index) {
                return { ...dia, [campo]: valor };
            }
            return dia;
        });
        setFormData({ ...formData, horario: nuevoHorario });
    };

    return (
        <div className="rounded-2xl overflow-hidden border-2 border-primary bg-secondary-light/50 backdrop-blur-sm shadow-xl">
            {/* CABECERA DESPLEGABLE */}
            <button
                type="button"
                onClick={() => setAbierto(!abierto)}
                className="flex w-full items-center justify-between px-6 py-4 text-left bg-secondary-light/40 hover:bg-secondary-light/60 transition-all duration-200"
            >
                <div className="flex items-center gap-3 text-primary font-semibold text-lg">
                    <PackagePlus size={22} />
                    Agregar nueva asignatura
                </div>
                <motion.div
                    animate={{ rotate: abierto ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={22} className="text-primary" />
                </motion.div>
            </button>

            {/* CONTENIDO DESPLEGABLE */}
            <AnimatePresence initial={false}>
                {abierto && (
                    <motion.form
                        key="formulario"
                        onSubmit={handleSubmit}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden space-y-6 px-6 py-6"
                    >
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-primary-dark mb-1">
                                Nombre de la asignatura
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                required
                                className="w-full rounded-md border border-gray-300 bg-secondary-light p-2 focus:border-primary focus:ring-primary focus:ring-2 outline-none transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="horasTotales" className="block text-sm font-medium text-primary-dark mb-1">
                                Total de horas del curso
                            </label>
                            <input
                                type="number"
                                id="horasTotales"
                                value={formData.horasTotales}
                                onChange={(e) => setFormData({ ...formData, horasTotales: e.target.value })}
                                min="1"
                                required
                                className="w-full rounded-md border border-gray-300 bg-secondary-light p-2 focus:border-primary focus:ring-primary focus:ring-2 outline-none transition-all duration-200"
                            />
                        </div>

                        <div>
                            <div>
                                <label className="block text-sm font-medium text-primary-dark mb-1">
                                    Horario semanal
                                </label>
                                <p className="text-xs text-primary mb-2">
                                    Selecciona todos los días que tengas clase. Para cada día activo, indica únicamente las horas que corresponden a esta asignatura.
                                </p>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                {formData.horario.map((dia, index) => (
                                    <motion.div
                                        key={dia.dia}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`flex items-center justify-between p-3 border rounded-xl transition-all duration-300 ${dia.activo
                                            ? 'bg-primary/10 border-primary shadow-sm'
                                            : 'bg-gray-50 border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`dia-${dia.dia}`}
                                                checked={dia.activo}
                                                onChange={(e) => handleHorarioChange(index, 'activo', e.target.checked)}
                                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                            />
                                            <label htmlFor={`dia-${dia.dia}`} className="text-sm text-primary capitalize cursor-pointer">
                                                {dia.dia}
                                            </label>
                                        </div>

                                        <AnimatePresence>
                                            {dia.activo && (
                                                <motion.input
                                                    key="input-horas"
                                                    type="number"
                                                    value={dia.horas || ''}
                                                    onChange={(e) => handleHorarioChange(index, 'horas', Number(e.target.value))}
                                                    min="1"
                                                    max="24"
                                                    placeholder="Horas"
                                                    className="w-20 rounded-md border border-gray-300 p-1 text-center focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all duration-200"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="horasFaltadas" className="block text-sm font-medium text-primary-dark mb-1">
                                Horas ya faltadas (opcional)
                            </label>
                            <input
                                type="number"
                                id="horasFaltadas"
                                value={formData.horasFaltadas}
                                onChange={(e) => setFormData({ ...formData, horasFaltadas: e.target.value })}
                                min="0"
                                className="w-full rounded-md border border-gray-300 bg-secondary-light p-2 focus:border-primary focus:ring-primary focus:ring-2 outline-none transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="porcentaje" className="block text-sm font-medium text-primary-dark mb-1">
                                Porcentaje máximo de faltas (%)
                            </label>
                            <input
                                type="number"
                                id="porcentaje"
                                value={formData.porcentaje}
                                onChange={(e) => setFormData({ ...formData, porcentaje: e.target.value })}
                                min={0}
                                max={100}
                                step={1}
                                required
                                className="w-full rounded-md border border-gray-300 bg-secondary-light p-2 focus:border-primary focus:ring-primary focus:ring-2 outline-none transition-all duration-200"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Por defecto 20%. Usa valores entre 0 y 100.
                            </p>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03, boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)' }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium transition-all duration-200 hover:bg-primary/90"
                        >
                            Agregar Asignatura
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};
