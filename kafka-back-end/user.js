var mongo = require('mongodb');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var mongodburl = 'mongodb://localhost:27017/KafkaDB';
//var mongoStore = require("connect-mongo")(expressSession);
var Schema = mongoose.Schema;
var UserSchema = new Schema({
email: {
    type: String,
    index: { unique: true }
  },
firstName: String,
lastName: String,
password: String
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
  const user = this;
  console.log("hey its user in user.js"+user);
  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);