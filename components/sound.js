const player = require('play-sound')((opts = {}));

const playSound = (sound) =>
  player.play(`../sound-clips/${sound}.wav`, (err) => {
    if (err) console.log(err);
  });

let busy_playing = false;
const playWave = (wave) => {
  if (busy_playing) return;

  busy_playing = true;

  player.play(`../sound-clips/wave${wave}.wav`, (err) => {
    if (err) console.log(err);
    busy_playing = false;
  });
};

module.exports = { playSound, playWave };
