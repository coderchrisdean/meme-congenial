const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI || 'mongodb://localhost/googlebooks';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
