---
layout: single
title: "Announcing Poetry 1.1.14"
date: 2022-07-08 00:00:00
categories: [releases]
tags: ["1.x", "1.1"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.14**.

<!--more-->

This release is a bugfix release necessary due to a breaking change on PyPI JSON API.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.14** is as easy as:

```bash
$ poetry self update
```

Afterwards you have to clear the Poetry cache manually to get everything working again:

```bash
$ poetry cache clear --all pypi
```

## Fixed

- Fixed an issue where dependencies hashes could not be retrieved when locking due to a breaking change on PyPI JSON API ([#5973](https://github.com/python-poetry/poetry/pull/5973))
