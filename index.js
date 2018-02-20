const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const publicPath = path.join(__dirname, '../currate-client/public');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect(keys.mongoURI);

require('./models/User');
require('./models/Bulletin');
require('./services/passport');

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
require('./routes/bulletinRoutes')(app);

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'andrew@example.com',
    text: 'Hey, what is going on',
    createAt: 123
  });

  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`The server is up on port ${PORT}`);
});
