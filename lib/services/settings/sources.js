"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAllSourceService = exports.deleteSourceService = exports.editExistingSource = exports.addSourceService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addSourceService = function addSourceService(newSource) {
  return new Promise(function (resolve, reject) {
    if (!newSource || !newSource.mediumId) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Medium.findById(newSource.mediumId, function (err) {
      if (err) reject(err);
      new _models["default"].Source(newSource).save(function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.addSourceService = addSourceService;

var editExistingSource = function editExistingSource(updatedSource) {
  return new Promise(function (resolve, reject) {
    if (!updatedSource || !updatedSource.mediumId) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Medium.findById(updatedSource.mediumId, function (err) {
      if (err) reject(err);

      _models["default"].Source.findByIdAndUpdate(updatedSource.id, updatedSource, {
        "new": true
      }, function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.editExistingSource = editExistingSource;

var deleteSourceService = function deleteSourceService(source) {
  return new Promise(function (resolve, reject) {
    if (!source) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Source.findByIdAndDelete(source.id, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.deleteSourceService = deleteSourceService;

var listAllSourceService = function listAllSourceService() {
  return new Promise(function (resolve, reject) {
    _models["default"].Source.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllSourceService = listAllSourceService;