const spawn = require('child_process').spawn;

let red = 0;
let green = 0;
let blue = 255;

module.exports = (on, r, g, b) => {
  if (r !== undefined) red = r;
  if (g !== undefined) green = g;
  if (b !== undefined) blue = b;
  if (on) {
    spawn('python', ['../pyscripts/light.py', red, green, blue]);
  } else {
    spawn('python', ['../pyscripts/off.py', red, green, blue]);
  }
};
