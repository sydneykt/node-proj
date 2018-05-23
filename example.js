var http = require('http'),
    fs = require('fs');

    function serveStaticFile(res, path, contentType, responseCode){
        if(!responseCode) responseCode = 200;
        fs.readFile(__dirname + path, function(err, data){
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500, Server Fault')
            }
             else{
                 res.writeHead(200, {'Content-Type': contentType});
                 res.end(data);
             }
                
        });
    }


    http.createServer(function(req, res){

        var path = req.url.replace(/\/?(?:\.*)?$/, '').toLowerCase();

        switch(path){

            case '/home':
             serveStaticFile(res, '/public/home.html', 'text/html');
            break;

            case '/about':
             serveStaticFile(res, '/public/about.html', 'text/html');
            break;

            case '/img/logo.png':
             serveStaticFile(res, '/public/logo.png', 'image/png');
            break;

            default:
             serveStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
        }
    }).listen(4000);
    console.log('Server Ready to roll') 