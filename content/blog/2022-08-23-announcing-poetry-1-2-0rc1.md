---
layout: single
title: "Announcing Poetry 1.2.0rc1"
date: 2022-08-23 00:00:00
categories: ["releases"]
tags: ["1.x", "1.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.2.0rc1**.

<!--more-->

If you have a previous version of Poetry installed via the [official installer]({{< relref "docs/#installation" >}}),
getting Poetry **1.2.0rc1** is as easy as:

```bash
$ poetry self update --preview
```

With this release, Poetry `1.2` branch now enters a bugfixes-only stage, where no new feature will be merged.

Since `1.2.0rc1` mostly represents what the final `1.2.0` version will be, we invite users to test this release and
report issues using the [issue tracker](https://github.com/python-poetry/poetry/issues "Poetry's issue tracker").

Documentation for Poetry `1.2` is available [here](https://python-poetry.org/docs/1.2/). We also invite users to report
any issue found in the documentation, whether it's typos, unclear definitions or missing things.

For a complete list of changes, you can refer to the [change log](/history).

## Removal of some deprecated `1.2`-only CLI options

During the development of Poetry `1.2`, some new commands and arguments for supporting plugins and dependencies groups
were added, then deprecated and replaced. If you were using them on Poetry `1.2` pre-releases, the following
commands/arguments have been removed, with their replacements:

- `poetry plugin [add|remove|show]` -> use `poetry self [add|remove|show]` instead
- `poetry [export|install|show|update] --default` -> use `poetry [export|install|show|update] --with main` instead

## Compatibility between Poetry `1.2` and future releases

When a new minor or major Poetry release occurs, some projects may use new features that are only available in this new
version.

Poetry will now gracefully handle that, so users of older Poetry versions will be able to install dependencies that
depend on newer versions of Poetry as their build system, facilitating the migration for users.
See [this PR](https://github.com/python-poetry/poetry/pull/5834) for details.

## Support for yanked releases (PEP 592)

Poetry now supports yanked releases, as defined by [PEP 592](https://peps.python.org/pep-0592/), for both PyPI
repository and repositories that follow [PEP 503](https://peps.python.org/pep-0503/) specification.

Adding a dependency version that is yanked, or installing a project that depends on yanked releases, will now raise a
warning:

```shell
$ poetry add cryptography==37.0.3

[...]
Warning: The locked version 37.0.3 for cryptography is a yanked version. Reason for being yanked: Regression in OpenSSL.
```

```shell
$ poetry install

[...]
Warning: The file chosen for install of cryptography 37.0.3 (cryptography-37.0.3-cp36-abi3-manylinux_2_24_x86_64.whl) is yanked. Reason for being yanked: Regression in OpenSSL.
```

## Support for subdirectories in git dependencies

It is now possible to define a subdirectory for Poetry to look for when adding a git dependency, which is useful when a
git dependency stores its build definition in a subdirectory in the repository.

To specify a subdirectory to look for, you can use `subdirectory`:

```toml
[tool.poetry.dependencies]
# Install a package named `subdir_package` from a folder called `subdir` within the repository
subdir_package = { git = "https://github.com/myorg/mypackage_with_subdirs.git", subdirectory = "subdir" }
```
