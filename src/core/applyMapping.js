function applyMapping(matchedGroups, mapping) {
  return matchedGroups.map(group => {
    const mapped = mapping[group.name];

    if (mapped) {
      return {
        ...group,
        final: mapped,
        source: "mapping"
      };
    }

    return {
      ...group,
      final: group.match,
      source: group.status
    };
  });
}

module.exports = {
  applyMapping
};