const fs = require('fs');
class IO {
  static writeToDisk(name, file) {
    fs.writeFile("src/algorithm/output/" + name + ".json", file, 
      function(err) {
        if (err) return console.error(err);
        console.log("Succesfully wrote file: " + name + ".json to: `src/algorithm/output/`" );
      }
    );
  }
}

module.exports = IO;
