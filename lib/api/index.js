"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _leads = _interopRequireDefault(require("./leads"));

var _users = _interopRequireDefault(require("./users"));

var _settings = _interopRequireDefault(require("./settings"));

var router = _express["default"].Router();

router.use('/leads', _leads["default"]);
router.use('/users', _users["default"]);
router.use('/settings', _settings["default"]);
var _default = router;
exports["default"] = _default;