const fs = require("fs");
const path = require("path");

function cleanGDTFName(file) {
  let name = file.replace(".gdtf", "");

  // decode URL encoding
  name = decodeURIComponent(name);

  // replace underscores with spaces
  name = name.replace(/_/g, " ");

  // remove version / extra garbage (numbers + suffix)
  name = name.replace(/\d{6,}.*/, "");

  // normalize manufacturer naming
  name = name.replace(/martin professional/gi, "martin");

  // remove multiple spaces
  name = name.replace(/\s+/g, " ");

  // trim
  name = name.trim();

  return name;
}

function scanGDTFFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    throw new Error("GDTF folder does not exist");
  }

  const files = fs.readdirSync(folderPath);

  const gdtfFiles = files.filter(file => file.endsWith(".gdtf"));

  const library = {};

  gdtfFiles.forEach(file => {
    const fullPath = path.join(folderPath, file);
    const name = cleanGDTFName(file);

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