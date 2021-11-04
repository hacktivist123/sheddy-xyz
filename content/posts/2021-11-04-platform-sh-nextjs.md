---
template: post
title: Platform.sh & NextJS
slug: platformsh-and-nextjs
draft: false
date: 2021-11-03T17:24:51.219Z
description: >-
  A lot of React developers have decided to make use of NextJS, the open-source
  React framework to build their production UIs. This is because NextJS has
  simplified the React framework with extra features like hybrid static and
  server-side rendering, out of the box Typescript support, smart bundling and
  many others without any config.

  In today’s blog post, which is part of the 7 days of Platform.sh series, I will be discussing how Platform.sh supports NextJS and React developers to deploy their projects with ease.
category: sevendaysofplatformsh
tags:
  - Platformsh
  - NextJS
---

### Introduction

A lot of React developers have decided to make use of NextJS, the open-source React framework to build their production UIs. This is because NextJS has simplified the React framework with extra features like hybrid static and server-side rendering, out of the box Typescript support, smart bundling and many others without any config.

In today’s blog post, which is part of the 7 days of Platform.sh series, I will be discussing how Platform.sh supports NextJS and React developers to deploy their projects with ease.

### How does Platform.sh provide support for NextJS?

With the [release of Next.js 12](https://nextjs.org/blog/next-12), the framework has become one of the most popular React frameworks today amongst developers. Platform.sh is not left behind in the fun, there is first-class support available for NextJS applications on Platform.sh.The way Platform. sh is built, each [supported language](https://docs.platform.sh/languages.html)is provided as a container so this makes it easy for developers to deploy applications built with frameworks off these supported languages including NextJS.

With this kind of support, deploying a NextJS application is as easy as adding just three files to your app and you’re good to go.

### Setting up a NextJS Application for Deployment on Platform.sh

To deploy a NextJS application on Platform.sh, there are a few steps required. In this section I’ll be deploying a sample NextJS 12 application skeleton to showcase how painless it is to deploy your NextJS applications on Platform.sh, and to also showcase that irrespective of your NextJS version, Platform.sh is ready to deploy and host your application. To follow along with this guide you’ll need the following.

- [Next](https://nextjs.org/docs/getting-started#manual-setup) installed on your machine
- A [Platform.sh](https://platform.sh/) account with an SSH key configured on the account.
- The [Platform.sh CLI](https://docs.platform.sh/gettingstarted/introduction/template/cli-install.html) installed on your machine.

After installing and setting up all of the above, the next thing to be done is to create the demo NextJS application on to our machine, we can do that by running the following:

```bash
npx create-next-app@latest
```

After the application has been created, navigate into the folder of the project and run the following commands to start the development server on your machine.

```
cd <app name> && npm run dev
```

Navigate to *localhost:3000* in your browser to view the application. If the application was created and installed correctly, you should see the following displayed in your browser when you navigate to *localhost:3000*

![](https://lh5.googleusercontent.com/K0kAxxHqgPnM1dYyb8nzWop4UZb4HngjIszyBrFRcPfSGRDcCcfuQgiUcpbzWT7A0OWeY7qZhEHZE1UDo8e1e4OP8qLe4Qn2ZO5VJfmiidtb2lLvAMf9W-FfA82EQ8MOO1zNSxvA)

Now that we have created our application, the next step is to deploy the application on Platform.sh,

### Deploying the application on Platform.sh

The next thing we need to do is to deploy the application on the Platform.sh, we can do that by creating the following files and folders at the root of the application:

Create a .platform folder in the root folder of the application.

```bash
mkdir .platform
```
After creating the folder, we’ll need to create the following files inside the `.platform` folder: `services.yaml` and `routes.yaml`

```bash
cd .platform && touch .services.yaml routes.yaml
```

Inside theservices.yamlfile, we’ll be adding nothing to it since our Nextjs application is not going to be using any external services. Later, if you would like to add a database or caching service, this is the file where you would [declare the configuration](https://docs.platform.sh/configuration/services.html) of those containers.

Inside the \`routes.yaml\` file, we’ll need to define how a [Router container](https://docs.platform.sh/configuration/routes.html) will direct requests to our application. We can do that by adding the following to the routes.yaml file.
```yaml
# The routes of the project.
#
# Each route describes how an incoming URL is going
# to be processed by Platform.sh.

 "https://www.{default}/":
    type: upstream
    upstream: "next:http"

 "https://{default}/":
    type: redirect
    to: "https://www.{default}/"
```
The next thing we need to do is to create a `.platform.app.yaml` file in the root folder of our NextJS app. This file will contain all the necessary configurations our application needs to be deployed on Platform.sh.
```bash
touch .platform.app.yaml
```

The next thing we need to do is to specify our application name and steps [Platform.sh](http://platform.sh/) needs to follow to deploy our application. Inside the.platform.app.yaml file, we need to add the following config:
```yaml
# .platform.app.yaml

# The name of this application, which must be unique within a project.
name: next

# The type key specifies the language and version of your application.
type: 'nodejs:14'

dependencies:
    nodejs:
        yarn: "^1.22.0"

# The hooks that will be triggered when the package is deployed.
hooks:
    # The build hook runs after yarn has been downloaded.
    # No services are available but the disk is writeable.
    build: |
        yarn
        yarn build
        # Move committed files in soon-to-be mounts into temp directory.
        chmod +x handle_mounts.sh
        ./handle_mounts.sh
    # The deploy hook runs after your application has been deployed and started.
    # Code cannot be modified at this point but the database is available.
    # The site is not accepting requests while this script runs so keep it
    # fast.
    deploy: |
        # Move committed files from temp directory back into mounts.
        ./handle_mounts.sh
# The configuration of the application when it is exposed to the web.
web:
    commands:
        start: npx next start -p $PORT

# The size of the persistent disk of the application (in MB).
disk: 512

# The mounts that will be performed when the package is deployed.
mounts:
    # Next.js will try to cache files, so it must be writeable.
    '/.next':
        source: local
        source_path: 'next'
```
I’ll need to explain what is going on in the.platform.app.yaml file bit by bit so that we can understand what we are instructing Platform.sh to do.
```yaml
# .platform.app.yaml

# The name of this application, which must be unique within a project.
name: next

# The type key specifies the language and version for your application.
type: 'nodejs:14'

dependencies:
    nodejs:
        yarn: "^1.22.0"
```
In this part of the config file, we are specifying the name of the application as “next”, this can be whatever we want it to be. We are also specifying the language and version of the language our application uses. For dependencies, we are specifying that we need Platform.sh to use yarn as our preferred package manager instead of npm.

```yaml
# The hooks that will be triggered when the package is deployed.
hooks:
    # The build hook runs after yarn has been downloaded.
    # No services are available but the disk is writeable.
    build: |
        yarn
        yarn build
        # Move committed files in soon-to-be mounts into temp directory.
        chmod +x handle_mounts.sh
        ./handle_mounts.sh
    # The deploy hook runs after your application has been deployed and started.
    # Code cannot be modified at this point but the database is available.
    # The site is not accepting requests while this script runs so keep it
    # fast.
    deploy: |
        # Move committed files from temp directory back into mounts.
        ./handle_mounts.sh
```

In this part of the config file, we are using [build and deploy hooks](https://docs.platform.sh/configuration/app/build.html#hooks) to specify how we need Platform.sh to execute the build process and what to do after the deploy stage. If you haven’t noticed yet, we are executing a particular script in the build and deploy hook calledhandle_mounts.sh. Next.js needs to serve the.next folder after build to ensure we get a production worth build, the script is responsible for making that folder writable for Platform.sh. The thing is, our file system is set up to be read-only at runtime. Thankfully, the Platform.sh team noticed the issue where the `.next` folder isn’t available during deployment and causes the NextJS production server to fail. We wrote thehandle_mountsscript to handle this issue. Here is a direct link to the [script](https://github.com/platformsh-templates/nextjs/blob/master/handle_mounts.sh). This script will be placed in the root folder of your NextJS application before deployment to Platform.sh.
```yaml
# The configuration of the application when it is exposed to the web.
web:
    commands:
        start: npx next start -p $PORT

# The size of the persistent disk of the application (in MB).
disk: 512

# The mounts that will be performed when the package is deployed.
mounts:
    # Next.js will try to cache files, so it must be writeable.
    '/.next':
        source: local
        source_path: 'next'

```

In the final part of the config file, we are specifying a command that Platform.sh will need to start the application when it is being exposed to the web. We are also specifying the application disk size, this can be increased when needed. Lastly, we are mounting the .next folder so that it becomes writable and Next can serve the compiled files in the folder to start the production server. Mounting this folder is important because by default, during build and deployment, all services become unavailable and all files and folders become read-only.

Now that we are done setting up our NextJS application for deployment, we need to deploy it, even if it’s on a Friday. To deploy to Platform.sh all we need to do is to run the following commands after authentication in the CLI with our Platform.sh account:

```yaml
git add .
git commit -m "add platform.sh setup files"
git push platform master
```
So that’s it, we just deployed a NextJS application on Platform.sh.

![](https://lh6.googleusercontent.com/WppQezdl3P2UF-028-uVLcSqWhjF15FTJ7xkF-n2M7QMXRZ1eFzEMXYwUu9IKq-W_xl92aG9WWu8tnEhEySFy0rbNVuOgqcLA_BrbLLbUuTOlogTavtKhkpx75RbGrkxPmbdBQ0J)

To preview the site on our machine, we need to use any of the generated environment routes or run the following command to get the generated routes.

```bash
platform url
```

You can find a live preview of the site, [here](https://www.main-bvxea6i-wqfn3j325zrts.eu-3.platformsh.site/)

![](https://lh3.googleusercontent.com/N3uSHQUmORz9kS6EUyAsE6Wj_jFEx4oRFXneN__MGC5tcanQZZy1IC8X3ZGbJu_TWiJky9EIWMOJ3GuFWIHzay7wCEvLZ--Sxz-GG9uB7DGHnDUb1k0RCdxTW0ZROJc_zCqkRYbo)

Asides from just deploying, now we can add a custom domain to our NextJS application, create crons to update our application at specific times, add a CMS like Strapi or make any change of our choice to our NextJS site. This is the state of the art capabilities Platform.sh provide to development teams.

### Conclusion

Platform.sh supports a wide range of languages and frameworks to meet the deployment and hosting needs of every developer. In this blog post, I briefly discussed what NextJS is, how Platform.sh supports NextJS & React developers in deploying their applications and finally I took a simple NextJS application and demonstrated how to deploy it on Platform.sh. On the next day of the series, I will be discussing how to deploy Go applications on Platform.sh.
