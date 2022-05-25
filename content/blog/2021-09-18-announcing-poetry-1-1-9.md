---
layout: single
title: "Announcing Poetry 1.1.9"
date: 2021-09-18 00:00:00
categories: [releases]
tags: ["1.x", "1.1"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.9**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.9** is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed a security issue where file hashes were not checked prior to installation. ([#4420](https://github.com/python-poetry/poetry/pull/4420), [#4444](https://github.com/python-poetry/poetry/pull/4444), [python-poetry/poetry-core#193](https://github.com/python-poetry/poetry-core/pull/193))
- Fixed the detection of the system environment when the setting `virtualenvs.create` is deactivated. ([#4507](https://github.com/python-poetry/poetry/pull/4507))
- Fixed an issue where unsafe parameters could be passed to `git` commands. ([python-poetry/poetry-core#203](https://github.com/python-poetry/poetry-core/pull/203))
- Fixed an issue where the wrong `git` executable could be used on Windows. ([python-poetry/poetry-core#205](https://github.com/python-poetry/poetry-core/pull/205))
