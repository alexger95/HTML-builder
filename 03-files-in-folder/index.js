const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'secret-folder');

fs.promises.readdir(folder)
.then(filenames => {
  for (let filename of filenames) {
    const fDirect = path.join(__dirname, 'secret-folder', filename);
    fs.promises.stat(fDirect)
    .then(fstats => {
      if (fstats.isFile()) {
        console.log('File: ',filename, ' ', parseFloat((fstats.size / 8000).toFixed(3)), "kb")
      }
    })
      
  }
})

// If promise is rejected
.catch(err => {
  console.log(err)
})