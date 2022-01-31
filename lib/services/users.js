"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = exports.login = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = _interopRequireDefault(require("../models"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _lodash = require("lodash");

var _development = require("../../src/devConfig/development.json");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var login = function login(data) {
  return new Promise(function (resolve, rejects) {
    if (!data) {
      rejects({
        message: _development.messages.errors.missingParameters
      });
    } else {
      _jsonwebtoken["default"].sign({
        data: data
      }, _development.secretKey, /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, token) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _models["default"].User.findOne({
                    email: data.email
                  }, function (err, doc) {
                    if (!doc) {
                      rejects({
                        message: _development.messages.errors.userNotFound
                      });
                    } else {
                      _bcryptjs["default"].compare(data.password, doc.password, function (__, status) {
                        if (!status) {
                          rejects({
                            message: _development.messages.errors.incorrectPassword
                          });
                        } else {
                          var updatedDoc = (0, _lodash.omit)(_objectSpread(_objectSpread({}, doc._doc), {}, {
                            token: token
                          }), ['password']);
                          resolve(updatedDoc);
                        }
                      });
                    }
                  });

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  });
};

exports.login = login;

var registerUser = function registerUser(data) {
  return new Promise(function (resolve, rejects) {
    _bcryptjs["default"].genSalt(10, function (err, salt) {
      _bcryptjs["default"].hash(data.password, salt, /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(error, hash) {
          var authData;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (data) {
                    _context2.next = 4;
                    break;
                  }

                  rejects(error);
                  _context2.next = 7;
                  break;

                case 4:
                  authData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    email: data.email,
                    location: data.location,
                    status: data.status,
                    role: data.role,
                    password: hash
                  };
                  _context2.next = 7;
                  return new _models["default"].User(authData).save(function (authError, doc) {
                    if (authError) rejects(authError);else {
                      resolve(doc);
                    }
                  });

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    });
  });
};

exports.registerUser = registerUser;