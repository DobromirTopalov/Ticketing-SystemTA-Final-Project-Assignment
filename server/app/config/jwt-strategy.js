const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
  issuer: config.JWT_ISS,
  // audience: ''
};

const {
  User,
} = require('../../database/models');
const UserData = require('../data/apis/user.data');
const usersdata = new UserData(User);

const create = () => {
  return new JwtStrategy(options, async (jwtPayload, done) => {
    const userFound = await usersdata.getById(jwtPayload.id);

    if (userFound) {
      return done(null, userFound);
    }
    return done('Not authenticated', false);
  });
};

const createAdmin = () => {
  return new JwtStrategy(options, async (jwtPayload, done) => {
    const userFound = await usersdata.getById(jwtPayload.id);

    if (userFound) {
      return done(null, userFound);
    }
    return done('Not authenticated', false);
  });
};

module.exports = {
  create,
  createAdmin,
};
