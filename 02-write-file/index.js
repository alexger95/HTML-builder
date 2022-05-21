const {stdout, stdin, exit} = process;
const fs = require('fs');
const path = require('path');

stdout.write('Hello Node how are you? \n');
stdin.on('data', (data) => {
  fs.writeFile(
    path.join(__dirname, 'notes.json'),
    data,
    err => {
        if (err) throw err;
        console.log('Файл был изменен');
    }
);
});

// const stream = fs.createReadStream(path.join(__dirname,'text.txt'), 'utf-8');
// let data = '';
// stream.on('data', chunk => data += chunk);
// stream.on('end', () => console.log(data));
// stream.on('error', (e) => console.log('error', e));