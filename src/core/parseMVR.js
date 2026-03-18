const AdmZip = require("adm-zip");
const { XMLParser } = require("fast-xml-parser");

function parseMVR(filePath) {
  const zip = new AdmZip(filePath);

  const xmlEntry = zip.getEntries().find(entry =>
    entry.entryName.includes("GeneralSceneDescription.xml")
  );

  if (!xmlEntry) {
    throw new Error("No GeneralSceneDescription.xml found in MVR");
  }

  const xmlData = xmlEntry.getData().toString("utf-8");

  const parser = new XMLParser({
    ignoreAttributes: false,
  });

  const json = parser.parse(xmlData);

  const fixtures = extractFixtures(json);

  return {
    raw: json,
    fixtures
  };
}

function extractFixtures(json) {
  const fixtures =
    json?.GeneralSceneDescription?.Scene?.Fixture ||
    json?.GeneralSceneDescription?.Fixture;

  if (!fixtures) return [];

  const fixtureArray = Array.isArray(fixtures) ? fixtures : [fixtures];

  return fixtureArray.map(f => ({
    name: f.Name || "Unnamed",
    gdtfSpec: f.GDTFSpec || "Unknown"
  }));
}

module.exports = {
  parseMVR
};