---
layout: single
title: "Announcing Poetry 2.0.0"
date: 2025-01-05
categories: [releases]
tags: ["2.x", "2.0"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **2.0.0**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **2.0.0** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation), you can run:

```bash
$ poetry self update
```

## Highlights

### Supporting the `project` section in pyproject.toml (PEP 621)

Poetry 2.0 respects the `project` section in the `pyproject.toml` as originally
specified in [PEP 621](https://peps.python.org/pep-0621/) and now defined in the
[pyproject.toml specification](https://packaging.python.org/en/latest/specifications/pyproject-toml/#pyproject-toml-spec).
You can replace many fields in the `tool.poetry` section with their counterparts in the `project` section:

```toml
[project]
name = "poetry-demo"
version = "0.1.0"
description = ""
authors = [
    {name = "Sébastien Eustace", email = "sebastien@eustace.io"}
]
readme = "README.md"
requires-python = ">=3.8"

[tool.poetry]
packages = [{include = "poetry_demo"}]

[build-system]
requires = ["poetry-core>=2.0"]
build-backend = "poetry.core.masonry.api"
```

Moreover, many fields in the `tool.poetry` section are deprecated in favor
of their counterparts in the `project` section. Run

```bash
poetry check
```

to see a list of deprecated fields in your `pyproject.toml` and their replacements
or have a look into the [documentation](/docs/pyproject/)
to check if a field is deprecated.

Please note that `tool.poetry.dependencies` is not deprecated because it supports features
that are not supported by `project.dependencies`. Therefore, you have several options,
which are explained in detail in
[`project.dependencies` and `tool.poetry.dependencies`](/docs/dependency-specification/#projectdependencies-and-toolpoetrydependencies):

- If you only need standard features, we recommend to replace `tool.poetry.dependencies` with `project.dependencies`.
- If you need Poetry specific features, you can still use `project.dependencies`
  and add additional information in `tool.poetry.dependencies`.
- If you are heavily using Poetry specific features, you can declare `project.dependencies` as `dynamic`
  and solely use `tool.poetry.dependencies`.

### Project plugins and forcing a minimum Poetry version

You can now specify that your project depends on certain plugins:

```toml
[tool.poetry.requires-plugins]
my-application-plugin = ">1.0"
```

If you run `poetry install` and the plugin is not installed,
Poetry will install it only for your project. See
[project plugins](/docs/plugins/#project-plugins)
for details.

Further, you can specify that your project requires a minimum version of Poetry.
For example, if you are using the `project` section, you can specify:

```toml
[tool.poetry]
requires-poetry = ">=2.0"
```

### Locking resulting markers and groups

This change is more under the hood but might be useful for debugging or auditing purposes
and enables future improvements. Poetry now includes the resulting groups and markers
for each package in the lock file, e.g.:

```toml
groups = ["main", "dev"]
markers = 'sys_platform == "win32"'
```

for a package that is required in the `main` and `dev` group but only on Windows.

Currently, this information is not used by default but you can configure Poetry to
use this information during installation:

```bash
poetry config installer.re-resolve false
```

Per default, when installing packages from a lock file, Poetry re-resolves the dependencies
with the packages from the lock file being the only source for packages. If you
deactivate this behavior (and the lock file has been created with Poetry 2.0),
it will not re-resolve but just evaluate the locked groups and markers to decide
if a package should be installed.

Setting `installer.re-resolve` to `false` might result in faster installations,
especially if your dependency tree is more deep than broad.

## Breaking changes and removals

In the following, we only explain the most important breaking changes and removals.
Many deprecated features have been removed in this major release.
For a full list of changes and removals, see the changelog.

### `poetry export` and `poetry shell` only available via plugins

Since Poetry 1.2, `poetry export` is not a core feature of Poetry but
is provided by `poetry-plugin-export`. However, previously `poetry-plugin-export`
had been a dependency of Poetry itself and thus was installed per default.
As announced in the last two minor releases, `poetry-plugin-export` is not included
anymore in the default Poetry installation. See
[Using plugin](/docs/plugins/#using-plugins)
for how to install plugins or even define that a plugin is required for your project.

Although not announced before, we seized the chance of a major release to remove the
`poetry shell` command . Due to several issues with `poetry shell`, we recommend
to use the new `poetry env activate` command instead. This command does only print
the command to activate the virtual environment. See
[Activating the environment](/docs/managing-environments/#activating-the-environment)
for examples how to activate the environment in different shells. If you still want to
use `poetry shell`, you can install the `poetry-plugin-shell` plugin.

### `poetry lock` defaults to `--no-update`

`poetry lock` now defaults to `--no-update` to prevent accidental updates of the lock file.
If you want to regenerate the lock file from scratch (old default behavior),
you can use `poetry lock --regenerate`.

### `poetry add --optional` requires an extra

In order to support the `project` section the interface of `poetry add --optional`
had to be changed so that you cannot add optional dependencies without specifying
an extra anymore.

### `--directory`/`-C` actually switches the directory

The `--directory`/`-C` option now actually switches the directory instead of just setting
the directory as project root. The old behavior is now available via `--project`/`-P`.

### Consistent `include` behavior

When using `tool.poetry.include` without specifying the format, Poetry now defaults
to "only sdist". Previously, it defaulted to "only sdist" for directories and to
"sdist and wheel" for files. We recommend to be explicit and specify the formats
instead of relying on the default.

### Changed config settings

Some config settings have been changed.
`experimental.system-git-client` has been renamed to `system-git-client`.
`virtualenvs.prefer-active-python` (default: `false`) has been replaced
with the inverse setting `virtualenvs.use-poetry-python` (default: `false`)
effectively changing the default.

You can migrate your outdated configs by running the `config` command
with the new `--migrate` option:

```bash
poetry config --migrate
```

See [Migrate outdated configs](/docs/configuration/#migrate-outdated-configs)
for details.

## Changelog

### Added

- **Add support for the `project` section in the `pyproject.toml` file according to PEP 621** ([#9135](https://github.com/python-poetry/poetry/pull/9135),
  [#9917](https://github.com/python-poetry/poetry/pull/9917)).
- **Add support for defining Poetry plugins that are required by the project and automatically installed if not present** ([#9547](https://github.com/python-poetry/poetry/pull/9547)).
- **Lock resulting markers and groups and add a `installer.re-resolve` option (default: `true`) to allow installation without re-resolving** ([#9427](https://github.com/python-poetry/poetry/pull/9427)).
- Add a `--local-version` option to `poetry build` ([#9064](https://github.com/python-poetry/poetry/pull/9064)).
- Add a `--clean` option to `poetry build` ([#9067](https://github.com/python-poetry/poetry/pull/9067)).
- Add FIPS support for `poetry publish` ([#9101](https://github.com/python-poetry/poetry/pull/9101)).
- Add the option to use `poetry new` interactively and configure more fields ([#9101](https://github.com/python-poetry/poetry/pull/9101)).
- Add a config option `installer.only-binary` to enforce the use of binary distribution formats ([#9150](https://github.com/python-poetry/poetry/pull/9150)).
- Add support for `poetry search` in legacy sources ([#9132](https://github.com/python-poetry/poetry/pull/9132)).
- Add support to resume downloads from connection resets ([#9422](https://github.com/python-poetry/poetry/pull/9422)).
- Add the option to define a constraint for the required Poetry version to manage the project ([#9547](https://github.com/python-poetry/poetry/pull/9547)).
- Add an `--all-groups` option to `poetry install` ([#9744](https://github.com/python-poetry/poetry/pull/9744)).
- Add an `poetry env activate` command as replacement of `poetry shell` ([#9763](https://github.com/python-poetry/poetry/pull/9763)).
- Add a `--markers` option to `poetry add` to add a dependency with markers ([#9814](https://github.com/python-poetry/poetry/pull/9814)).
- Add a `--migrate` option to `poetry config` to migrate outdated configs ([#9830](https://github.com/python-poetry/poetry/pull/9830)).
- Add a `--project` option to search the `pyproject.toml` file in another directory without switching the directory ([#9831](https://github.com/python-poetry/poetry/pull/9831)).
- Add support for shortened hashes to define git dependencies ([#9748](https://github.com/python-poetry/poetry/pull/9748)).
- Add partial support for conflicting extras ([#9553](https://github.com/python-poetry/poetry/pull/9553)).
- Add a `poetry sync` command as replacement of `poetry install --sync` ([#9801](https://github.com/python-poetry/poetry/pull/9801)).

### Changed

- **Change the default behavior of `poetry lock` to `--no-update` and introduce a `--regenerate` option for the old default behavior** ([#9327](https://github.com/python-poetry/poetry/pull/9327)).
- **Remove the dependency on `poetry-plugin-export` so that `poetry export` is not included per default** ([#5980](https://github.com/python-poetry/poetry/pull/5980)).
- **Outsource `poetry shell` into `poetry-plugin-shell`** ([#9763](https://github.com/python-poetry/poetry/pull/9763)).
- **Change the interface of `poetry add --optional` to require an extra the optional dependency is added to** ([#9135](https://github.com/python-poetry/poetry/pull/9135)).
- **Actually switch the directory when using `--directory`/`-C`** ([#9831](https://github.com/python-poetry/poetry/pull/9831)).
- **Drop support for Python 3.8** ([#9692](https://github.com/python-poetry/poetry/pull/9692)).
- Rename `experimental.system-git-client` to `experimental.system-git` ([#9787](https://github.com/python-poetry/poetry/pull/9787), [#9795](https://github.com/python-poetry/poetry/pull/9795)).
- Replace `virtualenvs.prefer-active-python` by the inverse setting `virtualenvs.use-poetry-python` and prefer the active Python by default ([#9786](https://github.com/python-poetry/poetry/pull/9786)).
- Deprecate several fields in the `tool.poetry` section in favor of the respective fields in the `project` section in the `pyproject.toml` file ([#9135](https://github.com/python-poetry/poetry/pull/9135)).
- Deprecate `poetry install --sync` in favor of `poetry sync` ([#9801](https://github.com/python-poetry/poetry/pull/9801)).
- Upgrade the warning if the current project cannot be installed to an error ([#9333](https://github.com/python-poetry/poetry/pull/9333)).
- Remove special handling for `platformdirs 2.0` macOS config directory ([#8916](https://github.com/python-poetry/poetry/pull/8916)).
- Tweak PEP 517 builds ([#9094](https://github.com/python-poetry/poetry/pull/9094)).
- Use Poetry instead of pip to manage dependencies in isolated build environments ([#9168](https://github.com/python-poetry/poetry/pull/9168),
  [#9227](https://github.com/python-poetry/poetry/pull/9227)).
- Trust empty `Requires-Dist` with modern metadata ([#9078](https://github.com/python-poetry/poetry/pull/9078)).
- Do PEP 517 builds instead of parsing `setup.py` to determine dependencies ([#9099](https://github.com/python-poetry/poetry/pull/9099)).
- Drop support for reading lock files prior version 1.0 (created with Poetry prior 1.1) ([#9345](https://github.com/python-poetry/poetry/pull/9345)).
- Default to `>=` instead of `^` for the Python requirement when initializing a new project ([#9558](https://github.com/python-poetry/poetry/pull/9558)).
- Limit `build-system` to the current major version of `poetry-core` when initializing a new project ([#9812](https://github.com/python-poetry/poetry/pull/9812)).
- Remove pip-based installation, i.e. `installer.modern-installation = false` ([#9392](https://github.com/python-poetry/poetry/pull/9392)).
- Remove `virtualenvs.options.no-setuptools` config option and never include `setuptools` per default ([#9331](https://github.com/python-poetry/poetry/pull/9331)).
- Rename exceptions to have an `Error` suffix ([#9705](https://github.com/python-poetry/poetry/pull/9705)).
- Remove deprecated CLI options and methods and revoke the deprecation of `--dev` ([#9732](https://github.com/python-poetry/poetry/pull/9732)).
- Ignore installed packages during dependency resolution ([#9851](https://github.com/python-poetry/poetry/pull/9851)).
- Improve the error message on upload failure ([#9701](https://github.com/python-poetry/poetry/pull/9701)).
- Improve the error message if the current project cannot be installed to include another root cause ([#9651](https://github.com/python-poetry/poetry/pull/9651)).
- Improve the output of `poetry show <package>` ([#9750](https://github.com/python-poetry/poetry/pull/9750)).
- Improve the error message for build errors ([#9870](https://github.com/python-poetry/poetry/pull/9870)).
- Improve the error message when trying to remove a package from a project without any dependencies ([#9918](https://github.com/python-poetry/poetry/pull/9918)).
- Drop the direct dependency on `crashtest` ([#9108](https://github.com/python-poetry/poetry/pull/9108)).
- Require `keyring>=23.3.1` ([#9167](https://github.com/python-poetry/poetry/pull/9167)).
- Require `build>=1.2.1` ([#9283](https://github.com/python-poetry/poetry/pull/9283)).
- Require `dulwich>=0.22.6` ([#9748](https://github.com/python-poetry/poetry/pull/9748)).

### Fixed

- Fix an issue where git dependencies with extras could only be cloned if a branch was specified explicitly ([#7028](https://github.com/python-poetry/poetry/pull/7028)).
- Fix an issue where `poetry env remove` failed if `virtualenvs.in-project` was set to `true` ([#9118](https://github.com/python-poetry/poetry/pull/9118)).
- Fix an issue where locking packages with a digit at the end of the name and non-standard sdist names failed ([#9189](https://github.com/python-poetry/poetry/pull/9189)).
- Fix an issue where credentials where not passed when trying to download an URL dependency ([#9202](https://github.com/python-poetry/poetry/pull/9202)).
- Fix an issue where using uncommon group names with `poetry add` resulted in a broken `pyproject.toml` ([#9277](https://github.com/python-poetry/poetry/pull/9277)).
- Fix an issue where an inconsistent entry regarding the patch version of Python was kept in `envs.toml` ([#9286](https://github.com/python-poetry/poetry/pull/9286)).
- Fix an issue where relative paths were not resolved properly when using `poetry build --directory` ([#9433](https://github.com/python-poetry/poetry/pull/9433)).
- Fix an issue where unrequested extras were not uninstalled when running `poetry install` without an existing lock file ([#9345](https://github.com/python-poetry/poetry/pull/9345)).
- Fix an issue where the `poetry-check` pre-commit hook did not trigger if only `poetry.lock` has changed ([#9504](https://github.com/python-poetry/poetry/pull/9504)).
- Fix an issue where files (rather than directories) could not be added as single page source ([#9166](https://github.com/python-poetry/poetry/pull/9166)).
- Fix an issue where invalid constraints were generated when adding a package with a local version specifier ([#9603](https://github.com/python-poetry/poetry/pull/9603)).
- Fix several encoding warnings ([#8893](https://github.com/python-poetry/poetry/pull/8893)).
- Fix an issue where `virtualenvs.prefer-active-python` was not respected ([#9278](https://github.com/python-poetry/poetry/pull/9278)).
- Fix an issue where the line endings of the lock file were changed ([#9468](https://github.com/python-poetry/poetry/pull/9468)).
- Fix an issue where installing multiple dependencies from the same git repository failed sporadically due to a race condition ([#9658](https://github.com/python-poetry/poetry/pull/9658)).
- Fix an issue where installing multiple dependencies from forked monorepos failed sporadically due to a race condition ([#9723](https://github.com/python-poetry/poetry/pull/9723)).
- Fix an issue where an extra package was not installed if it is required by multiple extras ([#9700](https://github.com/python-poetry/poetry/pull/9700)).
- Fix an issue where a `direct_url.json` with vcs URLs not compliant with PEP 610 was written ([#9007](https://github.com/python-poetry/poetry/pull/9007)).
- Fix an issue where other files than wheels were recognized as wheels ([#9770](https://github.com/python-poetry/poetry/pull/9770)).
- Fix an issue where `installer.max-workers` was ignored for the implicit PyPI source ([#9815](https://github.com/python-poetry/poetry/pull/9815)).
- Fix an issue where local settings (from `poetry.toml`) were ignored for the implicit PyPI source ([#9816](https://github.com/python-poetry/poetry/pull/9816)).
- Fix an issue where different `dulwich` versions resulted in different hashes for a git dependency from a tag ([#9849](https://github.com/python-poetry/poetry/pull/9849)).
- Fix an issue where installing a yanked package with no dependencies failed with an `IndexError` ([#9505](https://github.com/python-poetry/poetry/pull/9505)).
- Fix an issue where a package could not be added from a source that required an empty password ([#9850](https://github.com/python-poetry/poetry/pull/9850)).
- Fix an issue where setting `allow-prereleases = false` still allowed pre-releases if no other solution was found ([#9798](https://github.com/python-poetry/poetry/pull/9798)).
- Fix an issue where the wrong environment was used for checking if an installed package is from system site packages ([#9861](https://github.com/python-poetry/poetry/pull/9861)).
- Fix an issue where build errors from builds to retrieve metadata information were hidden ([#9870](https://github.com/python-poetry/poetry/pull/9870)).
- Fix an issue where `poetry check` falsely reported that an invalid source "pypi" is referenced in dependencies ([#9475](https://github.com/python-poetry/poetry/pull/9475)).
- Fix an issue where `poetry install --sync` tried to uninstall system site packages if the virtual environment was created with `virtualenvs.options.system-site-packages = true` ([#9863](https://github.com/python-poetry/poetry/pull/9863)).
- Fix an issue where HTTP streaming requests were not closed properly when not completely consumed ([#9899](https://github.com/python-poetry/poetry/pull/9899)).

### Docs

- Add information about getting test coverage in the contribution guide ([#9726](https://github.com/python-poetry/poetry/pull/9726)).
- Mention `pre-commit-autoupdate` as an alternative to `pre-commit autoupdate` ([#9716](https://github.com/python-poetry/poetry/pull/9716)).
- Improve the explanation of `exclude` and `include` ([#9734](https://github.com/python-poetry/poetry/pull/9734)).
- Add information about compatible release requirements, i.e. `~=` ([#9783](https://github.com/python-poetry/poetry/pull/9783)).
- Add documentation for using a build script to build extension modules ([#9864](https://github.com/python-poetry/poetry/pull/9864)).

### poetry-core ([`2.0.0`](https://github.com/python-poetry/poetry-core/releases/tag/2.0.0))

- Add support for non PEP440 compliant version in the `platform_release` marker ([#722](https://github.com/python-poetry/poetry-core/pull/722)).
- Add support for string comparisons with `in` / `not in` in generic constraints ([#722](https://github.com/python-poetry/poetry-core/pull/722)).
- Add support for script files that are generated by a build script ([#710](https://github.com/python-poetry/poetry-core/pull/710)).
- Add support for `SOURCE_DATE_EPOCH` when building packages ([#766](https://github.com/python-poetry/poetry-core/pull/766),
  [#781](https://github.com/python-poetry/poetry-core/pull/781)).
- Create `METADATA` files with version 2.3 instead of 2.2 ([#707](https://github.com/python-poetry/poetry-core/pull/707)).
- Remove support for `x` in version constraints ([#770](https://github.com/python-poetry/poetry-core/pull/770)).
- Remove support for scripts with extras ([#708](https://github.com/python-poetry/poetry-core/pull/708)).
- Remove deprecated features and interfaces ([#702](https://github.com/python-poetry/poetry-core/pull/702),
  [#769](https://github.com/python-poetry/poetry-core/pull/769)).
- Deprecate `tool.poetry.dev-dependencies` in favor of `tool.poetry.group.dev.dependencies` ([#754](https://github.com/python-poetry/poetry-core/pull/754)).
- Fix an issue where the `platlib` directory of the wrong Python was used ([#726](https://github.com/python-poetry/poetry-core/pull/726)).
- Fix an issue where building a wheel in a nested output directory results in an error ([#762](https://github.com/python-poetry/poetry-core/pull/762)).
- Fix an issue where `+` was not allowed in git URL paths ([#765](https://github.com/python-poetry/poetry-core/pull/765)).
- Fix an issue where the temporary directory was not cleaned up on error ([#775](https://github.com/python-poetry/poetry-core/pull/775)).
- Fix an issue where the regular expression for author names was too restrictive ([#517](https://github.com/python-poetry/poetry-core/pull/517)).
- Fix an issue where basic auth http(s) credentials could not be parsed ([#791](https://github.com/python-poetry/poetry-core/pull/791)).
