const fs = require('fs');
const path = require('path');


const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist');
const assetsFolder = path.join(__dirname, 'assets');
const template = path.join(__dirname, 'template.html');

function copyFile(source, target) {
    let targetFile = path.join(target, path.basename(source));
    fs.copyFile(source, targetFile, (err) => {
        if (err) {
            console.log("Error Found here:", err);
        }
    });
}

function copyFolderRecursive(source, target) {
    let files = [];
    let targetFolder = path.join(target, path.basename(source));
    if (!fs.exists(targetFolder, (err) => { if (err) console.log("Error Found:", err); })) {
        fs.mkdir(targetFolder, { recursive: true }, (err) => {
            if (err) {
                console.log("Error Found:", err)
            } else {

            }
        })
    }

    fs.stat(source, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
            fs.readdir(source, (err, files) => {
                if (err) throw err;
                else {

                    files.forEach(function (file) {
                        let curSource = path.join(source, file);
                        fs.stat(curSource, (err, stats) => {
                            if (err) throw err;
                            if (stats.isDirectory()) {
                                copyFolderRecursive(curSource, targetFolder);
                            } else {
                                copyFile(curSource, targetFolder);
                            }
                        });

                    });
                }
            });
        }
    });
}

copyFolderRecursive(assetsFolder, projectFolder);

let cssFiles = [];

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
    if (err)
        console.log(err);
    else {
        let writeStream = fs.createWriteStream(path.join(projectFolder, 'style.css'));
        files.forEach(file => {
            if (path.extname(file.name) == '.css') {
                cssFiles.push(file.name);
            }
        })
        for (let i = 0; i < cssFiles.length; i++) {
            let filePath = path.join(stylesFolder, cssFiles[i]);
            fs.createReadStream(filePath).pipe(writeStream);
        }
    }
});





let htmlComponentFiles = [];
fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            if (path.extname(file.name) == '.html') {
                htmlComponentFiles.push(file.name);
            }
        })
    }
})


fs.copyFile(path.join(template), path.join(projectFolder, 'index.html'), (err) => {
    if (err) {
        console.log("Error Found:", err);
    }
    const projectIndex = path.join(projectFolder, "index.html");

    const readStream = fs.createReadStream(template);
    const writeStream = fs.createWriteStream(projectIndex);
    readStream.on("data", function (dataFromTemplate) {
        htmlComponentFiles.forEach(async (item, index) => {
            const dataFromStream = fs.createReadStream(path.join(__dirname, "components", `${item}`));
            dataFromStream.on("data", (data) => {
                dataFromTemplate = dataFromTemplate.toString().replace(`{{${path.parse(item).name}}}`, data);
                if (index === htmlComponentFiles.length - 1) {
                    writeStream.write(dataFromTemplate);
                }
            })
        })
    });
});



