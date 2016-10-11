const fs = require('fs');
const http = require('http');
const url = require('url');
const map = JSON.parse(fs.readFileSync('./301.json'));

const port = 1337;

// Create an HTTP tunneling proxy
var proxy = http.createServer( (req, res) => {

  let urlParts = url.parse(req.headers.host + req.url);
  let postId = urlParts.query.match(/[\?\&]?p=(\d+)[&$]?/);

  postId = postId ? postId[1] : '';

  let data = map[postId];
  let pageurl = 'http://luozhihua.com/';

  if (data) {
    let filename = data.title + '.html';
    pageurl = pageurl + encodeURI(filename);
  }

  res.writeHead(301, {
    'Location':  pageurl
  });

  res.end();
  // res.end('Page has moved to: '+ pageurl);
});

// now that proxy is running
proxy.listen(port);

console.log('Wordpress proxy listen on: '+ port);