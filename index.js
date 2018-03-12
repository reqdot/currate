const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect(keys.mongoURI);

require('./models/User');
require('./models/Bulletin');
require('./models/News');
require('./services/passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
require('./routes/crawlerRoutes')(app);

io.on('connection', socket => {
  socket.on('SEND_MESSAGE', function(data) {
    io.emit('RECEIVE_MESSAGE', data);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('currate-client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'currate-client', 'build', 'index.html')
    );
  });
}

server.listen(PORT, () => {
  console.log(`The server is up on port ${PORT}`);
});
