import { PieChart, Pie, Cell } from 'recharts';

interface GraficoFaltasProps {
    horasFaltadas: number;
    limiteFaltas: number;
    totalHoras: number;
}

export const GraficoFaltas = ({ horasFaltadas, limiteFaltas, totalHoras }: GraficoFaltasProps) => {
    const porcentajeFaltado = (horasFaltadas / totalHoras) * 100;
    const porcentajePermitido = (limiteFaltas / totalHoras) * 100;
    const excedeLimite = horasFaltadas > limiteFaltas;

    const data = [
        { name: 'Faltas', value: horasFaltadas },
        { name: 'Restante', value: totalHoras - horasFaltadas },
    ];

    const COLORS = excedeLimite ? ['#EF4444', '#E5E7EB'] : ['#1D3750', '#E5E7EB'];
    const SIZE = 140;
    const PADDING = 20; // espacio extra para que no se corte

    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="relative flex justify-center items-center" style={{ width: SIZE + PADDING, height: SIZE + PADDING }}>
                <PieChart width={SIZE + PADDING} height={SIZE + PADDING}>
                    <Pie
                        data={data}
                        cx={(SIZE + PADDING) / 2}
                        cy={(SIZE + PADDING) / 2}
                        innerRadius={SIZE / 3}
                        outerRadius={SIZE / 2}
                        paddingAngle={2}
                        dataKey="value"
                        isAnimationActive={true}
                        animationDuration={800}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>

                {/* Texto centrado absolutamente */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold drop-shadow-sm">
                        {porcentajeFaltado.toFixed(1)}%
                    </span>
                </div>
            </div>

            <div className={`text-sm font-medium text-center ${excedeLimite ? 'text-acento' : 'text-primary'}`}>
                {excedeLimite ? (
                    <>
                        Has excedido el límite de faltas
                        <br />
                        <span className="text-xs">({porcentajeFaltado.toFixed(1)}% &gt; {porcentajePermitido.toFixed(1)}%)</span>
                    </>
                ) : (
                    <>
                        Has faltado un {porcentajeFaltado.toFixed(1)}%
                        <br />
                        <span className="text-xs">Límite: {porcentajePermitido.toFixed(1)}%</span>
                    </>
                )}
            </div>
        </div>
    );
};
