---
layout: single
title: "Announcing Poetry 1.0.4"
date: 2020-02-28 10:12:35
categories: [releases]
tags: ["1.x"]

aliases:
  - announcing-poetry-1-0-4.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.4.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.0.4 is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed the PyPI URL used when installing packages ([#2099](https://github.com/python-poetry/poetry/pull/2099)).
- Fixed errors when the author's name contains special characters ([#2006](https://github.com/python-poetry/poetry/pull/2006)).
- Fixed VCS excluded files detection when building wheels ([#1947](https://github.com/python-poetry/poetry/pull/1947)).
- Fixed packages detection when building sdists ([#1626](https://github.com/python-poetry/poetry/pull/1626)).
- Fixed the local `.venv` virtual environment not being displayed in `env list` ([#1762](https://github.com/python-poetry/poetry/pull/1762)).
- Fixed incompatibilities with the most recent versions of `virtualenv` ([#2096](https://github.com/python-poetry/poetry/pull/2096)).
- Fixed Poetry's own vendor dependencies being retrieved when updating dependencies ([#1981](https://github.com/python-poetry/poetry/pull/1981)).
- Fixed encoding of credentials in URLs ([#1911](https://github.com/python-poetry/poetry/pull/1911)).
- Fixed url constraints not being accepted in multi-constraints dependencies ([#2035](https://github.com/python-poetry/poetry/pull/2035)).
- Fixed an error where credentials specified via environment variables were not retrieved ([#2061](https://github.com/python-poetry/poetry/pull/2061)).
- Fixed an error where git dependencies referencing tags were not locked to the corresponding commit ([#1948](https://github.com/python-poetry/poetry/pull/1948)).
- Fixed an error when parsing packages `setup.py` files ([#2041](https://github.com/python-poetry/poetry/pull/2041)).
- Fixed an error when parsing some git URLs ([#2018](https://github.com/python-poetry/poetry/pull/2018)).
