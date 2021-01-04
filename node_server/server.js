let express = require('express');
let app = express();
// let cors = require('cors');

// app.use(cors());

const io = require(`socket.io`)(8000);

console.log(`server started at 8000`);

let users={};

io.on('connection' , socket =>{
    
    socket.on('new' , name => {
        console.log('new-user is' , name);
        users[socket.id] = name;
        
        socket.broadcast.emit('lets-start', name );
    });

    socket.on(`send` , data=>{
        console.log(data.FT , data.IT );

    socket.broadcast.emit(`receive` , {F:data.FT , I: data.IT , user :users[socket.id] })
})

});