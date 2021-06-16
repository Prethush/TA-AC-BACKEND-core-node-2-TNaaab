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

    if(req.method === 'GET' && req.url === '/form') {
        console.log(store);
        fs.createReadStream('./form.html').pipe(res);
    }

    req.on('data', (chunk) => {
        store += chunk;
    })

    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/form') {
            console.log(store);
            let parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
        
    })

   
}

server.listen(5678, () => {
    console.log('Server is listening on port 5678');
})