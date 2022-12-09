---
layout: single
title: "Announcing Poetry 1.3.0"
date: 2022-12-09
categories: [releases]
tags: ["1.x", "1.3"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.3.0**.

<!--more-->

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.3.0** is as easy as:

```bash
$ poetry self update
```

## Highlights

### New lock file format

The lock file format has been changed to better support explicit sources. This change should be mostly transparent for
users, as Poetry 1.2.2 or newer are capable of reading the new format, and Poetry 1.3.0 maintains full support for
reading previous versions of the lock file format.

The lock file format had to be changed as previously filenames and hashes were locked in a global table. This could
cause collisions with explicit sources or other more advanced uses of Poetry's features, and the new format mitigates
this by instead locking files with the corresponding metadata table.

### Preventing cache corruption

Poetry 1.1 and 1.2 are prone to corrupting various caches in the following common scenarios:

- Interrupting an instance of Poetry while it is gathering metadata from PyPI.
- Concurrent instances of Poetry writing to the artifacts cache (e.g. `poetry install`, `poetry update`, etc).

The former typically manifested as an indefinite hang while making HTTP requests, and should be prevented entirely on
Poetry 1.3, regardless of the current state of your cache. This is because the fix has involved moving to a new
file-locking implementation, and stale locks from the old implementation will be ignored. However, if you wish to
explicitly clear this cache, you can do so with `poetry cache clear --all .`.

The latter improvement will not fix already-corrupted archives on disk; if you are experiencing hash mismatches, make
sure to try clearing the artifacts cache with `rm -rf $(poetry config cache-dir)`, and file a new issue if this still
occurs on Poetry 1.3.

## Upcoming Changes

### `generate-setup-file = false`

Poetry has long generated a stub `setup.py` file for compatibility with older versions of `pip` (specifically, `pip`
versions older than 19, the [first to introduce support for PEP 517][pip-19]). Users who did not want Poetry to do this
have long been able to opt out with the `generate-setup-file` option in `tool.poetry.build`.

The next minor release of Poetry will invert this behavior, turning off generation of `setup.py` by default. This change
should be transparent to nearly all users, as versions of `pip` supporting alternate build systems natively have been
available for nearly four years.

Users who wish to maintain the legacy behavior may explicitly do so in their `pyproject.toml`; however, users should
keep in mind that this option will be deprecated and eventually removed in future versions of Poetry:

```toml
[tool.poetry.build]
generate-setup-file = true
```

## Changelog

### Added

- Mark the lock file with an `@generated` comment as used by common tooling ([#2773](https://github.com/python-poetry/poetry/pull/2773)).
- `poetry check` validates trove classifiers and warns for deprecations ([#2881](https://github.com/python-poetry/poetry/pull/2881)).
- Introduce a top level `-C, --directory` option to set the working path ([#6810](https://github.com/python-poetry/poetry/pull/6810)).

### Changed

- **New lock file format (version 2.0)** ([#6393](https://github.com/python-poetry/poetry/pull/6393)).
- Path dependency metadata is unconditionally re-locked ([#6843](https://github.com/python-poetry/poetry/pull/6843)).
- URL dependency hashes are locked ([#7121](https://github.com/python-poetry/poetry/pull/7121)).
- `poetry update` and `poetry lock` should now resolve dependencies more similarly ([#6477](https://github.com/python-poetry/poetry/pull/6477)).
- `poetry publish` will report more useful errors when a file does not exist ([#4417](https://github.com/python-poetry/poetry/pull/4417)).
- `poetry add` will check for duplicate entries using canonical names ([#6832](https://github.com/python-poetry/poetry/pull/6832)).
- Wheels are preferred to source distributions when gathering metadata ([#6547](https://github.com/python-poetry/poetry/pull/6547)).
- Git dependencies of extras are only fetched if the extra is requested ([#6615](https://github.com/python-poetry/poetry/pull/6615)).
- Invoke `pip` with `--no-input` to prevent hanging without feedback ([#6724](https://github.com/python-poetry/poetry/pull/6724), [#6966](https://github.com/python-poetry/poetry/pull/6966)).
- Invoke `pip` with `--isolated` to prevent the influence of user configuration ([#6531](https://github.com/python-poetry/poetry/pull/6531)).
- Interrogate environments with Python in isolated (`-I`) mode ([#6628](https://github.com/python-poetry/poetry/pull/6628)).
- Raise an informative error when multiple version constraints overlap and are incompatible ([#7098](https://github.com/python-poetry/poetry/pull/7098)).

### Fixed

- **Fix an issue where concurrent instances of Poetry would corrupt the artifact cache** ([#6186](https://github.com/python-poetry/poetry/pull/6186)).
- **Fix an issue where Poetry can hang after being interrupted due to stale locking in cache** ([#6471](https://github.com/python-poetry/poetry/pull/6471)).
- Fix an issue where the output of commands executed with `--dry-run` contained duplicate entries ([#4660](https://github.com/python-poetry/poetry/pull/4660)).
- Fix an issue where `requests`'s pool size did not match the number of installer workers ([#6805](https://github.com/python-poetry/poetry/pull/6805)).
- Fix an issue where `poetry show --outdated` failed with a runtime error related to direct origin dependencies ([#6016](https://github.com/python-poetry/poetry/pull/6016)).
- Fix an issue where only the last command of an `ApplicationPlugin` is registered ([#6304](https://github.com/python-poetry/poetry/pull/6304)).
- Fix an issue where git dependencies were fetched unnecessarily when running `poetry lock --no-update` ([#6131](https://github.com/python-poetry/poetry/pull/6131)).
- Fix an issue where stdout was polluted with messages that should go to stderr ([#6429](https://github.com/python-poetry/poetry/pull/6429)).
- Fix an issue with `poetry shell` activation and zsh ([#5795](https://github.com/python-poetry/poetry/pull/5795)).
- Fix an issue where a url dependencies were shown as outdated ([#6396](https://github.com/python-poetry/poetry/pull/6396)).
- Fix an issue where the `source` field of a dependency with extras was ignored ([#6472](https://github.com/python-poetry/poetry/pull/6472)).
- Fix an issue where a package from the wrong source was installed for a multiple-constraints dependency with different sources ([#6747](https://github.com/python-poetry/poetry/pull/6747)).
- Fix an issue where dependencies from different sources where merged during dependency resolution ([#6679](https://github.com/python-poetry/poetry/pull/6679)).
- Fix an issue where `experimental.system-git-client` could not be used via environment variable ([#6783](https://github.com/python-poetry/poetry/pull/6783)).
- Fix an issue where Poetry fails with an `AssertionError` due to `distribution.files` being `None` ([#6788](https://github.com/python-poetry/poetry/pull/6788)).
- Fix an issue where `poetry env info` did not respect `virtualenvs.prefer-active-python` ([#6986](https://github.com/python-poetry/poetry/pull/6986)).
- Fix an issue where `poetry env list` does not list the in-project environment ([#6979](https://github.com/python-poetry/poetry/pull/6979)).
- Fix an issue where `poetry env remove` removed the wrong environment ([#6195](https://github.com/python-poetry/poetry/pull/6195)).
- Fix an issue where the return code of a script was not relayed as exit code ([#6824](https://github.com/python-poetry/poetry/pull/6824)).
- Fix an issue where the solver could silently swallow `ValueError` ([#6790](https://github.com/python-poetry/poetry/pull/6790)).

### Docs

- Improve documentation of package sources ([#5605](https://github.com/python-poetry/poetry/pull/5605)).
- Correct the default cache path on Windows ([#7012](https://github.com/python-poetry/poetry/pull/7012)).

### poetry-core ([`1.4.0`](https://github.com/python-poetry/poetry-core/releases/tag/1.4.0))

- The PEP 517 `metadata_directory` is now respected as an input to the `build_wheel` hook ([#487](https://github.com/python-poetry/poetry-core/pull/487)).
- `ParseConstraintError` is now raised on version and constraint parsing errors, and includes information on the package that caused the error ([#514](https://github.com/python-poetry/poetry-core/pull/514)).
- Fix an issue where invalid PEP 508 requirements were generated due to a missing space before semicolons ([#510](https://github.com/python-poetry/poetry-core/pull/510)).
- Fix an issue where relative paths were encoded into package requirements, instead of a file:// URL as required by PEP 508 ([#512](https://github.com/python-poetry/poetry-core/pull/512)).

### poetry-plugin-export ([`^1.2.0`](https://github.com/python-poetry/poetry-plugin-export/releases/tag/1.2.0))

- Ensure compatibility with Poetry 1.3.0. No functional changes.

### cleo ([`^2.0.0`](https://github.com/python-poetry/poetry-core/releases/tag/2.0.0))

- Fix an issue where shell completions had syntax errors ([#247](https://github.com/python-poetry/cleo/pull/247)).
- Fix an issue where not reading all the output of a command resulted in a "Broken pipe" error ([#165](https://github.com/python-poetry/cleo/pull/165)).
- Fix an issue where errors were not shown in non-verbose mode ([#166](https://github.com/python-poetry/cleo/pull/166)).

[pip-19]: https://discuss.python.org/t/pip-19-0-is-now-available
