---
layout: single
title:  "Announcing Poetry 1.1.2"
date:   2020-10-06 00:00:00
categories: [releases]
tags: ['1.x', '1.1']

aliases:
  - announcing-poetry-1-1-2.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.1.2.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.1.2 is as easy as:

```bash
$ poetry self update
```

### Changes

- Dependency installation of editable packages and all uninstall operations are now performed serially within their corresponding priority groups. ([#3099](https://github.com/python-poetry/poetry/pull/3099))
- Improved package metadata inspection of nested poetry projects within project path dependencies. ([#3105](https://github.com/python-poetry/poetry/pull/3105))

### Fixes

- Fixed export of `requirements.txt` when project dependency contains git dependencies. ([#3100](https://github.com/python-poetry/poetry/pull/3100))
