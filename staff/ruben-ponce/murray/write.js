var fs = require("fs");

var data = "Iop";

fs.writeFile("temp.txt", data, (err) => {
  if (err) throw err;
  console.log("Successfully Written to File.");
});