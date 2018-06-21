// user and license
let user;
let pass;
let license;
let client_id;
let client_secret;
let debit = 1


// for production
user_license_file = 'product.json'
$.getJSON(user_license_file, function(data){
  console.log(data['user']);
});







// query in json
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
    "username": user
  },  
  "id":1
}

login = {
  "jsonrpc": "2.0",  
  "method": "login",  
  "params":{
    "client_id": client_id,
    "client_secret": client_secret,
    "username": user,
    "password": pass
  },  
  "id":1
}

auth = {
  "jsonrpc": "2.0",  
  "method": "authorize",  
  "params":{
    "license": license,
    "debit": debit,
    "client_id": client_id,
    "client_secret": client_secret
  },
  "id":1
}

// create socket
url = 'wss://emotivcortex.com:54321'
var socket = new WebSocket(url);

// socket.onopen = function(event){
//   // send query headset
//   socket.send(JSON.stringify(query_headset));
//   // logout
//   // socket.send(JSON.stringify(logout));
//   // login
//   // socket.send(JSON.stringify(login));
//   // auth
//   socket.send(JSON.stringify(auth));

// };


socket.onmessage = function(event){
  var message = event.data;
  console.log(message);
}