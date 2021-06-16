
let http = require('http');
let qs = require('querystring');
let fs = require('fs');
let url = require('url');
const userDir = __dirname + '/users/';
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let parsedUrl = url.parse(req.url, true);
    let user = parsedUrl.query.username;
    console.log(parsedUrl);
    let store = "";

    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/users') {
            let userName = JSON.parse(store).username;
            fs.open(userDir + userName + ".json", 'wx', (err) => {
                
                if(err) {
                console.log(err);
                }
            });

            fs.writeFile(userDir + userName + ".json", store, (err) => {
                if(err) {
                    console.log(err);
                }
            });

            let file_Descriptor = fs.openSync(userDir + userName +".json");

            fs.close(file_Descriptor, (err) => {
                if(err) {
                    console.log(err);
                } else{
                    res.end(`${userName} Created`);
                }
            });

            
        }

        if(parsedUrl.pathname === '/users' && req.method === 'GET') {

            
            fs.createReadStream(userDir + user + ".json").pipe(res);
        }

        if(parsedUrl.pathname === '/users' && req.method === 'DELETE') {
            fs.unlink(userDir + user + ".json", (err) => {
                if(err) {
                console.log(err);
                } else{
                    res.end(`${user} is deleted`);
                }
            });
        }

        if(parsedUrl.pathname === '/users' && req.method === 'PUT') {
            fs.open(userDir + user + ".json", 'r+' , (err) => {
                if(err) {
                    console.log(err);
                }
            });

        let file_Descriptor = fs.openSync(userDir + user +".json");   

            fs.truncate(file_Descriptor, (err) => {
                if(err) {
                    console.log(err);
                }
            });

            fs.writeFile(userDir + user + ".json", store, (err) => {
                if(err) {
                console.log(err);
                }
            });

            fs.close(file_Descriptor, (err) => {
                if(err) {
                    console.log(err);
                } else {
                    res.end(`${user} is updated`);
                }
            });
        }
    });


}


server.listen(3000, () => {
    console.log('Server listening on port 3k');
})