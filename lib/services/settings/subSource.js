"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAllSubSourceService = exports.deleteSubSourceService = exports.editExistingSubSource = exports.addSubSourceService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addSubSourceService = function addSubSourceService(newSubSource) {
  return new Promise(function (resolve, reject) {
    if (!newSubSource) reject({
      message: _development.messages.errors.missingParameters
    });
    new _models["default"].SubSource(newSubSource).save(function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.addSubSourceService = addSubSourceService;

var editExistingSubSource = function editExistingSubSource(updatedSource) {
  return new Promise(function (resolve, reject) {
    if (!updatedSource) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].SubSource.findByIdAndUpdate(updatedSource.id, updatedSource, {
      "new": true
    }, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.editExistingSubSource = editExistingSubSource;

var deleteSubSourceService = function deleteSubSourceService(source) {
  return new Promise(function (resolve, reject) {
    if (!source) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].SubSource.findByIdAndDelete(source.id, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.deleteSubSourceService = deleteSubSourceService;

var listAllSubSourceService = function listAllSubSourceService() {
  return new Promise(function (resolve, reject) {
    _models["default"].SubSource.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllSubSourceService = listAllSubSourceService;