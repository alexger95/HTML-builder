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
        let fileExt = path.extname(filename).slice(1);
        let fileNameShot = path
        .basename(path.join(folder, filename), fileExt)
        .slice(0, -1);
        console.log('File:',fileNameShot, fileExt, parseFloat((fstats.size / 8000).toFixed(3)), "kb")
      }
    })
      
  }
})

// If promise is rejected
.catch(err => {
  console.log(err)
})