const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist', 'bundle.css');

let outStream = fs.createWriteStream(projectFolder);

let cssFiles = [];

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            if(path.extname(file.name) == '.css'){
                cssFiles.push(file.name);
            }
        })
        for (let i = 0; i < cssFiles.length; i++){
            let filePath = path.join(stylesFolder, cssFiles[i]);
           fs.createReadStream(filePath).pipe(outStream);
        }
    }
})



