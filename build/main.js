'use strict';

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var devPort = 4000;

var app = (0, _express2.default)();
var port = 3000;

var db = _mongoose2.default.connection;

db.on('error', console.error);
db.once('open', function () {
    console.log('mongodb connected');
});
_mongoose2.default.connect('mongodb://localhost/codelab');

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/api', _routes2.default);
app.use((0, _expressSession2.default)({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use('/', _express2.default.static(_path2.default.join(__dirname, './../public')));

app.get('/hello', function (req, res) {
    return res.send('Hello CodelAjAab');
});

app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, './../public/index.html'));
});

if (process.env.NODE_ENV == 'development') {
    console.log('development mode');
    var config = require('../webpack.dev.config');
    var compiler = (0, _webpack2.default)(config);
    var devServer = new _webpackDevServer2.default(compiler, config.devServer);
    devServer.listen(devPort, function () {
        console.log('webpack-dev-server' + devPort);
    });
}

app.listen(port, function () {
    console.log('server on', port);
});