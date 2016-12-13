import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
const devPort = 4000;

import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

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

app.use('/', express.static(path.join(__dirname, './../public')));
app.get('/hello', (req,res) => {
    return res.send('Hello CodelAjAab');
});
app.listen(port, () => {
    console.log('server on',port);
});