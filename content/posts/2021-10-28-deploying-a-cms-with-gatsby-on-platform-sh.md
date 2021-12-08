---
template: post
title: Deploying a CMS with Gatsby on Platform.sh
slug: deploying-a-cms-with-gatsby-on-platformsh
draft: false
date: 2021-10-28T17:12:33.754Z
description: >-
  On day one of the 7 days of the Platformsh series, I discussed how
  Platform.sh helps Gatsby and React developers host their Gatsby-based web
  application frontend. Today, we’ll be discussing how platform.sh supports the
  deployment of multiple applications as a single project, we’ll be using Gatsby
  and a Drupal CMS as a case study.
category: sevendaysofplatformsh
tags:
  - Gatsby
  - Drupal
---

One of the most powerful capabilities of Platformsh is the ability to deploy multiple applications as a single project. Platform.sh supports building multiple applications per project (for example RESTful web services with a front-end, or a main website and a blog). So unlike other cloud hosting platforms where you’d need to deploy the backend/CMS elsewhere, Platformsh gives you the flexibility to manage all your applications architecture in one place.

On day one of the 7 days of the Platformsh series, I discussed how Platform.sh helps Gatsby and React developers host their Gatsby-based web application frontend. Today, we’ll be discussing how platform.sh supports the deployment of multiple applications as a single project, we’ll be using Gatsby and a Drupal CMS as a case study.

### Multi-apps on Platform.sh

On Platform.sh multi-apps can be easily deployed with ease just like the way you’d deploy a single application. Platformsh use containers to deploy your multi apps and the way they are deployed is dependent on the approach you decide to use, you get to structure the way your application routing works, external data services your application use.

Here is a diagram of a typical multi-application.

![](https://lh5.googleusercontent.com/DKH3dwyvzbl7bZBy7LuiQMVMC8DUqHHWm9iAgKV4-9gD-8NJR04S8xwe0obWE4TcSuOmohB4RszGD_BSSfe7Qal4hA-9ItfSlLG745SPIhAjnV6i9udpk50j5TrQ5CEBZHyMzW81)

This diagram shows a PHP application with a REST API built also with PHP, a router is defined that specifies the link to the API and a link to the main application. The main app uses some external data services like Redis, MySQL etc.

There are various ways to configure multi-apps on Platform.sh, you can read more about multi-apps on Platform.sh in the [official documentation](https://docs.platform.sh/configuration/app/multi-app.html).

### Headless CMS Pattern on Platformsh

Platform.sh supports using the Headless CMS architecture to build applications, if you have a headless CMS that you plugged to a frontend, you can easily deploy it on Platform.sh.

Gatsby and Drupal are two entirely different platforms, they are each a single application but when they are put together, they are called multi-apps on Platform.sh and they both follow the headless CMS pattern. Platform.sh will process each application according to the instructions specified in the .platform.app.yaml

### Deploying a Gatsby Frontend and Drupal CMS on Platformsh

To demonstrate how Platform.sh handles multi apps, decoupled apps and headless CMS, I’ll be deploying a Gatsby frontend with a Drupal backend on Platform.sh. I’ll be making use of a Platform.sh [Gatsby and Drupal template ](https://github.com/platformsh-templates/gatsby-drupal)that is available for everyone to use.

Here are a few prerequisites to meet in order to follow along:

- Clone the [repo](https://github.com/platformsh-templates/gatsby-drupal)
- A [Platform.sh](https://platform.sh/) account with an SSH key configured on the account.
- The [Platform.sh CLI](https://docs.platform.sh/gettingstarted/introduction/template/cli-install.html) installed on your machine.

**_Note: For you to be able to deploy multi-apps, you’ll need to have at least a medium plan due to resource allocation constraints._**

Now that we’ve cloned the repo, we can deploy it by carrying out the following steps:

Move into the repo root folder and run the following command:

```shell
platform:project create
```

An interactive input will be displayed asking for various information concerning your project, select the default values and in the plan section choose “medium”. After that, your project will be created.

The next thing to do in order to deploy our application is to run the following commands:

```shell
git add .
git commit -m "add platform.sh files"
git push platform master
```

In order to see the application deployed live, follow the instructions in the [README](https://github.com/platformsh-templates/gatsby-drupal#readme) .

Now that we’ve deployed our application, I'm going to explain what is going on in the .platform folder at the root of the template.

In the .platform folder, it usually contains and `routes.yaml` and `services.yaml` file, the `routes.yaml` file looks like this:

```yaml
'https://www.{default}/':
  type: upstream
  upstream: 'gatsby:http'

'https://{default}/':
  type: redirect
  to: 'https://www.{default}/'

'https://backend.{default}/':
  type: upstream
  upstream: 'drupal:http'
  cache:
    enabled: true
    # Base the cache on the session cookie and custom Drupal cookies. Ignore all other cookies.
    cookies: ['/^SS?ESS/', '/^Drupal.visitor/']

'https://www.backend.{default}/':
  type: redirect
  to: 'https://backend.{default}/'
```

This is where all the magic happens, here we are defining how to access the fronted and the backend of the application. If you look closely, we can access the drupal backend by using the <https://backend.xyz.com> and we can access the gatsby frontend by accessing the site normally via https//.xyz.com. Platform.sh makes it very easy to define the routing for your application via the `routes.yaml` file

The services.yaml file looks like this:

```yaml
# The services of the project.
#
# Each service listed will be deployed
# to power your Platform.sh project.

db:
  type: mariadb:10.4
  disk: 2048

cache:
  type: redis:5.0
```

Here we are specifying a db for the drupal app as mariadb/mysql and the cache type to be redis.

### Adding a Drupal Backend to a Gatsby application

Platform.sh takes care of infrastructure configuration for you, which makes it easy to quickly deploy a Gatsby app with a few yaml files with minimal definition. In this section, we’re going to modify our app with two additional features that makes Platform.sh unique. First, we’re going to leverage it’s environment creation capabilities, which will allow us to branch and create an exact copy of our Gatsby app in an isolated development environment to work on. Second, Platform.sh is polyglot and composable. In the development environment I just created, I want to build a headless CMS pattern i.e i’ll like to add a CMS like drupal. Platform.sh supports PHP as well as Node.js out of the box, and adding a backend Drupal app is as straightforward as adding a subdirectory containing your Gatsby application.

#### Branching on Platform.sh

One of the most powerful capabilities of Platform.sh is the ability to branch your app into an isolated environment and make your development changes where necessary. Just like in git where you can create branches from your original project. You can do that by running the following command:

`Platform branch <name of branch>`

After you run the above command, platform.sh will take a copy of the main production branch and create a copy of that branch into the new branch. After this, the copy of the production branch will be deployed oin the new branch that has been created.

Here is a screenshot of the whole process in action.

![alt_text](https://lh6.googleusercontent.com/hrUDbzY5xSLlxs357Ev0EOmx0mJDlAjVoTYuHQYaJgdIMmayil3s6KrVfduQxvZuPpV979z8zdvxRs1_wBYKzpVTWWenIzMh3xU1Heysqr-itNpLa3J2EZqZldczleaTvXEkZl9-)

Here is a screenshot of the branches available for our project on the Platform.sh console.

![alt_text](https://lh5.googleusercontent.com/W7TA0nxV7GI1jiMo06mk2G-oF0iTsRSbb3VfI0yCYEnGBJZ2CbNrDEfL-mSFOohXn3DGBR9D4XNRoFgnKmJgVie_zVzC4RLXMlKb6vzkjZi6JmqUSeUcPp0QKL6YhNXJVifvPcDr)

If you look at the screenshot, you’ll see that there’s a **master** branch and a **add-drupal-backend** branch. I can easily make changes to my application on the **add-drupal-backend** branch deploy it and see it live without it affecting the master branch.

### Conclusion.

In today’s blog post of the 7days of Platformsh series, I deployed a Gatsby application with a Drupal backend, I also explained what multi-apps in Platform.sh is and the super cool branching capabilities that Platform.sh has. On the next day of the series, I will be discussing how Platform.sh supports Django deployment with ease.
