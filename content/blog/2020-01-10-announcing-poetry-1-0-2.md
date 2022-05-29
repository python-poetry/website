---
layout: single
title: "Announcing Poetry 1.0.2"
date: 2020-01-10 11:12:35
categories: [releases]
tags: ["1.x"]

aliases:
  - announcing-poetry-1-0-2.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.2.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.0.2 is as easy as:

```bash
$ poetry self update
```

### Fixes

- Reverted a previous fix ([#1796](https://github.com/python-poetry/poetry/pull/1796)) which was causing errors for projects with file and/or directory dependencies ([#1865](https://github.com/python-poetry/poetry/pull/1865)).
