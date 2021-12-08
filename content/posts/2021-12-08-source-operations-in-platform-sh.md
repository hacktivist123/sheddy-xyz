---
template: post
title: Source Operations in Platform.sh
slug: source-operations-on-platformsh
draft: false
date: 2021-11-04T17:36:00.000Z
description: >-
  In today’s blog post, which is the final blog post of the 7 days of Platform.sh series, I will be discussing what a source operation is on Platform.sh, the problem it solves and how to set up one for any of your applications deployed on Platform.sh.
category: sevendaysofplatformsh
tags:
  - platformsh
  - automation
---

## Introduction

We, humans, enjoy automating processes a lot and we try to do it as much as we possibly can, basically because it saves a lot of time and it’s pretty cool.

As developers, we find joy in automating several processes that used to be done manually. On Platform.sh we can also do a bit of automation around how your app is deployed, maintained, updated etc. This is possible with what is called a [Source operation](https://docs.platform.sh/configuration/app/source-operations.html).

In today’s blog post, which is the final blog post of the 7 days of Platform.sh series, I will be discussing what a source operation is on Platform.sh, the problem it solves and how to set up one for any of your applications deployed on Platform.sh.

## What is a Source Operation?

A source operation is a feature in Platform.sh that allows developers to automate certain processes that directly affect their application codebase. It’s an operation that runs in an isolated build container. It has access to the code base, and it can be used to make changes to your codebase.

When a source operation is triggered, it executes a series of instructions that result in a well-defined commit to the environment it is executed in.

The most common use case for a source operation is having a source operation for updating the dependencies of your application at a particular time of the day.

### Source Operations for Improving Application Development Lifecycle

My favorite aspect of source operation is how you can use cron to automatically run your source operations, this is probably the most popular way source operation is being used.

Here is a problem statement and how source operation can help solve it. Say you have a really large Node.js application using several libraries, these libraries are updated by their authors at several intervals.

The changes to the libraries might go unnoticed by you because you cannot possibly monitor every breaking change or patch at all times.

How can the problem of manually updating your application dependencies be solved? This is where a source operation comes into play. With Source operations, you can easily write a script specifically for automatically updating your application dependencies at various points in time using a cron, these points in time can be however you want it, it could be daily, biweekly or even monthly.

## Source Operation In Action

The following is a typical example of a source operation:

```yaml
operations:
  update_dependencies:
    command: |
      [ if "$PLATFORM_ENVIRONMENT_TYPE" == "development" ]; then
             composer update -W (OR) yarn upgrade (OR) pipenv update
      fi
```

In the above, we are specifying a source operation nameupdate_dependencies,this source operation when executed checks if the Platform.sh environment type is in development and then runs an update command, depending on the type of application.

To better understand what a source operation is and how it is being used in the wild (real-world), here is how we are using it at Platform.sh to automatically run specific bash scripts at certain points in time using a cron.

```yaml
#.platform.app.yaml
source:
  operations:
    update-dependencies:
      command: .platform/source-operations/dependencies.sh
    update-upstream:
      command: .platform/source-operations/upstream.sh
timezone: America/New_York
crons:
  update-dependencies:
    cmd: ./scripts/update-dependencies.sh
    spec: 19 1 * * *
  update-upstream:
    cmd: ./scripts/update-upstream.sh
    spec: 11 1 * * 0
```

Let’s break down the above script bit by bit, so that we can understand what this source operation does.

```yaml
source:
  operations:
    update-dependencies:
      command: .platform/source-operations/dependencies.sh
    update-upstream:
      command: .platform/source-operations/upstream.sh
```

Over here, we have two source operations,update-dependencies, andupdate-upstream. In this case, we are specifying the directory to a bash script somewhere in the application that needs to get executed. This makes it easier to execute bulky operations and encourage clean code.

The first source operationupdate-dependencieslooks like this and it written as a bash script:

```bash
#!/usr/bin/env bash

set -e

yarn upgrade

git add .
STAGED_UPDATES=$(git diff --cached)
if [ ${#STAGED_UPDATES} -gt 0 ]; then
    git commit -m "Update dependencies."
else
    echo "No dependency updates found. Skipping."
fi
```

This source operation is responsible for running a `yarn upgrade` command in order to update the application dependencies, then running the` git add` command. It then checks to see if there are any changes to the application dependencies, if there are it commits the changes, if there aren’t it skips that process.

The second source operation `update-upstream` looks like this and it is written as a bash script also:

```bash
#!/usr/bin/env bash

set -e

UPSTREAM=$UPDATES_REMOTE

# Fetch upstream.
echo "- Retrieving upstream."
git remote add upstream $UPSTREAM
git fetch upstream
git merge --allow-unrelated-histories -X ours upstream/master

# add and commit
git add .
STAGED_UPDATES=$(git diff --cached)
if [ ${#STAGED_UPDATES} -gt 0 ]; then
    git commit -m "Apply upstream updates."
else
    echo "No upstream updates found. Skipping."
fi
```

This source operation is responsible for fetching the application upstream from a remote and merging it with the updates from the upstream. The source operation also checks if there aren't any new changes from the upstream, if there aren’t it skips that process.

The rest of the .platform.app.yaml file is basically a cron that executes a script that runs the source operations we have defined below on a defined schedule.

```yaml
imezone: America/New_York
crons:
  update-dependencies:
    cmd: ./scripts/update-dependencies.sh
    spec: 19 1 * * *
  update-upstream:
    cmd: ./scripts/update-upstream.sh
    spec: 11 1 * * 0
```

We are specifying a timezone for the cron to use and then we are initializing a cron for the two operations. The first operation will run at 1:19 am America/New_York time every day, while the second operation will run at 1:11 am America/New_York time every 7 days.

Let’s talk about both of the scripts that are being executed by the cron and what they do when executed.

The first script is responsible for updating the dependencies and it is a bash script that looks like this:

```bash
#!/usr/bin/env bash
set -e
# Update dependencies every day (1:19am EST).
if [ "$PLATFORM_BRANCH" = "$UPDATES_ENVIRONMENT" ]; then
    platform backup:create --yes --no-wait
    platform sync code data --yes --no-wait
    platform source-operation:run update-dependencies
fi
```

Over here, when this script is executed, it checks if it’s on the `UPDATES_ENVIRONMENT` branch before executing a bunch of commands. This allows us to ensure that while we can look for and commit updates when they are available, the cron will only run on a specific development environment that stays active at all times for this one purpose.

The first command creates a backup of the environment, then syncs the application code from production, and finally runs the source operation with the following command

```bash
platform source-operation:run <source operation name>
```

using the Platform.sh CLI within the application container

The second script is responsible for updating the application from upstream once a week and it is also a bash script that looks like this:

```bash
#!/usr/bin/env bash

set -e

# Update template from upstream once a week (1:11am EST).
if [ "$PLATFORM_BRANCH" = "$UPDATES_ENVIRONMENT" ]; then
    platform backup:create --yes --no-wait
    platform sync code data --yes --no-wait
    platform source-operation:run update-upstream
fi
```

Just like the first script, it checks if it’s on the `UPDATES_ENVIRONMENT` branch before executing a bunch of commands. The first command creates a backup of the environment, then syncs the application code, and finally runs the source operation with the following command

```bash
platform source-operation:run <source operation name>
```

In both cases, if updates result in changes to the application, a new commit will be pushed to the environment, which will be rebuilt and deployed. From here, we can set up a notification to alert the team that there are updates ready to review and merge manually. Alternatively, we can set up an extensive set of tests that would enable minor updates to merge automatically, alerting us only when a deployment resulting from an update fails and requires investigation.

With the power of the source operation, we can automatically make changes to our application codebase directly without having to do any extra work.

## Conclusion

Automation is part of every software development team workflow, Platform.sh provides source operation to make sure that teams deploying their projects on Platform.sh can also enjoy the benefits of automation. In this blog post, I briefly discussed what source operation is, how it solves automation problems for software development teams and finally, I showcased how source operation is being used for real-world tasks.
