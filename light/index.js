const spawn = require('child_process').spawn;

const pythonProcess = spawn('python', ['../pyscripts/light.py', 0, 255, 0]);

pythonProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});