---
layout: single
title: "Announcing Poetry 2.0.0"
date: 2024-12-07
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
or have a look into the [documentation](https://python-poetry.org/docs/main/pyproject/)
to check if a field is deprecated.

Please note that `tool.poetry.dependencies` is not deprecated because it supports features
that are not supported by `project.dependencies`. Therefore, you have several options,
which are explained in detail in
[`project.dependencies` and `tool.poetry.dependencies`](https://python-poetry.org/docs/main/dependency-specification/#projectdependencies-and-toolpoetrydependencies):

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
[project plugins](https://python-poetry.org/docs/main/plugins/#project-plugins)
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
[Using plugin](https://python-poetry.org/docs/main/plugins/#using-plugins)
for how to install plugins or even define that a plugin is required for your project.

Although not announced before, we seized the chance of a major release to remove the
`poetry shell` command . Due to several issues with `poetry shell`, we recommend
to use the new `poetry env activate` command instead. This command does only print
the command to activate the virtual environment. See
[Activating the environment](https://python-poetry.org/docs/main/managing-environments/#activating-the-environment)
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

```
poetry config --migrate
```

See [Migrate outdated configs](https://python-poetry.org/docs/main/configuration/#migrate-outdated-configs)
for details.

## Changelog

TODO
