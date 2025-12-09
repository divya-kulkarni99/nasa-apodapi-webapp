const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String },
    authProvider: { type: String, default: 'local' },
  },
  { timestamps: true }
);

userSchema.statics.generateAuthToken = function (user) {
  return jwt.sign({ _id: user._id }, process.env.JWTokenPrivateKey, {
    expiresIn: '10d',
  });
};

const User = mongoose.model('User', userSchema);

// Validation schema
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
