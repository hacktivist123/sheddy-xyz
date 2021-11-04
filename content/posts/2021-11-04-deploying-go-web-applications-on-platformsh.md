---
template: post
title: Deploying Go Web Applications on Platformsh
slug: deploying-go-web-applications-on-platformsh
draft: false
date: 2021-11-03T17:24:12.055Z
description: >-
  Go is a statically typed, compiled language with an emphasis on easy
  concurrency and network services. Many software engineering teams today use Go
  for the backend of their web applications because it is efficient, fast,
  simple and reliable.


  In today’s blog post, which is part of the 7 days of Platform.sh series, I will be discussing how Platform.sh supports Go developers to deploy their projects with ease.
category: sevendaysofplatformsh
tags:
  - Platformsh
  - Go
---

### Introduction

Go is a statically typed, compiled language with an emphasis on easy concurrency and network services. Many software engineering teams today use Go for the backend of their web applications because it is efficient, fast, simple and reliable.

In today’s blog post, which is part of the 7 days of Platform.sh series, I will be discussing how Platform.sh supports Go developers to deploy their projects with ease.

### How does Platform.sh provide support for Go?

Platform.sh provides support for developers to build, run and scale Go applications. Platform.sh is equipped with a toolbox for Go developers that includes building sites and apps faster with native support for Go modules, Instant staging environments for continuous deployments, easy upgrading of Go versions without any add-ons or management. Platform.sh sees Go as a first-class citizen amongst it’s stack of language support.

With this kind of support, deploying a Go application is as easy as adding just three files to your app and you’re good to go.

For the steps below, you will need:

- [Go](https://golang.org/doc/install) installed on your machine

- Clone the [repo](https://github.com/platformsh-templates/golang)

- A[ Platform.sh](https://platform.sh/) account with an SSH key configured on the account.

- The [Platform.sh CLI](https://docs.platform.sh/gettingstarted/introduction/template/cli-install.html) installed on your machine.

### Connecting to the Platform.sh Account From the CLI & Creating a New Project

After installing the Platform.sh CLI, the next thing to do is to connect the Platform.sh account with the CLI by running the following command in my terminal:

```
platform
```

The above command will ask you to authenticate and then direct you to allow access to your account on a localhost page. If the authentication is successful, we’ll see the following in the terminal window.

![](https://lh3.googleusercontent.com/uCBB6Dho7G_DKu3IcHvUTCiUAQhdtV5cHwDxl3Qbjo5bkOWoo6icNpWknINmckeTpfnCFcJQJjbx-hGzEPC80qScbicOXA8obI72wv6narVB-kmph8roIL0W-dfBddStwVmpXA3f)

After connecting to your Platform.sh account via CLI, the next step is to create a project, you can do that by running the following command:

```
platform project:create
```

An interactive input will be displayed asking for various information concerning your project, select the default values and in the plan section choose any play type. After that, your project will be created.

### Setting up a Simple Go Application for Deployment on Platform.sh

To deploy a Go application on Platform.sh, there are a few steps required. In this section, I’ll be deploying an[ application](https://github.com/platformsh-templates/golang) that is also a Platform.sh template to showcase how painless it is to deploy your Go applications on Platform.sh.

After doing all the necessary setup, we’ll need to navigate into the repo and deploy the application. But before we do that I'll be explaining the files needed to be able to deploy an application to Platform.sh.

This Go demo already has been set up for deployment to Platform.sh, It has the following files and folders added to it.

- `.platform` folder, which will contain the `routes.yaml` and `services.yaml` files

- `.platform.app.yaml` file, which will contain all our application-specific configurations

**.platform folder**

This folder contains two files: `routes.yaml` and `services.yaml`. The routes.yaml file contains all the necessary URL configurations the application needs, from redirects to a domain name to external services.

In the routes.yaml file, the following is specified:

```yaml
# The routes of the project.
#
# Each route describes how an incoming URL is going
# to be processed by Platform.sh.

'https://{default}/':
  type: upstream
  upstream: 'golang:http'

'https://www.{default}/':
  type: redirect
  to: 'https://{default}/'
```

(You can read more about routes [here](https://docs.platform.sh/configuration/routes.html).)

The `services.yaml` file contains a specification of whatever service our application will need to work properly; it could be a database service or a cache service like Redis. The Go application uses an SQL database, so it has to be specified in this file.

```yaml
# The services of the project.
#
# Each service listed will be deployed
# to power your Platform.sh project.

db:
  type: mariadb:10.4
  disk: 1024
```

(You can read more about services [here](https://docs.platform.sh/configuration/services.html).)

**.platform.app.yaml** file

This file consists of all the configurations for our application. In the .platform.app.yaml file, we’ll write the following:

```yaml
# The name of this app. Must be unique within a project.
name: golang

# The runtime the application uses.
type: golang:1.15

# The hooks executed at various points in the lifecycle of the application.
hooks:
  build: |
    go build -o bin/app

relationships:
  database: 'db:mysql'

# The configuration of app when it is exposed to the web.
web:
  upstream:
    socket_family: tcp
    protocol: http

  commands:
    # If you change the build output in the build hook above, update this line as well.
    start: ./bin/app

  locations:
    /:
      # Route all requests to the Go app, unconditionally.
      # If you want some files served directly by the web server without hitting Go, see
      # https://docs.platform.sh/configuration/app/web.html
      allow: false
      passthru: true

# The size of the persistent disk of the application (in MB).
disk: 1024
```

I’ll need to explain what is going on in the `.platform.app.yaml` file bit by bit so that we can understand what we are instructing Platform.sh to do.

```yaml
# The name of this app. Must be unique within a project.
name: golang

# The runtime the application uses.
type: golang:1.15
```

In this part of the config file, the name of the application, **“golang”** is specified. The language and version of the language the application uses is also specified.

```yaml
# The hooks executed at various points in the lifecycle of the application.
hooks:
  build: |
    go build -o bin/app

relationships:
  database: 'db:mysql'
```

In this part of the config file, a build hook is specified, this command will run during the build phase of the application lifecycle. We are also letting Platform.sh know that this application uses a MySQL database just like we specified in the \`services.yaml\` file.

```yaml
# The configuration of app when it is exposed to the web.
web:
  upstream:
    socket_family: tcp
    protocol: http

  commands:
    # If you change the build output in the build hook above, update this line as well.
    start: ./bin/app
```

In this part of the config file, the protocol and socket type that the application should use when exposed to the web is specified. A command to start the application on the server is also specified.

```yaml
locations:
  /:
    # Route all requests to the Go app, unconditionally.
    allow: false
    passthru: true

# The size of the persistent disk of the application (in MB).
disk: 1024
```

In this part of the config, configurations are specified to route the requests for the application and also the disk size for the application is also specified.

Now that the application has been configured and all the necessary files have been added, all we need to do is to push the application.

### Deploying The Go Application on Platform.sh

Now that we are done setting up the Go application for deployment, we need to deploy it. To deploy to Platform.sh all we need to do is to run the following commands:

```
git add .
git commit -m "add platform.sh setup files"
git push platform master
```

So that’s it, we just deployed a Go application on Platform.sh.

![](https://lh5.googleusercontent.com/iGFyJ9s7oQ16MxFgyCaTXVKsVIzL_9uoqMjReM8Gbd_7Xyd-AOk_CNmfS9JXStZHTLNfVTx5Kc__FsqrSmzjRtuGnHFGU6Hv34tTDJMvxoD4ZmRkZ_dyNG-wsjaWAnQSRXFdAENc)

To preview the site on our machine, we need to use any of the generated environment routes or run the following command to get the generated routes.

```bash
platform url
```

You can find a live preview of the site,[here](https://master-7rqtwti-ocex7uze3hboo.eu-3.platformsh.site/)

![](https://lh3.googleusercontent.com/Cyx7uFT76NAcW3p_7mkb9tph7AqTctqEnzPR792LZKKIY6NWFDa5qWAu85fDLd20uJ2jx3Da7829rJz4VN5VRDQB297KLpWteEG_sQCcu-5gRO9JT1Wrf99P0QS1Hl2TM6GEbl9w)Aside from just deploying, now we can add a custom domain to our Go application, create crons to update our application at certain times, and add a frontend of our choice to the application.

### Conclusion

Platform.sh supports a wide range of languages and frameworks to meet the deployment and hosting needs of every developer. In this blog post, I briefly discussed what Go is, how Platform.sh supports Go developers in deploying their applications and finally I took a simple Go application and demonstrated how to deploy it on Platform.sh. On the final day of the series, I will be discussing fleets & source operations in Platform.sh.
