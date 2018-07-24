// define user license
// let user_license_file = 'develop.json'
// let user_license_file = 'product.json'
let user_license_file = 'product_prime_1.json'


// define logger
const winston = require('winston');
var fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

// define websocket
const WebSocket = require('ws');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// define file utility
// var fs = require('fs');

// read license file
fs.readFile(user_license_file, 'utf8', function (err, data) {

  data = JSON.parse(data);

  // user and license get from file
  let user = {};
  user.user = data['user'];
  user.pass = data['pass'];
  user.license = data['license'];
  user.client_id = data['client_id'];
  user.client_secret = data['client_secret'];
  user.debit = data['debit'];

  query_headset =  {
    "jsonrpc": "2.0",
    "method": "queryHeadsets",
    "params": {},
    "id": 1
  }
  
  logout = {
    "jsonrpc": "2.0",
    "method": "logout",
    "params":{
      "username": user.user
    },
    "id":1
  }
  
  login = {
    "jsonrpc": "2.0",  
    "method": "login",  
    "params":{
      "client_id": user.client_id,
      "client_secret": user.client_secret,
      "username": user.user,
      "password": user.pass
    },  
    "id":1
  }
  
  auth = {
    "jsonrpc": "2.0",  
    "method": "authorize",  
    "params":{
      "license": user.license,
      "debit": user.debit,
      "client_id": user.client_id,
      "client_secret": user.client_secret
    },
    "id":1
  }

  auth_anonymous =  {
    "jsonrpc": "2.0",
    "method": "authorize",
    "params": {},
    "id": 1
  }

  // license info
  license_info = {
    "jsonrpc": "2.0",
    "method": "getLicenseInfo",
    "params": {
      "_auth": ""
    },
    "id": 1
  }

  // create session
  session = {
    "jsonrpc": "2.0",
    "method": "createSession",
    "params":{
      "_auth": "",
      "status": "active"
    },
    "id":1
  }


  // let streams = ['eeg'];
  // ['eeg','met','mot','dev','fac','com','pow', 'sys']
  // ['eeg', 'met', 'mot', 'dev', 'fac', 'com', 'pow', 'sys']
  sub = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "params":{
      "_auth": "",
      "streams": ['met']
    },
    "id":1
  }

  // create socket
  url = 'wss://emotivcortex.com:54321'
  var socket = new WebSocket(url);

  socket.on('open', function open() {

    // send query headset
    socket.send(JSON.stringify(query_headset));

    // logout
    socket.send(JSON.stringify(logout));
  
    // login
    socket.send(JSON.stringify(login));
    
    // auth
    socket.send(JSON.stringify(auth));
  });

  socket.on('message', function incoming(data) {

    console.log(data)

    let message = JSON.parse(data);

    if (message.hasOwnProperty('result'))
    {
      resultObj = message['result'];
      if (resultObj.hasOwnProperty('_auth'))
      {
        console.log(resultObj['_auth']);
        
        // get license info
        logger.info('license info');
        logger.info(message);
        license_info.params._auth = resultObj['_auth'];
        socket.send(JSON.stringify(license_info));

        // create session
        logger.info('create session');
        logger.info(message);
        session.params._auth = resultObj['_auth'];
        socket.send(JSON.stringify(session));
        
        // sub data
        logger.info('start sub');
        logger.info(message);
        sub.params._auth = resultObj['_auth'];
        socket.send(JSON.stringify(sub));
      }
    }
    
    // write to file
    // console.log(message);
    logger.info(message);

  });

});