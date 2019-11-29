const bleno = require('bleno');
const ButtonCharacteristic = require('./characteristics/buttonCharacteristic');
const LightCharacteristic = require('./characteristics/lightCharacteristic');
const SurpriseCharacteristic = require('./characteristics/surpriseCharacteristic');
const { PRIMARY_SERVICE_UUID } = require('./characteristics/characteristics');
const button = require('../components/button');
const onoff = require('../components/onoff');

let buttonRead = new ButtonCharacteristic();
buttonRead.start();

let lightWrite = new LightCharacteristic();
let surpriseWrite = new SurpriseCharacteristic();

let startSaberInterval;

bleno.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    bleno.startAdvertising('Lightsaber', [PRIMARY_SERVICE_UUID], (err) => {
      if (err) console.error(err);
    });
    startSaberInterval = startSaber;
  } else {
    buttonRead.stop();
    bleno.stopAdvertising();
    clearInterval(startSaberInterval);
  }
});

let isOn = false;
const startSaber = setInterval(
  () =>
    button().stdout.on('data', (data) => {
      let pressed = data.toString().trim();
      if (pressed === '1' && !isOn) {
        onoff(1);
        isOn = true;
      } else if (pressed === '0' && isOn) {
        onoff(0);
        isOn = false;
        
      }
    }),
  1000
);

bleno.on('advertisingStart', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  let service = new bleno.PrimaryService({
    uuid: PRIMARY_SERVICE_UUID,
    characteristics: [buttonRead, lightWrite, surpriseWrite]
  });

  bleno.setServices([service], (err) => {
    console.log(err || 'configuration done');
  });
});
