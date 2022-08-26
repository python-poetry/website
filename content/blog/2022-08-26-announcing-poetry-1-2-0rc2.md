---
layout: single
title: "Announcing Poetry 1.2.0rc2"
date: 2022-08-26 00:00:00
categories: ["releases"]
tags: ["1.x", "1.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.2.0rc2**.

<!--more-->

If you have a previous version of Poetry installed via the [official installer]({{< relref "docs/#installation" >}}),
getting Poetry **1.2.0rc2** is as easy as:

```bash
$ poetry self update --preview
```

This release fixes a few issues that were discovered by Poetry users on 1.2.0rc1.

Since 1.2.0rc2 is a near-exact representation of 1.2.0, we invite users to test this release and
report issues using the [issue tracker](https://github.com/python-poetry/poetry/issues "Poetry's issue tracker").

Documentation for Poetry 1.2 is available [here](https://python-poetry.org/docs/1.2/). We also invite users to report
any issue found in the documentation, whether it's typos, unclear definitions or missing things.

For a complete list of changes, you can refer to the [change log](/history).

## Lock file consistency between 1.1 and 1.2

Because of a regression in Poetry 1.2 pre-releases, in some conditions, lock files generated with 1.2 were not usable on
1.1. This is now fixed with [#6243](https://github.com/python-poetry/poetry/pull/6243).

## Avoid creating virtual environment on `poetry self`

Running `poetry self` was creating a virtual environment, which was unnecessary and could lead to issues. This is not
the case anymore with [#6226](https://github.com/python-poetry/poetry/pull/6226).

## Improve consistency of `Pool().remove_repository()`

`Pool().remove_repository()` had some inconsistencies that made it hard to create plugins. This is now fixed
with [#6231](https://github.com/python-poetry/poetry/pull/6231).
