// En tu componente principal (HomePage, por ejemplo)
export const BackgroundEfecto = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-animado">
      {/* Partículas flotantes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`bola-flotante`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};
