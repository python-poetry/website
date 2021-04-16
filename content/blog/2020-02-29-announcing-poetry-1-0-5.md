---
layout: single
title:  "Announcing Poetry 1.0.5"
date:   2020-02-29 10:12:35
categories: [releases]
tags: ['1.x']
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.5.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.0.5 is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed an error when building distributions if the `git` executable was not found ([#2105](https://github.com/python-poetry/poetry/pull/2105)).
- Fixed various errors when reading Poetry's TOML files by upgrading [tomlkit](https://github.com/sdispater/tomlkit).
