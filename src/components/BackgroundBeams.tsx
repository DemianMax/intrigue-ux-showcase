import React from "react";

const BackgroundBeams: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden z-0">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 960"
        fill="none"
      >
        <g className="beams" filter="url(#filter0_f_4_216)">
          {[...Array(7)].map((_, i) => (
            <rect
              key={i}
              x={-120 + 180 * i} // espaçamento mais próximo
              y={200} // posiciona verticalmente mais no meio
              width={100} // largura menor
              height={600} // altura menor
              fill={`url(#paint${i}_linear_4_216)`}
              fillOpacity="0.25" // um pouco mais opaco
              transform={`rotate(30 ${-120 + 180 * i} 200)`} // rota em volta do centro do rect
              className="beam-rect"
              style={{ animationDelay: `${i * 1.5}s` }}
            />
          ))}
        </g>

        <defs>
          <filter
            id="filter0_f_4_216"
            x="-480"
            y="-240"
            width="2160"
            height="1680"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="80" result="effect1_foregroundBlur_4_216" /> {/* menos blur */}
          </filter>

          {[...Array(7)].map((_, i) => (
            <linearGradient
              key={i}
              id={`paint${i}_linear_4_216`}
              x1="0"
              y1="0"
              x2="0"
              y2="600"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00B7FF" />
              <stop offset="1" stopColor="#5A2EB8" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>

      <style jsx global>{`
        .beam-rect {
          animation: beamMove 10s linear infinite;
          transform-origin: center center;
        }

        @keyframes beamMove {
          0% {
            transform: translateX(-150px) rotate(30deg);
          }
          100% {
            transform: translateX(150px) rotate(30deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundBeams;
