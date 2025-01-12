---
layout: single
title: "Announcing Poetry 2.0.1"
date: 2025-01-11
categories: [releases]
tags: ["2.x", "2.0"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **2.0.1**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **2.0.1** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation) and are using Poetry < 2.0.0, you can run:

```bash
$ poetry self update
```

In case you are using Poetry 2.0.0, it is necessary to rerun the installer to get the latest version,
because the `poetry self update` command is broken in 2.0.0.:

**Linux, macOS, Windows (WSL)**

```bash
$ curl -sSL https://install.python-poetry.org | python3 -
```

**Windows (Powershell)**

```powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

## Changelog

### Added

- Add support for `poetry search` in legacy sources ([#9949](https://github.com/python-poetry/poetry/pull/9949)).
- Add a message in the `poetry source show` output when PyPI is implicitly enabled ([#9974](https://github.com/python-poetry/poetry/pull/9974)).

### Changed

- Improve performance for merging markers from overrides at the end of dependency resolution ([#10018](https://github.com/python-poetry/poetry/pull/10018)).

### Fixed

- Fix an issue where `poetry sync` did not remove packages that were not requested ([#9946](https://github.com/python-poetry/poetry/pull/9946)).
- Fix an issue where `poetry check` failed even though there were just warnings and add a `--strict` option to fail on warnings ([#9983](https://github.com/python-poetry/poetry/pull/9983)).
- Fix an issue where `poetry update`, `poetry add` and `poetry remove` with `--only` uninstalled packages from other groups ([#10014](https://github.com/python-poetry/poetry/pull/10014)).
- Fix an issue where `poetry update`, `poetry add` and `poetry remove` uninstalled all extra packages ([#10016](https://github.com/python-poetry/poetry/pull/10016)).
- Fix an issue where `poetry self update` did not recognize Poetry's own environment ([#9995](https://github.com/python-poetry/poetry/pull/9995)).
- Fix an issue where read-only system site-packages were not considered when loading an environment with system site-packages ([#9942](https://github.com/python-poetry/poetry/pull/9942)).
- Fix an issue where an error message in `poetry install` started with `Warning:` instead of `Error:` ([#9945](https://github.com/python-poetry/poetry/pull/9945)).
- Fix an issue where `Command.set_poetry`, which is used by plugins, was removed ([#9981](https://github.com/python-poetry/poetry/pull/9981)).
- Fix an issue where the help text of `poetry build --clean` showed a malformed short option instead of the description ([#9994](https://github.com/python-poetry/poetry/pull/9994)).

### Docs

- Add a FAQ entry for the migration from Poetry-specific fields to the `project` section ([#9996](https://github.com/python-poetry/poetry/pull/9996)).
- Fix examples for `project.readme` and `project.urls` ([#9948](https://github.com/python-poetry/poetry/pull/9948)).
- Add a warning that package sources are a Poetry-specific feature that is not included in core metadata ([#9935](https://github.com/python-poetry/poetry/pull/9935)).
- Replace `poetry install --sync` with `poetry sync` in the section about synchronizing dependencies ([#9944](https://github.com/python-poetry/poetry/pull/9944)).
- Replace `poetry shell` with `poetry env activate` in the basic usage section ([#9963](https://github.com/python-poetry/poetry/pull/9963)).
- Mention that `project.name` is always required when the `project` section is used ([#9989](https://github.com/python-poetry/poetry/pull/9989)).
- Fix the constraint of `poetry-plugin-export` in the section about `poetry export` ([#9954](https://github.com/python-poetry/poetry/pull/9954)).

### poetry-core ([`2.0.1`](https://github.com/python-poetry/poetry-core/releases/tag/2.0.1))

- Replace the deprecated core metadata field `Home-page` with `Project-URL: Homepage` ([#807](https://github.com/python-poetry/poetry-core/pull/807)).
- Fix an issue where includes from `tool.poetry.packages` without a specified `format` were not initialized with the default value resulting in a `KeyError` ([#805](https://github.com/python-poetry/poetry-core/pull/805)).
- Fix an issue where some `project.urls` entries were not processed correctly resulting in a `KeyError` ([#807](https://github.com/python-poetry/poetry-core/pull/807)).
- Fix an issue where dynamic `project.dependencies` via `tool.poetry.dependencies` were ignored if `project.optional-dependencies` were defined ([#811](https://github.com/python-poetry/poetry-core/pull/811)).
