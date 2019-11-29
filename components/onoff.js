const { playSound, playWave } = require('./sound');
const { initSensor, getAcceleration } = require('./sensor');
const light = require('./light');
const surprise = require('./surprise')

let hum;
let interval;

module.exports = async (on) => {
  light(on);
  if (on) {
    await initSensor();
    playSound('on');
    hum = playSound('hum');

    interval = setInterval(sensorMoveToPlay, 100);
  } else {
    surprise(true);
    playSound('off');
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    if (hum) hum.kill();
  }
};

let currentx, currentz;
const sensorMoveToPlay = async () => {
  let { x, z } = await getAcceleration();
  if (currentx === undefined) currentx = x;
  if (currentz === undefined) currentz = z;

  if (Math.abs(currentz - z) > 0.1) {
    playWave(1);
  }
  if (Math.abs(currentx - x) > 0.1) {
    playWave(2);
  }
  currentz = z;
  currentx = x;
};
