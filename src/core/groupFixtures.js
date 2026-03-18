function groupFixtures(fixtures) {
  const map = {};

  fixtures.forEach(fixture => {
    const key = fixture.gdtfSpec || "Unknown";

    if (!map[key]) {
      map[key] = {
        name: key,
        count: 0,
        fixtures: []
      };
    }

    map[key].count += 1;
    map[key].fixtures.push(fixture);
  });

  return Object.values(map);
}

module.exports = {
  groupFixtures
};