const Server = require('socket.io');
const http = require('http');

module.exports = {
    startWebServer: function(app) {
        const server = http.Server(app);
        const io = require('socket.io')(server);
        io.on('connection',function(socket){
            socket.on('connection',function(data){
                console.log("已连接");
            })
           
        });
        server.listen(5757,()=>{
            console.log('server running at 127.0.0.1:5757')
        });
    }
}