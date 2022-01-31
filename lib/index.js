"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _api = _interopRequireDefault(require("./api"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cron = require("cron");

var _googleSheet = require("./services/cron/googleSheet");

var PORT = 3000;
var app = (0, _express["default"])();
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_api["default"]);
app.listen(process.env.PORT || PORT, function () {
  return console.log("Server listening on port ".concat(PORT, " \uD83D\uDE80"));
});
app.get('/', function (req, res) {
  res.send('Server is up');
});

_dotenv["default"].devConfig();

_mongoose["default"].connect(process.env.MONGO_DB_DEV_URL, options);

_mongoose["default"].set('useCreateIndex', true);

_mongoose["default"].set('useFindAndModify', false);

_mongoose["default"].connection.once('open', function () {
  return console.log('Mongo connected 🍀');
}).on('error', function () {
  return console.log('Connection error');
});

var sheetCron = new _cron.CronJob('10 * * * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _googleSheet.getSheetDataService)();

        case 3:
          console.log("Sheet Data Synced on ".concat(Date.now().toLocaleString));
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log('Sheet Data Sync Error', _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 6]]);
}))); // sheetCron.start()