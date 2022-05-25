---
layout: single
title: "Announcing Poetry 1.0.9"
date: 2020-06-09 10:12:35
categories: [releases]
tags: ["1.x"]

aliases:
  - announcing-poetry-1-0-9.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.9.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.0.9 is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed an issue where packages from custom indices where continuously updated ([#2525](https://github.com/python-poetry/poetry/pull/2525)).
- Fixed errors in the way Python environment markers were parsed and generated ([#2526](https://github.com/python-poetry/poetry/pull/2526)).
