// Pure CSS/SVG animation — no JavaScript, no external libraries.
// GPU-accelerated (transform + opacity only). Zero Core Web Vitals impact.
export default function Diamond4CAnimation() {
  const four_cs = [
    { label: 'Cut',     sub: 'Brilliance & fire', angle: 0,   color: '#d19b8a', delay: '0s' },
    { label: 'Color',   sub: 'D–Z scale',          angle: 90,  color: '#c9a87c', delay: '0.5s' },
    { label: 'Clarity', sub: 'Flawless to I3',     angle: 180, color: '#9ab5c8', delay: '1s' },
    { label: 'Carat',   sub: 'Size & weight',       angle: 270, color: '#a8b5a0', delay: '1.5s' },
  ]

  const R = 128

  const sparkles: Array<[number, number, string]> = [
    [-58, -16, '0s'],
    [58,  -20, '0.6s'],
    [2,   -64, '1.2s'],
    [-12,  22, '1.8s'],
  ]

  return (
    <div
      className="relative w-[300px] h-[300px] flex-shrink-0 select-none"
      aria-hidden="true"
    >
      <style>{`
        @keyframes au-spin    { from { transform: rotate(0deg); }    to { transform: rotate(360deg); } }
        @keyframes au-counter { from { transform: rotate(0deg); }    to { transform: rotate(-360deg); } }
        @keyframes au-shimmer { 0%,100%{ opacity:.12; } 50%{ opacity:.5; } }
        @keyframes au-pulse   { 0%,100%{ r:4; opacity:.7; } 50%{ r:6; opacity:1; } }
        @keyframes au-glow    { 0%,100%{ filter:drop-shadow(0 0 6px #d19b8a44); } 50%{ filter:drop-shadow(0 0 20px #d19b8a99); } }
        @keyframes au-float   { 0%,100%{ transform:translateY(0); }  50%{ transform:translateY(-7px); } }
        .au-orbit   { animation: au-spin    20s linear infinite; transform-origin: 150px 150px; }
        .au-counter { animation: au-counter 20s linear infinite; transform-origin: center; }
        .au-glow    { animation: au-glow    3s  ease-in-out infinite; }
        .au-float   { animation: au-float   4s  ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="auGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#f0ddd7" />
            <stop offset="45%"  stopColor="#d19b8a" />
            <stop offset="100%" stopColor="#8b5a4a" />
          </linearGradient>
          <linearGradient id="auShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dashed orbit ring */}
        <circle
          cx="150" cy="150" r={R}
          fill="none"
          stroke="#d19b8a"
          strokeWidth="0.6"
          strokeDasharray="3 9"
          opacity="0.2"
        />

        {/* Orbiting labels */}
        <g className="au-orbit">
          {four_cs.map(({ label, sub, angle, color }) => {
            const rad = (angle * Math.PI) / 180
            const x = 150 + R * Math.sin(rad)
            const y = 150 - R * Math.cos(rad)
            const cx2 = 150 + 44 * Math.sin(rad)
            const cy2 = 150 - 44 * Math.cos(rad)
            return (
              <g key={label} transform={`translate(${x},${y})`}>
                <line
                  x1="0" y1="0"
                  x2={cx2 - x} y2={cy2 - y}
                  stroke={color} strokeWidth="0.75" opacity="0.25"
                />
                <circle r="4" fill={color} opacity="0.85" />
                <g className="au-counter">
                  <rect x="-30" y="-26" width="60" height="30" rx="6"
                    fill="white" fillOpacity="0.96" stroke={color} strokeWidth="1"
                  />
                  <text x="0" y="-11" textAnchor="middle"
                    fontSize="9.5" fontFamily="Marcellus,Georgia,serif"
                    fill="#111" letterSpacing="0.06em"
                  >
                    {label.toUpperCase()}
                  </text>
                  <text x="0" y="0" textAnchor="middle"
                    fontSize="7" fontFamily="DM Sans,system-ui,sans-serif"
                    fill="#737373"
                  >
                    {sub}
                  </text>
                </g>
              </g>
            )
          })}
        </g>

        {/* Central diamond — float + glow */}
        <g transform="translate(150,150)">
          <g className="au-float au-glow">
            {/* Main diamond facets */}
            <polygon points="0,-50 40,0 0,50 -40,0" fill="url(#auGrad)" opacity="0.95" />
            {/* Shine overlay */}
            <polygon points="0,-50 40,0 0,0 -40,0"  fill="url(#auShine)" />
            {/* Facet lines */}
            <line x1="0" y1="-50" x2="0"   y2="50"  stroke="white" strokeWidth="0.6" opacity="0.25" />
            <line x1="0" y1="-50" x2="40"  y2="0"   stroke="white" strokeWidth="0.4" opacity="0.2" />
            <line x1="0" y1="-50" x2="-40" y2="0"   stroke="white" strokeWidth="0.4" opacity="0.2" />
            <line x1="40" y1="0"  x2="0"   y2="50"  stroke="white" strokeWidth="0.4" opacity="0.15" />
            <line x1="-40" y1="0" x2="0"   y2="50"  stroke="white" strokeWidth="0.4" opacity="0.15" />
            {/* Outline */}
            <polygon points="0,-50 40,0 0,50 -40,0"
              fill="none" stroke="#d19b8a" strokeWidth="1.5" opacity="0.6"
            />

            {/* Shimmer rays */}
            {([-1, 1] as const).map((dir, i) => (
              <line
                key={i}
                x1={dir * 12} y1="0" x2={dir * 38} y2="0"
                stroke="white" strokeWidth="1.5"
                style={{
                  animation: `au-shimmer 2.5s ease-in-out infinite ${i * 1.25}s`,
                  opacity: 0,
                }}
              />
            ))}
            <line x1="0" y1="-14" x2="0" y2="-46" stroke="white" strokeWidth="1.5"
              style={{ animation: 'au-shimmer 2.5s ease-in-out infinite 0.6s', opacity: 0 }}
            />

            {/* Sparkle stars */}
            {sparkles.map(([sx, sy, delay], i) => (
              <g key={i} transform={`translate(${sx},${sy})`}
                style={{ animation: `au-shimmer 2s ease-in-out infinite ${delay}`, opacity: 0 }}
              >
                <line x1="0" y1="-5" x2="0"  y2="5"  stroke="#d19b8a" strokeWidth="1"   opacity="0.9" />
                <line x1="-5" y1="0" x2="5"  y2="0"  stroke="#d19b8a" strokeWidth="1"   opacity="0.9" />
                <line x1="-3" y1="-3" x2="3" y2="3"  stroke="#d19b8a" strokeWidth="0.6" opacity="0.6" />
                <line x1="3" y1="-3" x2="-3" y2="3"  stroke="#d19b8a" strokeWidth="0.6" opacity="0.6" />
              </g>
            ))}
          </g>
        </g>

        {/* "4Cs" center text */}
        <text x="150" y="168" textAnchor="middle"
          fontSize="9" fontFamily="Marcellus,Georgia,serif"
          fill="#111" opacity="0.25" letterSpacing="0.15em"
        >
          4Cs
        </text>
      </svg>
    </div>
  )
}
