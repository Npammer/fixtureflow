function normalize(name) {
  return name
    .toLowerCase()
    .replace(/professional/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function removeDigits(name) {
  return name.replace(/[0-9]/g, "");
}

function matchFixtures(mvrGroups, gdtfLibrary) {
  return mvrGroups.map(group => {
    const exact = gdtfLibrary[group.name];

    if (exact) {
      return {
        ...group,
        match: exact.name,
        status: "exact"
      };
    }

    const normalizedGroup = normalize(group.name);
    const groupNoDigits = removeDigits(normalizedGroup);

    let bestMatch = null;

    Object.values(gdtfLibrary).forEach(item => {
      const normalizedLib = normalize(item.name);
      const libNoDigits = removeDigits(normalizedLib);

      if (
        normalizedLib.includes(normalizedGroup) ||
        normalizedGroup.includes(normalizedLib) ||
        libNoDigits.includes(groupNoDigits) ||
        groupNoDigits.includes(libNoDigits)
      ) {
        bestMatch = item;
      }
    });

    if (bestMatch) {
      return {
        ...group,
        match: bestMatch.name,
        status: "fuzzy"
      };
    }

    return {
      ...group,
      match: null,
      status: "unmatched"
    };
  });
}

module.exports = {
  matchFixtures
};