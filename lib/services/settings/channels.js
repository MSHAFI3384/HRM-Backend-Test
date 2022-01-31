"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAllChannelsService = exports.deleteExistingChannel = exports.editExistingChannelService = exports.addNewChannelService = void 0;

var _models = _interopRequireDefault(require("../../models"));

var _development = require("../../devConfig/development.json");

var addNewChannelService = function addNewChannelService(newChannel) {
  return new Promise(function (resolve, reject) {
    if (!newChannel) reject({
      message: _development.messages.errors.missingParameters
    });
    new _models["default"].Channel(newChannel).save(function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.addNewChannelService = addNewChannelService;

var editExistingChannelService = function editExistingChannelService(updatedChannel) {
  return new Promise(function (resolve, reject) {
    if (!updatedChannel || !updatedChannel.id) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Channel.findByIdAndUpdate(updatedChannel.id, updatedChannel, {
      "new": true
    }, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.editExistingChannelService = editExistingChannelService;

var deleteExistingChannel = function deleteExistingChannel(stageDetails) {
  return new Promise(function (resolve, reject) {
    if (!stageDetails) reject({
      message: _development.messages.errors.missingParameters
    });

    _models["default"].Channel.findByIdAndDelete(stageDetails.id, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.deleteExistingChannel = deleteExistingChannel;

var listAllChannelsService = function listAllChannelsService() {
  return new Promise(function (resolve, reject) {
    _models["default"].Channel.find({}, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllChannelsService = listAllChannelsService;