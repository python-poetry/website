---
layout: single
title: "Announcing Poetry 2.1.0"
date: 2025-02-15
categories: [releases]
tags: ["2.x", "2.1"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **2.1.0**.

<!--more-->

If you have a previous version of Poetry installed via `pipx`,
getting Poetry **2.1.0** is as easy as:

```bash
$ pipx upgrade poetry
```

If you used the [official installer](/docs/#installation), you can run:

```bash
$ poetry self update
```

## Highlights

### Support for alternative build backends in Poetry

Poetry now supports customizable build backends, allowing greater flexibility based on your project's needs. Previously,
Poetry exclusively used its own build backend, `poetry-core`, when creating packages via the `poetry build` command.
Thanks to [PEP 621](https://peps.python.org/pep-0621/), this limitation is being lifted.

With this change, the `poetry build` command will fully respect the `[build-system]` section defined in your
`pyproject.toml` file. If the specified build backend differs from the version of `poetry-core` bundled with Poetry, the
build will take place in an isolated environment.

#### Defining custom build backends

You can define the build backend in your `pyproject.toml`. For example, to use `maturin` as your build system, specify
it like this:

```toml
[build-system]
requires = ["maturin>=0.8.1,<0.9"]
build-backend = "maturin"
```

When running `poetry build`, Poetry will create an isolated environment with the specified requirements.

#### Passing configuration to build systems

If your chosen build system supports custom configuration settings, these can be passed via the new `--config-settings`
parameter. Use the format `--config-settings <key>=<value>`. You can pass multiple settings by using the parameter
repeatedly.

For example, `poetry-core` allows you to specify a local version identifier during the build:

```bash
poetry build --config-settings local-version=some-local
```

This parameter ensures compatibility with advanced use cases and third-party build backends.

{{% note %}}
You can pass configuration settings when building a dependency from source.
Since such configuration settings are often platform-dependent this is done via a
[config setting](docs/configuration/#installerbuild-config-settingspackage-name).
{{% /note %}}

#### Default behavior when no build system is defined

Per [PEP 517](https://peps.python.org/pep-0517/), a build tool should fall back to `setuptools` if no build system is
defined in the `[build-system]` section of `pyproject.toml`. However, to avoid immediate disruption, Poetry will
currently issue a **warning** in such cases and continue using the built-in `poetry-core` backend by default.

{{% warning %}}
This behavior will change in a future minor release so that Poetry will default to `setuptools`
if no `[build-system]` section is defined.
{{% /warning %}}

### Experimental commands to manage Python installations

Poetry now includes experimental [commands](docs/cli/#python) to manage Python installations.
You can install, list and remove Python versions, which you can use afterward to create project environments.
For example, if you want to use Python 3.13 for your project, but you do not have it installed yet, you can run:

```bash
poetry python install 3.13
poetry env use 3.13
```

{{% note %}}
The `python install` command uses [python-build-standalone](https://gregoryszorc.com/docs/python-build-standalone/main/),
which has some quirks compared to standard Python installations.
See their [documentation](https://gregoryszorc.com/docs/python-build-standalone/main/quirks.html) for more information.
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

- **Make `build` command build-system agnostic** ([#10059](https://github.com/python-poetry/poetry/pull/10059),
  [#10092](https://github.com/python-poetry/poetry/pull/10092)).
- Add a `--config-settings` option to `poetry build` ([#10059](https://github.com/python-poetry/poetry/pull/10059)).
- Add support for defining `config-settings` when building dependencies ([#10129](https://github.com/python-poetry/poetry/pull/10129)).
- **Add (experimental) commands to manage Python installations** ([#10112](https://github.com/python-poetry/poetry/pull/10112)).
- Use `findpython` to find the Python interpreters ([#10097](https://github.com/python-poetry/poetry/pull/10097)).
- Add a `--no-truncate` option to `poetry show` ([#9580](https://github.com/python-poetry/poetry/pull/9580)).
- Re-add support for passwords with empty usernames ([#10088](https://github.com/python-poetry/poetry/pull/10088)).
- Add better error messages ([#10053](https://github.com/python-poetry/poetry/pull/10053),
  [#10065](https://github.com/python-poetry/poetry/pull/10065),
  [#10126](https://github.com/python-poetry/poetry/pull/10126),
  [#10127](https://github.com/python-poetry/poetry/pull/10127),
  [#10132](https://github.com/python-poetry/poetry/pull/10132)).

### Changed

- **`poetry new` defaults to "src" layout by default** ([#10135](https://github.com/python-poetry/poetry/pull/10135)).
- Improve performance of locking dependencies ([#10111](https://github.com/python-poetry/poetry/pull/10111),
  [#10114](https://github.com/python-poetry/poetry/pull/10114),
  [#10138](https://github.com/python-poetry/poetry/pull/10138),
  [#10146](https://github.com/python-poetry/poetry/pull/10146)).
- Deprecate adding sources without specifying `--priority` ([#10134](https://github.com/python-poetry/poetry/pull/10134)).

### Fixed

- Fix an issue where global options were not handled correctly when positioned after command options ([#10021](https://github.com/python-poetry/poetry/pull/10021),
  [#10067](https://github.com/python-poetry/poetry/pull/10067),
  [#10128](https://github.com/python-poetry/poetry/pull/10128)).
- Fix an issue where building a dependency from source failed because of a conflict between build-system dependencies that were not required for the target environment ([#10048](https://github.com/python-poetry/poetry/pull/10048)).
- Fix an issue where `poetry init` was not able to find a package on PyPI while adding dependencies interactively ([#10055](https://github.com/python-poetry/poetry/pull/10055)).
- Fix an issue where the `@latest` descriptor was incorrectly passed to the core requirement parser ([#10069](https://github.com/python-poetry/poetry/pull/10069)).
- Fix an issue where Boolean environment variables set to `True` (in contrast to `true`) were interpreted as `false` ([#10080](https://github.com/python-poetry/poetry/pull/10080)).
- Fix an issue where `poetry env activate` reported a misleading error message ([#10087](https://github.com/python-poetry/poetry/pull/10087)).
- Fix an issue where adding an optional dependency with `poetry add --optional` would not correctly update the lock file ([#10076](https://github.com/python-poetry/poetry/pull/10076)).
- Fix an issue where `pip` was not installed/updated before other dependencies resulting in a race condition ([#10102](https://github.com/python-poetry/poetry/pull/10102)).
- Fix an issue where Poetry freezes when multiple threads attempt to unlock the `keyring` simultaneously ([#10062](https://github.com/python-poetry/poetry/pull/10062)).
- Fix an issue where markers with extras were not locked correctly ([#10119](https://github.com/python-poetry/poetry/pull/10119)).
- Fix an issue where self-referential extras were not resolved correctly ([#10106](https://github.com/python-poetry/poetry/pull/10106)).
- Fix an issue where Poetry could not be run from a `zipapp` ([#10074](https://github.com/python-poetry/poetry/pull/10074)).
- Fix an issue where installation failed with a permission error when using the system environment as a user without write access to system site packages ([#9014](https://github.com/python-poetry/poetry/pull/9014)).
- Fix an issue where a version of a dependency that is not compatible with the project's python constraint was locked. ([#10141](https://github.com/python-poetry/poetry/pull/10141)).
- Fix an issue where Poetry wrongly reported that the current project's supported Python range is not compatible with some of the required packages Python requirement ([#10157](https://github.com/python-poetry/poetry/pull/10157)).
- Fix an issue where the requested extras of a dependency were ignored if the same dependency (with same extras) was specified in multiple groups ([#10158](https://github.com/python-poetry/poetry/pull/10158)).

### Docs

- Sort commands by name in the CLI reference ([#10035](https://github.com/python-poetry/poetry/pull/10035)).
- Add missing documentation for `env` commands ([#10027](https://github.com/python-poetry/poetry/pull/10027)).
- Clarify that the `name` and `version` fields are always required if the `project` section is specified ([#10033](https://github.com/python-poetry/poetry/pull/10033)).
- Add a note about restarting the shell for tab completion changes to take effect ([#10070](https://github.com/python-poetry/poetry/pull/10070)).
- Fix the example for `project.gui-scripts` [#10121](https://github.com/python-poetry/poetry/pull/10121).
- Explain how to include files as scripts in the project configuration ([#9572](https://github.com/python-poetry/poetry/pull/9572),
  [#10133](https://github.com/python-poetry/poetry/pull/10133)).
- Add additional information on specifying required python versions ([#10104](https://github.com/python-poetry/poetry/pull/10104)).

### poetry-core ([`2.1.0`](https://github.com/python-poetry/poetry-core/releases/tag/2.1.0))

- Fix an issue where inclusive ordering with post releases was inconsistent with PEP 440 ([#379](https://github.com/python-poetry/poetry-core/pull/379)).
- Fix an issue where invalid URI tokens in PEP 508 requirement strings were silently discarded ([#817](https://github.com/python-poetry/poetry-core/pull/817)).
- Fix an issue where wrong markers were calculated when removing parts covered by the project's python constraint ([#824](https://github.com/python-poetry/poetry-core/pull/824)).
- Fix an issue where optional dependencies that are not part of an extra were included in the wheel metadata ([#830](https://github.com/python-poetry/poetry-core/pull/830)).
- Fix an issue where the `__pycache__` directory and `*.pyc` files were included in sdists and wheels ([#835](https://github.com/python-poetry/poetry-core/pull/835)).
