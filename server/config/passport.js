const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models').User;

module.exports = passport => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ where: { email: jwt_payload.email } })
        .then(user => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch(err => done(err, false));
    })
  );
};
