const bleno = require("bleno");
const { SURPRISE_CHAR_UUID } = require("./characteristics");
const surprise = require("../../components/surprise");

module.exports = class SurpriseCharacteristic extends bleno.Characteristic {
  constructor() {
    super({
      uuid: SURPRISE_CHAR_UUID,
      properties: ["write"],
      value: null
    });

    this.value = 0;
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    try {
      if (data.length !== 1) {
        callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
        return;
      }

      this.value = data.readUInt8(0);
      if (this.value == 1) {
        surprise();
      }

      callback(this.RESULT_SUCCESS);
    } catch (err) {
      console.error(err);
      callback(this.RESULT_UNLIKELY_ERROR);
    }
  }
};
