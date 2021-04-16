---
layout: single
title:  "Announcing Poetry 1.0.3"
date:   2020-01-31 10:12:35
categories: [releases]
tags: ['1.x']
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.3.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry 1.0.3 is as easy as:

```bash
$ poetry self update
```

### Fixes

- Fixed an error which caused the configuration environment variables (like `POETRY_HTTP_BASIC_XXX_PASSWORD`) to not be used ([#1909](https://github.com/python-poetry/poetry/pull/1909)).
- Fixed an error where the `--help` option was not working ([#1910](https://github.com/python-poetry/poetry/pull/1910)).
- Fixed an error where packages from private indices were not decompressed properly ([#1851](https://github.com/python-poetry/poetry/pull/1851)).
- Fixed an error where the version of some PEP-508-formatted wheel dependencies was not properly retrieved ([#1932](https://github.com/python-poetry/poetry/pull/1932)).
- Fixed internal regexps to avoid potential catastrophic backtracking errors ([#1913](https://github.com/python-poetry/poetry/pull/1913)).
- Fixed performance issues when custom indices were defined in the `pyproject.toml` file ([#1892](https://github.com/python-poetry/poetry/pull/1892)).
- Fixed the `get_requires_for_build_wheel()` function of `masonry.api` which wasn't returning the proper result ([#1875](https://github.com/python-poetry/poetry/pull/1875)).
