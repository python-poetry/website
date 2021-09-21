---
layout: single
title:  "Announcing Poetry 1.1.10"
date: 2021-09-21 00:00:00
categories: [releases]
tags: ['1.x', '1.1']
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.10**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.10** is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed an issue where non-sha256 hashes were not checked. ([#4529](https://github.com/python-poetry/poetry/pull/4529))
