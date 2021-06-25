---
layout: single
title:  "Announcing Poetry 1.1.7"
date: 2021-06-25 00:00:00
categories: [releases]
tags: ['1.x', '1.1']
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.7**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.7** is as easy as:

```bash
$ poetry self update
```

{{% note %}}
Lock files might need to be regenerated for the fix related to directory and VCS dependencies (see below)
to take effect. You can do so by using the `poetry lock` command **without** the `--no-update` option.

If your project **does not** have directory or VCS dependencies than you have nothing to do.
{{% /note %}}

### Changes

- This release is compatible with the `install-poetry.py` installation script to ease the migration path from `1.1` releases to `1.2` releases. ([#4192](https://github.com/python-poetry/poetry/pull/4192))

### Fixes

- Fixed an issue where transitive dependencies of directory or VCS dependencies were not installed or otherwise removed. ([#4203](https://github.com/python-poetry/poetry/pull/4203))
- Fixed an issue where the combination of the `--tree` and `--no-dev` options for the show command was still displaying development dependencies. ([#3992](https://github.com/python-poetry/poetry/pull/3992))
