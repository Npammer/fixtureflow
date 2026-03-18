#!/usr/bin/env node

const { parseMVR } = require("../core/parseMVR");
const { groupFixtures } = require("../core/groupFixtures");
const { scanGDTFFolder } = require("../core/scanGDTF");
const { matchFixtures } = require("../core/matchFixtures");
const { loadMapping } = require("../core/loadMapping");
const { applyMapping } = require("../core/applyMapping");

const filePath = process.argv[2];

if (!filePath) {
  console.log("❌ Please provide an MVR file");
  console.log("Usage: npm start -- <file.mvr>");
  process.exit(1);
}

try {
  const result = parseMVR(filePath);

  const grouped = groupFixtures(result.fixtures);

  const gdtfFolder = "./fixtures";
  const library = scanGDTFFolder(gdtfFolder);

  const matched = matchFixtures(grouped, library);

  const mapping = loadMapping("./mapping.json");

  const finalResults = applyMapping(matched, mapping);

  console.log("🎯 Final fixture mapping:\n");

  finalResults.forEach(group => {
    if (group.source === "mapping") {
      console.log(`🔵 ${group.name} (${group.count}) → ${group.final}`);
    } else if (group.status === "exact") {
      console.log(`🟢 ${group.name} (${group.count}) → ${group.final}`);
    } else if (group.status === "fuzzy") {
      console.log(`🟡 ${group.name} (${group.count}) → ${group.final}`);
    } else {
      console.log(`🔴 ${group.name} (${group.count}) → no match`);
    }
  });

} catch (err) {
  console.error("❌ Error:", err.message);
}