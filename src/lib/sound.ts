// Web Audio API Ambient Sound Synthesizer
let audioCtx: AudioContext | null = null;
let gainNode: GainNode | null = null;
let oscillators: OscillatorNode[] = [];
let isPlaying = false;

export function toggleAmbientSound(enable?: boolean): boolean {
  if (typeof window === "undefined") return false;

  const targetState = enable !== undefined ? enable : !isPlaying;

  if (targetState) {
    startAmbience();
  } else {
    stopAmbience();
  }

  return isPlaying;
}

export function isAmbientPlaying(): boolean {
  return isPlaying;
}

function startAmbience() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 3); // Soft ambient volume
    gainNode.connect(audioCtx.destination);

    // Warm cinematic chord: D2, A2, D3, F#3, A3
    const freqs = [73.42, 110.0, 146.83, 185.0, 220.0];

    oscillators = freqs.map((f, i) => {
      const osc = audioCtx!.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f + (i * 0.2), audioCtx!.currentTime);

      const filter = audioCtx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450 + i * 50, audioCtx!.currentTime);

      osc.connect(filter);
      filter.connect(gainNode!);
      osc.start();
      return osc;
    });

    isPlaying = true;
  } catch (err) {
    console.warn("Web Audio ambience unavailable:", err);
    isPlaying = false;
  }
}

function stopAmbience() {
  if (!gainNode || !audioCtx) {
    isPlaying = false;
    return;
  }

  try {
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    setTimeout(() => {
      oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      oscillators = [];
      isPlaying = false;
    }, 1300);
  } catch {
    isPlaying = false;
  }
}

