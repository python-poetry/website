---
layout: single
title: "Announcing Poetry 1.0.0"
date: 2019-12-12 10:12:35
categories: [releases]
tags: ["1.x"]

aliases:
  - announcing-poetry-1-0-0.html
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.0.0.

<!--more-->

Thanks to the community and everyone involved in making this release possible,
and especially [@stephsamson](https://github.com/stephsamson), [@brycedrennan](https://github.com/brycedrennan)
and [@finswimmer](https://github.com/finswimmer) who helped tremendously getting to this significant milestone.

I would also like to personally thank my employer, [PeopleDoc](https://www.people-doc.com/), for giving me
time to work on Poetry.

This release is a stepping stone for the project, bringing a lot of new features and changes
that will make managing Python projects even easier.

{{% note %}}
This version is not backwards-compatible with the previous releases so special care must be taken when upgrading.
{{% /note %}}

You can read the [change log](/history/) for the full list of changes.

## A new way to manage Python environments

The default behavior has not changed and Poetry will try to use the currently used
Python version to create the virtual environment associated with the project.

However, if it's not compatible with the currently specified `python` requirement
of the `pyproject.toml` file, Poetry will try to find one that is.

Moreover, you can now have more control and easily switch between Python versions
for a project by using the `env use` command.

```bash
poetry env use /full/path/to/python
```

If you have the python executable in your `PATH` you can use it:

```bash
poetry env use python3.7
```

You can even just use the minor Python version in this case:

```bash
poetry env use 3.7
```

If you want to disable the explicitly activated virtualenv, you can use the
special `system` Python version to retrieve the default behavior:

```bash
poetry env use system
```

If you want to get basic information about the currently activated virtualenv,
you can use the `env info` command:

```bash
poetry env info
```

will output something similar to this:

```text
Virtualenv
Python:         3.7.1
Implementation: CPython
Path:           /path/to/poetry/cache/virtualenvs/test-O3eWbxRl-py3.7
Valid:          True

System
Platform: darwin
OS:       posix
Python:   /path/to/main/python
```

If you only want to know the path to the virtualenv, you can pass the `--path` option
to `env info`:

```bash
poetry env info --path
```

You can also list all the virtualenvs associated with the current virtualenv
with the `env list` command:

```bash
poetry env list
```

will output something like the following:

```text
test-O3eWbxRl-py2.7
test-O3eWbxRl-py3.6
test-O3eWbxRl-py3.7 (Activated)
```

Finally, you can delete existing virtualenvs by using `env remove`:

```bash
poetry env remove /full/path/to/python
poetry env remove python3.7
poetry env remove 3.7
poetry env remove test-O3eWbxRl-py3.7
```

If you remove the currently activated virtualenv, it will be automatically deactivated.

## Improved support for private indices

While Poetry already supported private indices, it was not possible to control
them in a more fine-grained manner. To make using private indices even easier
and powerful, it's now possible to declare a specific source for a dependency.

```toml
[tool.poetry.dependencies]
# ...
pendulum = {version = "^2.0.5", source = "my-index"}

[[tool.poetry.source]]
name = "my-index"
url = "https://example.com"
```

To accompany this new feature, you can now declare an index as secondary,
meaning it will only being used last and PyPI will always be preferred.

```toml
[[tool.poetry.source]]
name = "my-index"
url = "https://example.com"
secondary = true
```

It's now also possible to disable PyPI completely by declaring a private
index as the default one:

```toml
[[tool.poetry.source]]
name = "my-index"
url = "https://example.com"
default = true
```

## Improved configuration management

### Using environment variables

Sometimes, in particular when using Poetry with CI tools, it's easier to use environment variables and not have to execute configuration commands.

Poetry now supports this and any setting can be set by using environment variables.

The environment variables must be prefixed by `POETRY_` and are comprised
of the uppercase name of the setting and with dots and dashes replaced by underscore,
here is an example:

```bash
export POETRY_VIRTUALENVS_PATH=/path/to/virtualenvs/directory
```

This also works for secret settings, like credentials:

```bash
export POETRY_HTTP_BASIC_MY_REPOSITORY_PASSWORD=secret
```

### Local configuration

Poetry now provides the ability to have settings that are specific to a project
by passing the `--local` option to the `config` command.

```bash
poetry config virtualenvs.create false --local
```

This will create a `poetry.toml` file that holds the local configuration settings.

### The `settings.` prefix is no longer necessary

The settings are now stored differently and no longer needs to be prefixed by `settings.`.
If you have already configured settings you will need to configure them again.

## Improved `add` command

It is now even easier to add dependencies with the `add` command.

It now supports the following formats:

- A single name: `pendulum`
- A name and a constraint: `requests@^2.23.0`
- A git url: `git+https://github.com/sdispater/poetry.git`
- A git url and a revision: `git+https://github.com/sdispater/poetry.git#develop`
- A file path: `../my-package/my-package.whl`
- A directory: `../my-package/`
- A url: `https://example.com/packages/my-package-0.1.0.tar.gz`

You can also specify extras in the constraint instead of using `--extras`:

```bash
poetry add "requests[security]"
```

As a consequence, the `--git` and `--path` options were removed.

If you need to upgrade an already present dependency to the latest version
you can use the special `latest` constraint to do so:

```
poetry add requests@latest
```

It will also select the latest prerelease if the package only has prereleases.

## Improved publishing

### Support for PyPI API tokens

When publishing to PyPI, you can use the new [API tokens](https://pypi.org/help/#apitoken)
instead of the username/password combination.

To configure a token, you can use the `config` command:

```bash
poetry config pypi-token.pypi my-token
```

### Support for custom certificates and mutual TLS authentication

Poetry now supports repositories that are secured by a custom certificate authority
as well as those that require certificate-based client authentication.

The following will configure the "foo" repository to validate the repository's
certificate using a custom certificate authority and use a client certificate
(note that these config variables do not both need to be set):

```bash
poetry config certificates.foo.cert /path/to/ca.pem
poetry config certificates.foo.client-cert /path/to/client.pem
```

## Support for arbitrary markers for conditionnal dependencies

If you need more complex install conditions for your dependencies than just the Python version,
Poetry now supports [environment markers](https://www.python.org/dev/peps/pep-0508/#environment-markers)
via the `markers` property:

```toml
[tool.poetry.dependencies]
pathlib2 = { version = "^2.2", markers = "python_version ~= '2.7' or sys_platform == 'win32'" }
```

## What's next?

Even though we reached a significant milestone for the project,
there is still a lot of work to do to further improve the way Python projects
are managed by providing a unified workflow.

The next steps will be to make Poetry extensible via a plugin system to help
create an ecosystem around it and add optional features (the [work](https://github.com/sdispater/poetry/pull/1237) is already in progress), to improve its packaging capabilities, and to further improve
the dependency resolution algorithm at its heart.
