let user_license_file = 'develop.json'
//let user_license_file = 'product.json'

$.getJSON(user_license_file, function(data){

  // user and license
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
  sub = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "params":{
      "_auth": "",
      "streams": ['eeg', 'met', 'mot', 'dev', 'fac', 'com', 'pow', 'sys']
    },
    "id":1
  }


  // create socket
  url = 'wss://emotivcortex.com:54321'
  var socket = new WebSocket(url);

  socket.onopen = function(event){
    // send query headset
    socket.send(JSON.stringify(query_headset));

    // logout
    socket.send(JSON.stringify(logout));
  
    // login
    socket.send(JSON.stringify(login));
    
    // auth
    socket.send(JSON.stringify(auth));

    // // auth_anonymus
    // socket.send(JSON.stringify(auth_anonymous));
  };

  socket.onmessage = function(event){

    let message = JSON.parse(event.data);

    if (message.hasOwnProperty('result'))
    {
      resultObj = message['result'];
      if (resultObj.hasOwnProperty('_auth'))
      {
        console.log(resultObj['_auth']);
        
        // get license info
        console.log('license info');
        license_info.params._auth = resultObj['_auth'];
        socket.send(JSON.stringify(license_info));

        // create session
        console.log('create session');
        session.params._auth = resultObj['_auth'];
        socket.send(JSON.stringify(session));
        
        // sub data
        console.log('sub md');
        sub.params._auth = resultObj['_auth'];
        socket.send(JSON.stringify(sub));
      }
    }

    // print log for every 1 second
    console.log(message);

  }
});