export interface HorarioDia {
  dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
  horas: number;
  activo: boolean;
}

export interface Asignatura {
  id: string;
  nombre: string;
  horario: HorarioDia[];
  horasTotales: number;
  horasFaltadas: number;
  porcentaje?: number;
}

interface ResultadoCalculo {
  horasSemanales: number;
  totalHorasAsignatura: number;
  limiteFaltas: number;
  horasRestantes: number;
  semanasPosiblesFalta: number;
  advertencias: string[];
}


export const calcularAsistencia = (asignatura: Asignatura): ResultadoCalculo => {
  const advertencias: string[] = [];

  const horasSemanales = asignatura.horario
    .filter(dia => dia.activo)
    .reduce((total, dia) => total + dia.horas, 0);

  if (horasSemanales === 0) {
    advertencias.push('No hay horas de clase asignadas en ningún día de la semana');
  }

  const totalHorasAsignatura = asignatura.horasTotales;
  const porcentaje = asignatura.porcentaje ?? 20;
  const limiteFaltas = Math.floor(totalHorasAsignatura * (porcentaje / 100));
  const horasRestantes = Math.max(0, limiteFaltas - asignatura.horasFaltadas);

  const semanasPosiblesFalta =
    horasSemanales > 0
      ? Math.floor((horasRestantes / horasSemanales) * 10) / 10
      : 0;

  if (asignatura.horasFaltadas > limiteFaltas) {
    advertencias.push('Has superado el límite de faltas permitido');
  }

  return {
    horasSemanales,
    totalHorasAsignatura,
    limiteFaltas,
    horasRestantes,
    semanasPosiblesFalta,
    advertencias
  };
};


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
  localStorage.setItem('asignaturas', JSON.stringify(asignaturas, (key, value) => {
    if (key === 'fechaInicio' || key === 'fechaFin') {
      return value ? value.toISOString() : null;
    }
    return value;
  }));
};

export const cargarAsignaturas = (): Asignatura[] => {
  const asignaturasGuardadas = localStorage.getItem('asignaturas');
  if (!asignaturasGuardadas) return [];
  
  return JSON.parse(asignaturasGuardadas, (key, value) => {
    if (key === 'fechaInicio' || key === 'fechaFin') {
      return value ? new Date(value) : undefined;
    }
    return value;
  });
};