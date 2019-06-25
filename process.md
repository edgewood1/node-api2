- import http -  allows Node.js  transfer data from interface to another
- import url module - splits up a web address into readable parts.
- import stringdecoder - Decode our buffer stream into a string:


- use the createServer method, which takes a req/res callback
- use the listen method, which takes a port # and a callback message

parse request object 

get the url 

- the request object has many properties
- .url holds a large object, and its path property holds the path
- the path is the first '/path' that comes after the port in the url
- url> protocal://hostname:port/path?parameter
- a path can be multiple layers: '/path/many/layers'
- anyhow, the url.parse(req.url) can parse the object out
- then we just pull the path
- then we remove any excess whitespace or uppercase lettering

get the method - it's a property in uppercase AND not on the url object
get the queryString  - the query is the ?name="mel" that comes after the /path.  it's an object that looks like {name: value}
- get headers - another object that has keys: host, connection, pragma, accept, cookie
- get the payload - this is the body of the post request, the second parameter sent as part of the post request.  
- payload arrives in streams.  they arrive in chunks rather than as a complete whole.  it is processed without keeping it in memory.
- we can translate a buffer object into a string using string decoder, which takes teh 'utf-8' parameter
- we also create a buffer variable to recieve the translated stream
- objects in node can fire events.  when a file is opened or closed a 'readStream' event is fired.  
- we place a 'data' event listener on the request object, so if any data flows through, it's passed into the callback, then decoded / written into the buffer
- we create an 'end' event listner so that if we reach the end of the data, we close the buffer and commence to do something with it. 

next 

- we create an object with path, query, method, headers, payload
- we go before the function and define a router object
- it has two possible paths: 

/sample - will return {'name': 'sample handler'}
/anything else - return a 404

- the keys or the router are the same as the possible trimmedPaths
- if a trimmedPath is not a key, its key is 'notFound'
- then we call the function associated with the key, passing in the data and a callback function whose arguments would be the status and payload. 
- if there's no payload, then we create an empty paylaod object to return
- we stringify the payload for sending
- we send status and payload as a response 
- router object, for each key, there's the callback function, which will pass in 406 and a payload  response
- also defined here is the notFound key

