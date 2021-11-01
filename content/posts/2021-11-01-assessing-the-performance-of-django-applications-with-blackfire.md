---
template: post
title: Assessing the Performance of Django Applications with Blackfire
slug: assessing-the-performance-of-django-applications-with-blackfire
draft: false
date: 2021-11-01T21:09:35.397Z
description: "Blackfire is a code performance and observability solution that
  helps improve web applications performance at various steps in a software
  development life cycle: from development to test, staging and production. It’s
  the complete solution for the monitoring and profiling of your web
  applications. In today’s blog post, I’ll be introducing Blackfire and how you
  can use Blackfire to assess the performance of your Django applications."
category: sevendaysofplatformsh
tags:
  - Blackfire
  - Django
---
In today’s blog post, I’ll be introducing Blackfire and how you can use Blackfire to assess the performance of your Django applications.

[Blackfire](https://blackfire.io/docs/introduction) is a code performance and observability solution that helps improve web applications performance at various steps in a software development life cycle: from development to test, staging and production. It’s the complete solution for the monitoring and profiling of your web applications.



![](https://lh6.googleusercontent.com/cUILAxAlKDfx0xjcGpOFhjqtqF5wY1xRTTHndwWnKhbrundFHjMRUQcMXr8KCswbLrO8DnnH2iCmuARoRE3kPbi1TV-G-kRDuLvx2USlQ9IvRYRBQEMgigoaVa0Y9ktatOeanbzM)

Blackfire provides support for PHP and Python monitoring and profiling. It also supports Go profiling. It can also be used to carry out performance testing anywhere in your QA process.

In this blog post, I'll be demonstrating how to monitor and profile Django applications with Blackfire.

### Installing Blackfire

Blackfire has a number of uses from monitoring to profiling to even testing. In this section, I’m going to explain how to profile a Django application on Blackfire.

**Installing Blackfire**

In order to be able to profile a Django application on Blackfire, we need to install the following.

* Create a free Blackfire[account](https://blackfire.io/signup?target=/login?target%3D/docs/up-and-running/installation?action%253Dinstall%2526mode%253Dquick%2526version%253Dlatest%2526location%253Dlocal%2526os%253Ddarwin%2526language%253Dpython)
* To install Blackfire, follow the steps [here](https://blackfire.io/docs/up-and-running/installation?action=install&mode=quick&version=latest&location=local&os=darwin&language=python)

After installing Blackfire, run the following command to check if you have the blackfire-python module installed.



|     |
| --- |



After confirming if you haveblackfire-pythonmodule installed on your machine, the next thing needed is to set up the Django project.



Setting up the Django project



To set up the Django project on a machine, you need to follow these steps:



* Clone the project, [here](https://github.com/blackfireio/bigfoot-django/tree/main)



* Make sure you have [postgresql](https://www.postgresql.org/download/) installed on your machine because the Django project uses



* Make sure you have python 3.9 installed on your machine.



* Install pipenv

|     |
| --- |



* Install the project requirements using pipenv

|     |
| --- |



* Make sure the docker daemon is running and run the following command in the project folder to start the PostgreSQL container

|     |
| --- |



* Create a database and role for the project by running the following commands:

|     |
| --- |



* Run the following commands in the project folder to generate fake data for the project:

|     |
| --- |



* Run the project server withblackfire-python



|     |
| --- |



Navigate to<http://127.0.0.1:8000/>to see the bigfoot project running live in your browser.

### Profiling the Django Project

Now that we have installed Blackfire and set up our project, the next thing to do is to profile our project. Blackfire can do more than just profiling, we can run test cases and create test scenarios. In order to do more with Blackfire, you’ll need to create a.blackfire.ymlfile in the project folder to write test cases and scenarios. For the purpose of this tutorial, we are going to profile the Django application we have running on a local machine. The easiest way to profile a project is via the[Blackfire chrome extension](https://chrome.google.com/webstore/detail/blackfire-profiler/miefikpgahefdbcgoiicnmpbeeomffld?hl=en). Here is how to profile a Django project with the Blackfire:



* Install the[Chrome extension](https://chrome.google.com/webstore/detail/blackfire-profiler/miefikpgahefdbcgoiicnmpbeeomffld?hl=en). After that, you should see the Blackfire logo in your browser extension tab.

![](https://lh3.googleusercontent.com/wYZa-dF0nqDgjvE7HJVk93wgzCACmrbtbc8Kqv-dfL0S-RYZ1eaRGL1nWRGAiCedP4IGGUrLnmnF1Bk8S-JWMSuzTqDxGCwFH0CGw6CpGXr2H7rEl64y9DWpANzoPvHzcd2MN0pF)



* To profile, make sure the application server is running, you have installed Blackfire and the Python probe. Click on the Blackfire logo and then click Profile.

![](https://lh6.googleusercontent.com/9-vGFFAa6Tqct1GSH9wEKIAtXaa9SCe7gIp1-BKikgmUYLx5MALALM_RjrjW9EpakLG1417T99ehD1y6SZ3Ht-xdoEZuFNHa3D4nC7A6hzw8cksSAqW6-jj1n_QIvrB9JOJ7Ub4l)



* After clicking onProfile,it takes a few seconds to profile and the![](https://lh4.googleusercontent.com/z1ZKGPc9V2IlGr_2OrtcKH4sP3Vlt2nOzcRw5WpXHwisvbv2ombxQTk9UTyACnhfSgrj7Jle9d6N-dw5JJplB7jT4TM7Zwj_JxIO3A5HULaT0o84nosGcU-I6k3ErvjlGU0yPJ5z)following will be displayed at the top of your screen. This is information about the application.
* Click on “View Timeline” to see the time it took each function in your application to fire.

![](https://lh4.googleusercontent.com/10_36H7rd2TkIK5zud-K92xdXKerOp6SpeLc8tXMDrSLQEdkGFwBMuYuUkd7J3coHhoNwgNPJcv5vcdf0gH5nmnjU2_i-rUG-sSlXtMUKj9SMuvWYnQRdTZIErZn33ZnMLrk3UAP)



My favourite Blackfire feature is the recommendations feature. It is located on the tab on the left-hand side just after the metrics tab. Blackfire automatically recommends fixes to your application based on best practices and the result from your application profiling. Here is the recommendations tab for the application we profiled.



![](https://lh6.googleusercontent.com/FN0Wp41bYKc827aw93ovnPYfy87mAdrLhMo-6sO4QSUkBDq3qW2mH252PGweXYGYBzmdJPEeLIUXyCblmTuWoa0ZgS38AdTDDov6qdzjOw9ujC7lCP6FhPgfxiK-CxsaID6tYKNW)

After profiling the application, Blackfire suggested these recommendations, which would lead me to believe that my application performance can be improved by doing the following:

* Enabling Django cached loader on production.
* EnablingDjango DB persistent connections on production.
* Execute fewer SQL queries. Current SQL queries are 26 but they should be less than or equal to 10.
* Django DEBUG flag should be false on production
* #### Less **ORM entities should be created. The current ORM entities created are 516 but according to Blackfire, it should be less than or equal to 50.**

If I make these improvements to my application code, i should have a more performant application.

There are so many other capabilities of Blackfire like profiling automation, performance testing, executing test scenarios etc. To see more capabilities of Blackfire, watch this short [video](https://youtu.be/ykpZlSjYmRk).

### Conclusion

In today’s blog post of the 7days of Platform.sh series, I discussed what Blackfire is and the awesome capabilities that it has. I configured and set up a Django application for Blackfire and profiled it. On the next day of the series, I will be discussing how to set up and deploy a NextJS application on Platform.sh.