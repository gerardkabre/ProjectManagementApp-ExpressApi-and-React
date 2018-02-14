const jwt = require('jsonwebtoken');

const User = require('../models').User;

let register = (req, res) => {
  !req.body.email || !req.body.password
    ? res.json({ success: false, message: 'Email and Password required.' })
    : User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(userCreated => res.json({ success: true, user: userCreated }))
      .catch(() => res.json({ success: false, message: 'Email already used.' }));
};

let login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.json({ success: false, message: 'User doesnt exist.' });
      } else {
        user.comparePassword(req.body.password).then(result => {
          if (result) {
            res.send({
              success: true,
              token: 'Bearer ' + jwt.sign(user.toJSON(), 'secret', { expiresIn: 10080 })
            });
          } else {
            res.json({ success: false, message: 'Passwords dont match.' });
          }
        });
      }
    })
    .catch(err => res.send(err));
};

let get = (req, res) => {
  res.json({ success: true, message: req.user });
};

module.exports.register = register;
module.exports.login = login;
module.exports.get = get;
