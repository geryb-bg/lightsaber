const bleno = require('bleno');
const { BUTTON_CHAR_UUID } = require('./characteristics');
const button = require('../../components/button');

module.exports = class ButtonCharacteristic extends bleno.Characteristic {
  constructor() {
    super({
      uuid: BUTTON_CHAR_UUID,
      properties: ['notify'],
      value: null
    });

    this.buttonValue = '0';
  }

  onSubscribe(maxValueSize, updateValueCallback) {
    this.updateValueCallback = updateValueCallback;
  }

  onUnsubscribe() {
    this.updateValueCallback = null;
  }

  sendNotification(value) {
    if (!this.updateValueCallback) return;

    if (value !== this.buttonValue) {
      this.buttonValue = value;
      const notification = new Buffer(2);
      notification.writeInt16LE(this.buttonValue);

      this.updateValueCallback(notification);
    }
  }

  start() {
    this.handle = setInterval(() => {
      button().stdout.on('data', (data) => {
        this.sendNotification(data.toString());
      });
    }, 500);
  }

  stop() {
    clearInterval(this.handle);
    this.handle = null;
  }
};
