---
layout: single
title: "Announcing Poetry 2.1.0"
date: 2025-02-01
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

TODO
