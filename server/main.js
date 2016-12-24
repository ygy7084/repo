import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
const devPort = 4000;

import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

import api from './routes';


const app = express();
const port = 3000;

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', ()=> {console.log('mongodb connected');});
mongoose.connect('mongodb://localhost/codelab');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/api',api);
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));


app.get('/hello', (req,res) => {
    return res.send('Hello CodelAjAab');
});

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

if(process.env.NODE_ENV == 'development') {
    console.log('development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server'+devPort);
        }
    )
}

app.listen(port, () => {
    console.log('server on',port);
});