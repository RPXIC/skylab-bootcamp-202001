// const net = require('net')
// var sockets = []
// const port = 8000
// const server = net.createServer(socket => {

//     socket.write(`Welcome to rpc chat server, Mr.${socket.remoteAddress.split(':')[3]}\n`);

//     socket.on('data', chunk => {

//         console.log(chunk.toString())

//     })
// })
// server.listen(port)

const net = require('net')
const sessions = {}
const server = net.createServer(socket => { debugger
    socket.on('data', chunk => { // <user> or <user>:<message>
        const alreadyExists = (() => {
            for (const user in sessions)
                if (socket === sessions[user]) {
                    return true
                }
            return false
        })()
        debugger
        if (!alreadyExists)
            sessions[chunk.toString()] = socket
        else {
            const [user, message] = chunk.toString().split(':')
            const _socket = sessions[user]
            if (_socket) _socket.write(message)
            else socket.write('ERROR user is not online')
        }
    })
})
server.listen(8000)
