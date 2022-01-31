"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAlllocationService = exports.deleteLocationService = exports.editLocationService = exports.addLocationService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addLocationService = function addLocationService(newLocation) {
  return new Promise(function (resolve, reject) {
    if (!newLocation) reject({
      message: _development.messages.errors.missingParameters
    });
    new _models["default"].Location(newLocation).save(function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.addLocationService = addLocationService;

var editLocationService = function editLocationService(updatedLocation) {
  return new Promise(function (resolve, reject) {
    if (!updatedLocation) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Location.findByIdAndUpdate(updatedLocation.id, updatedLocation, {
      "new": true
    }, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.editLocationService = editLocationService;

var deleteLocationService = function deleteLocationService(locationId) {
  return new Promise(function (resolve, reject) {
    if (!locationId) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Location.findByIdAndDelete(locationId.id, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.deleteLocationService = deleteLocationService;

var listAlllocationService = function listAlllocationService() {
  return new Promise(function (resolve, reject) {
    _models["default"].Location.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAlllocationService = listAlllocationService;