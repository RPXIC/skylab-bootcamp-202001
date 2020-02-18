const net = require('net')
var sockets = []
const port = 8080
const server = net.createServer(socket => {

    socket.write(`Welcome to rpc chat server, Mr.${socket.remoteAddress.split(':')[3]}\n`);

    socket.on('data', chunk => {

        console.log(chunk.toString())

    })
})
server.listen(port)