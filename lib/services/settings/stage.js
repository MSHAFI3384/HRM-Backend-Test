"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAllStagesService = exports.deleteExistingStage = exports.editExistingStageService = exports.addNewStageService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addNewStageService = function addNewStageService(newStage) {
  return new Promise(function (resolve, reject) {
    if (!newStage) reject({
      message: _development.messages.errors.missingParameters
    });
    new _models["default"].Stage(newStage).save(function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.addNewStageService = addNewStageService;

var editExistingStageService = function editExistingStageService(updatedStage) {
  return new Promise(function (resolve, reject) {
    if (!updatedStage) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Stage.findByIdAndUpdate(updatedStage.id, updatedStage, {
      "new": true
    }, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.editExistingStageService = editExistingStageService;

var deleteExistingStage = function deleteExistingStage(stageDetails) {
  return new Promise(function (resolve, reject) {
    if (!stageDetails) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Stage.findByIdAndDelete(stageDetails.id, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.deleteExistingStage = deleteExistingStage;

var listAllStagesService = function listAllStagesService() {
  return new Promise(function (resolve, reject) {
    _models["default"].Stage.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllStagesService = listAllStagesService;