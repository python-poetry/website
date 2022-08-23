---
layout: single
title: "Announcing Poetry 1.1.15"
date: 2022-08-22 00:00:00
categories: [releases]
tags: ["1.x", "1.1"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.15**.

<!--more-->

This release contains changes to improve the user experience, when working in an environment where Poetry 1.1 and the
upcoming 1.2 release are used.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.15** is as easy as:

```bash
$ poetry self update
```

## Compatibility between Poetry `1.1` and `1.2`

Once Poetry `1.2.0` final release will be out, several projects will use new features that are only in `1.2` in their
`pyproject.toml`, like dependency groups.

Poetry will now gracefully handle that, so users of Poetry `1.1` will be able to install dependencies that use Poetry
`>= 1.2` as their build system, facilitating the migration for users.
See [this PR](https://github.com/python-poetry/poetry/pull/5834) for details.

## Changed

- Poetry now fallback to gather metadata for dependencies via pep517 if parsing pyproject.toml fail ([#6206](https://github.com/python-poetry/poetry/pull/6206))
- Extras and extras dependencies are now sorted in lock file ([#6207](https://github.com/python-poetry/poetry/pull/6207))
