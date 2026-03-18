#!/usr/bin/env node

const { parseMVR } = require("../core/parseMVR");
const { groupFixtures } = require("../core/groupFixtures");

const filePath = process.argv[2];

if (!filePath) {
  console.log("❌ Please provide an MVR file");
  console.log("Usage: npm start -- <file.mvr>");
  process.exit(1);
}

try {
  const result = parseMVR(filePath);

  const grouped = groupFixtures(result.fixtures);

  console.log("🎯 Fixture summary:\n");

  grouped.forEach(group => {
    console.log(`- ${group.name} (${group.count})`);
  });

} catch (err) {
  console.error("❌ Error:", err.message);
}