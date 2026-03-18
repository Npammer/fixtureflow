const fs = require("fs");

function loadMapping(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error("Invalid mapping.json format");
  }
}

module.exports = {
  loadMapping
};