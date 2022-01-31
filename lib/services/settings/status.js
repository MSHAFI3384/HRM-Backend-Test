"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAllStatus = exports.deleteExistingStatusService = exports.editExistingStatusService = exports.addStatusService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addStatusService = function addStatusService(newStatus) {
  return new Promise(function (resolve, reject) {
    if (!newStatus || !newStatus.stageId) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Stage.findById(newStatus.stageId, function (err) {
      if (err) reject({
        message: _development.messages.errors.invalidStage
      });
      new _models["default"].Status(newStatus).save(function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.addStatusService = addStatusService;

var editExistingStatusService = function editExistingStatusService(updatedStatus) {
  return new Promise(function (resolve, reject) {
    if (!updatedStatus || !updatedStatus.stageId || !updatedStatus.id) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Stage.findById(updatedStatus.stageId, function (err) {
      if (err) reject({
        message: _development.messages.errors.invalidStage
      });

      _models["default"].Status.findByIdAndUpdate(updatedStatus.id, updatedStatus, {
        "new": true
      }, function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.editExistingStatusService = editExistingStatusService;

var deleteExistingStatusService = function deleteExistingStatusService(updatedStatus) {
  return new Promise(function (resolve, reject) {
    if (!updatedStatus) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Status.findByIdAndDelete(updatedStatus.id, function (err, doc) {
      if (err) reject({
        message: _development.messages.errors.invalidStage
      });
      resolve(doc);
    });
  });
};

exports.deleteExistingStatusService = deleteExistingStatusService;

var listAllStatus = function listAllStatus() {
  return new Promise(function (resolve, reject) {
    _models["default"].Status.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllStatus = listAllStatus;