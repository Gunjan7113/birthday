/**
 * Romantic Cinematic Web Audio Synthesizer
 * Zero external audio assets required; 100% reliable in every browser.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private ambientOscillators: OscillatorNode[] = [];
  private currentTrackOscs: OscillatorNode[] = [];
  private currentTrackGain: GainNode | null = null;
  private trackInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  public toggleAmbient(): boolean {
    this.initContext();
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public startAmbient() {
    this.initContext();
    if (!this.ctx || !this.ambientGain) return;
    if (this.isAmbientPlaying) return;

    this.isAmbientPlaying = true;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.setValueAtTime(0.001, now);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.18, now + 3);

    // Warm, dreamy chords: D3, A3, F#4, C#5
    const freqs = [146.83, 220.0, 369.99, 554.37];
    this.ambientOscillators = [];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle LFO subtle detune for dreamy cinematic texture
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(1.5, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start(now);

      oscGain.gain.setValueAtTime(0.08 / (idx + 1), now);

      if (panner) {
        panner.pan.setValueAtTime((idx - 1.5) * 0.4, now);
        osc.connect(oscGain);
        oscGain.connect(panner);
        panner.connect(this.ambientGain);
      } else {
        osc.connect(oscGain);
        oscGain.connect(this.ambientGain);
      }

      osc.start(now);
      this.ambientOscillators.push(osc);
    });
  }

  public stopAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    setTimeout(() => {
      this.ambientOscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch {}
      });
      this.ambientOscillators = [];
      this.isAmbientPlaying = false;
    }, 1600);
  }

  public playStarChime(index = 0) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Pentatonic scale notes: D5, E5, F#5, A5, B5, D6, E6
    const pentatonic = [587.33, 659.25, 739.99, 880.00, 987.77, 1174.66, 1318.51];
    const freq = pentatonic[index % pentatonic.length];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.85);
  }

  public playSealBreakSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Layer 1: Warm pop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.22);

    // Layer 2: Shimmering sparkle chime
    setTimeout(() => {
      this.playStarChime(3);
    }, 100);
    setTimeout(() => {
      this.playStarChime(5);
    }, 240);
  }

  public playHeartPulse() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Lub-dub heartbeat sound
    const playThump = (timeOffset: number, volume: number) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, now + timeOffset);
      osc.frequency.exponentialRampToValueAtTime(40, now + timeOffset + 0.12);

      gain.gain.setValueAtTime(0.01, now + timeOffset);
      gain.gain.linearRampToValueAtTime(volume, now + timeOffset + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.26);
    };

    playThump(0, 0.45);
    playThump(0.18, 0.35);
  }

  public playTapeClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  public playMixtapeMelody(trackIndex: number) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopMixtapeMelody();

    const melodies = [
      [293.66, 369.99, 440.0, 554.37, 440.0, 369.99], // Track 1: D F# A C# A F#
      [392.00, 466.16, 587.33, 523.25, 466.16, 440.00, 392.00, 349.23, 392.00], // Track 2: Akhiyan De Saamne / Tu Te Taareyan
      [261.63, 329.63, 392.0, 523.25, 392.0, 329.63], // Track 3: C E G C G E
      [349.23, 440.0, 523.25, 698.46, 523.25, 440.0]  // Track 4: F A C F C A
    ];

    const notes = melodies[trackIndex % melodies.length];
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[noteIdx % notes.length], now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.25);

      this.currentTrackOscs.push(osc);
      noteIdx++;
    };

    playNextNote();
    this.trackInterval = window.setInterval(playNextNote, 1300);
  }

  public stopMixtapeMelody() {
    if (this.trackInterval) {
      clearInterval(this.trackInterval);
      this.trackInterval = null;
    }
    this.currentTrackOscs.forEach(o => {
      try { o.stop(); o.disconnect(); } catch {}
    });
    this.currentTrackOscs = [];
  }
}

export const romanticAudio = new RomanticAudioEngine();
