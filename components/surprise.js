const spawn = require('child_process').spawn;

module.exports = (off) => {
    if(off) {
        spawn('python', ['../pyscripts/light.py', 0, 0, 0]);
    } else {
        spawn('python', ['../pyscripts/surprise.py']);
    }
}
