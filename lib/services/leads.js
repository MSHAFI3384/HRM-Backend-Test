"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editExistingLead = exports.leadsDetailsService = exports.listAllLeadsService = exports.addLeadService = void 0;

var _models = _interopRequireDefault(require("../models"));

var _lodash = require("lodash");

var addLeadService = function addLeadService(newLead) {
  return new Promise(function (resolve, reject) {
    new _models["default"].Lead(newLead).save(function (newLeadData, err) {
      if (err) reject(err);
      resolve(newLeadData);
    });
  });
};

exports.addLeadService = addLeadService;

var listAllLeadsService = function listAllLeadsService(queries) {
  return new Promise(function (resolve, reject) {
    var updatedQueries = (0, _lodash.omit)(queries, ['token']);

    _models["default"].Lead.find(updatedQueries, function (err, docs) {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

exports.listAllLeadsService = listAllLeadsService;

var leadsDetailsService = function leadsDetailsService(lead) {
  return new Promise(function (resolve, reject) {
    _models["default"].Lead.findOne({
      _id: lead.id
    }, function (err, doc) {
      if (err) reject(err);
      resolve(doc);
    });
  });
};

exports.leadsDetailsService = leadsDetailsService;

var editExistingLead = function editExistingLead(updatedLead) {
  return new Promise(function (resplve, reject) {
    _models["default"].Lead.findByIdAndUpdate(updatedLead.id, (0, _lodash.omit)(updatedLead, ['id']), {
      "new": true
    }, function (err, doc) {
      if (err) reject(err);
      resplve(doc);
    });
  });
};

exports.editExistingLead = editExistingLead;