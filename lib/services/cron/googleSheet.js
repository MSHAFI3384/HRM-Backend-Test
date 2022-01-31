"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSheetDataService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _googleSpreadsheet = require("google-spreadsheet");

var _leads = require("../leads");

var _development = require("../../../src/devConfig/development.json");

var _googleSheet = _interopRequireDefault(require("../../../src/devConfig/googleSheet.json"));

var _models = _interopRequireDefault(require("../../models"));

/* eslint-disable no-async-promise-executor */
var getSheetDataService = function getSheetDataService() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve, reject) {
      var doc, sheet, sheetRows;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              doc = new _googleSpreadsheet.GoogleSpreadsheet(_development.googleSheets.leadsAd);
              _context2.next = 3;
              return doc.useServiceAccountAuth(_googleSheet["default"]);

            case 3:
              _context2.next = 5;
              return doc.loadInfo();

            case 5:
              _context2.next = 7;
              return doc.sheetsByIndex[0];

            case 7:
              sheet = _context2.sent;
              _context2.next = 10;
              return sheet.getRows();

            case 10:
              sheetRows = _context2.sent;
              _context2.next = 13;
              return sheetRows.forEach( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(row, index) {
                  var updatedValue;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(row.read !== 'Synced')) {
                            _context.next = 10;
                            break;
                          }

                          updatedValue = {
                            flag: 'Active',
                            firstName: row.fname,
                            email: row.email,
                            phone: row.phone,
                            projects: row.project,
                            location: row.prefferedlocation,
                            assignedTo: '',
                            stage: 'New',
                            campaignname: row.campaignname,
                            campaignterm: row.campaignterm,
                            campaigncontent: row.campaigncontent,
                            source: 'Facebook'
                          };
                          _context.prev = 2;
                          _context.next = 5;
                          return new _models["default"].Lead(updatedValue).save(function (err) {
                            if (err) throw new Error(err);
                            row.read = 'Synced';
                            row.save();
                          });

                        case 5:
                          _context.next = 10;
                          break;

                        case 7:
                          _context.prev = 7;
                          _context.t0 = _context["catch"](2);
                          console.log(_context.t0);

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[2, 7]]);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 13:
              // })
              resolve(true);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.getSheetDataService = getSheetDataService;