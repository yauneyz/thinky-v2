const mongoose = require('mongoose');
const BoardSchema = require('./BoardModel');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    required: false,
    validate: {
      validator: (username) => User.doesNotExist({username}),
    },
  },
  email: {type: String,
    required: true,
    // validate: {
    // validator: (email) => User.doesNotExist({email}),
    // },
  },
  password: {
    type: String,
    // required: true,
    required: false,
  },
  boards: [BoardSchema],
  active: Number,
});

UserSchema.pre('save', function() {
  if (this.isModified('password')) {
    this.pasword = bcrypt.hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function(field) {
  return await this.where(field).countDocuments() === 0;
};

UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(pasword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);
