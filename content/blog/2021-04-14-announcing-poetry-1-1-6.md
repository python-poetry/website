---
type: post
layout: single
title:  "Announcing Poetry 1.1.6"
date: 2021-04-14 00:00:00
categories: [releases]
tags: ['1.x', '1.1']

aliases:
  - announcing-poetry-1-1-5.html
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.6**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.6** is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed export format for path dependencies. ([#3121](https://github.com/python-poetry/poetry/pull/3121))
- Fixed errors caused by environment modification when executing some commands. ([#3253](https://github.com/python-poetry/poetry/pull/3253))
- Fixed handling of wheel files with single-digit versions. ([#3338](https://github.com/python-poetry/poetry/pull/3338))
- Fixed an error when handling single-digit Python markers. ([poetry-core#156](https://github.com/python-poetry/poetry-core/pull/156))
- Fixed dependency markers not being properly copied when changing the constraint leading to resolution errors. ([poetry-core#163](https://github.com/python-poetry/poetry-core/pull/163))
- Fixed an error where VCS dependencies were always updated. ([#3947](https://github.com/python-poetry/poetry/pull/3947))
- Fixed an error where the incorrect version of a package was locked when using environment markers. ([#3945](https://github.com/python-poetry/poetry/pull/3945))
