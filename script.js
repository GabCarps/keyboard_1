const notes = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => playNote(key.dataset.note));
  });
  
  function playNote(note) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(notes[note], audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
    oscillator.stop(audioContext.currentTime + 1);
  }