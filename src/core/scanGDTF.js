const fs = require("fs");
const path = require("path");

function scanGDTFFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    throw new Error("GDTF folder does not exist");
  }

  const files = fs.readdirSync(folderPath);

  const gdtfFiles = files.filter(file => file.endsWith(".gdtf"));

  const library = {};

  gdtfFiles.forEach(file => {
    const fullPath = path.join(folderPath, file);

    // Simple version: use filename as key for now
    const name = file.replace(".gdtf", "");

    library[name] = {
      name,
      path: fullPath
    };
  });

  return library;
}

module.exports = {
  scanGDTFFolder
};