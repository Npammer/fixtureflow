# FixtureFlow

Fix and replace fixture profiles in MVR files using your local GDTF library.

## Overview

FixtureFlow is a CLI tool for working with MVR (My Virtual Rig) files used in lighting workflows.

MVR files often contain:
- dummy fixtures
- missing or incorrect GDTF profiles
- inconsistent fixture definitions

This tool helps you inspect, match, and replace fixture profiles using a trusted local GDTF library.

## Features

### Current
- Parse MVR files
- Extract fixture data

### Planned
- Group fixtures by type
- Scan local GDTF library
- Match fixtures (with confidence levels)
- Replace fixture profiles
- Rebuild MVR files with embedded GDTFs
- Desktop UI (drag & drop)

## Installation

git clone https://github.com/Npammer/fixtureflow.git
cd fixtureflow
npm install

## Usage

npm start -- path/to/file.mvr

Example:
npm start -- test.mvr

## Project Structure

src/
  core/        Core logic (parsing, matching, processing)
  cli/         Command line interface
test/           Test files (MVR examples)

## Roadmap

- [x] Project setup
- [x] Basic MVR parsing
- [ ] Fixture grouping
- [ ] GDTF library scanning
- [ ] Matching engine
- [ ] Fixture replacement
- [ ] MVR rebuilding
- [ ] UI

## Contributing

Contributions are welcome.

For now:
- keep changes focused and small
- follow existing structure
- use clear commit messages

More detailed guidelines will be added later.

## License

MIT