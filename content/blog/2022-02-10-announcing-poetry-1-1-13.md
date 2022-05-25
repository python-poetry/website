---
layout: single
title: "Announcing Poetry 1.1.13"
date: 2022-02-10 00:00:00
categories: [releases]
tags: ["1.x", "1.1"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.1.13**.

<!--more-->

This release is a bugfix release.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
it's necessary to reinstall Poetry via the installer to get the latest version due to a bug in the `poetry self update` command.

### Fixed

- Fixed an issue where envs in MSYS2 always reported as broken ([#4942](9https://github.com/python-poetry/poetry/pull/4942))
- Fixed an issue where conda envs in windows are always reported as broken([#5008](https://github.com/python-poetry/poetry/pull/5008))
- Fixed an issue where Poetry doesn't find its own venv on `poetry self update` ([#5048](https://github.com/python-poetry/poetry/pull/5048))
