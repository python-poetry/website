---
layout: single
title: "Announcing Poetry 1.2.0a1"
date: 2021-05-21 00:00:00
categories: ["releases"]
tags: ["1.x", "1.2"]

aliases:
  - announcing-poetry-1-2-0a1.html
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.2.0a1**.

<!--more-->

This release is the first **testing** release of the upcoming 1.2.0 version.

It adds – among other things – support for plugins and for [PEP 610](https://www.python.org/dev/peps/pep-0610/).

{{% note %}}
Note that, unlike before, it's not possible to update Poetry via the `self update` command. You need to use
the new installer script (or either `pipx` or `pip`) to freshly install Poetry. It is recommended to uninstall
any currently installed version of Poetry.
{{% /note %}}

{{% warning %}}
This release **drops** support for Python **2.7** and **3.5**.
{{% /warning %}}

{{% warning %}}
This is a **testing** release so special care should be taken when upgrading since stability is not guaranteed.

If you encounter any issue with the new features, please report it to the [issue tracker](https://github.com/python-poetry/poetry/issues "Poetry's issue tracker").
{{% /warning %}}

For a complete list of changes, you can refer to the [change log](/history).

## Deprecation of the `get-poetry.py` script

The usage of the `get-poetry.py` script is now deprecated and is replaced by the `install-poetry.py` script:

```bash
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python -
```

The reasons for this change are the following:

- It no longer relies on the prebuilt release packages of Poetry (see https://github.com/python-poetry/poetry/releases/tag/1.1.5 for an example) which had the issues of having frozen dependencies which made upgrading dependencies much harder without releasing a new bug fix release of Poetry. This will eventually make our release process easier.
- It relies on standards for the install locations of both Poetry and the `poetry` script.
- It supports installing from a git repository or a file/directory.
- It no longer tries to modify the `PATH` but instead will simply provide guidance on how to do it if necessary.
- It will use the correct Python interpreter, i.e. the one used to invoke the script, when calling the poetry script.

It also ensures that the plugin system, detailed below, works properly.

Poetry users are encouraged to use this new script since the newest releases (including this one) won't be available via the old installer.

## New plugin system

Poetry now supports a plugin system to alter or expand Poetry's functionality.

For example if your environment poses special requirements
on the behaviour of Poetry which do not apply to the majority of its users
or if you wish to accomplish something with Poetry in a way that is not desired by most users.

In these cases you could consider creating a plugin to handle your specific logic.

### Creating a plugin

A plugin is a regular Python package which ships its code as part of the package
and may also depend on further packages.

#### Plugin package

The plugin package must depend on Poetry
and declare a proper [plugin](/docs/pyproject/#plugins) in the `pyproject.toml` file.

```toml
[tool.poetry]
name = "my-poetry-plugin"
version = "1.0.0"

# ...
[tool.poetry.dependencies]
python = "~2.7 || ^3.7"
poetry = "^1.2"

[tool.poetry.plugins."poetry.plugin"]
demo = "poetry_demo_plugin.plugin:MyPlugin"
```

#### Generic plugins

Every plugin has to supply a class which implements the `poetry.plugins.Plugin` interface.

The `activate()` method of the plugin is called after the plugin is loaded
and receives an instance of `Poetry` as well as an instance of `cleo.io.IO`.

Using these two objects all configuration can be read
and all public internal objects and state can be manipulated as desired.

Example:

```python
from cleo.io.io import IO

from poetry.plugins.plugin import Plugin
from poetry.poetry import Poetry


class MyPlugin(Plugin):

    def activate(self, poetry: Poetry, io: IO):
        version = self.get_custom_version()
        io.write_line(f"Setting package version to <b>{version}</b>")
        poetry.package.set_version(version)

    def get_custom_version(self) -> str:
        ...
```

#### Application plugins

If you want to add commands or options to the `poetry` script you need
to create an application plugin which implements the `poetry.plugins.ApplicationPlugin` interface.

The `activate()` method of the application plugin is called after the plugin is loaded
and receives an instance of `console.Application`.

```python
from cleo.commands.command import Command
from poetry.plugins.application_plugin import ApplicationPlugin


class CustomCommand(Command):

    name = "my-command"

    def handle(self) -> int:
        self.line("My command")

        return 0


def factory():
    return CustomCommand()


class MyApplicationPlugin(ApplicationPlugin):
    def activate(self, application):
        application.command_loader.register_factory("my-command", factory)
```

{{% note %}}
It's possible to do the following to register the command:

```python
application.add(MyCommand())
```

However, it is **strongly** recommended to register a new factory
in the command loader to defer the loading of the command when it's actually
called.

This will help keep the performances of Poetry good.
{{% /note %}}

The plugin also must be declared in the `pyproject.toml` file of the plugin package
as an `application.plugin` plugin:

```toml
[tool.poetry.plugins."poetry.application.plugin"]
foo-command = "poetry_demo_plugin.plugin:MyApplicationPlugin"
```

{{% warning %}}
A plugin **must not** remove or modify in any way the core commands of Poetry.
{{% /warning %}}

#### Event handler

Plugins can also listen to specific events and act on them if necessary.

These events are fired by [Cleo](https://github.com/sdispater/cleo)
and are accessible from the `cleo.events.console_events` module.

- `COMMAND`: this event allows attaching listeners before any command is executed.
- `SIGNAL`: this event allows some actions to be performed after the command execution is interrupted.
- `TERMINATE`: this event allows listeners to be attached after the command.
- `ERROR`: this event occurs when an uncaught exception is raised.

Let's see how to implement an application event handler. For this example
we will see how to load environment variables from a `.env` file before executing
a command.

```python
from cleo.events.console_events import COMMAND
from cleo.events.console_command_event import ConsoleCommandEvent
from cleo.events.event_dispatcher import EventDispatcher
from dotenv import load_dotenv
from poetry.console.application import Application
from poetry.console.commands.env_command import EnvCommand
from poetry.plugins.application_plugin import ApplicationPlugin


class MyApplicationPlugin(ApplicationPlugin):
    def activate(self, application: Application):
        application.event_dispatcher.add_listener(COMMAND, self.load_dotenv)

    def load_dotenv(
        self,
        event: ConsoleCommandEvent,
        event_name: str,
        dispatcher: EventDispatcher
    ) -> None:
        command = event.command
        if not isinstance(command, EnvCommand):
            return

        io = event.io

        if io.is_debug():
            io.write_line("<debug>Loading environment variables.</debug>")

        load_dotenv()
```

### Using plugins

Installed plugin packages are automatically loaded when Poetry starts up.

You have multiple ways to install plugins for Poetry

#### The `plugin add` command

This is the easiest way and should account for all the ways Poetry can be installed.

```bash
poetry plugin add poetry-plugin
```

The `plugin add` command will ensure that the plugin is compatible with the current version of Poetry
and install the needed packages for the plugin to work.

The package specification formats supported by the `plugin add` command are the same as the ones supported
by the [add command](/docs/cli/#add).

If you no longer need a plugin and want to uninstall it, you can use the `plugin remove` command.

```shell
poetry plugin remove poetry-plugin
```

You can also list all currently installed plugins by running:

```shell
poetry plugin show
```

#### With `pipx inject`

If you used `pipx` to install Poetry you can add the plugin packages via the `pipx inject` command.

```shell
pipx inject poetry poetry-plugin
```

If you want to uninstall a plugin, you can run:

```shell
pipx runpip poetry uninstall poetry-plugin
```

#### With `pip`

If you used `pip` to install Poetry you can add the plugin packages via the `pip install` command.

```shell
pip install --user poetry-plugin
```

If you want to uninstall a plugin, you can run:

```shell
pip uninstall poetry-plugin
```

## PEP 610 support

Poetry now supports [PEP 610](https://www.python.org/dev/peps/pep-0610/) both in writing and in reading.

This should address issues and performances in determining the origin of the installed packages.

{{% note %}}
You might see updates when running the `install` or `update` commands due to Poetry fixing the existing `direct_url.json` files.
{{% /note %}}
