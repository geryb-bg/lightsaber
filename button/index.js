const spawn = require('child_process').spawn;

function startProcess() {
  const pythonProcess = spawn('python', ['../pyscripts/button.py']);
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
}

setInterval(() => {
  startProcess();
}, 1000);
