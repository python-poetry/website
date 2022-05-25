---
layout: single
title: "Announcing Poetry 1.2.0b1"
date: 2022-03-17 00:00:00
categories: ["releases"]
tags: ["1.x", "1.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.2.0b1**.

<!--more-->

If you have a previous version of Poetry installed via the [official installer]({{< relref "docs/#installation" >}}),
getting Poetry **1.2.0b1** is as easy as:

```bash
$ poetry self update --preview
```

{{% warning %}}
This is a **testing** release so special care should be taken when upgrading since stability is not guaranteed.

If you encounter any issue with the new features, please report it to the [issue tracker](https://github.com/python-poetry/poetry/issues "Poetry's issue tracker").
{{% /warning %}}

For a complete list of changes, you can refer to the [change log](/history).

## Drop python 3.6 support

Python 3.6 has reached its end of life. So we dropped support for running Poetry with Python 3.6.

However, handling projects that require Python <=3.6 is still possible.

## Detect current activated Python

With the new installer script `install-poetry.py` it was no longer possible to select the Python version used for
creating virtual environments by switching the currently activated Python with tools like `pyenv`.

Poetry now provides a new experimental option `virtualenvs.prefer-active-python`. Once set to `true`, Poetry tries
to detect the currently activated Python executable when creating a new environment. This should work regardless of the chosen
installation method of Poetry.

## Deleting multiple environments at once

If a project had multiple associated virtual environments, it was not possible to delete more than one at a time.

`poetry env remove` now accepts a list of python executables to remove multiple environments.

Removing all known environments is now possible by applying the new `--all` parameter.

## Configure the number of parallel processes

`poetry install` executes operations in parallel. The default number of parallel processes is `number_of_cores + 4`.
It is now possible to limit the number of parallel processes by using the option `installer.max-workers`.
