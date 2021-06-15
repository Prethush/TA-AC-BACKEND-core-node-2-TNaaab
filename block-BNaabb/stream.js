let http = require('http');

let server = http.createServer(handleRequest);



function handleRequest(req, res) {

    var store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        console.log(store);
        res.setHeader('Content-Type', 'text/plain');
        res.write(store);
        res.end();
    })
    
    
    
}


server.listen(3456, () => {
    console.log('Server listening on port 3456');
})