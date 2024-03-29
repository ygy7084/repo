'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _memo = require('./memo');

var _memo2 = _interopRequireDefault(_memo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); /**
                                          * Created by Administrator on 2016-12-13.
                                          */

router.use('/account', _account2.default);
router.use('/memo', _memo2.default);

exports.default = router;