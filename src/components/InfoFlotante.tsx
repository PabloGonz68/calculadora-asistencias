import { Info } from "lucide-react";
import { motion } from "framer-motion";

export const InfoFlotante = () => {
    return (
        <motion.div
            className="z-50 fixed bottom-12 right-6 bg-primary/50 text-secondary-light backdrop-blur-md rounded-full shadow-lg flex items-center gap-2 px-4 py-3 cursor-pointer overflow-hidden border border-primary/80"
            initial={{ width: 56, height: 56, borderRadius: 999 }}
            whileHover={{ width: 300, borderRadius: 16, height: 250 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <Info size={20} className="shrink-0" />
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="text-sm text-secondary-light/90 ml-2"
            >
                <p className="text-lg font-bold mb-1">Guía rápida</p>
                <ul className="space-y-1">
                    <li><span className="font-medium">Horas totales:</span> duración total del curso.</li>
                    <li><span className="font-medium">Horas semanales:</span> lo que cursas por semana.</li>
                    <li><span className="font-medium">Faltadas:</span> horas ya perdidas.</li>
                    <li><span className="font-medium">Restantes:</span> las que podés faltar sin pasarte.</li>
                    <li><span className="font-medium">Límite:</span> máximo permitido (por porcentaje).</li>
                </ul>
            </motion.div>
        </motion.div>
    );
};
