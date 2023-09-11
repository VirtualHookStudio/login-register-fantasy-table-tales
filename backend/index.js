const app = require('express')()
const http = require('http');
const consign = require('consign')

const wss = require('./config/server.js')
const db = require('./config/db')


app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/tool.js')
    .then('./api/img_layout.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

const server = http.createServer(app);
wss(server)

server.listen(3000, () => { console.log('Open Server: port 3000...') })