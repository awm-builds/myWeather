const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('DATABASE_URL is not set. Skipping MongoDB connection for this run.');
} else {
  mongoose.connect(databaseUrl).catch(function (err) {
    console.error('MongoDB initial connection failed:', err.message);
  });
}

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

db.on('error', function (err) {
  console.error('MongoDB connection error:', err.message);
});

db.on('disconnected', function () {
  console.warn('MongoDB disconnected');
});
