---
layout: single
title: "Announcing Poetry 2.5.0"
date: 2026-09-19
categories: [releases]
tags: ["2.x", "2.5"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **2.5.0**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **2.5.0** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation), you can run:

```bash
$ poetry self update
```

## Highlights

### Faster uninstalls and updates with a built-in uninstaller

Until now, Poetry has spawned a `pip uninstall` subprocess for each package that had to be removed.
This does not only affect explicit removals: updating a package means uninstalling the old version
before installing the new one. The overhead of starting pip again and again adds up,
especially when many packages are updated at once.

Poetry 2.5.0 introduces a built-in uninstaller so that Poetry no longer has to run a pip subprocess
for each uninstall. This makes uninstalls – and thereby updates – faster.

The built-in uninstaller is not used by default yet. You can opt in
via the new `installer.builtin-uninstall` setting:

```bash
poetry config installer.builtin-uninstall true
```

{{% note %}}
We plan to make the built-in uninstaller the default in a future minor release
and to remove the setting even later, just as we did with `installer.modern-installation`.
Please try it out and [report](https://github.com/python-poetry/poetry/issues) any issues you encounter.
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

- Add an `installer.builtin-uninstall` setting to uninstall packages with a built-in uninstaller instead of invoking `pip uninstall` ([#10931](https://github.com/python-poetry/poetry/pull/10931)).
- Add official support for Python 3.15 ([#11046](https://github.com/python-poetry/poetry/pull/11046)).

### Changed

- Do not send credentials configured for an `https` repository via `http` ([#11073](https://github.com/python-poetry/poetry/pull/11073)).
- Fail with an error when the current Python version is not compatible with the project and `virtualenvs.create` is `false` ([#10941](https://github.com/python-poetry/poetry/pull/10941)).
- Validate version constraints that are entered interactively in `poetry init` ([#10909](https://github.com/python-poetry/poetry/pull/10909)).
- Include the path of the `pyproject.toml` file in the message about already present packages in `poetry add` ([#10908](https://github.com/python-poetry/poetry/pull/10908)).
- Improve performance of processing package links and repository pages ([#10895](https://github.com/python-poetry/poetry/pull/10895),
  [#10896](https://github.com/python-poetry/poetry/pull/10896),
  [#10903](https://github.com/python-poetry/poetry/pull/10903),
  [#10949](https://github.com/python-poetry/poetry/pull/10949),
  [#10951](https://github.com/python-poetry/poetry/pull/10951),
  [#10953](https://github.com/python-poetry/poetry/pull/10953)).
- Improve performance of dependency resolution ([#10907](https://github.com/python-poetry/poetry/pull/10907),
  [#10954](https://github.com/python-poetry/poetry/pull/10954)).
- Improve performance of choosing and installing wheels ([#10905](https://github.com/python-poetry/poetry/pull/10905),
  [#10958](https://github.com/python-poetry/poetry/pull/10958)).
- Improve performance by avoiding redundant keyring lookups for repositories without credentials ([#10959](https://github.com/python-poetry/poetry/pull/10959)).
- Improve performance by reducing the number of subprocesses to discover virtual environment data ([#11042](https://github.com/python-poetry/poetry/pull/11042)).
- Improve performance of `poetry search` for single-token queries ([#10906](https://github.com/python-poetry/poetry/pull/10906)).
- Improve startup time by deferring the import of `requests` ([#11004](https://github.com/python-poetry/poetry/pull/11004)).
- Improve performance of schema validation by caching compiled JSON schema validators ([#11033](https://github.com/python-poetry/poetry/pull/11033)).

### Fixed

- Fix an issue where credentials of the wrong repository were used under certain circumstances when multiple repositories were configured on the same host ([#11072](https://github.com/python-poetry/poetry/pull/11072)).
- Fix an issue where credentials of a repository on another host were used for git dependencies if the path of the URL was the same ([#11074](https://github.com/python-poetry/poetry/pull/11074)).
- Fix an issue where dependency resolution failed for conflicting requirements of different packages even though the requirements had mutually exclusive markers ([#10944](https://github.com/python-poetry/poetry/pull/10944)).
- Fix an issue where dependency resolution failed when the same package was required with different extras in several optional dependencies or dependency groups ([#10943](https://github.com/python-poetry/poetry/pull/10943)).
- Fix an issue where dependency resolution failed with a `KeyError` ([#11008](https://github.com/python-poetry/poetry/pull/11008)).
- Fix an issue where the dependencies of an extra were missing in the lock file after adding the extra to a locked dependency, e.g. a git dependency, in the `pyproject.toml` file ([#10987](https://github.com/python-poetry/poetry/pull/10987)).
- Fix an issue where a path or git dependency was not reinstalled when its `develop` setting changed ([#11022](https://github.com/python-poetry/poetry/pull/11022)).
- Fix an issue where scripts of type `file` were not installed when installing the project ([#10736](https://github.com/python-poetry/poetry/pull/10736)).
- Fix an issue where GUI scripts were not installed when installing the project ([#10973](https://github.com/python-poetry/poetry/pull/10973)).
- Fix an issue where a relative path was written to `direct_url.json` for path dependencies ([#10917](https://github.com/python-poetry/poetry/pull/10917)).
- Fix an issue where `poetry show <package>` showed a version that was not relevant for the current environment if there were multiple versions of the package in the lock file ([#11003](https://github.com/python-poetry/poetry/pull/11003)).
- Fix an issue where `poetry show --outdated` did not find newer versions of packages from sources with `explicit` priority ([#10982](https://github.com/python-poetry/poetry/pull/10982)).
- Fix an issue where `poetry env activate` ignored the environment that was determined by the application, e.g. when using `--directory` ([#10916](https://github.com/python-poetry/poetry/pull/10916)).
- Fix an issue where `poetry init` proposed an invalid package name if the directory name was not a valid package name ([#10975](https://github.com/python-poetry/poetry/pull/10975)).

### Docs

- Document the `--license` option of `poetry init` and `poetry new` ([#11064](https://github.com/python-poetry/poetry/pull/11064)).
- Clarify which dependencies are locked when running `poetry update` with dependency groups ([#11024](https://github.com/python-poetry/poetry/pull/11024)).
- Clarify the portability of path dependencies ([#11020](https://github.com/python-poetry/poetry/pull/11020)).
- Clarify the usage of `poetry run` with console scripts ([#10984](https://github.com/python-poetry/poetry/pull/10984)).
- Clarify what `--no-cache` disables ([#10915](https://github.com/python-poetry/poetry/pull/10915)).
- Document how to use package sources for `poetry self update` ([#10923](https://github.com/python-poetry/poetry/pull/10923)).
- Fix the stale minimum Python version ([#11050](https://github.com/python-poetry/poetry/pull/11050)).
- Update outdated links ([#10913](https://github.com/python-poetry/poetry/pull/10913),
  [#10938](https://github.com/python-poetry/poetry/pull/10938),
  [#11000](https://github.com/python-poetry/poetry/pull/11000),
  [#11043](https://github.com/python-poetry/poetry/pull/11043)).

### poetry-core ([`2.5.0`](https://github.com/python-poetry/poetry-core/releases/tag/2.5.0))

- Add Python 3.15 to the automatically generated classifiers ([#961](https://github.com/python-poetry/poetry-core/pull/961)).
- Fix an issue where a `<V` version constraint wrongly allowed pre-releases of `V` in some cases ([#939](https://github.com/python-poetry/poetry-core/pull/939)).
- Fix an issue where version ranges with coincident bounds were not recognized as empty ([#939](https://github.com/python-poetry/poetry-core/pull/939)).
- Fix an issue where the string representation of a version union did not describe the same constraint after being parsed again ([#939](https://github.com/python-poetry/poetry-core/pull/939)).
- Fix an issue where the intersection of a version range with a local version resulted in a wrong constraint ([#949](https://github.com/python-poetry/poetry-core/pull/949)).
- Fix an issue where the union of a version range and a public version did not include all local versions of the public version ([#950](https://github.com/python-poetry/poetry-core/pull/950)).
- Fix an issue where the union of a public version and one of its local versions did not result in the public version ([#966](https://github.com/python-poetry/poetry-core/pull/966)).
- Fix an issue where the difference between a public version and one of its local versions still allowed the local version, which could result in an infinite loop during dependency resolution ([#953](https://github.com/python-poetry/poetry-core/pull/953)).
- Fix an issue where a version range that excluded some local versions of a public version was wrongly considered to allow all versions of the public version ([#959](https://github.com/python-poetry/poetry-core/pull/959)).
- Fix an issue where a `!= <value>` constraint was wrongly considered to allow all values of a `<value> not in` constraint ([#955](https://github.com/python-poetry/poetry-core/pull/955)).
- Fix an issue where merging `platform_release` markers with incompatible constraint types failed ([#956](https://github.com/python-poetry/poetry-core/pull/956)).
- Fix an issue where the string representation of a version range whose upper bound only consists of zeros raised an `IndexError` ([#964](https://github.com/python-poetry/poetry-core/pull/964)).
- Fix an issue where formatting a Python constraint that only allows unknown Python versions raised an `IndexError` ([#971](https://github.com/python-poetry/poetry-core/pull/971)).
- Fix an issue where marker values containing spaces could not be parsed ([#972](https://github.com/python-poetry/poetry-core/pull/972)).
- Fix an issue where the upper bound of a `~=` constraint was wrong for versions with more than three release segments ([#973](https://github.com/python-poetry/poetry-core/pull/973)).
- Fix an issue where the filename of a link created from a Windows path was wrong and reject filenames containing path separators ([#974](https://github.com/python-poetry/poetry-core/pull/974)).
