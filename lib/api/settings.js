"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _locations = require("../services/settings/locations");

var _sources = require("../services/settings/sources");

var _campaigns = require("../services/settings/campaigns");

var _stage = require("../services/settings/stage");

var _status = require("../services/settings/status");

var _channels = require("../services/settings/channels");

var _medium = require("../services/settings/medium");

var _subSource = require("../services/settings/subSource");

var _auth = require("../utilities/auth");

var router = _express["default"].Router();

router.post('/locations/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newLocation;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _locations.addLocationService)(req.body);

          case 3:
            newLocation = _context.sent;
            res.status(200).send(newLocation);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.send(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/locations/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var updatedLocation;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _locations.editLocationService)(req.body);

          case 3:
            updatedLocation = _context2.sent;
            res.status(200).send(updatedLocation);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.send(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/locations/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var removedLocation;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _locations.deleteLocationService)(req.body);

          case 3:
            removedLocation = _context3.sent;
            res.status(200).send(removedLocation);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            res.send(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post(['/locations/', '/locations/list'], _auth.verifyToken, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var allLocations;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _locations.listAlllocationService)();

          case 3:
            allLocations = _context4.sent;
            res.status(200).send(allLocations);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.send(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post('/source/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var newSource;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _sources.addSourceService)(req.body);

          case 3:
            newSource = _context5.sent;
            res.status(200).send(newSource);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.send(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.post('/source/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var updatedSource;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _sources.editExistingSource)(req.body);

          case 3:
            updatedSource = _context6.sent;
            res.status(200).send(updatedSource);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            res.send(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.post('/source/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var updatedSource;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _sources.deleteSourceService)(req.body);

          case 3:
            updatedSource = _context7.sent;
            res.status(200).send(updatedSource);
            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            res.send(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.post('/source/list', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var sources;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return (0, _sources.listAllSourceService)();

          case 3:
            sources = _context8.sent;
            res.status(200).send(sources);
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            res.send(_context8.t0);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.post('/campaign/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var newCampaign;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return (0, _campaigns.addCampaignService)(req.body);

          case 3:
            newCampaign = _context9.sent;
            res.status(200).send(newCampaign);
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            res.send(_context9.t0);

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
router.post('/campaign/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var updatedCampaign;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return (0, _campaigns.editExistingCampaignService)(req.body);

          case 3:
            updatedCampaign = _context10.sent;
            res.status(200).send(updatedCampaign);
            _context10.next = 10;
            break;

          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            res.send(_context10.t0);

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
router.post('/campaign/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var updatedCampaign;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return (0, _campaigns.deleteExistingCampaignService)(req.body);

          case 3:
            updatedCampaign = _context11.sent;
            res.status(200).send(updatedCampaign);
            _context11.next = 10;
            break;

          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            res.send(_context11.t0);

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 7]]);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
router.post('/campaign/list', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var allCampaigns;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return (0, _campaigns.listAllCampaigns)();

          case 3:
            allCampaigns = _context12.sent;
            res.status(200).send(allCampaigns);
            _context12.next = 10;
            break;

          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            res.send(_context12.t0);

          case 10:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
router.post('/stage/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var newStage;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return (0, _stage.addNewStageService)(req.body);

          case 3:
            newStage = _context13.sent;
            res.status(200).send(newStage);
            _context13.next = 10;
            break;

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            res.send(_context13.t0);

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));

  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
router.post('/stage/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var updatedStage;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return (0, _stage.editExistingStageService)(req.body);

          case 3:
            updatedStage = _context14.sent;
            res.status(200).send(updatedStage);
            _context14.next = 10;
            break;

          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](0);
            res.send(_context14.t0);

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 7]]);
  }));

  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
router.post('/stage/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var deletedStage;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return (0, _stage.deleteExistingStage)(req.body);

          case 3:
            deletedStage = _context15.sent;
            res.status(200).send(deletedStage);
            _context15.next = 10;
            break;

          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](0);
            res.send(_context15.t0);

          case 10:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 7]]);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
router.post('/stage/list', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var allStatus;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return (0, _stage.listAllStagesService)(req.body);

          case 3:
            allStatus = _context16.sent;
            res.status(200).send(allStatus);
            _context16.next = 10;
            break;

          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](0);
            res.send(_context16.t0);

          case 10:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 7]]);
  }));

  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
router.post('/status/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var newStatus;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return (0, _status.addStatusService)(req.body);

          case 3:
            newStatus = _context17.sent;
            res.status(200).send(newStatus);
            _context17.next = 10;
            break;

          case 7:
            _context17.prev = 7;
            _context17.t0 = _context17["catch"](0);
            res.send(_context17.t0);

          case 10:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 7]]);
  }));

  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
router.post('/status/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var updatedStatus;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return (0, _status.editExistingStatusService)(req.body);

          case 3:
            updatedStatus = _context18.sent;
            res.status(200).send(updatedStatus);
            _context18.next = 10;
            break;

          case 7:
            _context18.prev = 7;
            _context18.t0 = _context18["catch"](0);
            res.send(_context18.t0);

          case 10:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 7]]);
  }));

  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
router.post('/status/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
    var deletedStatus;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return (0, _status.deleteExistingStatusService)(req.body);

          case 3:
            deletedStatus = _context19.sent;
            res.status(200).send(deletedStatus);
            _context19.next = 10;
            break;

          case 7:
            _context19.prev = 7;
            _context19.t0 = _context19["catch"](0);
            res.send(_context19.t0);

          case 10:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 7]]);
  }));

  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
router.post('/status/list', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
    var allStatus;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _context20.next = 3;
            return (0, _status.listAllStatus)(req.body);

          case 3:
            allStatus = _context20.sent;
            res.status(200).send(allStatus);
            _context20.next = 10;
            break;

          case 7:
            _context20.prev = 7;
            _context20.t0 = _context20["catch"](0);
            res.send(_context20.t0);

          case 10:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 7]]);
  }));

  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());
router.post('/channel/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
    var newChannel;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _context21.next = 3;
            return (0, _channels.addNewChannelService)(req.body);

          case 3:
            newChannel = _context21.sent;
            res.status(200).send(newChannel);
            _context21.next = 10;
            break;

          case 7:
            _context21.prev = 7;
            _context21.t0 = _context21["catch"](0);
            res.send(_context21.t0);

          case 10:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 7]]);
  }));

  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
router.post('/channel/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req, res) {
    var updatedChannel;
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            _context22.next = 3;
            return (0, _channels.editExistingChannelService)(req.body);

          case 3:
            updatedChannel = _context22.sent;
            res.status(200).send(updatedChannel);
            _context22.next = 10;
            break;

          case 7:
            _context22.prev = 7;
            _context22.t0 = _context22["catch"](0);
            res.send(_context22.t0);

          case 10:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[0, 7]]);
  }));

  return function (_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}());
router.post('/channel/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(req, res) {
    var deletedChannel;
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            _context23.next = 3;
            return (0, _channels.deleteExistingChannel)(req.body);

          case 3:
            deletedChannel = _context23.sent;
            res.status(200).send(deletedChannel);
            _context23.next = 10;
            break;

          case 7:
            _context23.prev = 7;
            _context23.t0 = _context23["catch"](0);
            res.send(_context23.t0);

          case 10:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, null, [[0, 7]]);
  }));

  return function (_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}());
router.post('/channel/list', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req, res) {
    var allChannel;
    return _regenerator["default"].wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            _context24.next = 3;
            return (0, _channels.listAllChannelsService)(req.body);

          case 3:
            allChannel = _context24.sent;
            res.status(200).send(allChannel);
            _context24.next = 10;
            break;

          case 7:
            _context24.prev = 7;
            _context24.t0 = _context24["catch"](0);
            res.send(_context24.t0);

          case 10:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, null, [[0, 7]]);
  }));

  return function (_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}());
router.post('/medium/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(req, res) {
    var addMedium;
    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            _context25.next = 3;
            return (0, _medium.addMediumService)(req.body);

          case 3:
            addMedium = _context25.sent;
            res.status(200).send(addMedium);
            _context25.next = 10;
            break;

          case 7:
            _context25.prev = 7;
            _context25.t0 = _context25["catch"](0);
            res.send(_context25.t0);

          case 10:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, null, [[0, 7]]);
  }));

  return function (_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}());
router.post('/medium/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(req, res) {
    var updatedMedium;
    return _regenerator["default"].wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            _context26.next = 3;
            return (0, _medium.editExistingMediumService)(req.body);

          case 3:
            updatedMedium = _context26.sent;
            res.status(200).send(updatedMedium);
            _context26.next = 10;
            break;

          case 7:
            _context26.prev = 7;
            _context26.t0 = _context26["catch"](0);
            res.send(_context26.t0);

          case 10:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, null, [[0, 7]]);
  }));

  return function (_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}());
router.post('/medium/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref27 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(req, res) {
    var deletedMedium;
    return _regenerator["default"].wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            _context27.next = 3;
            return (0, _medium.deleteExistingMediumService)(req.body);

          case 3:
            deletedMedium = _context27.sent;
            res.status(200).send(deletedMedium);
            _context27.next = 10;
            break;

          case 7:
            _context27.prev = 7;
            _context27.t0 = _context27["catch"](0);
            res.send(_context27.t0);

          case 10:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, null, [[0, 7]]);
  }));

  return function (_x53, _x54) {
    return _ref27.apply(this, arguments);
  };
}());
router.post('/medium/list', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref28 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(req, res) {
    var allMedium;
    return _regenerator["default"].wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            _context28.prev = 0;
            _context28.next = 3;
            return (0, _medium.listAllMediums)(req.body);

          case 3:
            allMedium = _context28.sent;
            res.status(200).send(allMedium);
            _context28.next = 10;
            break;

          case 7:
            _context28.prev = 7;
            _context28.t0 = _context28["catch"](0);
            res.send(_context28.t0);

          case 10:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, null, [[0, 7]]);
  }));

  return function (_x55, _x56) {
    return _ref28.apply(this, arguments);
  };
}());
router.post('/subsource/add', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(req, res) {
    var newSubsource;
    return _regenerator["default"].wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.prev = 0;
            _context29.next = 3;
            return (0, _subSource.addSubSourceService)(req.body);

          case 3:
            newSubsource = _context29.sent;
            res.status(200).send(newSubsource);
            _context29.next = 10;
            break;

          case 7:
            _context29.prev = 7;
            _context29.t0 = _context29["catch"](0);
            res.send(_context29.t0);

          case 10:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, null, [[0, 7]]);
  }));

  return function (_x57, _x58) {
    return _ref29.apply(this, arguments);
  };
}());
router.post('/subsource/edit', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(req, res) {
    var updatedSubsource;
    return _regenerator["default"].wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _context30.prev = 0;
            _context30.next = 3;
            return (0, _subSource.editExistingSubSource)(req.body);

          case 3:
            updatedSubsource = _context30.sent;
            res.status(200).send(updatedSubsource);
            _context30.next = 10;
            break;

          case 7:
            _context30.prev = 7;
            _context30.t0 = _context30["catch"](0);
            res.send(_context30.t0);

          case 10:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, null, [[0, 7]]);
  }));

  return function (_x59, _x60) {
    return _ref30.apply(this, arguments);
  };
}());
router.post('/subsource/delete', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref31 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(req, res) {
    var deletedSubsource;
    return _regenerator["default"].wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.prev = 0;
            _context31.next = 3;
            return (0, _subSource.deleteSubSourceService)(req.body);

          case 3:
            deletedSubsource = _context31.sent;
            res.status(200).send(deletedSubsource);
            _context31.next = 10;
            break;

          case 7:
            _context31.prev = 7;
            _context31.t0 = _context31["catch"](0);
            res.send(_context31.t0);

          case 10:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, null, [[0, 7]]);
  }));

  return function (_x61, _x62) {
    return _ref31.apply(this, arguments);
  };
}());
router.post('/subsource/list', _auth.verifyToken, /*#__PURE__*/function () {
  var _ref32 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(req, res) {
    var allSubsources;
    return _regenerator["default"].wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            _context32.prev = 0;
            _context32.next = 3;
            return (0, _subSource.listAllSubSourceService)(req.body);

          case 3:
            allSubsources = _context32.sent;
            res.status(200).send(allSubsources);
            _context32.next = 10;
            break;

          case 7:
            _context32.prev = 7;
            _context32.t0 = _context32["catch"](0);
            res.send(_context32.t0);

          case 10:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32, null, [[0, 7]]);
  }));

  return function (_x63, _x64) {
    return _ref32.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;