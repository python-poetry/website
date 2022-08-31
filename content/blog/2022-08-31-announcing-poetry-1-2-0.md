---
layout: single
title: "Announcing Poetry 1.2.0"
date: 2022-08-31
categories: [releases]
tags: ["1.x", "1.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry 1.2.0.

<!--more-->

Poetry 1.2 boasts a massive list of changes, new features and fixes developed over the course of 2 years, with
contributions from dozens of committers.

If you have a previous version of Poetry installed via the [new installer][installation docs], `pipx` or manually,
getting Poetry 1.2.0 is as easy as:

```bash
$ poetry self update
```

[installation docs]: {{< relref "docs#installation" >}}

{{% warning %}}
If you installed Poetry using the deprecated `get-poetry.py`, you will need to migrate to the new installer.
First, uninstall with `get-poetry.py`:

```bash
$ curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python3 - --uninstall
```

Then follow the instructions below to install Poetry 1.2.
{{% /warning %}}

Since there are many changes in Poetry 1.2.0, this post details the changes over the following sections:

- [Breaking changes and major features](#breaking-changes-and-major-features)
- [Other noteworthy changes and features](#other-noteworthy-changes-and-features)
- [Minor changes](#minor-changes)
- [New commands](#new-commands)
- [Changes to existing commands](#changes-to-existing-commands)
- [New configuration options](#new-configuration-options)
- [FAQ](#faq)

For a complete list of changes, you can refer to the project [history]. Full documentation for Poetry 1.2 is available
[here][docs]. Any bugs or regressions should be reported to the [issue tracker] after checking for duplicates.

[docs]: {{< relref "docs" >}}
[history]: /history
[issue tracker]: https://github.com/python-poetry/poetry/issues

## Breaking changes and major features

### New standalone installer

The legacy `get-poetry.py` installation script has been replaced by [install.python-poetry.org]. The installer is now a
[standalone project][installer repo], with its own issue tracker.

[install.python-poetry.org]: https://install.python-poetry.org
[installer repo]: https://github.com/python-poetry/install.python-poetry.org

{{% warning %}}
The `get-poetry.py` script is frozen, but will be available in Poetry's repository for at least one more minor release.
However, the new installer can install Poetry `>= 1.1.7`, so all users should migrate away as soon as possible.
{{% /warning %}}

Most users will be satisfied by the defaults of the installer, which can be piped directly to a Python interpreter:

```bash
# Linux, macOS, Windows (WSL)
$ curl -sSL https://install.python-poetry.org | python3 -

# Windows (Powershell)
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
```

The new installer brings the following improvements:

- Releases are installed from standard wheels instead of special platform-specific archives. This allows for support of
  pipx and manual installs, and prevents a release being necessary to make use of newer dependency versions.
- Standard install locations are used for both Poetry itself, and the `poetry` CLI wrapper.
- Installations can be performed from a local path, or from a git repository (including refs like branches or commits).
- Guidance on modifying `$PATH` is provided, but the user's configuration is not altered by automated tools.
- Poetry will be installed using the Python interpreter the installer is invoked with.

The new installer (or a compatible install method such as `pipx` or manual installation) is additionally necessary for
the new plugin system, [detailed below](#plugin-support).

If you wish to install using another method, or have advanced requirements like installing Poetry from git, refer to the
[full documentation][installation docs].

### Dropping support for managing Python 2.7 projects

Python 2.7 has reached end of life over 18 months ago, on January 1, 2020.

Poetry 1.2 drops support for managing Python 2.7 projects, as:

- It led to increasing technical debt and slowed the development of Poetry.
- Projects have long had the time to migrate to Python 3.

{{% note %}}
If you rely on Poetry for a Python 2.7 project, the Poetry 1.1 branch is still available, though it will no longer be
maintained.
{{% /note %}}

### Dropping support for Python 2.7, 3.5 and 3.6 as runtimes

Poetry 1.2 drops runtime support for Python 2.7, 3.5 and 3.6. Running Poetry on these versions is now untested and
unsupported.

{{% note %}}
This change is about installing and running Poetry itself. Managing projects requiring Python 3.5 and 3.6, as well as
older Python 3 versions is still supported.
{{% /note %}}

### Dependency groups

Poetry provides a way to **organize** your dependencies by **groups**. For instance, you might have dependencies that
are only needed to test your project or to build the documentation.

To declare a new dependency group, use a `tool.poetry.group.<group>` section where `<group>` is the name of your
dependency group (for instance, `test`):

```toml
[tool.poetry.group.test]  # This section can be omitted

[tool.poetry.group.test.dependencies]
pytest = "^7.1.0"
pytest-mock = "*"
```

{{% note %}}
All dependencies **must be compatible across all groups** as they will be resolved regardless of whether they are
selected for installation or not (see [Installing group dependencies](#installing-group-dependencies)).

Think of dependency groups as **labels** associated with your dependencies: as all groups will be installed **by
default**, they are simply a way to organize the dependencies logically.
{{% /note %}}

The dependencies declared in `tool.poetry.dependencies` are part of an implicit `main` group.

```toml
[tool.poetry.dependencies]  # The implicit `main` dependency group
httpx = "*"
pendulum = "*"

[tool.poetry.group.test.dependencies]
pytest = "^7.1.0"
pytest-mock = "*"
```

Dependency groups, other than the implicit `main` group, should generally contain additional dependencies that are part
of your development process, as installing them is only possible using Poetry and `poetry install`.

If your project has additional dependencies meant to add additional functionality at runtime, they should be declared
using the ecosystem-standard [extras][extras docs] instead. Extras are supported by
package build and install tools such as `pip`.

[extras docs]: {{< relref "docs/pyproject#extras" >}}

{{% note %}}
**A note about the `dev-dependencies` section**

Any dependency declared in the legacy `dev-dependencies` section will automatically be added to a `dev` group.
Thus, the following examples are equivalent:

```toml
[tool.poetry.dev-dependencies]
pytest = "^7.1.0"
pytest-mock = "*"
```

```toml
[tool.poetry.group.dev.dependencies]
pytest = "^7.1.0"
pytest-mock = "*"
```

As the `dev-dependencies` is now deprecated, projects should migrate to the new `group` syntax as soon as possible. Keep
in mind that the `group` syntax is a new feature of Poetry 1.2, and your project will not be buildable with Poetry 1.1
after migrataing.
{{% /note %}}

#### Optional groups

A dependency group can be declared as optional. This makes sense when you have a group of dependencies that are only
required in a specific environment or for a specialized purpose.

```toml
[tool.poetry.group.docs]
optional = true

[tool.poetry.group.docs.dependencies]
mkdocs = "*"
```

Optional groups can be installed in addition to the **default** dependencies by using the `--with` flag of
the [`install`][install docs] command:

```bash
$ poetry install --with docs
```

{{% warning %}}
Optional groups will **still** be resolved alongside other dependencies, so special care should be taken to ensure they
are compatible with each other.
{{% /warning %}}

#### Adding a dependency to a group

The `--group (-G)` flag of the [`add`][add docs] command is the preferred way to add
dependencies to a group:

```bash
$ poetry add pytest --group test
```

If the group does not already exist, it will be created automatically.

#### Installing group dependencies

**By default**, dependencies across **all non-optional groups** will be installed when executing `poetry install`.

You can **exclude** one or more groups with the `--without` option:

```bash
$ poetry install --without docs,test
```

You can also opt in to [optional groups](#optional-groups) by using the `--with` option:

```bash
$ poetry install --with docs
```

If you only want to install the [**default**, non-grouped dependencies](#dependency-groups) (aka the `main` group), you can do so with the
`--only` option:

```bash
$ poetry install --only main
```

Finally, if you wish to install **only specific groups** of dependencies without installing the `main` group, the
`--only` option can be used to do so:

```bash
$ poetry install --only docs,test
```

#### Removing dependencies from a group

The [`remove`][remove docs] command supports a `--group (-G)` flag to remove packages from a
specific group:

```bash
$ poetry remove mkdocs --group docs
```

[add docs]: {{< relref "docs/cli#add" >}}
[remove docs]: {{< relref "docs/cli#remove" >}}
[install docs]: {{< relref "docs/cli#install" >}}

### Plugin support

Poetry now supports a plugin system to alter or expand functionality.

Example use cases include functionality not desirable to the majority of Poetry users, features out of scope to the main
Poetry project, or specialized functionality specific to a project.

The plugin system is designed to allow use of Poetry in these situations without requiring a custom fork.

#### Using plugins

Poetry automatically loads all plugins installed into its environment.

While there are many methods to add plugins to a Python environment (or virtual environment), Poetry comes with a suite
of [`self`][self docs] commands that should work regardless of install method:

```bash
$ poetry self add poetry-plugin-<NAME>
```

The [`self add`][self add docs] command will ensure that the plugin is compatible with the current version of Poetry
and install any necessary dependencies.

Any package specification understood by the standard [`add`][add docs] command is compatible with `self add`.

If you no longer need a plugin and want to uninstall it, you can use the [`self remove`][self remove docs] command:

```bash
$ poetry self remove poetry-plugin-<NAME>
```

You can also list all currently installed and discovered plugins by using [`self show plugins`][self show plugins docs]:

```bash
$ poetry self show plugins
```

Full documentation for installing and using plugins (including with other install methods) is available
[here][using plugins docs].

#### Creating a plugin

Early documentation for creating a plugin is available [here][creating plugins docs].

[using plugins docs]: {{< relref "docs/plugins#using-plugins" >}}
[creating plugins docs]:{{< relref "docs/plugins#creating-a-plugin" >}}

### Migration of the `poetry export` command

The [`export`][export docs] command provides a way to export a list of locked dependencies to foreign formats, such as
`requirements.txt`. This command was a feature added to make migration to Poetry easier, or to enable hybrid workflows,
but it was never considered part of the core functionality of Poetry.

To reflect this, and to accelerate development of the main Poetry project, it has been migrated into a
[separate repo][export repo] and is distributed separately as [poetry-plugin-export][export package]. Note that it is
now considered a separate project with its own issue tracker and release cycle.

To ease the transition, **the plugin is installed by default for the 1.2 release**. Future releases of Poetry will
**deprecate this automatic install**, and require the user to explicitly install the plugin.

[export docs]: {{< relref "docs/cli#export" >}}
[export repo]: https://github.com/python-poetry/poetry-plugin-export
[export package]: https://pypi.org/project/poetry-plugin-export/

## Other noteworthy changes and features

### Support for yanked releases (PEP 592)

Poetry now supports yanked releases as defined by [PEP 592], for both PyPI and any [PEP 503]-compatible repository.

Adding a dependency version that is yanked, or installing a project that depends on yanked releases will now raise a
warning:

```bash
$ poetry add cryptography==37.0.3

[...]
Warning: The locked version 37.0.3 for cryptography is a yanked version. Reason for being yanked: Regression in OpenSSL.
```

```bash
$ poetry install

[...]
Warning: The file chosen for install of cryptography 37.0.3 (cryptography-37.0.3-cp36-abi3-manylinux_2_24_x86_64.whl) is yanked. Reason for being yanked: Regression in OpenSSL.
```

[pep 592]: https://peps.python.org/pep-0592/
[pep 503]: https://peps.python.org/pep-0503/

### Support for Direct Origin URL records (PEP 610)

Poetry now supports reading and writing [PEP 610] records, which resolves edge cases and performance issues relating to
determining the origin of installed dependencies.

{{% note %}}
You might see same-version 'updates' when running the `install` or `update` commands due to Poetry rewriting (or
creating) PEP 610 records.
{{% /note %}}

[pep 610]: https://peps.python.org/pep-0610/

### Subdirectory support for Git dependencies

It is now possible to specify a subdirectory from which Poetry should build and install a Git-based dependency.

The syntax used by the [`add`][add docs] command is the same as `pip install`/[PEP 508] -- a `#subdirectory=` fragment
appended to the URL:

```bash
$ poetry add git+https://github.com/myorg/mypackage_with_subdirs.git#subdirectory=subdir
```

Manual editing of the `pyproject.toml` is supported as well. Full documentation, including examples is available
[here][git dep docs].

[pep 508]: https://peps.python.org/pep-0508/

[git dep docs]: {{< relref "docs/dependency-specification#git-dependencies" >}}

### Single page repository support

Poetry now supports discovering and installing dependencies from the 'single page' style of repository. Some
widely-consumed package are not hosted in a [PEP 503]-complaint repository, but are instead listed on a single HTML
page.

To add a single page repository as a source add it like any other repository:

```bash
$ poetry source add <SOURCE_NAME> <PAGE_URL>

# e.g.
$ poetry source add jax https://storage.googleapis.com/jax-releases/jax_releases.html
```

Full documentation is available [here][single page repo docs].

[single page repo docs]: {{< relref "docs/repositories#single-page-link-source" >}}

### Synchronizing the environment with the lock file

To ensure that the environment exactly matches the lock file, the [`install`][install docs] command has gained a new
`--sync` flag:

```bash
$ poetry install --sync
```

The `--sync` option can be combined with any of the [dependency group](#dependency-groups)-related flags as expected:

```bash
$ poetry install --without dev --sync
$ poetry install --with docs --sync
$ poetry install --only dev
```

Please note that use of this command in the system environment (a common practice in containerized environments)
may have unexpected results. `--sync` is intended only for use in a virtual environment where installed packages are
exclusively managed by Poetry.

{{% note %}}
`--sync` replaces the similar `--remove-untracked` flag which is now **deprecated**.
{{% /note %}}

### Opting out of binary distributions

A new [`installer.no-binary`][installer.no-binary docs] setting has been introduced, to allow opting out of
[binary distributions][bdist docs] of selected dependencies. This is functionally similar to `pip install --no-binary`.

This option can be configured globally to affect all usage of Poetry, but is best combined with `--local` to scope it to
a specific project:

```bash
# Skip all binaries
$ poetry config --local installer.no-binary :all:
# Skip specific package binaries
$ poetry config --local installer.no-binary httpx,uvicorn
# Do not skip any binaries (default)
$ poetry config --local installer.no-binary :none:
```

Full documentation of this feature (including configuration using environment variables for CI or containers) is
available [here][installer.no-binary docs].

[bdist docs]: https://packaging.python.org/en/latest/specifications/binary-distribution-format/

### Native Python git client

Poetry has robust (and improving) support for Git dependencies, which has always been enabled by the system `git`
command. However, not all environments in which you want to use Poetry have a Git client available.

Poetry 1.2 introduces Git support based on [Dulwich], a native Python implementation of the Git protocol, format, and
client. Dulwich supports all operations Poetry requires, and should be a drop-in replacement for Poetry's previous usage
of the `git` CLI.

However, as this is a major change, there is an escape hatch in the form of the
[`experimental.system-git-client`][experimental.system-git-client docs] setting. When this is set to `true`, Poetry will
revert to using your system's `git` command.

Note that this option is experimental, and will be removed in a future release of Poetry.

[dulwich]: https://www.dulwich.io/

### Detection of the currently active Python (experimental)

Due to refactoring required to enable plugin support and alternative install methods, Poetry lost the ability to detect
the currently activated Python (aka the current `python3` command in the `$PATH`), as selected by tools like `pyenv` or
`update-alternatives`.

To ease the workflow of those using such tools, a new **experimental**
[`virtualenvs.prefer-active-python`][virtualenvs.prefer-active-python docs] setting has been introduced. If this is set
to `true`, Poetry will attempt to detect the currently active Python interpreter when creating a new environment. This
new method should function regardless of the install method used.

```bash
$ poetry config virtualenvs.prefer-active-python true
$ pyenv local 3.9.3
# The resulting environment should be created using Python 3.9.3
$ poetry install
```

## Minor changes

### PEP 508 dependency specification parsing

The [`add`][add docs] command now supports full [PEP 508]-style dependency specifications, enabling the addition of
complex dependency definitions using ecosystem-standard syntax:

```bash
$ poetry add 'pytest-xdist[psutil] (>=2.4.0,<2.5.0); python_version >= "3.7"'
```

This command would result in the following addition to `pyproject.toml`:

```toml
[tool.poetry.dependencies]
pytest-xdist = {version = ">=2.4.0,<2.5.0", markers = "python_version >= \"3.7\"", extras = ["psutil"]}
```

### Comprehensive HTTPS certificate support

Poetry has long supported the use of [custom certificates][repo cert docs] for repository access. However, not all code
paths made use of these configured credentials, preventing some commands like `poetry update` from functioning properly
against custom repos using certificate-based authentication.

Poetry 1.2 has significantly refactored both the repository access and HTTP request components, ensuring that
certificates are uniformly applied to all relevant requests.

[repo cert docs]: {{< relref "docs/repositories#certificates" >}}

### Non-verbose error handling

Poetry 1.2 significantly reduces the verbosity of most common errors, by printing only the exception and not a partial
stack trace:

```bash
$ poetry add httpx==0.0.0

Could not find a matching version of package httpx
```

For debugging and development work, different levels of verbosity are now available:

- `--verbose (-v)` to display the last stack frame (similar to Poetry 1.1)
- `-vv` to display a reduced stack trace, highlighting the exact error and the calls that led to it
- `-vvv` for maximum verbosity, printing a full stack trace and enabling debug logging

## New commands

### `self`

The [`self`][self docs] namespace groups subcommands related to management of Poetry and its runtime environment.

This namespace previously contained the [`self update`][self update docs] command, but has now been significantly
expanded:

#### `self add`

The [`self add`][self add docs] command adds a dependency to Poetry's runtime environment, similar to `poetry add`:

```bash
$ poetry self add poetry-plugin-<NAME>
```

#### `self install`

The [`self install`][self install docs] command ensures all configured packages are installed into Poetry's runtime
environment, similar to `poetry install`:

```bash
$ poetry self install
$ poetry self install --sync
```

This is useful when `~/.config/pypoetry/pyproject.toml` is managed as part of a dotfiles repo or is mounted into a
container. Note that the path of the runtime `pyproject.toml` may vary based on platform or if `$POETRY_HOME` is set.

#### `self lock`

The [`self lock`][self lock docs] command ensures all configured packages are recorded to a runtime environment
`poetry.lock` file, similar to `poetry lock`:

```bash
$ poetry self lock
```

#### `self remove`

The [`self remove`][self remove docs] command removes a package from Poetry's runtime environment, similar to
`poetry remove`:

```bash
$ poetry self remove poetry-plugin-<NAME>
```

#### `self show`

The [`self show`][self show docs] command lists all configured runtime environment packages, similar to `poetry show`:

```bash
$ poetry self show
```

#### `self show plugins`

The [`self show plugins`][self show plugins docs] command lists all discovered plugins in Poetry's runtime environment:

```bash
$ poetry self show plugins
```

[self docs]: {{< relref "docs/cli#self" >}}
[self add docs]: {{< relref "docs/cli#self-add" >}}
[self remove docs]: {{< relref "docs/cli#self-remove" >}}
[self install docs]: {{< relref "docs/cli#self-install" >}}
[self lock docs]: {{< relref "docs/cli#self-lock" >}}
[self show docs]: {{< relref "docs/cli#self-show" >}}
[self show plugins docs]: {{< relref "docs/cli#self-show-plugins" >}}

### `source`

The [`source`][source docs] namespace groups subcommands related to management of package sources (repositories).

Previously, configuring sources required manual edits to `pyproject.toml`.

#### `source add`

The [`source add`][source add docs] command adds a new source configuration to `pyproject.toml`:

```bash
$ poetry source add pypi-test https://test.pypi.org/simple/
```

#### `source show`

The [`source show`][source show docs] command displays information on all configured sources for the project:

```bash
$ poetry source show
```

Optionally, you can limit output to one or more sources by specifying them by name:

```bash
$ poetry source show pypi-test
```

#### `source remove`

The [`source remove`][source remove docs] command removes a configured source from `pyproject.toml`:

```bash
$ poetry source remove pypi-test
```

[source docs]: {{< relref "docs/cli#source" >}}
[source add docs]: {{< relref "docs/cli#source-add" >}}
[source show docs]: {{< relref "docs/cli#source-show" >}}
[source remove docs]: {{< relref "docs/cli#source-remove" >}}

## Changes to existing commands

Poetry 1.2 brings changes to several commands, primarily related to [dependency groups](#dependency-groups).

### Global options

- Added `--no-cache` to disable all uses of cached packages and source contents

### `about`

- Now displays Poetry and poetry-core versions

### `add`

- Added `--editable` to add a dependency in editable mode
- Added `--group` / `-G` to add a dependency to a specific dependency group
- Now understands [PEP 508]-style dependency specifications

### `env remove`

- Added `--all` to delete all environments
- It is now possible to remove multiple environments in one invocation by specifying multiple names

### `install`

- Added `--all-extras` to install all extras
- Added `--only` to strictly install one or more dependency groups (ignoring the implicit `main` group)
- Added `--only-root` to install the project without any dependencies
- Added `--with` to select one or more dependency groups to install in addition to the implicit `main` group
- Added `--without` to skip installing one or more dependency groups
- Added `--sync` to ensure installed dependencies exactly match the lock file (and specified groups)
- Deprecated `--no-dev` (use `--without dev` instead)
- Deprecated `--remove-untracked` (use `--sync` instead)

### `lock`

- Added `--check` to verify `poetry.lock` agrees with `pyproject.toml`

### `new`

- Added `--readme` to specify the README file format

### `publish`

- Added `--skip-existing` to ignore errors from files already existing in the repository

### `show`

- Added `--only` to strictly select one or more dependency groups to show (ignoring the implicit `main` group)
- Added `--why` to interrogate why a dependency is required (works standalone, or with `--tree` for a single package)
- Added `--with` to select one or multiple dependency groups to show in addition to the implicit `main` group
- Added `--without` to skip selecting one or more dependency groups
- Deprecated `--no-dev` (use `--without dev` instead)
- `show <PACKAGE>` will now list dependencies that require `PACKAGE`

### `shell`

- `nushell` is now supported
- Windows support has been improved (UX should be more similar to Unix platforms)

### `remove`

- Added `--group` / `-G` to remove a dependency from a specific dependency group

### `version`

- Added `--dry-run` to simulate a version bump without actually applying it

## New configuration options

### `experimental.system-git-client`

[`experimental.system-git-client`][experimental.system-git-client docs] causes Poetry to make use of the system `git`
binary instead of [Dulwich].

### `installer.max-workers`

[`installer.max-workers`][installer.max-workers docs] limits the maximum number of parallel workers used by the
installer.

### `installer.no-binary`

[`installer.no-binary`][installer.no-binary docs] causes the installer to ignore some or all binary distributions,
forcing installation from a source distribution.

### `virtualenvs.options.always-copy`

[`virtualenvs.options.always-copy`][virtualenvs.options.always-copy docs] causes the `--always-copy` flag to be passed
to `virtualenv` during environment creation, ensuring that all necessary files are copied instead of linked.

### `virtualenvs.options.no-pip`

[`virtualenvs.options.no-pip`][virtualenvs.options.no-pip docs] causes the `--no-pip` flag to be passed to `virtualenv`
during environment creation, preventing the automatic installation of `pip` into the environment.

### `virtualenvs.options.no-setuptools`

[`virtualenvs.options.no-setuptools`][virtualenvs.options.no-setuptools docs] causes the `--no-setuptools` flag to be
passed to `virtualenv` during environment creation, preventing the automatic installation of `setuptools` into the
environment.

### `virtualenvs.options.system-site-packages`

[`virtualenvs.options.system-site-packages`][virtualenvs.options.system-site-packages docs] causes the
`--system-site-packages` flag to be passed to `virtualenv` during environment creation, allowing for the system
`site-packages` directory (e.g. packages installed using the distro package manager) to be discoverable inside the
virtual environment.

### `virtualenvs.prefer-active-python`

[`virtualenvs.prefer-active-python`][virtualenvs.prefer-active-python docs] causes Poetry to attempt to detect the
currently active `python3` binary, and use it as the interpreter for creation of virtual environments. If `false`
(the default), Poetry will instead use the same interpreter it was installed with.

### `virtualenvs.prompt`

[`virtualenvs.prompt`][virtualenvs.prompt docs] allows for customization of the prompt used by Poetry-managed
environments. Two template variables, `{{project_name}}` and `{{python_version}}` are available.

[experimental.system-git-client docs]: {{<relref "docs/configuration#experimentalsystem-git-client">}}
[installer.max-workers docs]: {{<relref "docs/configuration#installermax-workers">}}
[installer.no-binary docs]: {{<relref "docs/configuration#installerno-binary">}}
[virtualenvs.options.always-copy docs]: {{<relref "docs/configuration#virtualenvsoptionsalways-copy">}}
[virtualenvs.options.no-pip docs]: {{< relref "docs/configuration#virtualenvsoptionsno-pip" >}}
[virtualenvs.options.no-setuptools docs]: {{< relref "docs/configuration#virtualenvsoptionsno-setuptools" >}}
[virtualenvs.options.system-site-packages docs]: {{< relref "docs/configuration#virtualenvsoptionssystem-site-packages" >}}
[virtualenvs.prefer-active-python docs]: {{<relref "docs/configuration#virtualenvsprefer-active-python-experimental">}}
[virtualenvs.prompt docs]: {{< relref "docs/configuration#virtualenvsprompt" >}}

## FAQ

### Are lock files compatible between 1.2 and 1.1?

Yes, Poetry 1.2 will understand lock files generated by 1.1, and Poetry 1.1 will understand lock files generated by 1.2.

There will be inconsistencies related to specific formatting (e.g. case, order, indentation), so it is suggested to only
commit lock files from one version.

If you notice any hard incompatibilities, please report them to the [issue tracker].

{{% note %}}
If a project uses ]dependency groups](#dependency-groups), it will not be possible to use 1.1, as this is a new feature
introduced by 1.2.
{{% /note %}}

### Will 1.1 still be maintained? How long will 1.2 be maintained?

Now that Poetry 1.2 is out, Poetry 1.1 is officially unmaintained.

1.2 will be maintained with fixes for major bugs and regressions until the release of the next stable version (1.3).

The Poetry team intends to significantly increase release cadence to prevent similarly long and painful release cycles.
Users should expect to see new stable versions of Poetry released regularly.
