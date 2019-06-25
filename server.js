// import modules
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var port = 4000;

var router = {
  // name of path: 
  hello: function(data, callback) {
    // pass in these arguments to function passed in
    callback(406, {'message': 'anything you want'})
  },
  notFound: function(data, callback){
    callback(404, {'message': 'not found'})
  }
}

var server = http.createServer(function(req, res) {
  // parse request object
  var parsedUrl = url.parse(req.url, true)
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  var method = req.method.toLowerCase();

  var query = parsedUrl.query;

  var headers = req.headers;
  // set up req.body parser
  var decoder = new StringDecoder('utf-8');
  var buffer = '';

  req.on("data", function(data) {
    buffer += decoder.write(data)
  })

  req.on('end', function(){
    buffer+=decoder.end();

    var data = {
      'path': trimmedPath,
      'query': query,
      'method': method,
      'headers': headers,
      'payload': buffer
    }
    console.log(data)
  
    if (router[trimmedPath]) {
      var handler = router[trimmedPath];
    } else {
      var handler = router.notFound
    }
    
    handler(data, function(status, payload) {
      if (payload === undefined) {
        payload = {}
      }  
      var payloadString = JSON.stringify(payload)
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(status)
      res.end(payloadString)
    })
  })
})

server.listen(port, function() {
  console.log('server running on ', port)
})