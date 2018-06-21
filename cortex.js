// let user_license_file = 'develop.json'
let user_license_file = 'product.json'

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

  let streams = ['eeg'];
  sub = {
    "jsonrpc": "2.0",
    "method": "subscribe",
    "params":{
      "_auth": auth,
      "streams": streams
    },
    "id":1
  }


  // create socket
  url = 'wss://emotivcortex.com:54321'
  var socket = new WebSocket(url);

  socket.onopen = function(event){
    // send query headset
    // socket.send(JSON.stringify(query_headset));

    // logout
    // socket.send(JSON.stringify(logout));
  
    // login
    // socket.send(JSON.stringify(login));
    
    // auth
    socket.send(JSON.stringify(auth));
  };

  socket.onmessage = function(event){
    let message = JSON.parse(event.data);
    
    if('_auth' in message.result){
      console.log(message.result._auth);
    }

    // if (message.hasOwnProperty('_auth'))
    // {
    //   console.log(message['_auth']);
    // }
  }

});



