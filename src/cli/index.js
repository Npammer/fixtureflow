#!/usr/bin/env node

const { parseMVR } = require("../core/parseMVR");
const { groupFixtures } = require("../core/groupFixtures");
const { scanGDTFFolder } = require("../core/scanGDTF");
const { matchFixtures } = require("../core/matchFixtures");

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

  console.log("🎯 Fixture matches:\n");

  matched.forEach(group => {
        if (group.status === "exact") {
            console.log(`🟢 ${group.name} (${group.count}) → ${group.match}`);
        } else if (group.status === "fuzzy") {
            console.log(`🟡 ${group.name} (${group.count}) → ${group.match}`);
        } else {
            console.log(`🔴 ${group.name} (${group.count}) → no match`);
        }
    });

} catch (err) {
  console.error("❌ Error:", err.message);
}