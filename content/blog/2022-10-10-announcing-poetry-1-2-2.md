---
layout: single
title: "Announcing Poetry 1.2.2"
date: 2022-10-10
categories: [releases]
tags: ["1.x", "1.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.2.2**.

<!--more-->

This release contains several fixes for regressions and issues discovered in 1.2, as well as compatibility with an
upcoming lock file format change in Poetry 1.3.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.2.2** is as easy as:

```bash
$ poetry self update
```

## Highlights

### Lock file compatibility between Poetry 1.2 and 1.3

The next minor version of Poetry, 1.3, will change the format of the lock file in order to handle some cases that are
not possible to handle with the current lock file format.

This release ensures that once the new lock file format is used when 1.3 is out, users that still use 1.2 can read the
new lock file format.

See [python-poetry/poetry#6608](https://github.com/python-poetry/poetry/pull/6608) for details.

## Changelog

### Added

- Add forward compatibility for lock file format 2.0, which will be used by Poetry 1.3 ([#6608](https://github.com/python-poetry/poetry/pull/6608)).

### Changed

- Allow `poetry lock` to re-generate the lock file when invalid or incompatible ([#6753](https://github.com/python-poetry/poetry/pull/6753)).

### Fixed

- Fix an issue where the deprecated JSON API was used to query PyPI for available versions of a package ([#6081](https://github.com/python-poetry/poetry/pull/6081)).
- Fix an issue where versions were escaped wrongly when building the wheel name ([#6476](https://github.com/python-poetry/poetry/pull/6476)).
- Fix an issue where the installation of dependencies failed if pip is a dependency and is updated in parallel to other dependencies ([#6582](https://github.com/python-poetry/poetry/pull/6582)).
- Fix an issue where the names of extras were not normalized according to PEP 685 ([#6541](https://github.com/python-poetry/poetry/pull/6541)).
- Fix an issue where sdist names were not normalized ([#6621](https://github.com/python-poetry/poetry/pull/6621)).
- Fix an issue where invalid constraints, which are ignored, were only reported in a debug message instead of a warning ([#6730](https://github.com/python-poetry/poetry/pull/6730)).
- Fix an issue where `poetry shell` was broken in git bash on Windows ([#6560](https://github.com/python-poetry/poetry/pull/6560)).

### Docs

- Rework the README and contribution docs ([#6552](https://github.com/python-poetry/poetry/pull/6552)).
- Fix for inconsistent docs for multiple-constraint dependencies ([#6604](https://github.com/python-poetry/poetry/pull/6604)).
- Rephrase plugin configuration ([#6557](https://github.com/python-poetry/poetry/pull/6557)).
- Add a note about publishable repositories to `publish` ([#6641](https://github.com/python-poetry/poetry/pull/6641)).
- Fix the path for lazy-loaded bash completion ([#6656](https://github.com/python-poetry/poetry/pull/6656)).
- Fix a reference to the invalid option `--require` ([#6672](https://github.com/python-poetry/poetry/pull/6672)).
- Add a PowerShell one-liner to the basic usage section ([#6683](https://github.com/python-poetry/poetry/pull/6683)).
- Fix the minimum poetry version in the example for plugins ([#6739](https://github.com/python-poetry/poetry/pull/6739)).

### poetry-core ([`1.3.2`](https://github.com/python-poetry/poetry-core/releases/tag/1.3.2))

- Add `3.11` to the list of available Python versions ([#477](https://github.com/python-poetry/poetry-core/pull/477)).
- Fix an issue where caret constraints of pre-releases with a major version of 0 resulted in an empty version range ([#475](https://github.com/python-poetry/poetry-core/pull/475)).

### poetry-plugin-export ([`^1.1.2`](https://github.com/python-poetry/poetry-plugin-export/releases/tag/1.1.2))

- Add support for exporting `constraints.txt` files ([#128](https://github.com/python-poetry/poetry-plugin-export/pull/128)).
- Fix an issue where a relative path passed via `-o` was not interpreted relative to the current working directory ([#130](https://github.com/python-poetry/poetry-plugin-export/pull/130)).
