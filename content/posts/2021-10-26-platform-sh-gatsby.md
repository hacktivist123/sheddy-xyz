---
template: post
title: Platform.sh & Gatsby
slug: platformsh-gatsby
draft: false
date: 2021-10-26T16:00:54.141Z
description: On day one of the 7 days of Platform.sh series, I’ll be discussing
  how Platform.sh helps Gatsby and React developers host their Gatsby-based web
  application frontends.
category: SeveDaysOfPlatformsh
tags:
  - Platformsh
---
Platform.sh is a complete end-to-end cloud Platform-as-a-Service (PaaS) solution for development teams. It lets you build, deploy, and host whatever kind of web application website you’re building on a single platform. Platform.sh handles all the infrastructure needs of a development team, allowing developers to spend more of their time building the application.

On day one of the 7 days of Platform.sh series, I’ll be discussing how Platform.sh helps Gatsby and React developers host their Gatsby-based web application frontends.

## How does Platform.sh Provide support for Gatsby?

Platform. sh provides first-class support for any framework built on top of Node.js. All you need to do is to specify Node.js as the language type in your Platform.sh config file (.platform.app.yaml). The way Platform. sh is built, each [supported language](https://docs.platform.sh/languages.html) is provided as a container so this makes it easy for developers to deploy applications built with frameworks off these supported languages including Gatsby.\
With this kind of support, deploying a Gatsby frontend is as easy as adding just three files to your Gatsby app and you’re good to go.

## Setting up a Gatsby Application for Deployment on Platform.sh

There are a few steps required to deploy your Gatsby application on Platform.sh, in this section I’ll be deploying this [Gatsby app](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog) to showcase how painless it is to deploy your Gatsby application on Platform.sh and because Gatsby v4 was just released. To follow along with this guide you’ll need the following:

* [Gatsby](https://www.gatsbyjs.com/) installed on your machine.

* A [Platform.sh](https://platform.sh/) account with an SSH key configured on the account.

* The [Platform.sh CLI](https://docs.platform.sh/gettingstarted/introduction/template/cli-install.html) installed on your machine.

After installing all of the above, the next thing to be done is to install the Gatsby Starter Blog template on your machine, we can do that by running the following command:

**`npx gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog`**

The above command will install Gatsby on your machine if you don’t have it already and it’ll clone the starter template repo onto your machine and install it 

To preview the starter template on your local machine, run the following command:

`cd gatsby-starter-blog && gatsby develop`

The next thing we need to do is to deploy the application on the platform.sh, we can do that by creating the following files and folders at the root of the application:

Create a .platform folder in the root folder of our application.

**`mkdir .platform`**

After creating the folder, we’ll need to create the following files inside the `.platform` folder: `services.yaml` and `routes.yaml`

**`cd.platform && touch .services.yaml routes.yaml`**

Inside the `services.yaml` file, we’ll be adding nothing to it since our Gatsby site is not going to be using any external services. Later, if you would like to add a database or caching service, this is the file where you would [declare the configuration](https://docs.platform.sh/configuration/services.html) of those containers.

Inside the `routes.yaml` file, we’ll need to define how a [Router container](https://docs.platform.sh/configuration/routes.html) will direct requests to our application. We can do that by adding the following to the routes.yaml file.

```
# The routes of the project.
#
# Each route describes how an incoming URL is going
# to be processed by Platform.sh.
"https://www.{default}/":
  type:upstream
  upstream: "gatsby:http"
"https://{default}/":
  type:redirect
  to:"https://www.{default}/"
```

The next thing we need to do is to create a `.platform.app.yaml` file in the root folder of our Gatsby site. This file will contain all the necessary configurations our application needs in order to be deployed on Platform.sh.

|     |
| --- |

The next thing we need to do is to specify our application name and steps [Platform.sh](http://platform.sh/) needs to follow to deploy our application. Inside the `.platform.app.yaml` file, we need to add the following config:

|     |
| --- |

I’ll need to explain what is going on in the.platform.app.yaml file bit by bit so that we can understand what we are instructing Platform.sh to do.

|     |
| --- |

In this portion of the config file, we are specifying the name of the application as “gatsby”, this can be whatever we want it to be. We are also specifying the language and version of the language our application uses. For dependencies, we are specifying that we need Platform.sh to use yarn as our preferred package manager instead of npm.

|     |
| --- |

In this portion of the config file, we are using[build hooks](https://docs.platform.sh/configuration/app/build.html#build-hook)to specify how we need Platform.sh to execute the build process and we have also specified the disk size for our application.

|     |
| --- |

Personally, this is the most interesting part of the config file because this is where we have to specify how Platform.sh exposes our application to the web. In the locations section, we are specifying the root folder our bundled application can be found as “public” and the entry file to be “index.html”. We are setting scripts to “false” because we do not need to run scripts and finally we are setting allow as ”true” because we want to allow uploaded files to be served.

Now that we are done setting up our Gatsby application for deployment, we need to deploy it, even if it’s on a Friday. To deploy to Platform.sh all we need to do is to run the following commands after authentication in the CLI with our Platform.sh account:

|     |
| --- |

So that’s it, we just deployed a Gatsby application on Platform.sh.

![](https://lh5.googleusercontent.com/f82wIN_8T5okgxCjP-iO3vHr_qtBPWcC7OT778zy6A5HGBZJt0Lqzh2Cirt4eUH4cNQ3Veq1su5PW2gdYU20otiMfTTuFIMGbW5UMIlTBbsLDeS3cPIGp3p3VE7JD5sx1wtvVcmA=s1600)

To preview the site on our machine, we need to use any of the generated environment routes or run the following command to get the generated routes.

You can find a live preview of the site, [here](https://www.master-7rqtwti-nwwv277czy73m.eu-3.platformsh.site/)

![](https://lh4.googleusercontent.com/Sw326dGsfIHj3ZmRcvdxfMqj2kfCa6cV5tUv0BIdwoxVn6h6TZusp_hBpeDlV24KYc3RdtNrsKNa7W00xfHOrBr2L2Y8W8xWJwteoiTRcP4IWsJZpQXahuTh8bhf_XJp2Mf7oNMt=s1600)

Asides from just deploying, now we can add a custom domain to our gatsby, create crons to update our blog at certain times, add a CMS or make any change of our choice to our Gatsby site.

## Conclusion

On day one of the 7 days of Platform.sh series, I briefly discussed what Platform.sh is, how it supports Gatsby and React developers and finally I took a popular Gatsby starter template and demonstrated how to deploy it on Platform.sh. On the next day of the series, I will be discussing how Platform.sh supports multi-apps projects with Gatsby and Drupal as a case study.