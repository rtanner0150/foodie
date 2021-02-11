const mongoose = require('mongoose');
const User = require('./models/User.js');

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
//module.exports.bcrypt = bcrypt;

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const userArr = await User.find({'email': email}).lean();
    const user = userArr[0];
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser((id, done) => {
    let user = User.find({_id: id}).exec();
    return done(null, user)
  })
}

module.exports = initialize