const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user = require("../models/user");
const User = require("../models/user");

// Implementation of authentication middleware

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "RANDOM_TOKEN_SECRET");
    try {
      const date = new Date();
      const wordsNumber = req.body.split("").length;
      if (date.toDateString() != user.date.toDateString()) {
        user.wordsCounter = 0;
        if (wordsNumber > 80000) {
          return res.status(402).json({ error: new Error("Payment Required") });
        } else {
          if (wordsNumber + user.wordsCounter > 80000) {
            return res
              .status(402)
              .json({ error: new Error("Payment Required") });
          } else {
            user.wordsCounter += wordsNumber;
            user.date = date;
            next();
          }
        }
      } else {
        if (date === user.date.toDateString() && wordsNumber > 80000) {
          return res.status(402).json({ error: new Error("Payment Required") });
        }
        if (date === user.date.toDateString() && wordsNumber < 80000) {
          if (wordsNumber + user.worderCounter > 80000) {
            return res
              .status(402)
              .json({ error: new Error("Payment Required") });
          } else {
            next();
          }
        }
      }
    } catch {
      res.status(401).json({ error: new Error("Unauthorized") });
    }
    next();
  } catch {
    res.status(401).json({ error: new Error("Unauthorized") });
  }
};
