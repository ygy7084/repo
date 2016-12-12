import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
const devPort = 4000;

import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, './../public')));
app.get('/hello', (req,res) => {
    return res.send('Hello Codelab');
});
app.listen(port, () => {
    console.log('server on',port);
});