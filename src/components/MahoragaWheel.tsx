const MahoragaWheel = ({ className = "", size = 500 }: { className?: string; size?: number }) => {
  const spokes = 8;

  return (
    <div className={`mahoraga-wheel ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.04]">
        {/* Outer circle */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(172 66% 50%)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(172 66% 50%)" strokeWidth="0.3" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(172 66% 50%)" strokeWidth="0.3" />
        <circle cx="100" cy="100" r="35" fill="none" stroke="hsl(172 66% 50%)" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="10" fill="none" stroke="hsl(172 66% 50%)" strokeWidth="0.5" />

        {/* Spokes */}
        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (i * 360) / spokes;
          const rad = (angle * Math.PI) / 180;
          const x2 = 100 + 95 * Math.cos(rad);
          const y2 = 100 + 95 * Math.sin(rad);
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="hsl(172 66% 50%)"
              strokeWidth="0.3"
            />
          );
        })}

        {/* Small diamonds at intersections */}
        {Array.from({ length: spokes }).map((_, i) => {
          const angle = (i * 360) / spokes;
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 80 * Math.cos(rad);
          const y = 100 + 80 * Math.sin(rad);
          return (
            <circle key={`dot-${i}`} cx={x} cy={y} r="1.5" fill="hsl(172 66% 50%)" />
          );
        })}
      </svg>
    </div>
  );
};

export default MahoragaWheel;
