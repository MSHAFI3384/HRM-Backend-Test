"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAllMediums = exports.deleteExistingMediumService = exports.editExistingMediumService = exports.addMediumService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addMediumService = function addMediumService(newMedium) {
  return new Promise(function (resolve, reject) {
    if (!newMedium || !newMedium.channelId) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Channel.findById(newMedium.channelId, function (err) {
      if (err) reject({
        message: _development.messages.errors.invalidSource
      });
      new _models["default"].Medium(newMedium).save(function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.addMediumService = addMediumService;

var editExistingMediumService = function editExistingMediumService(updatedMedium) {
  return new Promise(function (resolve, reject) {
    if (!updatedMedium || !updatedMedium.channelId || !updatedMedium.id) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Channel.findById(updatedMedium.channelId, function (err) {
      if (err) reject({
        message: _development.messages.errors.invalidSource
      });

      _models["default"].Medium.findByIdAndUpdate(updatedMedium.id, updatedMedium, {
        "new": true
      }, function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.editExistingMediumService = editExistingMediumService;

var deleteExistingMediumService = function deleteExistingMediumService(updatedMedium) {
  return new Promise(function (resolve, reject) {
    if (!updatedMedium) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Medium.findByIdAndDelete(updatedMedium.id, function (err, doc) {
      if (err) reject({
        message: _development.messages.errors.invalidSource
      });
      resolve(doc);
    });
  });
};

exports.deleteExistingMediumService = deleteExistingMediumService;

var listAllMediums = function listAllMediums() {
  return new Promise(function (resolve, reject) {
    _models["default"].Medium.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllMediums = listAllMediums;