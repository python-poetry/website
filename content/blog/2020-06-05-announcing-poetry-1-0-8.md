---
layout: single
title:  "Announcing Poetry 1.0.8"
date:   2020-06-05 12:12:35
categories: [releases]
tags: ['1.x']

aliases:
  - announcing-poetry-1-0-8.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.8.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.0.8 is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed a possible error when installing the root package ([#2505](https://github.com/python-poetry/poetry/pull/2505)).
- Fixed an error where directory and VCS dependencies were not installed ([#2505](https://github.com/python-poetry/poetry/pull/2505).
