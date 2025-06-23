import React from "react";

const BackgroundBeams: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white z-0">
      {/* Container das beams - linhas finas diagonais animadas */}
      <div className="absolute inset-0 flex space-x-4 -rotate-12">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-20 blur-sm animate-beam-move"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </div>

      {/* Gradiente radial para suavizar fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-gray-100 to-white opacity-40" />

      <style jsx global>{`
        @keyframes beamMove {
          0% {
            transform: translateX(-200%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-beam-move {
          animation: beamMove 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundBeams;
