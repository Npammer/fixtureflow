function matchFixtures(mvrGroups, gdtfLibrary) {
  return mvrGroups.map(group => {
    const match = gdtfLibrary[group.name];

    if (match) {
      return {
        ...group,
        match: match.name,
        status: "exact"
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