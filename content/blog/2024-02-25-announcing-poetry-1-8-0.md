---
layout: single
title: "Announcing Poetry 1.8.0"
date: 2024-02-25
categories: [releases]
tags: ["1.x", "1.8"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.8.0**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **1.8.0** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation), you can run:

```bash
$ poetry self update
```

## Highlights

### Better support for non-package projects

Poetry is a tool for packaging and dependency management. Yet, it is perfectly fine
if you want to use Poetry only for dependency management and not for packaging. However,
you had to jump through some hoops to make this work. With Poetry 1.8, you can just
specify that your project is not supposed to be packaged by setting the `package-mode`
to `false`:

```bash
[tool.poetry]
package-mode = false
```

With this setting:

- all the [metadata](/docs/pyproject) that is required for packaging is not mandatory anymore
- Poetry will not try to install the root package (similar to `poetry install --no-root`)
- building and publishing will not be possible

### Fetching metadata faster via PEP 658 support and new `lazy-wheel` feature

When resolving dependencies with a cold cache, most of the time is spent for fetching
metadata. In the past, Poetry had to download wheels to extract metadata (except for
PyPI if metadata was available via its custom JSON API). Poetry 1.8 now supports
[PEP 658](https://peps.python.org/pep-0658/) to fetch metadata without having to
download wheels.

However, most package indices do not support PEP 658 yet. To mitigate this,
Poetry 1.8 introduces a new `lazy-wheel` feature, which is enabled by default. With
this feature, Poetry will extract the metadata from remote wheels via HTTP range requests.
This way, Poetry can fetch metadata by only downloading a small amount of the wheel
instead of the whole file.

{{% note %}}
If the package index does not even provide hashes, Poetry still
has to download the whole file to calculate the hash itself.
{{% /note %}}

Although we tested this feature with various package indices,
there still might be servers that respond to HTTP range requests in an unexpected way.
Therefore, if you experience any issues with this feature,
you can [disable lazy-wheel](docs/master/configuration#solverlazy-wheel).

## Other important Changes

### Deprecating `default` source type

Since Poetry 1.5, a warning is printed that the implicit PyPI source will be disabled
automatically in the future if at least one custom primary source is configured.
With Poetry 1.8, this warning becomes true. As a result, the `default` source type
is not required anymore because a default source is exactly the same as the first primary
source. This is the last deprecation in a series of changes to simplify and improve
Poetry's handling of package sources.

### Upgrading warning about inconsistent lockfile to an error

In the past, Poetry only printed a warning when running `poetry install` and the
`pyproject.toml` file had been changed significantly since `poetry.lock` was last generated.
As a result, `poetry install` might fail or succeed with expected or unexpected results.
This warning has been upgraded to an error to avoid issues that are hard to debug.

## Upcoming Changes

### Removing `poetry-plugin-export` from the default installation

Prior Poetry 1.2, `export` had been a built-in command. With Poetry 1.2, the `export`
command was outsourced into `poetry-plugin-export`. To avoid a breaking change,
we decided to install `poetry-plugin-export` per default. However, this resulted
in a cyclic dependency between `poetry` and `poetry-plugin-export`, which causes
issues for some third-party tools and results in an increased maintenance effort
for the Poetry team.

Therefore, **we are planning to not install `poetry-plugin-export`
per default in a future version of Poetry.**
To ensure that as many users as possible are informed about this upcoming change,
a warning, which can be deactivated, will be shown when running `poetry export`.
In order to make your automation forward-compatible, just install `poetry-plugin-export`
explicitly (even though it is already installed per default for now).

## Changelog

### Added

- **Add a `non-package` mode for use cases where Poetry is only used for dependency management** ([#8650](https://github.com/python-poetry/poetry/pull/8650)).
- **Add support for PEP 658 to fetch metadata without having to download wheels** ([#5509](https://github.com/python-poetry/poetry/pull/5509)).
- **Add a `lazy-wheel` config option (default: `true`) to reduce wheel downloads during dependency resolution** ([#8815](https://github.com/python-poetry/poetry/pull/8815),
  [#8941](https://github.com/python-poetry/poetry/pull/8941)).
- Improve performance of dependency resolution by using shallow copies instead of deep copies ([#8671](https://github.com/python-poetry/poetry/pull/8671)).
- `poetry check` validates that no unknown sources are referenced in dependencies ([#8709](https://github.com/python-poetry/poetry/pull/8709)).
- Add archive validation during installation for further hash algorithms ([#8851](https://github.com/python-poetry/poetry/pull/8851)).
- Add a `to` key in `tool.poetry.packages` to allow custom subpackage names ([#8791](https://github.com/python-poetry/poetry/pull/8791)).
- Add a config option to disable `keyring` ([#8910](https://github.com/python-poetry/poetry/pull/8910)).
- Add a `--sync` option to `poetry update` ([#8931](https://github.com/python-poetry/poetry/pull/8931)).
- Add an `--output` option to `poetry build` ([#8828](https://github.com/python-poetry/poetry/pull/8828)).
- Add a `--dist-dir` option to `poetry publish` ([#8828](https://github.com/python-poetry/poetry/pull/8828)).

### Changed

- **The implicit PyPI source is disabled if at least one primary source is configured** ([#8771](https://github.com/python-poetry/poetry/pull/8771)).
- **Deprecate source priority `default`** ([#8771](https://github.com/python-poetry/poetry/pull/8771)).
- **Upgrade the warning about an inconsistent lockfile to an error** ([#8737](https://github.com/python-poetry/poetry/pull/8737)).
- Deprecate setting `installer.modern-installation` to `false` ([#8988](https://github.com/python-poetry/poetry/pull/8988)).
- Drop support for `pip<19` ([#8894](https://github.com/python-poetry/poetry/pull/8894)).
- Require `requests-toolbelt>=1` ([#8680](https://github.com/python-poetry/poetry/pull/8680)).
- Allow `platformdirs` 4.x ([#8668](https://github.com/python-poetry/poetry/pull/8668)).
- Allow and require `xattr` 1.x on macOS ([#8801](https://github.com/python-poetry/poetry/pull/8801)).
- Improve venv shell activation in `fish` ([#8804](https://github.com/python-poetry/poetry/pull/8804)).
- Rename `system` to `base` in output of `poetry env info` ([#8832](https://github.com/python-poetry/poetry/pull/8832)).
- Use pretty name in output of `poetry version` ([#8849](https://github.com/python-poetry/poetry/pull/8849)).
- Improve error handling for invalid entries in `tool.poetry.scripts` ([#8898](https://github.com/python-poetry/poetry/pull/8898)).
- Improve verbose output for dependencies with extras during dependency resolution ([#8834](https://github.com/python-poetry/poetry/pull/8834)).
- Improve message about an outdated lockfile ([#8962](https://github.com/python-poetry/poetry/pull/8962)).

### Fixed

- Fix an issue where `poetry shell` failed when Python has been installed with MSYS2 ([#8644](https://github.com/python-poetry/poetry/pull/8644)).
- Fix an issue where Poetry commands failed in a terminal with a non-UTF-8 encoding ([#8608](https://github.com/python-poetry/poetry/pull/8608)).
- Fix an issue where a missing project name caused an incomprehensible error message ([#8691](https://github.com/python-poetry/poetry/pull/8691)).
- Fix an issue where Poetry failed to install an `sdist` path dependency ([#8682](https://github.com/python-poetry/poetry/pull/8682)).
- Fix an issue where `poetry install` failed because an unused extra was not available ([#8548](https://github.com/python-poetry/poetry/pull/8548)).
- Fix an issue where `poetry install --sync` did not remove an unrequested extra ([#8621](https://github.com/python-poetry/poetry/pull/8621)).
- Fix an issue where `poetry init` did not allow specific characters in the author field ([#8779](https://github.com/python-poetry/poetry/pull/8779)).
- Fix an issue where Poetry could not download `sdists` from misconfigured servers ([#8701](https://github.com/python-poetry/poetry/pull/8701)).
- Fix an issue where metadata of sdists that call CLI tools of their build requirements could not be determined ([#8827](https://github.com/python-poetry/poetry/pull/8827)).
- Fix an issue where Poetry failed to use the currently activated environment ([#8831](https://github.com/python-poetry/poetry/pull/8831)).
- Fix an issue where `poetry shell` failed in `zsh` if a space was in the venv path ([#7245](https://github.com/python-poetry/poetry/pull/7245)).
- Fix an issue where scripts with extras could not be installed ([#8900](https://github.com/python-poetry/poetry/pull/8900)).
- Fix an issue where explicit sources where not propagated correctly ([#8835](https://github.com/python-poetry/poetry/pull/8835)).
- Fix an issue where debug prints where swallowed when using a build script ([#8760](https://github.com/python-poetry/poetry/pull/8760)).
- Fix an issue where explicit sources of locked dependencies where not propagated correctly ([#8948](https://github.com/python-poetry/poetry/pull/8948)).
- Fix an issue where Poetry's own environment was falsely identified as system environment ([#8970](https://github.com/python-poetry/poetry/pull/8970)).
- Fix an issue where dependencies from a `setup.py` were ignored silently ([#9000](https://github.com/python-poetry/poetry/pull/9000)).
- Fix an issue where environment variables for `virtualenv.options` were ignored ([#9015](https://github.com/python-poetry/poetry/pull/9015)).
- Fix an issue where `virtualenvs.options.no-pip` and `virtualenvs.options.no-setuptools` were not normalized ([#9015](https://github.com/python-poetry/poetry/pull/9015)).

### Docs

- Replace deprecated `--no-dev` with `--without dev` in the FAQ ([#8659](https://github.com/python-poetry/poetry/pull/8659)).
- Recommend `poetry-check` instead of the deprecated `poetry-lock` pre-commit hook ([#8675](https://github.com/python-poetry/poetry/pull/8675)).
- Clarify the names of the environment variables to provide credentials for repositories ([#8782](https://github.com/python-poetry/poetry/pull/8782)).
- Add note how to install several version of Poetry in parallel ([#8814](https://github.com/python-poetry/poetry/pull/8814)).
- Improve description of `poetry show --why` ([#8817](https://github.com/python-poetry/poetry/pull/8817)).
- Improve documentation of `poetry update` ([#8706](https://github.com/python-poetry/poetry/pull/8706)).
- Add a warning about passing variables that may start with a hyphen via command line ([#8850](https://github.com/python-poetry/poetry/pull/8850)).
- Mention that the virtual environment in which Poetry itself is installed should not be activated ([#8833](https://github.com/python-poetry/poetry/pull/8833)).
- Add note about `poetry run` and externally managed environments ([#8748](https://github.com/python-poetry/poetry/pull/8748)).
- Update FAQ entry about `tox` for `tox` 4.x ([#8658](https://github.com/python-poetry/poetry/pull/8658)).
- Fix documentation for default `format` option for `include` and `exclude` value ([#8852](https://github.com/python-poetry/poetry/pull/8852)).
- Add note about `tox` and configured credentials ([#8888](https://github.com/python-poetry/poetry/pull/8888)).
- Add note and link how to install `pipx` ([#8878](https://github.com/python-poetry/poetry/pull/8878)).
- Fix examples for `poetry add` with git dependencies over ssh ([#8911](https://github.com/python-poetry/poetry/pull/8911)).
- Remove reference to deprecated scripts extras feature ([#8903](https://github.com/python-poetry/poetry/pull/8903)).
- Change examples to prefer `--only main` instead of `--without dev` ([#8921](https://github.com/python-poetry/poetry/pull/8921)).
- Mention that the `develop` attribute is a Poetry-specific feature and not propagated to other tools ([#8971](https://github.com/python-poetry/poetry/pull/8971)).
- Fix examples for adding supplemental and secondary sources ([#8953](https://github.com/python-poetry/poetry/pull/8953)).
- Add PyTorch example for explicit sources ([#9006](https://github.com/python-poetry/poetry/pull/9006)).

### poetry-core ([`1.9.0`](https://github.com/python-poetry/poetry-core/releases/tag/1.9.0))

- **Deprecate scripts that depend on extras** ([#690](https://github.com/python-poetry/poetry-core/pull/690)).
- Add support for path dependencies that do not define a build system ([#675](https://github.com/python-poetry/poetry-core/pull/675)).
- Update list of supported licenses ([#659](https://github.com/python-poetry/poetry-core/pull/659),
  [#669](https://github.com/python-poetry/poetry-core/pull/669),
  [#678](https://github.com/python-poetry/poetry-core/pull/678),
  [#694](https://github.com/python-poetry/poetry-core/pull/694)).
- Rework list of files included in build artifacts ([#666](https://github.com/python-poetry/poetry-core/pull/666)).
- Fix an issue where insignificant errors were printed if the working directory is not inside a git repository ([#684](https://github.com/python-poetry/poetry-core/pull/684)).
- Fix an issue where the project's directory was not recognized as git repository on Windows due to an encoding issue ([#685](https://github.com/python-poetry/poetry-core/pull/685)).
