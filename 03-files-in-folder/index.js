const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (error, files) => {
    if (!error) {
      files.forEach(file => {
        if (file.isFile()) {
          fs.stat(path.join(folderPath, file.name), (error, stats) => {
            if (!error) {
              let fileName = path.parse(path.join(folderPath, file.name)).name;
              let fileExt = path.extname(path.join(folderPath, file.name)).slice(1);
              let size = (stats.size / 1024).toFixed(3);
              console.log(fileName + ' - ' + fileExt + ' - ' + size + ' bytes');
            } else {
              console.error(error);
            }
          })
        }
      });
    } else {
      console.error(error);
    }
  });