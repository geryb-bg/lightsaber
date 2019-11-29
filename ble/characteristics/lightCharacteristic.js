const bleno = require('bleno');
const { LIGHT_CHAR_UUID } = require('./characteristics');
const light = require('../../components/light');
const surprise = require('../../components/surprise');

module.exports = class LightCharacteristic extends bleno.Characteristic {
  constructor() {
    super({
      uuid: LIGHT_CHAR_UUID,
      properties: ['write'],
      value: null
    });

    this.red = 0;
    this.green = 0;
    this.blue = 0;
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    try {
      if (data.length !== 4) {
        callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
        return;
      }

      surprise(true);
      this.on = data.readUInt8(0);
      this.red = data.readUInt8(1);
      this.green = data.readUInt8(2);
      this.blue = data.readUInt8(3);
      light(this.on, this.red, this.green, this.blue);

      callback(this.RESULT_SUCCESS);
    } catch (err) {
      console.error(err);
      callback(this.RESULT_UNLIKELY_ERROR);
    }
  }
};
