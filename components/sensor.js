const ADXL345 = require('./lib/adxl');
const adxl345 = new ADXL345();

const initSensor = async () => await adxl345.init();

const getAcceleration = async () => await adxl345.getAcceleration(true);

module.exports = {
  initSensor,
  getAcceleration
};
