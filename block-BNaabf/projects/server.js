//  let path = require('path');
//  let relativePath = './client/index.js';
//  let absolutePath = path.join(__dirname, `./client/index.js`);
//  console.log(absolutePath);

let http = require('http');
let fs = require('fs');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    
    let store = "";

    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {

        if(req.method === 'GET' && req.url === '/form') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./form.html').pipe(res);
        }
        if(req.method === 'POST' && req.url === '/form') {
            let parsedData = qs.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h2>${parsedData.name}</h2><h3>${parsedData.email}</h3><h4>${parsedData.age}</h4>`);
        }
        
    })

   
}

server.listen(5678, () => {
    console.log('Server is listening on port 5678');
})