"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

// import jwt from 'jsonwebtoken'
// import { secretKey } from '../devConfig/development.json'
var verifyToken = function verifyToken(req, res, next) {
  try {
    // jwt.verify(req.body.token, secretKey)
    next();
  } catch (err) {
    res.send(err);
  }
};

exports.verifyToken = verifyToken;