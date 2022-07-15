const http = require('http');
const colors = require('colors');
const handlers = require('./handlers');

const start = () => {
    const onRequest = (req, res) => {
        console.log('Odebrano zpytanie'.green);
        console.log(`Zapytanie ${req.url} odebrane`);
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

        switch (req.url) {
            case '/':
            case '/start':
                handlers.welcome(req, res);
                break;
            case '/upload':
                handlers.upload(req, res);
                break;
            case '/show':
                handlers.show(req, res);
                break;
            default:
                handlers.error(req, res);
        }
    }
    http.createServer(onRequest).listen(3000);

    console.log("Uruchomiono serwer!".green);
}

exports.start = start;