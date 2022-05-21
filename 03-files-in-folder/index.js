const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'secret-folder');

fs.promises.readdir(folder)
.then(filenames => {
  for (let filename of filenames) {
    const fDirect = path.join(__dirname, 'secret-folder', filename);
    fs.promises.stat(fDirect)
    .then(fstats => {
      if (fstats.isDirectory()) {
        console.log('Directory')
      } else {
        console.log('File')
      }
      console.log(fstats)
    })
      
  }
})

// If promise is rejected
.catch(err => {
  console.log(err)
})