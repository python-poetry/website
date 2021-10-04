---
layout: single
title:  "Announcing Poetry 1.1.11"
date: 2021-10-04 00:00:00
categories: [releases]
tags: ['1.x', '1.1']
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.11**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.11** is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed errors when installing packages on Python 3.10. ([#4592](https://github.com/python-poetry/poetry/pull/4592))
- Fixed an issue where the wrong `git` executable could be used on Windows. ([python-poetry/poetry-core#213](https://github.com/python-poetry/poetry-core/pull/213))
- Fixed an issue where the Python 3.10 classifier was not automatically added. ([python-poetry/poetry-core#215](https://github.com/python-poetry/poetry-core/pull/215))
