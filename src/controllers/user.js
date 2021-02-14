const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    token: jwt.sign("RANDOM_SECRET_KEY"),
    wordCounter: 0,
  });
  user
    .save()
    .then(() => res.status(201).json({ token: user.token }))
    .catch((error) => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({});
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.justify = (req, res, next) => {};
