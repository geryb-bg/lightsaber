const spawn = require('child_process').spawn;

module.exports = () => spawn('python', ['../pyscripts/button.py']);
