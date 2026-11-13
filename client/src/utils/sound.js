let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone({ startFreq, endFreq, duration = 0.08, gainPeak = 0.055, type = 'sine' }) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 40), now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.01);
}

export function playOpenSound(soundEnabled) {
  if (!soundEnabled) return;
  playTone({ startFreq: 420, endFreq: 680, duration: 0.085, gainPeak: 0.05, type: 'sine' });
}

export function playCloseSound(soundEnabled) {
  if (!soundEnabled) return;
  playTone({ startFreq: 520, endFreq: 280, duration: 0.08, gainPeak: 0.045, type: 'sine' });
}

export function playClickSound(soundEnabled) {
  if (!soundEnabled) return;
  playTone({ startFreq: 600, endFreq: 450, duration: 0.045, gainPeak: 0.035, type: 'triangle' });
}

export function playToggleSound(soundEnabled) {
  if (!soundEnabled) return;
  playTone({ startFreq: 500, endFreq: 760, duration: 0.06, gainPeak: 0.04, type: 'sine' });
}
