const request = require('axios').default;
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const logger = require('winston');

// Application serving the Angular frontend
const serverApp = express();
serverApp.use(morgan('tiny'));
serverApp.use(express.static(path.resolve(__dirname, '..', 'dist')));
serverApp.get('/*', (req, res, next) => res.redirect('/'));

const serverPort = process.env.PORT || 4200;
const serverServer = serverApp.listen(serverPort);
serverServer.on('listening', () => logger.info(`Listening on ${serverPort}`));
serverServer.on('error', onError);

// Application proxyfing requests from browser
const proxyApp = express();
proxyApp.use(cors());
proxyApp.use(bodyParser.json());
proxyApp.use(bodyParser.urlencoded({ extended: true }));
proxyApp.use(morgan('tiny'));

// GET requests
proxyApp.get('/*', (req, res, next) => {
    proxyRequest('GET', req, res);
});

// POST request
proxyApp.post('/*', (req, res, next) => {
    proxyRequest('POST', req, res, req.body);
    // request.post(`http://${proxyHost}:${proxyPort}${req.url}`, req.body)
    //     .then(response => {
    //         res
    //             .status(response.status)
    //             .send(response.data);
    //     })
    //     .catch(err => {
    //         if (!err.response.status <= 500) {
    //             res
    //                 .status(err.response.status)
    //                 .send(err.response.data);
    //         }

    //         onError(err);
    //         res
    //             .status(500)
    //             .end();
    //     });
});

// PUT request
proxyApp.put('/*', (req, res, next) => {
    proxyRequest('PUT', req, res, req.body);
});

// DELETE request
proxyApp.delete('/*', (req, res, next) => {
    proxyRequest('DELETE', req, res);
});

function proxyRequest(method, req, res, data) {
    request({
        method: method,
        url: `http://${proxyHost}:${proxyPort}${req.url}`,
        data: data
    })
        .then(response => {
            res
                .status(response.status)
                .send(response.data);
        })
        .catch(err => {
            if (!err.response.status <= 500) {
                res
                    .status(err.response.status)
                    .send(err.response.data);
            }

            onError(err);
            res
                .status(500)
                .end();
        });
}

const proxyHost = process.env.TODO_SERVER_HOST || '127.0.0.1';
const proxyPort = process.env.TODO_SERVER_PORT || 20491;
const proxyServer = proxyApp.listen(proxyPort);
proxyServer.on('listening', () => logger.info(`Proxyfying requests to http://${proxyHost}:${proxyPort}`));
proxyServer.on('error', onError);

function onError(err) {
    logger.error(`An error occured: ${err.message}`);
}
