const mongoose = require('mongoose');

let isConnected = false;

module.exports = async () => {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI is not set. Please add it to your .env file.');
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

module.exports.getConnection = () => (isConnected ? mongoose.connection : null);
