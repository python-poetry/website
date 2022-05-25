---
layout: single
title: "Announcing Poetry 1.0.10"
date: 2020-07-21 10:12:35
categories: [releases]
tags: ["1.x"]

aliases:
  - announcing-poetry-1-0-10.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.10.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.0.10 is as easy as:

```bash
$ poetry self update
```

### Changes

- The lock files are now versioned to ease transitions for lock file format changes, with warnings being displayed on incompatibility detection ([#2695](https://github.com/python-poetry/poetry/pull/2695)).
- The `init` and `new` commands will now provide hints on invalid given licenses ([#1634](https://github.com/python-poetry/poetry/pull/1634)).

### Fixes

- Fixed error messages when the authors specified in the `pyproject.toml` file are invalid ([#2525](https://github.com/python-poetry/poetry/pull/2525)).
- Fixed empty `.venv` directories being deleted ([#2064](https://github.com/python-poetry/poetry/pull/2064)).
- Fixed the `shell` command for `tcsh` shells ([#2583](https://github.com/python-poetry/poetry/pull/2583)).
- Fixed errors when installing directory or file dependencies in some cases ([#2582](https://github.com/python-poetry/poetry/pull/2582)).
