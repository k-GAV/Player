const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/player');

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'connection error:'));
