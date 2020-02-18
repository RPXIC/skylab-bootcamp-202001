var fs = require("fs");

fs.readFile("temp.txt", 'utf-8', function(err, buf) {
  console.log(buf);
});