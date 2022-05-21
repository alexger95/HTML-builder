const path = require('path');
const fs = require('fs');

const newFolder = path.join(__dirname, 'files-copy');
const folder = path.join(__dirname, 'files');

fs.promises.readdir(folder)
.then(filenames => {
  fs.rmSync(newFolder, { recursive: true, force: true });

  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive:true}, err => {
    if (err) throw err;
    console.log('Папка была создана');
  });


  for (let filename of filenames) {
    const fDirectIn = path.join(__dirname, 'files', filename);
    const fDirectOut = path.join(__dirname, 'files-copy', filename);  

    const streamIn = fs.createReadStream(fDirectIn, 'utf-8');
    const streamOut =  fs.createWriteStream(fDirectOut);
    streamIn.pipe(streamOut);
    // let data = '';
    // streamIn.on('data', chunk => data += chunk);
    // streamIn.on('end', () => console.log(`${filename}...done`));
    // streamIn.on('error', (e) => console.log('error', e));
    console.log(`${filename}...done`)
  }
})

// If promise is rejected
.catch(err => {
  console.log(err)
})