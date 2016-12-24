'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _memo = require('../models/memo');

var _memo2 = _interopRequireDefault(_memo);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); /**
                                          * Created by Administrator on 2016-12-14.
                                          */


router.post('/', function (req, res) {
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: 'NOT LOGGED IN',
            code: 1
        });
    }
    if (typeof req.body.contents !== 'stiring') {
        return res.status(400).json({
            error: 'EMPTY CONTNENTS',
            code: 2
        });
    }
    if (req.body.contents === "") {
        return res.status(400).json({
            error: 'EMPTY CONTENT',
            code: 2
        });
    }
    var memo = new _memo2.default({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });
    memo.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});
router.put(':id', function (req, res) {
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: 'INVALID ID',
            code: 1
        });
    }
    if (typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: 'EMPTY CONTENTS',
            code: 2
        });
    }
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: 'NOT LOGGED IN',
            code: 3
        });
    }
    _memo2.default.findById(req.params.id, function (err, memo) {
        if (err) throw err;
        if (!memo) {
            return res.status(404).json({
                error: 'NO RESOURCE',
                code: 4
            });
        }
        if (memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: 'PERMISSION FAILURE',
                code: 5
            });
        }
        memo.contents = req.body.contents;
        memo.date.edited = new Date();
        memo.is_edited = true;
        memo.save(function (err, memo) {
            if (err) throw err;
            return res.json({
                success: true,
                memo: memo
            });
        });
    });
});
router.delete('/:id', function (req, res) {
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: 'INVALID ID',
            code: 1
        });
    }
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: 'NOT LOGGED IN',
            code: 2
        });
    }
    _memo2.default.findById(req.params.id, function (err, memo) {
        if (err) throw err;
        if (!memo) {
            return res.status(404).json({
                error: 'NO RESOURCE',
                code: 3
            });
        }
        if (memo.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: 'PERMISSION FAILURE',
                code: 4
            });
        }
        _memo2.default.remove({ _id: req.params.id }, function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

router.get('/', function (req, res) {
    _memo2.default.find().sort({ "_id": -1 }).limit(6).exec(function (err, memos) {
        if (err) throw err;
        res.json(memos);
    });
});

exports.default = router;