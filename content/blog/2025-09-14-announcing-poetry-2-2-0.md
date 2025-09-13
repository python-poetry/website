---
layout: single
title: "Announcing Poetry 2.2.0"
date: 2025-09-14
categories: [releases]
tags: ["2.x", "2.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **2.2.0**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **2.2.0** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation), you can run:

```bash
$ poetry self update
```

## Highlights

### Normalizing dependency group names and nesting dependency groups

By nesting dependency groups, you can include dependencies from one group in another group.
This is useful when you want to aggregate dependencies from multiple groups into a single group, e.g.:

```toml
[tool.poetry.group.test.dependencies]
pytest = "^8.0.0"

[tool.poetry.group.lint.dependencies]
ruff = "^0.11"

[tool.poetry.group.dev]
include-groups = [
    "test",
    "lint",
]

[tool.poetry.group.dev.dependencies]
tox = "*"
```

In this example, the `dev` group includes all dependencies from the `test` and `lint` groups.

In order to support nesting groups, Poetry will normalize group names.
This has the side effect that it is no more possible to define two groups with names
that will result in the same normalized name, e.g. `Test` and `test`.

### Add support for PEP 735 dependency groups

Instead of using Poetry's custom syntax for defining dependency groups, you can now also use
[PEP 735](https://peps.python.org/pep-0735/) syntax.

For example, instead of

```toml
[tool.poetry.group.test.dependencies]
pytest = "^6.0.0"
pytest-mock = "*"
```

you can now also write

```toml
[dependency-groups]
test = [
    "pytest (>=6.0.0,<7.0.0)",
    "pytest-mock",
]
```

You can also nest dependency groups via `include-group`:

```toml
[dependency-groups]
test = [
    "pytest (>=8.0.0,<9.0.0)",
]
lint = [
    "ruff (>=0.11.0,<0.12.0)",
]
dev = [
    { include-group = "test" },
    { include-group = "lint" },
    "tox",
]
```

{{% note %}}
As with `project.dependencies` and `tool.poetry.dependencies`, you can also
add additional information about a dependency of a group in the Poetry specific section
even when using PEP 735 syntax. However, be aware that you cannot add additional
dependencies in the Poetry specific section when using PEP 735 syntax;
you can only add additional information to dependencies.
{{% /note %}}

### Add support for PEP 639 license clarity

With [PEP 639](https://peps.python.org/pep-0639/), table values for the `project.license`
as well as license classifiers are deprecated.
`project.license` should be a string representing a valid
[SPDX expression](https://packaging.python.org/en/latest/glossary/#term-License-Expression).
License files can be specified in the `project.license-files` table.

Example:

```toml
[project]
# ...
license = "MIT"
license-files = [
    "*-LICENSE",
    "CONTRIBUTORS",
    "MY-SPECIAL-LICENSE-DIR/**/*"
]
```

Further, license files are no longer placed at the top level of the `dist-info` directory.
Instead, they will be located in a `licenses` subdirectory.

{{% note %}}
If you do not specify license files explicitly,
Poetry will include common license file names by default as before.
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

- **Add support for nesting dependency groups** ([#10166](https://github.com/python-poetry/poetry/pull/10166)).
- **Add support for PEP 735 dependency groups** ([#10130](https://github.com/python-poetry/poetry/pull/10130)).
- **Add support for PEP 639 license clarity** ([#10413](https://github.com/python-poetry/poetry/pull/10413)).
- Add a `--format` option to `poetry show` to alternatively output json format ([#10487](https://github.com/python-poetry/poetry/pull/10487)).
- Add official support for Python 3.14 ([#10514](https://github.com/python-poetry/poetry/pull/10514)).

### Changed

- **Normalize dependency group names** ([#10387](https://github.com/python-poetry/poetry/pull/10387)).
- Change `installer.no-binary` and `installer.only-binary` so that explicit package names will take precedence over `:all:` ([#10278](https://github.com/python-poetry/poetry/pull/10278)).
- Improve log output during `poetry install` when a wheel is built from source ([#10404](https://github.com/python-poetry/poetry/pull/10404)).
- Improve error message in case a file lock could not be acquired while cloning a git repository ([#10535](https://github.com/python-poetry/poetry/pull/10535)).
- Require `dulwich>=0.24.0` ([#10492](https://github.com/python-poetry/poetry/pull/10492)).
- Allow `virtualenv>=20.33` again ([#10506](https://github.com/python-poetry/poetry/pull/10506)).
- Allow `findpython>=0.7` ([#10510](https://github.com/python-poetry/poetry/pull/10510)).
- Allow `importlib-metadata>=8.7` ([#10511](https://github.com/python-poetry/poetry/pull/10511)).

### Fixed

- Fix an issue where `poetry new` did not create the project structure in an existing empty directory ([#10431](https://github.com/python-poetry/poetry/pull/10431)).
- Fix an issue where a dependency that was required for a specific Python version was not installed into an environment of a pre-release Python version ([#10516](https://github.com/python-poetry/poetry/pull/10516)).

### poetry-core ([`2.2.0`](https://github.com/python-poetry/poetry-core/releases/tag/2.2.0))

- Deprecate table values and values that are not valid SPDX expressions for `[project.license]` ([#870](https://github.com/python-poetry/poetry-core/pull/870)).
- Fix an issue where explicitly included files that are in `.gitignore` were not included in the distribution ([#874](https://github.com/python-poetry/poetry-core/pull/874)).
- Fix an issue where marker operations could result in invalid markers ([#875](https://github.com/python-poetry/poetry-core/pull/875)).
