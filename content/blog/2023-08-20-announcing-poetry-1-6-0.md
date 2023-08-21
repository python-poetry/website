---
layout: single
title: "Announcing Poetry 1.6.0"
date: 2023-08-20
categories: [releases]
tags: ["1.x", "1.6"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.6.0**.

<!--more-->

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.6.0** is as easy as:

```bash
$ poetry self update
```

## Highlights

### Official Poetry badge

Poetry provides an official badge that can be used to indicate that a project is managed with Poetry.
See the [documentation](/docs/community/#badge) for details.

### Support for repositories that do not provide a supported hash algorithm

Some outdated package indices do only provide insecure MD5 hashes.
Poetry 1.6 supports these repositories by calculating a SHA256 hash for the lockfile by itself.

{{% note %}}
If you care about security, you should still switch to modern package indices that provide secure hashes.
{{% /note %}}

### Full support for duplicate dependencies with overlapping markers

Poetry 1.6 fully supports duplicate dependencies with overlapping markers.
Therefore, it transforms a set of dependencies with overlapping markers into
an equivalent set of dependencies mutually exclusive markers during dependency resolution.
For example,

```toml
my-package = [
    { version = ">=1.0" },
    { version = "<2", markers = "python_version < '3.10'" },
    { version = ">=1.5", markers = "sys_platform == 'win32'" },
]
```

becomes

```toml
my-package = [
    { version = ">=1.0", markers = "python_version >= '3.10' and sys_platform != 'win32'" },
    { version = "<2", markers = "python_version < '3.10' and sys_platform != 'win32'" },
    { version = ">=1.5", markers = "python_version >= '3.10' and sys_platform = 'win32'" },
    { version = ">=1.5,<2", markers = "python_version < '3.10' and sys_platform == 'win32'" },
]
```

so that for each of the resulting markers a valid solution can be found.

If there is a conflict between the constraints of duplicate dependencies with overlapping markers,
a comprehensive error message is displayed.
Previously, overlapping markers could result in incorrect dependency resolutions.

### Improved performance of `poetry lock` for certain edge cases

Especially since the release of urllib3 2.0, Poetry has been affected
by a dramatic performance regression under certain circumstances when boto3 or botocore
were among the dependencies. That's because Poetry's algorithm decided to resolve
dependencies with fewer candidates first to find conflicts faster
(urllib3 has far fewer releases than boto3/botocore). However, all of the many versions
of boto3/botocore are incompatible with `urllib3 >= 2.0`, so the algorithm has
to try all of them before it chooses an older version of urllib3.
Even though resolving dependencies with fewer candidates first will find conflicts
a bit faster in some cases, it tends to be a lot slower in other cases.
Therefore, we inverted the heuristics to resolve dependencies with more candidates first,
which seems to be a bit slower in some cases, but a lot faster in other cases.

## Other important Changes

### Dropping support for Python 3.7 as runtime environment

Poetry 1.6 drops runtime support for Python 3.7.

{{% note %}}
This change is about installing and running Poetry itself.
Managing projects requiring Python 3.7 might still work.
{{% /note %}}

## Changelog

### Added

- **Add support for repositories that do not provide a supported hash algorithm** ([#8118](https://github.com/python-poetry/poetry/pull/8118)).
- **Add full support for duplicate dependencies with overlapping markers** ([#7257](https://github.com/python-poetry/poetry/pull/7257)).
- **Improve performance of `poetry lock` for certain edge cases** ([#8256](https://github.com/python-poetry/poetry/pull/8256)).
- Improve performance of `poetry install` ([#8031](https://github.com/python-poetry/poetry/pull/8031)).
- `poetry check` validates that specified `readme` files do exist ([#7444](https://github.com/python-poetry/poetry/pull/7444)).
- Add a downgrading note when updating to an older version ([#8176](https://github.com/python-poetry/poetry/pull/8176)).
- Add support for `vox` in the `xonsh` shell ([#8203](https://github.com/python-poetry/poetry/pull/8203)).
- Add support for `pre-commit` hooks for projects where the pyproject.toml file is located in a subfolder ([#8204](https://github.com/python-poetry/poetry/pull/8204)).
- Add support for the `git+http://` scheme ([#6619](https://github.com/python-poetry/poetry/pull/6619)).

### Changed

- **Drop support for Python 3.7** ([#7674](https://github.com/python-poetry/poetry/pull/7674)).
- Move `poetry lock --check` to `poetry check --lock` and deprecate the former ([#8015](https://github.com/python-poetry/poetry/pull/8015)).
- Change future warning that PyPI will only be disabled automatically if there are no primary sources ([#8151](https://github.com/python-poetry/poetry/pull/8151)).

### Fixed

- Fix an issue where `build-system.requires` were not respected for projects with build scripts ([#7975](https://github.com/python-poetry/poetry/pull/7975)).
- Fix an issue where the encoding was not handled correctly when calling a subprocess ([#8060](https://github.com/python-poetry/poetry/pull/8060)).
- Fix an issue where `poetry show --top-level` did not show top level dependencies with extras ([#8076](https://github.com/python-poetry/poetry/pull/8076)).
- Fix an issue where `poetry init` handled projects with `src` layout incorrectly ([#8218](https://github.com/python-poetry/poetry/pull/8218)).
- Fix an issue where Poetry wrote `.pth` files with the wrong encoding ([#8041](https://github.com/python-poetry/poetry/pull/8041)).
- Fix an issue where `poetry install` did not respect the source if the same version of a package has been locked from different sources ([#8304](https://github.com/python-poetry/poetry/pull/8304)).

### Docs

- Document **official Poetry badge** ([#8066](https://github.com/python-poetry/poetry/pull/8066)).
- Update configuration folder path for macOS ([#8062](https://github.com/python-poetry/poetry/pull/8062)).
- Add a warning about pip ignoring lock files ([#8117](https://github.com/python-poetry/poetry/pull/8117)).
- Clarify the use of the `virtualenvs.in-project` setting. ([#8126](https://github.com/python-poetry/poetry/pull/8126)).
- Change `pre-commit` YAML style to be consistent with pre-commit's own examples ([#8146](https://github.com/python-poetry/poetry/pull/8146)).
- Fix command for listing installed plugins ([#8200](https://github.com/python-poetry/poetry/pull/8200)).
- Mention the `nox-poetry` package ([#8173](https://github.com/python-poetry/poetry/pull/8173)).
- Add an example with a PyPI source in the pyproject.toml file ([#8171](https://github.com/python-poetry/poetry/pull/8171)).
- Use `reference` instead of deprecated `callable` in the scripts example ([#8211](https://github.com/python-poetry/poetry/pull/8211)).

### poetry-core ([`1.7.0`](https://github.com/python-poetry/poetry-core/releases/tag/1.7.0))

- Improve performance of marker handling ([#609](https://github.com/python-poetry/poetry-core/pull/609)).
- Allow `|` as a value separator in markers with the operators `in` and `not in` ([#608](https://github.com/python-poetry/poetry-core/pull/608)).
- Put pretty name (instead of normalized name) in metadata ([#620](https://github.com/python-poetry/poetry-core/pull/620)).
- Update list of supported licenses ([#623](https://github.com/python-poetry/poetry-core/pull/623)).
- Fix an issue where PEP 508 dependency specifications with names starting with a digit could not be parsed ([#607](https://github.com/python-poetry/poetry-core/pull/607)).
- Fix an issue where Poetry considered an unrelated `.gitignore` file resulting in an empty wheel ([#611](https://github.com/python-poetry/poetry-core/pull/611)).

### poetry-plugin-export ([`^1.5.0`](https://github.com/python-poetry/poetry-plugin-export/releases/tag/1.5.0))

- Fix an issue where markers for dependencies required by an extra were not generated correctly ([#209](https://github.com/python-poetry/poetry-plugin-export/pull/209)).
