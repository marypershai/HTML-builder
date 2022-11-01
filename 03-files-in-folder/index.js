const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    console.log("\nCurrent directory files:");
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            if (!file.isDirectory()) {
                let fileName = file.name.toString().split('.');
                console.log(fileName[0] + " - " + fileName[1] + " - " + getFilesizeInKilobytes(file.name) + 'kb');
            }
        })
    }
})


function getFilesizeInKilobytes(filename) {
    const filePath = path.join(__dirname, 'secret-folder', filename);
    let stats = fs.statSync(filePath);
    let fileSizeInKilobytes = (stats.size / 1024).toFixed(3);
    return fileSizeInKilobytes;
}