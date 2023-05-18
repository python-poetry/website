---
layout: single
title: "Announcing Poetry 1.5.0"
date: 2023-05-19
categories: [releases]
tags: ["1.x", "1.5"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.5.0**.

<!--more-->

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.5.0** is as easy as:

```bash
$ poetry self update
```

## Highlights

### Improved source management

Poetry 1.5 improves the handling of package sources. It deprecates the flags `default` and `secondary` and introduces
a new key `priority`, which can have the values `default`, `primary` and `secondary` as well as two new priorities
`explicit` and `supplemental`. Sources with the priority `explicit` are only searched if the source is explicitly
specified for a dependency. Supplemental sources are only searched if the package is not found in any other source
with a higher priority. Further, the priority of the implicit PyPI source can be changed now. Thereby, the priority
`secondary` is not required anymore and has been deprecated.
For further details see the [documentation](/docs/repositories/#package-sources).

### Improved caching of URL and git dependencies

In previous versions, URL dependencies where downloaded several times for dependency resolution and installation
and git dependencies were rebuilt for every installation even though a commit hash had been locked. In Poetry 1.5,
URL dependencies are downloaded only once and wheels built from git dependencies are cached as well.

## Other important Changes

### Removing the old deprecated installer

The old deprecated installer and the corresponding setting `experimental.new-installer` were removed.
This step was necessary because the old installer blocked dependency updates that were required to fix some bugs.
Besides the new modern installer introduced in Poetry 1.4, the former default installer is still available
by setting `installer.modern-installation` to `false`.

## Upcoming Changes

### Dropping support for Python 3.7 as runtime environment

Poetry 1.5 will be the last minor version with runtime support for Python 3.7.

{{% note %}}
This change is about installing and running Poetry itself.
Managing projects requiring Python 3.7 will still be supported.
{{% /note %}}

## Changelog

### Added

- **Introduce the new source priorities `explicit` and `supplemental`** ([#7658](https://github.com/python-poetry/poetry/pull/7658),
  [#6879](https://github.com/python-poetry/poetry/pull/6879)).
- **Introduce the option to configure the priority of the implicit PyPI source** ([#7801](https://github.com/python-poetry/poetry/pull/7801)).
- Add handling for corrupt cache files ([#7453](https://github.com/python-poetry/poetry/pull/7453)).
- Improve caching of URL and git dependencies ([#7693](https://github.com/python-poetry/poetry/pull/7693),
  [#7473](https://github.com/python-poetry/poetry/pull/7473)).
- Add option to skip installing directory dependencies ([#6845](https://github.com/python-poetry/poetry/pull/6845),
  [#7923](https://github.com/python-poetry/poetry/pull/7923)).
- Add `--executable` option to `poetry env info` ([#7547](https://github.com/python-poetry/poetry/pull/7547)).
- Add `--top-level` option to `poetry show` ([#7415](https://github.com/python-poetry/poetry/pull/7415)).
- Add `--lock` option to `poetry remove` ([#7917](https://github.com/python-poetry/poetry/pull/7917)).
- Add experimental `POETRY_REQUESTS_TIMEOUT` option ([#7081](https://github.com/python-poetry/poetry/pull/7081)).
- Improve performance of wheel inspection by avoiding unnecessary file copy operations ([#7916](https://github.com/python-poetry/poetry/pull/7916)).

### Changed

- **Remove the old deprecated installer and the corresponding setting `experimental.new-installer`** ([#7356](https://github.com/python-poetry/poetry/pull/7356)).
- **Introduce `priority` key for sources and deprecate flags `default` and `secondary`** ([#7658](https://github.com/python-poetry/poetry/pull/7658)).
- Deprecate `poetry run <script>` if the script was not previously installed via `poetry install` ([#7606](https://github.com/python-poetry/poetry/pull/7606)).
- Only write the lock file if the installation succeeds ([#7498](https://github.com/python-poetry/poetry/pull/7498)).
- Do not write the unused package category into the lock file ([#7637](https://github.com/python-poetry/poetry/pull/7637)).

### Fixed

- Fix an issue where Poetry's internal pyproject.toml continually grows larger with empty lines ([#7705](https://github.com/python-poetry/poetry/pull/7705)).
- Fix an issue where Poetry crashes due to corrupt cache files ([#7453](https://github.com/python-poetry/poetry/pull/7453)).
- Fix an issue where the `Retry-After` in HTTP responses was not respected and retries were handled inconsistently ([#7072](https://github.com/python-poetry/poetry/pull/7072)).
- Fix an issue where Poetry silently ignored invalid groups ([#7529](https://github.com/python-poetry/poetry/pull/7529)).
- Fix an issue where Poetry does not find a compatible Python version if not given explicitly ([#7771](https://github.com/python-poetry/poetry/pull/7771)).
- Fix an issue where the `direct_url.json` of an editable install from a git dependency was invalid ([#7473](https://github.com/python-poetry/poetry/pull/7473)).
- Fix an issue where error messages from build backends were not decoded correctly ([#7781](https://github.com/python-poetry/poetry/pull/7781)).
- Fix an infinite loop when adding certain dependencies ([#7405](https://github.com/python-poetry/poetry/pull/7405)).
- Fix an issue where pre-commit hooks skip pyproject.toml files in subdirectories ([#7239](https://github.com/python-poetry/poetry/pull/7239)).
- Fix an issue where pre-commit hooks do not use the expected Python version ([#6989](https://github.com/python-poetry/poetry/pull/6989)).
- Fix an issue where an unclear error message is printed if the project name is the same as one of its dependencies ([#7757](https://github.com/python-poetry/poetry/pull/7757)).
- Fix an issue where `poetry install` returns a zero exit status even though the build script failed ([#7812](https://github.com/python-poetry/poetry/pull/7812)).
- Fix an issue where an existing `.venv` was not used if `in-project` was not set ([#7792](https://github.com/python-poetry/poetry/pull/7792)).
- Fix an issue where multiple extras passed to `poetry add` were not parsed correctly ([#7836](https://github.com/python-poetry/poetry/pull/7836)).
- Fix an issue where `poetry shell` did not send a newline to `fish` ([#7884](https://github.com/python-poetry/poetry/pull/7884)).
- Fix an issue where `poetry update --lock` printed operations that were not executed ([#7915](https://github.com/python-poetry/poetry/pull/7915)).
- Fix an issue where `poetry add --lock` did perform a full update of all dependencies ([#7920](https://github.com/python-poetry/poetry/pull/7920)).
- Fix an issue where `poetry shell` did not work with `nushell` ([#7919](https://github.com/python-poetry/poetry/pull/7919)).
- Fix an issue where subprocess calls failed on Python 3.7 ([#7932](https://github.com/python-poetry/poetry/pull/7932)).
- Fix an issue where keyring was called even though the password was stored in an environment variable ([#7928](https://github.com/python-poetry/poetry/pull/7928)).

### Docs

- Add information about what to use instead of `--dev` ([#7647](https://github.com/python-poetry/poetry/pull/7647)).
- Promote semantic versioning less aggressively ([#7517](https://github.com/python-poetry/poetry/pull/7517)).
- Explain Poetry's own versioning scheme in the FAQ ([#7517](https://github.com/python-poetry/poetry/pull/7517)).
- Update documentation for configuration with environment variables ([#6711](https://github.com/python-poetry/poetry/pull/6711)).
- Add details how to disable the virtualenv prompt ([#7874](https://github.com/python-poetry/poetry/pull/7874)).
- Improve documentation on whether to commit `poetry.lock` ([#7506](https://github.com/python-poetry/poetry/pull/7506)).
- Improve documentation of `virtualenv.create` ([#7608](https://github.com/python-poetry/poetry/pull/7608)).

### poetry-core ([`1.6.0`](https://github.com/python-poetry/poetry-core/releases/tag/1.6.0))

- Improve error message for invalid markers ([#569](https://github.com/python-poetry/poetry-core/pull/569)).
- Increase robustness when deleting temporary directories on Windows ([#460](https://github.com/python-poetry/poetry-core/pull/460)).
- Replace `tomlkit` with `tomli`, which changes the interface of some _internal_ classes ([#483](https://github.com/python-poetry/poetry-core/pull/483)).
- Deprecate `Package.category` ([#561](https://github.com/python-poetry/poetry-core/pull/561)).
- Fix a performance regression in marker handling ([#568](https://github.com/python-poetry/poetry-core/pull/568)).
- Fix an issue where wildcard version constraints were not handled correctly ([#402](https://github.com/python-poetry/poetry-core/pull/402)).
- Fix an issue where `poetry build` created duplicate Python classifiers if they were specified manually ([#578](https://github.com/python-poetry/poetry-core/pull/578)).
- Fix an issue where local versions where not handled correctly ([#579](https://github.com/python-poetry/poetry-core/pull/579)).
