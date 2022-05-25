---
layout: single
title: "Announcing Poetry 1.2.0a2"
date: 2021-08-01 00:00:00
categories: ["releases"]
tags: ["1.x", "1.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.2.0a2**.

<!--more-->

This release mainly adds support for **dependency groups**.

If you have a previous version of Poetry installed via the [official installer]({{< relref "docs/#installation" >}}),
getting Poetry **1.2.0a2** is as easy as:

```bash
$ poetry self update --preview
```

{{% warning %}}
This is a **testing** release so special care should be taken when upgrading since stability is not guaranteed.

If you encounter any issue with the new features, please report it to the [issue tracker](https://github.com/python-poetry/poetry/issues "Poetry's issue tracker").
{{% /warning %}}

For a complete list of changes, you can refer to the [change log](/history).

## Dependency groups

Poetry provides a way to **organize** your dependencies by **groups**. For instance, you might have
dependencies that are only needed to test your project or to build the documentation.

To declare a new dependency group, use a `tool.poetry.group.<group>` section
where `<group>` is the name of your dependency group (for instance, `test`):

```toml
[tool.poetry.group.test]  # This part can be left out

[tool.poetry.group.test.dependencies]
pytest = "^6.0.0"
pytest-mock = "*"
```

{{% note %}}
All dependencies **must be compatible with each other** across groups since they will
be resolved regardless of whether they are required for installation or not (see [Installing group dependencies]({{< relref "#installing-group-dependencies" >}})).

Think of dependency groups as **labels** associated with your dependencies: they don't have any bearings
on whether their dependencies will be resolved and installed **by default**, they are simply a way to organize
the dependencies logically.
{{% /note %}}

The dependencies declared in `tool.poetry.dependencies` are part of an implicit `default` group.

```toml
[tool.poetry.dependencies]  # Default dependency group
httpx = "*"
pendulum = "*"

[tool.poetry.group.test.dependencies]
pytest = "^6.0.0"
pytest-mock = "*"
```

{{% note %}}
**A note about the `dev-dependencies` section**

Any dependency declared in the `dev-dependencies` section will automatically be added to a `dev` group.
So the two following notations are equivalent:

```toml
[tool.poetry.dev-dependencies]
pytest = "^6.0.0"
pytest-mock = "*"
```

```toml
[tool.poetry.group.dev.dependencies]
pytest = "^6.0.0"
pytest-mock = "*"
```

Poetry will slowly transition away from the `dev-dependencies` notation which will soon be deprecated,
so it's advised to migrate your existing development dependencies to the new `group` notation.
{{% /note %}}

### Optional groups

A dependency group can be declared as optional. This makes sense when you have
a group of dependencies that are only required in a particular environment or for
a specific purpose.

```toml
[tool.poetry.group.docs]
optional = true

[tool.poetry.group.docs.dependencies]
mkdocs = "*"
```

Optional groups can be installed in addition to the **default** dependencies by using the `--with`
option of the [`install`]({{< relref "docs/cli#install" >}}) command.

```bash
poetry install --with docs
```

{{% warning %}}
Optional group dependencies will **still** be resolved alongside other dependencies, so
special care should be taken to ensure they are compatible with each other.
{{% /warning %}}

### Adding a dependency to a group

The [`add`]({{< relref "docs/cli#add" >}}) command is the preferred way to add dependencies
to a group. This is done by using the `--group (-G)` option.

```bash
poetry add pytest --group test
```

If the group does not already exist, it will be created automatically.

### Installing group dependencies

**By default**, dependencies across **all groups** will be installed when executing `poetry install`.

You can **exclude** one or more groups with the `--without` option:

```bash
poetry install --without test,docs
```

You can also opt in [optional groups]({{< relref "#optional-groups" >}}) by using the `--with` option:

```bash
poetry install --with docs
```

If you only want to install the **default**, non-grouped, dependencies, you can do so
with the `--default` option:

```bash
poetry install --default
```

Finally, in some case you might want to install **only specific groups** of dependencies
without installing the default dependencies. For that purpose, you can use
the `--only` option.

```bash
poetry install --only docs
```

### Removing dependencies from a group

The [`remove`]({{< relref "docs/cli#remove" >}}) command supports a `--group` option
to remove packages from a specific group:

```bash
poetry remove mkdocs --group docs
```

## Package operations and synchronization improvements

The user experience when working with dependency groups when installing packages
has been improved.

Packages currently installed in the project's environment will no longer be removed
by default.

To ensure that the lock file and the environment are synchronized, you may now
use the new `--sync` option when executing the `install` command.

```bash
poetry install --sync
```

The `--sync` option can be combined with any [dependency groups]({{< relref "#dependency-groups" >}}) related options
to synchronize the environment with specific groups.

```bash
poetry install --without dev --sync
poetry install --with docs --sync
poetry install --only dev
```

{{% note %}}
The `--sync` option replaces the `--remove-untracked` option which is now **deprecated**.
{{% /note %}}
