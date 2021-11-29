---
layout: single
title:  "Announcing Poetry 1.1.12"
date: 2021-11-27 00:00:00
categories: [releases]
tags: ['1.x', '1.1']
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.12**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.12** is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed broken caches on Windows due to `Path` starting with a slash ([#4549](https://github.com/python-poetry/poetry/pull/4549))
- Fixed `JSONDecodeError` when installing packages by updating `cachecontrol` version ([#4831](https://github.com/python-poetry/poetry/pull/4831))
- Fixed dropped markers in dependency walk ([#4686](https://github.com/python-poetry/poetry/pull/4686))
