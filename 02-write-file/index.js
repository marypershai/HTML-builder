const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

let filePath = path.join(__dirname, 'text.txt');

const output = fs.createWriteStream(filePath, { encoding: 'utf-8' });

stdout.write('Please, write something in console\n');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        process.exit();
    }
    stdout.write('You can check you text in text.txt file. Maybe you want to add something else to file?\n');
    output.write(data);
});
process.on('exit', () => stdout.write('Good Luck!'));
process.on('SIGINT', () => {
    process.exit();
});