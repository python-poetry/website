---
layout: single
title: "About markers and overrides"
date:   2022-05-17 00:00:00
categories: ['releases']
tags: ['1.x', '1.2']
---

In the last months, many improvements regarding the handling of
[environment markers](https://python-poetry.org/docs/dependency-specification/#using-environment-markers)
were made (simplifying the result of intersections and unions of markers,
extracting the python constraint from markers, ...). You can take a look into the 
[changelog of poetry-core 1.1.0a7](https://github.com/python-poetry/poetry-core/releases/tag/1.1.0a7)
for some examples. But why all the effort?

<!--more-->

An outstanding feature of poetry is the generation of a lock file suitable for
every environment (independent of Python version, platform, ...).
Handling markers is easy when considering only one specific environment:
You just have to insert the values for this environment into the marker
of a restricted dependency and check if it evaluates to `True` or `False`.
(If it is `False`, the dependency can be ignored.)
In contrast, solving dependencies for any possible environment is difficult - at least
if you don't want to wait an eternity. It's just not feasible to do the same as for one
environment for every environment, i.e., each combination of marker values
(Python 3.7/3.8/3.9/..., Windows/Linux/...).

It becomes even more intricate when dealing with
[multiple constraints dependencies](https://python-poetry.org/docs/dependency-specification/#multiple-constraints-dependencies).
In that case, several resolutions have to be performed.
That's where overrides come into play. Let's consider a simple example:

```toml
lib1= [
    {version = "1.0", markers = "python_version = '3.6.*'"},
    {version = "2.0", markers = "python_version = '3.7.*'"},
]
lib2 = [
    {version = "1.0", markers = "python_version = '3.6.*'"},
    {version = "2.0", markers = "python_version = '3.7.*'"},
]
```

There are four combinations of `lib1` and `lib2` - and poetry 1.1.x tries to solve all
of them (even combinations that do not make sense like `lib1 1.0` together with
`lib2 2.0`).
Solving unnecessary combinations of overrides is not just a performance
issue, it can also result in unnecessary solver failures because of conflicting
dependencies!

But how to determine if a combination makes sense or not?
Formally, a combination does not make sense if the intersection of its markers is empty
(i.e., cannot be fulfilled). In the example, it may be easy to determine if an
intersection is empty. However, markers can become complex and in order to determine if
a marker is empty it has to be simplified as far as possible.

And now we have come full circle. Marker handling is essential for dependency resolution
and there will be many improvements in poetry 1.2.0.
