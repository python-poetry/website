---
layout: single
title: "Announcing Poetry 1.4.0"
date: 2023-02-27
categories: [releases]
tags: ["1.x", "1.4"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.4.0**.

<!--more-->

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.4.0** is as easy as:

```bash
$ poetry self update
```

## Highlights

### Faster installation of packages

Poetry 1.4 introduces a new modern installer, which is enabled by default. The new installer is independent from `pip`
and faster than the former default installer, especially if the packages are already cached. In contrast, to former
installers it does not compile byte code by default. (This is done automatically when the installed packages are used
for the first time.) In order to compile byte code on installation, you can run `poetry install --compile`.
If you encounter issues, you can deactivate the new installer by setting `installer.modern-installation` to `false`.

Further, the oldest installer (setting `experimental.new-installer` to `false`) has been deprecated, so there are
only two non-deprecated installers available (the new installer and the former default installer). Despite its name
`experimental.new-installer=true` had been the stable default installer for some releases now.

### Validate path dependencies during use instead of during construction

Path dependencies are not validated during construction anymore but only during use. In other words,
path dependencies are not validated if they are contained only in a group that is not selected for installation.
Further, `poetry lock --no-update` does not fail anymore for renamed path dependencies.

## Other important Changes

### `generate-setup-file = false`

Poetry has long generated a stub `setup.py` file for compatibility with older versions of `pip` (specifically, `pip`
versions older than 19, the [first to introduce support for PEP 517][pip-19]). Users who did not want Poetry to do this
have long been able to opt out with the `generate-setup-file` option in `tool.poetry.build`.

As already announced in the last blog post, Poetry 1.4 inverts this behavior, turning off generation of `setup.py` by
default. This change should be transparent to nearly all users, as versions of `pip` supporting alternate build systems
natively have been available for nearly four years.

Users who wish to maintain the legacy behavior may explicitly do so in their `pyproject.toml`; however, users should
keep in mind that this option will be deprecated and eventually removed in future versions of Poetry:

```toml
[tool.poetry.build]
generate-setup-file = true
```

## Changelog

### Added

- **Add a modern installer (`installer.modern-installation`) for faster installation of packages and independence from pip** ([#6205](https://github.com/python-poetry/poetry/pull/6205)).
- Add support for `Private ::` trove classifiers ([#7271](https://github.com/python-poetry/poetry/pull/7271)).
- Add the version of poetry in the `@generated` comment at the beginning of the lock file ([#7339](https://github.com/python-poetry/poetry/pull/7339)).
- Add support for `virtualenvs.prefer-active-python` when running `poetry new` and `poetry init` ([#7100](https://github.com/python-poetry/poetry/pull/7100)).

### Changed

- **Deprecate the old installer, i.e. setting `experimental.new-installer` to `false`** ([#7358](https://github.com/python-poetry/poetry/pull/7358)).
- Remove unused `platform` field from cached package info and bump the cache version ([#7304](https://github.com/python-poetry/poetry/pull/7304)).
- Extra dependencies of the root project are now sorted in the lock file ([#7375](https://github.com/python-poetry/poetry/pull/7375)).
- Remove upper boundary for `importlib-metadata` dependency ([#7434](https://github.com/python-poetry/poetry/pull/7434)).
- Validate path dependencies during use instead of during construction ([#6844](https://github.com/python-poetry/poetry/pull/6844)).
- Remove the deprecated `repository` modules ([#7468](https://github.com/python-poetry/poetry/pull/7468)).

### Fixed

- Fix an issue where an unconditional dependency of an extra was not installed in specific environments ([#7175](https://github.com/python-poetry/poetry/pull/7175)).
- Fix an issue where a pre-release of a dependency was chosen even if a stable release fulfilled the constraint ([#7225](https://github.com/python-poetry/poetry/pull/7225), [#7236](https://github.com/python-poetry/poetry/pull/7236)).
- Fix an issue where HTTP redirects were not handled correctly during publishing ([#7160](https://github.com/python-poetry/poetry/pull/7160)).
- Fix an issue where `poetry check` did not handle the `-C, --directory` option correctly ([#7241](https://github.com/python-poetry/poetry/pull/7241)).
- Fix an issue where the subdirectory information of a git dependency was not written to the lock file ([#7367](https://github.com/python-poetry/poetry/pull/7367)).
- Fix an issue where the wrong Python version was selected when creating an virtual environment ([#7221](https://github.com/python-poetry/poetry/pull/7221)).
- Fix an issue where packages that should be kept were uninstalled when calling `poetry install --sync` ([#7389](https://github.com/python-poetry/poetry/pull/7389)).
- Fix an issue where an incorrect value was set for `sys.argv[0]` when running installed scripts ([#6737](https://github.com/python-poetry/poetry/pull/6737)).
- Fix an issue where hashes in `direct_url.json` files were not written according to the specification ([#7475](https://github.com/python-poetry/poetry/pull/7475)).
- Fix an issue where poetry commands failed due to special characters in the path of the project or virtual environment ([#7471](https://github.com/python-poetry/poetry/pull/7471)).
- Fix an issue where poetry crashed with a `JSONDecodeError` when running a Python script that produced certain warnings ([#6665](https://github.com/python-poetry/poetry/pull/6665)).

### Docs

- Add advice on how to maintain a poetry plugin ([#6977](https://github.com/python-poetry/poetry/pull/6977)).
- Update tox examples to comply with the latest tox release ([#7341](https://github.com/python-poetry/poetry/pull/7341)).
- Mention that the `poetry export` can export `constraints.txt` files ([#7383](https://github.com/python-poetry/poetry/pull/7383)).
- Add clarifications for moving configuration files ([#6864](https://github.com/python-poetry/poetry/pull/6864)).
- Mention the different types of exact version specifications ([#7503](https://github.com/python-poetry/poetry/pull/7503)).

### poetry-core ([`1.5.1`](https://github.com/python-poetry/poetry-core/releases/tag/1.5.1))

- Improve marker handling ([#528](https://github.com/python-poetry/poetry-core/pull/528),
  [#534](https://github.com/python-poetry/poetry-core/pull/534),
  [#530](https://github.com/python-poetry/poetry-core/pull/530),
  [#546](https://github.com/python-poetry/poetry-core/pull/546),
  [#547](https://github.com/python-poetry/poetry-core/pull/547)).
- Validate whether dependencies referenced in `extras` are defined in the main dependency group ([#542](https://github.com/python-poetry/poetry-core/pull/542)).
- Poetry no longer generates a `setup.py` file in sdists by default ([#318](https://github.com/python-poetry/poetry-core/pull/318)).
- Fix an issue where trailing newlines were allowed in `tool.poetry.description` ([#505](https://github.com/python-poetry/poetry-core/pull/505)).
- Fix an issue where the name of the data folder in wheels was not normalized ([#532](https://github.com/python-poetry/poetry-core/pull/532)).
- Fix an issue where the order of entries in the RECORD file was not deterministic ([#545](https://github.com/python-poetry/poetry-core/pull/545)).
- Fix an issue where zero padding was not correctly handled in version comparisons ([#540](https://github.com/python-poetry/poetry-core/pull/540)).
- Fix an issue where sdist builds did not support multiple READMEs ([#486](https://github.com/python-poetry/poetry-core/pull/486)).

### poetry-plugin-export ([`^1.3.0`](https://github.com/python-poetry/poetry-plugin-export/releases/tag/1.3.0))

- Fix an issue where the export failed if there was a circular dependency on the root package ([#118](https://github.com/python-poetry/poetry-plugin-export/pull/118)).

[pip-19]: https://discuss.python.org/t/pip-19-0-is-now-available
