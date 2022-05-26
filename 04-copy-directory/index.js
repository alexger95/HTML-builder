const path = require('path');
const fs = require('fs');
const { mkdir, rm } = require('fs/promises');

const newFolder = path.join(__dirname, 'files-copy');
const folder = path.join(__dirname, 'files');


 async function copy() {
  await rm(newFolder, { recursive: true, force: true });
  await mkdir(newFolder, {recursive: true});

   fs.promises.readdir(folder)
.then(filenames => {

  for (let filename of filenames) {
    const fDirectIn = path.join(__dirname, 'files', filename);
    const fDirectOut = path.join(__dirname, 'files-copy', filename);  

    const streamIn = fs.createReadStream(fDirectIn, 'utf-8');
    const streamOut =  fs.createWriteStream(fDirectOut);
    streamIn.pipe(streamOut);

    console.log(`${filename}...done`)
  }
})
// If promise is rejected
.catch(err => {
  console.log(err)
})
}

copy();