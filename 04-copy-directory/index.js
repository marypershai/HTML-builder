const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderPathToCopy = path.join(__dirname, 'files-copy');

fs.mkdir(folderPathToCopy, { recursive: true }, (err) => {
    if (err) {
        console.log("Error Found:", err);
    } else {
        deleteFiles();
        fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    copyFile(file.name);
                })
                console.log("Done!")
            }
        })
    }
})

function copyFile(fileName) {
    fs.copyFile(path.join(folderPath, fileName), path.join(folderPathToCopy, fileName), (err) => {
        if (err) {
            console.log("Error Found:", err);
        }
    });
}

function deleteFiles() {
    fs.readdir(folderPathToCopy, (err, files) => {
        if (err) {
            throw err;
        }

        for (const file of files) {
            fs.unlink(path.join(folderPathToCopy, file), err => {
                if (err) throw err;
            });
        }
    });
}


