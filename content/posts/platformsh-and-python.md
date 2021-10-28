---
template: post
title: Platform.sh & Django
slug: platformsh-and-django
draft: false
date: 2021-10-28T17:12:33.754Z
description: In today’s blog post, which is part of the 7 days of Platform.sh series, I will be discussing how Platform.sh supports Python and Django developers to deploy their projects with ease.
category: sevendaysofplatformsh
tags:
  - Python
  - Django
---

In today’s blog post, which is part of the 7 days of Platform.sh series, I will be discussing how Platform.sh supports Python and Django developers to deploy their projects with ease.

### How does Platform.sh support Python and Django Applications?

Platform.sh provides first-class support for applications built with Python applications and its frameworks like Flask and Django. All you need to do is to specify Python as the language type and whatever dependencies you might need (e.g pipenv) in your Platform.sh config file (.platform.app.yaml). Platform.sh also supports a broad range of application languages and frameworks, and provides starter kits for many popular applications, including Django. That makes getting started with Django on Platform.sh as simple as a push of a button.

### Setting up and Deploying a Django Application for Deployment on Platform.sh

Platform.sh supports both Django 2 and Django 3 applications so you can deploy your application without worrying about the version of Django you’re using.

To demonstrate the capabilities of Platform.sh when it comes to handling the deployment of Django applications, I'm going to be deploying a simple Django3 app which is also available as a template for everyone to use. To follow along with this guide you’ll need the following:

- A Platform.sh account with an SSH key configured on the account.

- The Platform.sh CLI installed on your machine.

The deployment process is pretty straightforward, all that is needed is to make sure there is a .platform folder in the root of the application and a .platform.app.yaml file that is responsible for the application deployment configuration. The .platform folder will always contain two important files, namely:

**`services.yaml` file -** In this file, the configuration for any external service that the application might need will be done here. For the application that will be deployed, it uses a PostgreSQL database. We can add a PostgreSQL container to our cluster by adding the following to our `services.yaml` file:

```yaml
# The services of the project.
# Each service listed will be deployed in its own container as part of your
# Platform.sh project.
#

db:
  type: postgresql:12
  disk: 1024
```

In the above file we are specifying the database type to be PostgreSQL version 12 and the disk space to be 1024MB.

**`routes.yaml` file -** In this file, the configuration on how to access the application in our browser will be done. So if we need to create redirects, subdomains etc. all of that configuration will be done in this file. For the application that will be deployed, the routes.yaml file will look like this:

```yaml
# routes.yaml
# The routes of the project.
#
# Each route describes how an incoming URL is going to be processed by Platform.sh.
#
# See https://docs.platform.sh/configuration/routes.html

'https://{default}/':
  type: upstream
  upstream: 'django:http'

'https://www.{default}/':
  type: redirect
  to: 'https://{default}/'
```

In the above file, we are simply informing Platform.sh to direct all traffic directly to the `django` application, redirecting traffic that hits the `www` subdomain to it as well. You’ll notice that we do not have to include any specific domains in this configuration, and instead are just including a placeholder called `default`. With this placeholder, traffic will work identically across our development environments, even when we take the site live and add our domain.

The next thing to do is to create a .platform.app.yaml file in the root folder of the application. The .platform.app.yaml file will contain all of the actions our Platform.sh needs to carry out in order to deploy our application successfully.

The first thing we need to do in the .platform,app.yaml file is the specify the application name and the language type like this:

```yaml
# .platform.app.yaml

name: 'django'

# The runtime the application uses.
type: 'python:3.9'
```

The above describes where our application will be built and deployed: in a container that contains Python 3.9 as its primary runtime.

The next thing to do is to specify the build dependencies needed for the application to run and the external services the application will need access to.

```yaml
# .platform.app.yaml

# The build-time dependencies of the app.
dependencies:
  python3:
    pipenv: '2018.10.13'

# The relationships of the application with services or other applications.
#
# The left-hand side is the name of the relationship as it will be exposed
# to the application in the PLATFORM_RELATIONSHIPS variable. The right-hand
# side is in the form `<service name>:<endpoint name>`.
relationships:
  database: 'db:postgresql'
```

We will use pipenv later on in the build hook when we actually begin installing our dependencies. As for `relationships`, it’s useful to remember that our final deployed application - say, the production environment - is actually a collection of containers that we’ve been describing so far. By default, none of these containers are accessible to the outside world (see routes.yaml), nor can they access each other unless defined explicitly. The `relationships` provide access to a service container (our database) to our application (django). With this definition, our app can query freely via the alias `database`.

Next up, we need to describe a configuration for the application when it is exposed to the web. We would need to configure things like web socket type if the application needs one to connect to a web server, and the command needed to start our application on the server - in our application’s case, we need gunicorn to start the application. We can do it like this:

```yaml
# The configuration of app when it is exposed to the web.
web:
  # Whether your app should speak to the webserver via TCP or Unix socket
  # https://docs.platform.sh/configuration/app-containers.html#upstream
  upstream:
    socket_family: unix
  # Commands are run once after deployment to start the application process.
  commands:
    start: 'gunicorn -w 4 -b unix:$SOCKET myapp.wsgi:application'
  locations:
    '/':
      passthru: true
    '/static':
      root: 'static'
      expires: 1h
      allow: true
```

We need to also configure the disk space and mounts that the application needs. On Platform.sh everything becomes read-only at deploy time, so if you need to write to a particular file at runtime, you’ll need to mount it. In the Django case, we need to be able to write to logs just in case the application crashes. We can do it like this:

```yaml
# The size of the persistent disk of the application (in MB).
disk: 512

# Set a local R/W mount for logs
mounts:
  'logs':
    source: local
    source_path: logs
```

Lastly, we need to specify certain commands that the application needs to build and deploy correctly. In Platform.sh you can do that be using build and deploy hooks like this:

```yaml
# The hooks are executed at various points in the lifecycle of the application.
hooks:
  # The build hook runs before the application is deployed, and is useful for
  # assembling the codebase.
  build: |
    pipenv install --system --deploy
    mkdir logs
    python manage.py collectstatic
    rm -rf logs
  deploy: |
    python manage.py migrate
```

And that’s all we need to do to set up the application for deployment to Platform.sh. Here is the complete .platform.app.yaml file

```yaml
name: 'app'
type: 'python:3.9'
dependencies:
  python3:
    pipenv: '2018.10.13'
relationships:
  database: 'db:postgresql'
web:
  upstream:
    socket_family: unix
  commands:
    start: 'gunicorn -w 4 -b unix:$SOCKET myapp.wsgi:application'
  locations:
    '/':
      passthru: true
    '/static':
      root: 'static'
      expires: 1h
      allow: true
disk: 512
mounts:
  'logs':
    source: local
    source_path: logs
hooks:
  build: |
    pipenv install --system --deploy
    mkdir logs
    python manage.py collectstatic
    rm -rf logs
  deploy: |
    python manage.py migrate
```

Now that we are done setting up our Django application for deployment, we need to deploy it, even if it’s on a Friday :). To deploy to Platform.sh all we need to do is to run the following commands after authentication in the CLI with our Platform.sh account:

Move into the repo root folder and run the following command:

```bash
platform:project create
```

An interactive input will be displayed asking for various information concerning your project, select the default values and in the plan section choose any plan you want. After that, your project will be created.

The next thing is to deploy the application by running the following commands:

```bash
git add .
git commit -m "add platform.sh setup files"
git push platform master
```

This command will initiate a deployment process and when it is done it’ll generate a temporary URL that can be used to preview the application in the browser.

Here is a screenshot of the deployment completed on the Platform.sh console
![](https://lh5.googleusercontent.com/OvjHSGlCD90UjS9xV9nMa6MaWhqkxZPwbJdjqLKKBuP6yXWQy1jRpBTrgqzHbH7vCEX-KrgNg_dC8tlktRTEKR7ltmQkMuEiaHElV3WG0X1xBXLkTwywWiGWk5LJfVMPeD_R3IBD)

Here is also a screenshot of our application live on the browser.

![](https://lh6.googleusercontent.com/7nn7qDS3rfoS21puS93ZTHsJUEvSOwA4L-qpTng-wcPInSpZNFC1mK7mbkqP0b4wO9WRu1YyoFyQoCz3d7-OYtzRdK7op74NaNdb0RHlBAxJgtccoCaeCxYBZfARkzrFiVl8jbh6)

So that’s it, we just deployed a Django application on Platform.sh in very few steps.

### Conclusion
In today’s blog post of the 7days of Platform.sh series, I configured and deployed a Django application, I also explained how Platform.sh supports Python and Django applications. On the next day of the series, I will be discussing how to assess the performance of a Django application deployed on Platform.sh with Blackfire.
