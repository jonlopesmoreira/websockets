const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app); // protocolo http
const io = require('socket.io')(server); // protocolo websocket

app.use(express.static(path.join(__dirname, 'public'))); // pasta onde ficam os arquivos publicos, a partir do diretorio atual acessa a pasta public
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    socket.on('sendMessage', data => {
        messages.push(data);
    });
});
server.listen(3000);
