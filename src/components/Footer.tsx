import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: typeof Github; label: string }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            title={label}
            className="group relative"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <motion.div
                className="relative bg-linear-to-br from-secondary-light/30 to-secondary-light/10 hover:from-primary hover:to-primary/80 text-primary hover:text-secondary-light rounded-full p-3 transition-all duration-300 cursor-pointer"
                whileHover={{
                    boxShadow: "0 0 20px rgba(29, 55, 80, 0.4)",
                }}
            >
                <Icon size={24} strokeWidth={1.5} />
                <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-secondary-light px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {label}
                </motion.div>
            </motion.div>
        </motion.a>
    );
};

export const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <footer className="w-full flex justify-center items-center pb-5">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-12 py-8 px-6 w-[70%] bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 text-secondary-light overflow-hidden border border-primary/60 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6"
            >
                <motion.div variants={itemVariants} className="flex-1">
                    <p className="mb-3 font-light text-sm leading-relaxed">
                        <span className="block text-lg font-semibold mb-2">Desarrollado por {" "}
                            <motion.a
                                href="https://www.linkedin.com/in/pablo-gonz%C3%A1lez-silva-/"
                                target="_blank"
                                rel="noreferrer"
                                className="font-bold text-secondary-light hover:text-white relative group inline-block"
                                whileHover={{ scale: 1.01 }}
                            >
                                Pablo González Silva
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-white to-secondary-light group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        </span>
                    </p>
                    <p className="text-xs text-secondary-light/70 tracking-wide">
                        © {new Date().getFullYear()} Calculadora de Asistencias. Todos los derechos reservados.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex justify-center items-center gap-6 shrink-0"
                >
                    <SocialLink
                        href="https://github.com/PabloGonz68"
                        icon={Github}
                        label="Visita Mi GitHub"
                    />
                    <SocialLink
                        href="https://www.linkedin.com/in/pablo-gonz%C3%A1lez-silva-/"
                        icon={Linkedin}
                        label="Visita Mi LinkedIn"
                    />
                </motion.div>
            </motion.div>
        </footer>
    );
};