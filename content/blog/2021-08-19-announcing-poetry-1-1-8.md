---
layout: single
title: "Announcing Poetry 1.1.8"
date: 2021-08-19 00:00:00
categories: [releases]
tags: ["1.x", "1.1"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.8**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.1.8** is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed an error with repository prioritization when specifying secondary repositories. ([#4241](https://github.com/python-poetry/poetry/pull/4241))
- Fixed the detection of the system environment when the setting `virtualenvs.create` is deactivated. ([#4330](https://github.com/python-poetry/poetry/pull/4330), [#4407](https://github.com/python-poetry/poetry/pull/4407))
- Fixed the evaluation of relative path dependencies. ([#4246](https://github.com/python-poetry/poetry/pull/4246))
- Fixed environment detection for Python 3.10 environments. ([#4387](https://github.com/python-poetry/poetry/pull/4387))
- Fixed an error in the evaluation of `in/not in` markers ([python-poetry/poetry-core#189](https://github.com/python-poetry/poetry-core/pull/189))
