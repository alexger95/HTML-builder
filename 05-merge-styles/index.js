const path = require('path');
const fsPromises = require('fs/promises');

const inputFolder = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

const arrCSS = [];


(async () => {
  let fileNameArr = await fsPromises.readdir(inputFolder);
  for(let item of fileNameArr) {
    console.log(item)
    const currentFile = path.join(__dirname, 'styles', item);
    const fileType = path.extname(currentFile);

    if (fileType === '.css') {
      const cssContent = await fsPromises.readFile(currentFile, 'utf8');
      arrCSS.push(cssContent);
    }
  }
  await fsPromises.writeFile(outputFile, arrCSS);
})()