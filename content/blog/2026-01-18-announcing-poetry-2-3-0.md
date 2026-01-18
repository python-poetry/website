---
layout: single
title: "Announcing Poetry 2.3.0"
date: 2026-01-18
categories: [releases]
tags: ["2.x", "2.3"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **2.3.0**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **2.3.0** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation), you can run:

```bash
$ poetry self update
```

## Highlights

### Changing the default of `installer.re-resolve` from `true` to `false`

With Poetry 2.0.0, the new `installer.re-resolve` config setting was [introduced](/blog/announcing-poetry-2.0.0/#locking-resulting-markers-and-groups).
The default of this setting is changed from `true` to `false` in Poetry 2.3.0.

By default, Poetry will now evaluate the locked groups and markers to decide
if a package should be installed. This makes it clearer and easier to understand
why a package is (or is not) installed in certain environments.
It also fixes some shortcomings of the previous default behavior.

If you encounter any issues, you can still restore the old default behavior by setting `installer.re-resolve` to `true`.
Then, Poetry will ignore the locked markers and groups and re-resolve the dependencies
with the packages from the lock file being the only source for packages.

### Adding support for exporting `pylock.toml` files with `poetry-plugin-export`

[PEP 751](https://peps.python.org/pep-0751/) defines a standard format for lock files named `pylock.toml`.
Poetry is not yet able to replace `poetry.lock` with `pylock.toml`, but it now provides all necessary information
for [poetry-plugin-export](https://github.com/python-poetry/poetry-plugin-export) to export `pylock.toml` files.
Exporting `pylock.toml` requires at least Poetry 2.3.0 and poetry-plugin-export 1.10.0.

## Other important Changes

### Considering PEP 735 dependency groups in the lock file hash

Poetry 2.2.0 introduced support for [PEP 735](https://peps.python.org/pep-0735/) dependency groups.
Unfortunately, it was forgotten to consider such groups in the lock file hash so that Poetry is not able to determine
that a change to such groups is not yet reflected in the lock file. This has been fixed in Poetry 2.3.0.
While Poetry 2.3.0 is fine with lock files created by Poetry 2.2.x, Poetry 2.2.x will recognize lock files
created by Poetry 2.3.0 as outdated. Therefore, it is recommended to [require](/docs/pyproject/#requires-poetry)
Poetry 2.3.0 or later when using PEP 735 dependency groups.

## Upcoming Changes

### Defaulting to `setuptools` instead of `poetry-core` if no build system is defined

Per [PEP 517](https://peps.python.org/pep-0517/), a build tool should fall back to `setuptools` if no build system is
defined in the `[build-system]` section of `pyproject.toml`. However, to avoid immediate disruption, Poetry will
currently issue a **warning** in such cases and continue using the built-in `poetry-core` backend by default.
This behavior will change in a future minor release so that Poetry will default to `setuptools`
if no `[build-system]` section is defined.

## Changelog

### Added

- **Add support for exporting `pylock.toml` files with `poetry-plugin-export`** ([#10677](https://github.com/python-poetry/poetry/pull/10677)).
- Add support for specifying build constraints for dependencies ([#10388](https://github.com/python-poetry/poetry/pull/10388)).
- Add support for publishing artifacts whose version is determined dynamically by the build-backend ([#10644](https://github.com/python-poetry/poetry/pull/10644)).
- Add support for editable project plugins ([#10661](https://github.com/python-poetry/poetry/pull/10661)).
- Check `requires-poetry` before any other validation ([#10593](https://github.com/python-poetry/poetry/pull/10593)).
- Validate the content of `project.readme` when running `poetry check` ([#10604](https://github.com/python-poetry/poetry/pull/10604)).
- Add the option to clear all caches by making the cache name in `poetry cache clear` optional ([#10627](https://github.com/python-poetry/poetry/pull/10627)).
- Automatically update the cache for packages where the locked files differ from cached files ([#10657](https://github.com/python-poetry/poetry/pull/10657)).
- Suggest to clear the cache if running a command with `--no-cache` solves an issue ([#10585](https://github.com/python-poetry/poetry/pull/10585)).
- Propose `poetry init` when trying `poetry new` for an existing directory ([#10563](https://github.com/python-poetry/poetry/pull/10563)).
- Add support for `poetry publish --skip-existing` for new Nexus OSS versions ([#10603](https://github.com/python-poetry/poetry/pull/10603)).
- Show Poetry's own Python's path in `poetry debug info` ([#10588](https://github.com/python-poetry/poetry/pull/10588)).

### Changed

- **Drop support for Python 3.9** ([#10634](https://github.com/python-poetry/poetry/pull/10634)).
- **Change the default of `installer.re-resolve` from `true` to `false`** ([#10622](https://github.com/python-poetry/poetry/pull/10622)).
- **PEP 735 dependency groups are considered in the lock file hash** ([#10621](https://github.com/python-poetry/poetry/pull/10621)).
- Deprecate `poetry.utils._compat.metadata`, which is sometimes used in plugins, in favor of `importlib.metadata` ([#10634](https://github.com/python-poetry/poetry/pull/10634)).
- Improve managing free-threaded Python versions with `poetry python` ([#10606](https://github.com/python-poetry/poetry/pull/10606)).
- Prefer JSON API to HTML API in legacy repositories ([#10672](https://github.com/python-poetry/poetry/pull/10672)).
- When running `poetry init`, only add the readme field in the `pyproject.toml` if the readme file exists ([#10679](https://github.com/python-poetry/poetry/pull/10679)).
- Raise an error if no hash can be determined for any distribution link of a package ([#10673](https://github.com/python-poetry/poetry/pull/10673)).
- Require `dulwich>=0.25.0` ([#10674](https://github.com/python-poetry/poetry/pull/10674)).

### Fixed

- Fix an issue where `poetry remove` did not work for PEP 735 dependency groups with `include-group` items ([#10587](https://github.com/python-poetry/poetry/pull/10587)).
- Fix an issue where `poetry remove` caused dangling `include-group` references in PEP 735 dependency groups ([#10590](https://github.com/python-poetry/poetry/pull/10590)).
- Fix an issue where `poetry add` did not work for PEP 735 dependency groups with `include-group` items ([#10636](https://github.com/python-poetry/poetry/pull/10636)).
- Fix an issue where PEP 735 dependency groups were not considered in the lock file hash ([#10621](https://github.com/python-poetry/poetry/pull/10621)).
- Fix an issue where wrong markers were locked for a dependency that was required by several groups with different markers ([#10613](https://github.com/python-poetry/poetry/pull/10613)).
- Fix an issue where non-deterministic markers were created in a method used by `poetry-plugin-export` ([#10667](https://github.com/python-poetry/poetry/pull/10667)).
- Fix an issue where wrong wheels were chosen for installation in free-threaded Python environments if Poetry itself was not installed with free-threaded Python ([#10614](https://github.com/python-poetry/poetry/pull/10614)).
- Fix an issue where `poetry publish` used the metadata of the project instead of the metadata of the build artifact ([#10624](https://github.com/python-poetry/poetry/pull/10624)).
- Fix an issue where `poetry env use` just used another Python version instead of failing when the requested version was not supported by the project ([#10685](https://github.com/python-poetry/poetry/pull/10685)).
- Fix an issue where `poetry env activate` returned the wrong command for `dash` ([#10696](https://github.com/python-poetry/poetry/pull/10696)).
- Fix an issue where `data-dir` and `python.installation-dir` could not be set ([#10595](https://github.com/python-poetry/poetry/pull/10595)).
- Fix an issue where Python and pip executables were not correctly detected on Windows ([#10645](https://github.com/python-poetry/poetry/pull/10645)).
- Fix an issue where invalid template variables in `virtualenvs.prompt` caused an incomprehensible error message ([#10648](https://github.com/python-poetry/poetry/pull/10648)).

### Docs

- Add a warning about `~/.netrc` for Poetry credential configuration ([#10630](https://github.com/python-poetry/poetry/pull/10630)).
- Clarify that the local configuration takes precedence over the global configuration ([#10676](https://github.com/python-poetry/poetry/pull/10676)).
- Add an explanation in which cases `packages` are automatically detected ([#10680](https://github.com/python-poetry/poetry/pull/10680)).

### poetry-core ([`2.3.0`](https://github.com/python-poetry/poetry-core/releases/tag/2.3.0))

- Normalize versions ([#893](https://github.com/python-poetry/poetry-core/pull/893)).
- Fix an issue where unsatisfiable requirements did not raise an error ([#891](https://github.com/python-poetry/poetry-core/pull/891)).
- Fix an issue where the implicit main group did not exist if it was explicitly declared as not having any dependencies ([#892](https://github.com/python-poetry/poetry-core/pull/892)).
- Fix an issue where `python_full_version` markers with pre-release versions were parsed incorrectly ([#893](https://github.com/python-poetry/poetry-core/pull/893)).
