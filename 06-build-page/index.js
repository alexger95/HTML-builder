
const path = require('path');
const { readdir, copyFile, rm, mkdir, readFile, writeFile, stat } = require('fs/promises');
const {createReadStream, createWriteStream} = require('fs');



const folderAssets = path.join(__dirname, 'assets');
const folderProject = path.join(__dirname, 'project-dist');
const folderProjectAssets = path.join(__dirname, 'project-dist', 'assets');

async function copyFolder(folder, newFolder) {
  const filesInFolder = await readdir(folder, {withFileTypes: true});
  filesInFolder.forEach(async function (filename) {
    const fDirectIn = path.join(folder, filename.name);
    if (filename.isFile()){
      copyFile(fDirectIn, path.join(newFolder, filename.name));
    } else if (filename.isDirectory()) {
      const folderTo = path.join(newFolder, filename.name);
      const folderFrom = path.join(folder, filename.name);
      await mkdir(folderTo)
      await copyFolder(folderFrom, folderTo)
    }
  })
}

async function createDir(dirName) {
  await rm(dirName, {recursive: true, force: true});
  await mkdir(dirName);
}

async function cssCombiner() {
  const inputFolder = path.join(__dirname, 'styles');
  const outputFile = path.join(__dirname, 'project-dist', 'style.css');

  const arrCSS = [];

  (async () => {
    let fileNameArr = await readdir(inputFolder);
    for(let item of fileNameArr) {
      console.log(item)
      const currentFile = path.join(__dirname, 'styles', item);
      const fileType = path.extname(currentFile);
  
      if (fileType === '.css') {
        const cssContent = await readFile(currentFile, 'utf8');
        arrCSS.push(cssContent);
      }
    }
    await writeFile(outputFile, arrCSS);
  })()
}


async function compileHTML() {
  const inputFolder = path.join(__dirname, 'components');
  const templateFile = path.join(__dirname, 'template.html');
  const outputFile = path.join(__dirname, 'project-dist', 'index.html');
  
  //const components = {};
  
    (async () => {
      let fileNameArr = await readdir(inputFolder);
      let template = await readFile(templateFile, 'utf8');
      for(let item of fileNameArr) {
        console.log(item)
        const currentFile = path.join(__dirname, 'components', item);
        const fileType = path.extname(currentFile);
    
        if (fileType === '.html') {
          const htmlContent = await readFile(currentFile, 'utf8');
          template = template.replace(`{{${item.slice(0, item.length-5)}}}`, htmlContent);
        }
      }
      
      await writeFile(outputFile, template);
    })()
}

async function init() {
  await createDir(folderProject)
  await createDir(folderProjectAssets)

  copyFolder(folderAssets, folderProjectAssets);
  cssCombiner();
  compileHTML();
}

init()