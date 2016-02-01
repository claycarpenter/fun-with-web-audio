var context = new AudioContext(),
    osc = context.createOscillator(),
    volume = context.createGain(),
    oscillators = {};

// Halve volume.
volume.gain.value = 0.5;

osc.connect(volume);
volume.connect(context.destination);

// osc.start(context.currentTime);
// osc.stop(context.currentTime + 1);

var keyboard = new QwertyHancock({
  id: 'keyboard',
  octaves: 2
});

keyboard.keyDown = function(note, frequency) {
  var osc = context.createOscillator();
  osc.connect(volume);

  oscillators[note] = osc;

  osc.frequency.value = frequency;
  osc.type = 'square';

  osc.start(context.currentTime);
}

keyboard.keyUp = function(note, frequency) {
  oscillators[note].stop(context.currentTime);
  oscillators[note].disconnect();
  // delete oscillators[note];
}

