import { useState } from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

export const InfoFlotante = () => {
    const [active, setActive] = useState(false);

    return (
        <motion.div
            className="z-50 fixed bottom-12 right-6 bg-primary/50 text-secondary-light backdrop-blur-md rounded-full shadow-lg flex items-center gap-2 px-4 py-3 cursor-pointer overflow-hidden border border-primary/80"
            initial={{ width: 56, height: 56, borderRadius: 999 }}
            animate={{
                width: active ? 300 : 56,
                height: active ? 250 : 56,
                borderRadius: active ? 16 : 999,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setActive(!active)}
        >
            <Info size={20} className="shrink-0" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
                className="text-sm text-secondary-light/90 ml-2"
            >
                <p className="text-lg font-bold mb-1">Guía rápida</p>
                <ul className="space-y-1">
                    <li>
                        <span className="font-medium">Horas totales:</span> duración total del curso.
                    </li>
                    <li>
                        <span className="font-medium">Horas semanales:</span> lo que cursas por semana.
                    </li>
                    <li>
                        <span className="font-medium">Faltadas:</span> horas ya perdidas.
                    </li>
                    <li>
                        <span className="font-medium">Restantes:</span> las que podés faltar sin pasarte.
                    </li>
                    <li>
                        <span className="font-medium">Límite:</span> máximo permitido (por porcentaje).
                    </li>
                </ul>
            </motion.div>
        </motion.div>
    );
};
