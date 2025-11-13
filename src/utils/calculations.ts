export interface HorarioDia {
  dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
  horas: number;
  activo: boolean;
}

export interface Asignatura {
  id: string;
  nombre: string;
  horario: HorarioDia[];
  horasTotalesCurso: number; // Ej: 720
  diasCursoSemanales: number; // Ej: 4 (días que hay clase en total, no solo de esta asignatura)
  horasFaltadas: number;
  porcentaje?: number; // % permitido de faltas
}

interface ResultadoCalculo {
  horasSemanales: number;
  totalHorasAsignatura: number;
  limiteFaltas: number;
  horasRestantes: number;
  semanasPosiblesFalta: number;
  advertencias: string[];
}

/**
 * Calcula la asistencia de una asignatura teniendo en cuenta:
 * - Horas totales del curso (ej. 720h)
 * - Días de clase del curso (ej. 4 días por semana)
 * - Horas por día (fijas: 6)
 * - Horas semanales de la asignatura según los días seleccionados
 */
export const calcularAsistencia = (asignatura: Asignatura): ResultadoCalculo => {
  const advertencias: string[] = [];

  // Horas semanales de la asignatura (sumando los días activos)
  const horasSemanalesAsignatura = asignatura.horario
    .filter(dia => dia.activo)
    .reduce((total, dia) => total + dia.horas, 0);

  if (horasSemanalesAsignatura === 0) {
    advertencias.push('No has indicado en qué días tienes esta asignatura.');
  }

  // Curso general
  const horasPorDiaCurso = 6; // estándar, configurable si quieres
  const horasSemanalesCurso = asignatura.diasCursoSemanales * horasPorDiaCurso;

  if (asignatura.diasCursoSemanales === 0) {
    advertencias.push('No has indicado los días totales del curso.');
  }

  // Horas totales de esta asignatura (proporcionales a las horas totales del curso)
  const totalHorasAsignatura =
    horasSemanalesCurso > 0
      ? (asignatura.horasTotalesCurso * horasSemanalesAsignatura) / horasSemanalesCurso
      : 0;

  // Cálculos de faltas
  const porcentaje = asignatura.porcentaje ?? 20;
  const limiteFaltas = Math.floor(totalHorasAsignatura * (porcentaje / 100));
  const horasRestantes = Math.max(0, limiteFaltas - asignatura.horasFaltadas);
  const semanasPosiblesFalta =
    horasSemanalesAsignatura > 0
      ? Math.floor((horasRestantes / horasSemanalesAsignatura) * 10) / 10
      : 0;

  if (asignatura.horasFaltadas > limiteFaltas) {
    advertencias.push('Has superado el límite de faltas permitido.');
  }

  return {
    horasSemanales: horasSemanalesAsignatura,
    totalHorasAsignatura,
    limiteFaltas,
    horasRestantes,
    semanasPosiblesFalta,
    advertencias
  };
};

// Días base de la semana
export const DIAS_SEMANA: HorarioDia[] = [
  { dia: 'lunes', horas: 0, activo: false },
  { dia: 'martes', horas: 0, activo: false },
  { dia: 'miercoles', horas: 0, activo: false },
  { dia: 'jueves', horas: 0, activo: false },
  { dia: 'viernes', horas: 0, activo: false },
  { dia: 'sabado', horas: 0, activo: false },
  { dia: 'domingo', horas: 0, activo: false }
];

export const guardarAsignaturas = (asignaturas: Asignatura[]): void => {
  localStorage.setItem('asignaturas', JSON.stringify(asignaturas));
};

export const cargarAsignaturas = (): Asignatura[] => {
  const data = localStorage.getItem('asignaturas');
  return data ? JSON.parse(data) : [];
};
