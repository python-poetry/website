---
layout: single
title: "Announcing Poetry 2.4.0"
date: 2026-05-03
categories: [releases]
tags: ["2.x", "2.4"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **2.4.0**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **2.4.0** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation), you can run:

```bash
$ poetry self update
```

## Highlights

### Adding support for dependency cooldowns

Poetry 2.4.0 introduces a new `solver.min-release-age` setting that lets you require
package releases to be a certain number of days old before they are considered during
dependency resolution.

This can help protect against supply chain attacks where a compromised release is
published and detected only hours or days later. For example, if you set
`solver.min-release-age` to `7`, Poetry will only consider versions for which all known
distribution files are at least seven days old.

```bash
poetry config solver.min-release-age 7
```

If you need newer releases for selected packages or sources, you can opt out of the
filter with `solver.min-release-age-exclude` and `solver.min-release-age-exclude-source`:

```bash
poetry config solver.min-release-age-exclude "my-package,other-package"
poetry config solver.min-release-age-exclude-source "internal-pypi,https://packages.example.com/simple/"
```

{{% note %}}
This filter can only be enforced for package sources that expose file upload timestamps.
If a source does not provide upload times for a release, that release is not filtered out
by this setting.
{{% /note %}}

## Upcoming Changes

### Defaulting to `setuptools` instead of `poetry-core` if no build system is defined

Per [PEP 517](https://peps.python.org/pep-0517/), a build tool should fall back to `setuptools` if no build system is
defined in the `[build-system]` section of `pyproject.toml`. However, to avoid immediate disruption, Poetry will
currently issue a **warning** in such cases and continue using the built-in `poetry-core` backend by default.
This behavior will change in a future minor release so that Poetry will default to `setuptools`
if no `[build-system]` section is defined.

## Changelog

### Added

- Add `solver.min-release-age` setting to require package releases to be a certain number of days old before they are considered during dependency resolution ([#10824](https://github.com/python-poetry/poetry/pull/10824)).
- Add `solver.min-release-age-exclude` to exclude selected packages from age filtering ([#10824](https://github.com/python-poetry/poetry/pull/10824)).
- Add `solver.min-release-age-exclude-source` to exclude all packages from selected package indexes from age filtering ([#10824](https://github.com/python-poetry/poetry/pull/10824)).

### Changed

- Raise an error instead of silently ignoring a package name that is not a dependency when it is passed to `poetry update` ([#10721](https://github.com/python-poetry/poetry/pull/10721)).
- Automatically add a trailing slash to legacy repository URLs (used for publishing) if missing ([#10785](https://github.com/python-poetry/poetry/pull/10785)).
- Require `installer>=1.0.0` ([#10869](https://github.com/python-poetry/poetry/pull/10869)).
- Allow `findpython>=0.8` ([#10874](https://github.com/python-poetry/poetry/pull/10874)).

### Fixed

- Fix an issue where `requires-plugins` fails on Windows if scheme paths are on different drives ([#10869](https://github.com/python-poetry/poetry/pull/10869)).
- Fix an issue where the order of markers in the lock file was not deterministic ([#10720](https://github.com/python-poetry/poetry/pull/10720)).
- Fix an issue where the wrong command was suggested when `poetry self` commands failed due to an outdated lock file ([#10715](https://github.com/python-poetry/poetry/pull/10715)).
- Fix an issue where `poetry env activate` did not work for bash on Windows ([#10716](https://github.com/python-poetry/poetry/pull/10716)).
- Fix an issue where `poetry debug resolve` failed when there was a package with a marker ([#10807](https://github.com/python-poetry/poetry/pull/10807)).
- Fix an issue where the error message about a build backend failure contained garbled `--config-settings` ([#10804](https://github.com/python-poetry/poetry/pull/10804)).
- Fix an issue where a false warning about a circular dependency was printed ([#10811](https://github.com/python-poetry/poetry/pull/10811)).
- Fix an issue where falsy config values were incorrectly treated as not set ([#10808](https://github.com/python-poetry/poetry/pull/10808)).
- Fix an issue where `poetry publish --build` ignored failing builds and uploaded stale artifacts ([#10802](https://github.com/python-poetry/poetry/pull/10802)).
- Fix an issue where `poetry publish` was aborted instead of retrying after package registration ([#10801](https://github.com/python-poetry/poetry/pull/10801)).
- Fix an issue where zip files were not closed after fetching metadata via `lazy-wheel` ([#10800](https://github.com/python-poetry/poetry/pull/10800)).
- Fix an issue where data fetched via `lazy-wheel` was corrupted when part of it had already been cached ([#10806](https://github.com/python-poetry/poetry/pull/10806)).
- Fix an issue where further packages were installed even though installation should be aborted ([#10742](https://github.com/python-poetry/poetry/pull/10742)).
- Fix an issue where installed packages without a `METADATA` file caused an exception on Python 3.15+ ([#10860](https://github.com/python-poetry/poetry/pull/10860)).
- Fix an issue where `http-basic` could not be set for repository names with periods ([#10845](https://github.com/python-poetry/poetry/pull/10845)).
- Fix an issue where calculating the hash of large wheels failed with a memory error ([#10814](https://github.com/python-poetry/poetry/pull/10814)).

### Docs

- Clarify the precedence of configuration sources ([#10757](https://github.com/python-poetry/poetry/pull/10757)).
- Add a note about the influence of `.gitignore` on `tool.poetry.packages` ([#10835](https://github.com/python-poetry/poetry/pull/10835)).

### poetry-core ([`2.4.0`](https://github.com/python-poetry/poetry-core/releases/tag/2.4.0))

- Update vendored `packaging` to `26.2` ([#936](https://github.com/python-poetry/poetry-core/pull/936)).
