export default function DesktopBackground({ darkMode }) {
  const backWavePath =
    'M0,56 C240,12 480,100 720,56 C960,12 1200,100 1440,56 C1680,12 1920,100 2160,56 C2400,12 2640,100 2880,56 L2880,320 L0,320 Z';

  const frontWaveStroke =
    'M0,70 C160,18 320,122 480,70 C640,18 800,122 960,70 C1120,18 1280,122 1440,70 C1600,18 1760,122 1920,70 C2080,18 2240,122 2400,70 C2560,18 2720,122 2880,70';

  const frontWavePath = `${frontWaveStroke} L2880,320 L0,320 Z`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden transition-colors duration-300 bg-white dark:bg-[#141416]"
    >
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.14]"
        style={{
          backgroundImage: darkMode
            ? 'radial-gradient(#52525b 1px, transparent 1px)'
            : 'radial-gradient(#e4e4e7 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-[36vh] min-h-[220px] max-h-[360px] overflow-hidden">
        <svg
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
          className="animate-wave-slow absolute bottom-0 left-0 h-full w-[200%] opacity-55"
        >
          <path
            d={backWavePath}
            fill={darkMode ? '#1d4666' : '#bae0ff'}
            className="transition-colors duration-300"
          />
        </svg>

        <svg
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
          className="animate-wave-medium absolute bottom-0 left-0 h-full w-[200%]"
        >
          <defs>
            <linearGradient id="waveLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ed3ff" />
              <stop offset="100%" stopColor="#7cc0ff" />
            </linearGradient>
            <linearGradient id="waveDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#265980" />
              <stop offset="100%" stopColor="#132b42" />
            </linearGradient>
          </defs>

          <path
            d={frontWavePath}
            fill={darkMode ? 'url(#waveDark)' : 'url(#waveLight)'}
            className="transition-all duration-300"
          />
        </svg>
      </div>
    </div>
  );
}
