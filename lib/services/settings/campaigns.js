"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAllCampaigns = exports.deleteExistingCampaignService = exports.editExistingCampaignService = exports.addCampaignService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addCampaignService = function addCampaignService(newCampaign) {
  return new Promise(function (resolve, reject) {
    if (!newCampaign || !newCampaign.sourceId) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Source.findById(newCampaign.sourceId, function (err) {
      if (err) reject({
        message: _development.messages.errors.invalidSource
      });
      new _models["default"].Campaign(newCampaign).save(function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.addCampaignService = addCampaignService;

var editExistingCampaignService = function editExistingCampaignService(updatedCampaign) {
  return new Promise(function (resolve, reject) {
    if (!updatedCampaign || !updatedCampaign.sourceId || !updatedCampaign.id) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Source.findById(updatedCampaign.sourceId, function (err) {
      if (err) reject({
        message: _development.messages.errors.invalidSource
      });

      _models["default"].Campaign.findByIdAndUpdate(updatedCampaign.id, updatedCampaign, {
        "new": true
      }, function (err, doc) {
        if (err) reject(err);
        resolve(doc);
      });
    });
  });
};

exports.editExistingCampaignService = editExistingCampaignService;

var deleteExistingCampaignService = function deleteExistingCampaignService(updatedCampaign) {
  return new Promise(function (resolve, reject) {
    if (!updatedCampaign) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Campaign.findByIdAndDelete(updatedCampaign.id, function (err, doc) {
      if (err) reject({
        message: _development.messages.errors.invalidSource
      });
      resolve(doc);
    });
  });
};

exports.deleteExistingCampaignService = deleteExistingCampaignService;

var listAllCampaigns = function listAllCampaigns() {
  return new Promise(function (resolve, reject) {
    _models["default"].Campaign.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllCampaigns = listAllCampaigns;