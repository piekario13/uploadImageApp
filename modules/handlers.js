const fs = require('fs');
const formidable = require('formidable');

exports.welcome = (req, res) => {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', (err, html) => {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(html);
        res.end();
    });
}

exports.upload = (req, res) => {
    console.log("Rozpoczynam obsługę żądania upload.");
    const form = new formidable.IncomingForm({
        uploadDir: __dirname,
    });
    form.parse(req, (err, fields, files) => {
        console.log(err)
        const data = fs.renameSync(files.upload.filepath, "file.png");
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("received image:<br/>" );
        res.write(`<img src='/show' />`);
        res.end();
    });
}

exports.show = (req, res) => {
    fs.readFile("file.png", "binary", (err, file) => {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.write(file, "binary");
        res.end();
    });
}

exports.error = (req, res) => {
    console.log("Nie wiem co robić.");
    res.write("404 :(");
    res.end();
}