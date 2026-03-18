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
  const layers =
    json?.GeneralSceneDescription?.Scene?.Layers?.Layer;

  if (!layers) return [];

  const layerArray = Array.isArray(layers) ? layers : [layers];

  const fixtures = [];

  layerArray.forEach(layer => {
    const childList = layer.ChildList;

    if (!childList) return;

    if (childList.Fixture) {
      const list = Array.isArray(childList.Fixture)
        ? childList.Fixture
        : [childList.Fixture];

      list.forEach(f => {
        fixtures.push({
          name: f.Name || "Unnamed",
          gdtfSpec: f.GDTFSpec || "Unknown"
        });
      });
    }
  });

  return fixtures;
}

module.exports = {
  parseMVR
};