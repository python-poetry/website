---
layout: single
title: "Announcing Poetry 1.1.3"
date: 2020-10-14 00:00:00
categories: [releases]
tags: ["1.x", "1.1"]

aliases:
  - announcing-poetry-1-1-3.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.1.3.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.1.3 is as easy as:

```bash
$ poetry self update
```

### Changes

- Python version support deprecation warning is now written to `stderr`. ([#3131](https://github.com/python-poetry/poetry/pull/3131))

### Fixes

- Fixed `KeyError` when `PATH` is not defined in environment variables. ([#3159](https://github.com/python-poetry/poetry/pull/3159))
- Fixed error when using `config` command in a directory with an existing `pyproject.toml` without any Poetry configuration. ([#3172](https://github.com/python-poetry/poetry/pull/3172))
- Fixed incorrect inspection of package requirements when same dependency is specified multiple times with unique markers. ([#3147](https://github.com/python-poetry/poetry/pull/3147))
- Fixed `show` command to use already resolved package metadata. ([#3117](https://github.com/python-poetry/poetry/pull/3117))
- Fixed multiple issues with `export` command output when using `requirements.txt` format. ([#3119](https://github.com/python-poetry/poetry/pull/3119))
