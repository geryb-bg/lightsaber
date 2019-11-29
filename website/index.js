const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const colourButton = document.getElementById('colourButton');
const surpriseButton = document.getElementById('surpriseButton');

const connect = document.getElementById('connect');
const control = document.getElementById('control');
const off = document.getElementById('off');

const primaryServiceUuid = '2489d258-37c9-44da-8213-e7fd93779e3a';

const btnCharUuid = 'f4053fdb-6aef-40ee-acf8-159e8cabc26b';
const ledCharUuid = 'e3c7bb32-0b5b-4b15-9c13-1581dc4f5c95';
const surpriseCharUuid = '099e7726-0b1c-4ed1-8d6a-272940f41e0a';

let device, btnCharacteristic, ledCharacteristic, surpriseCharacteristic;

connectButton.onclick = async () => {
  device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: 'Lightsaber' }],
    optionalServices: [primaryServiceUuid]
  });
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService(primaryServiceUuid);

  btnCharacteristic = await getCharacteristic(service, btnCharUuid);
  ledCharacteristic = await getCharacteristic(service, ledCharUuid);
  surpriseCharacteristic = await getCharacteristic(service, surpriseCharUuid);

  device.ongattserverdisconnected = disconnect;

  connected.style.display = 'block';
  connectButton.style.display = 'none';
  disconnectButton.style.display = 'initial';
  control.style.display = 'none';
  off.style.display = 'block';

  listen();
};

const getCharacteristic = async (service, characteristicUuid) => {
  const char = await service.getCharacteristic(characteristicUuid);

  return char;
};

const getSampleSound = (sound) => {
  let enc = new TextEncoder();
  return enc.encode(sound);
};

let ledColour = [0, 0, 255];
const toggleOn = async (on) => {
  if (on) {
    control.style.display = 'block';
    off.style.display = 'none';
  } else {
    await surpriseCharacteristic.writeValue(new Uint8Array([0]));
    surprised = false;
    control.style.display = 'none';
    off.style.display = 'block';
  }
};

const listen = () => {
  btnCharacteristic.addEventListener('characteristicvaluechanged', (evt) => {
    const value = evt.target.value.getInt8(0);
    toggleOn(value);
  });
  btnCharacteristic.startNotifications();
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.substring(1, 3), 16); //start at 1 to avoid #
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return [r, g, b];
};

colourButton.onclick = async () => {
  ledColour = hexToRgb(colourPicker.value);
  await ledCharacteristic.writeValue(new Uint8Array([1, ...ledColour]));
  surprised = false;
};

let surprised = false;
surpriseButton.onclick = async () => {
  if (!surprised) {
    await surpriseCharacteristic.writeValue(new Uint8Array([1]));
    surprised = true;
  }
};

disconnectButton.onclick = async () => {
  await device.gatt.disconnect();
  disconnect();
};

const disconnect = () => {
  device = null;

  connected.style.display = 'none';
  connectButton.style.display = 'initial';
  disconnectButton.style.display = 'none';
};
