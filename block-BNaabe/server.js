let http = require('http');
let qs = require('querystring');

let server = http.createServer(handleRequest);
// function handleRequest(req, res) {
    
//     let dataFormat = req.headers['content-type'];
    
//     let store = "";
//     req.on('data', (chunk) => {
//         store += chunk;
//     });

//     req.on('end', () => {

//         if(req.method === 'POST' && req.url === '/' && dataFormat === 'application/json') {
//             res.statusCode = 201;
//             res.setHeader('Content-Type', 'application/json');
//             res.end(store);
//         }

//         if(req.method === 'POST' && req.url === '/' && dataFormat === 'application/x-www-form-urlencoded') {
//             let parsedData = qs.parse(store);
//             res.end(parsedData['captain']);
//         }
//     })


// }

// server.listen(3000, () => {
//     console.log('server listen')
// })


// function handleRequest(req, res) {
//     let dataFormat = req.headers['content-type'];
//     let store = "";
//     req.on('data', (chunk) => {
//         store += chunk;
//     });

//     req.on('end', () => {
//         if(dataFormat === 'application/json') {
//             res.setHeader('Content-Type', 'application/json');
//             res.end(store);
//         }

//         if(dataFormat === 'application/x-www-form-urlencoded') {
//             let parsedData = qs.parse(store);
//             res.end(JSON.stringify(parsedData));
//         }
//     })
// }

// server.listen('9000', () => {
//     console.log('server listening on port 9k');
// })


function handleRequest(req, res) {
    let dataFormat = req.headers['content-type'];
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        if(dataFormat === 'application/json') {
            res.setHeader('Content-Type', 'text/html');
            let parsedData = JSON.parse(store);
            res.write(`<h1>${parsedData.name}</h1>`);
            res.write(`<h2>${parsedData.email}</h2>`);
            res.end();
        }

        if(dataFormat === 'application/x-www-form-urlencoded') {
            let parsedData = qs.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h2>${parsedData.email}</h2>`);
        }
        
    })
}

server.listen('9000', () => {
    console.log('server listening on port 9k');
})



