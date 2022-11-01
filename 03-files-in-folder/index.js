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
                let fileName = file.name.toString();
                let basename = path.basename(fileName).substr(0,path.basename(fileName).length - path.extname(fileName).length);
                let extantion = path.extname(fileName).substr(1);
                console.log(basename + " - " + extantion + " - " + getFilesizeInKilobytes(file.name) + 'kb');
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