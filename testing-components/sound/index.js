const player = require('play-sound')((opts = {}));

let hum = player.play('../sound-clips/hum.wav', (err) => {
  if (err) console.log(err);
});

setTimeout(() => {
  player.play('../sound-clips/wave1.wav', (err) => {
    if (err) console.log(err);
  });
}, 10000);

setTimeout(() => hum.kill(), 20000);
