---
template: post
title: Deploy a Full-stack Nodejs App on Cloud Foundry
slug: deploy-a-fullstack-nodejs-app-on-cloudfoundry
draft: true
date: 2021-01-30T18:54:16.356Z
description: In this tutorial, we will be deploying a full-stack application on
  Cloud Foundry with a Node.js backend and a MongoDB database service.
category: Deployment
tags:
  - Nodejs
  - CloudFoundry
---
- - -

### Introduction

In this tutorial, we will be deploying a full-stack application on Cloud Foundry with a Node.js backend and a MongoDB database service. I’ll demonstrate how to use a database service we will create in our application to read, write data to our application, and also persist data. We will also make a few changes to our deployed application and re-deploy our application to see how fast Cloud Foundry updates our application in the browser.

### Prerequisites

1. Cloud Foundry CLI
2. Any Cloud Foundry distribution account. (I’ll be using [anynines](https://paas.anynines.com/) for the sake of this tutorial)
3. A [Cloudinary](https://cloudinary.com/) account for storing images that’ll be uploaded (API key and API Secret)
4. Basic Knowledge MongoDB, Node.js, and [Cloud Foundry](https://katacoda.com/cloudfoundry-tutorials/scenarios/trycf)

### Tech Stack

* The client-side of the application is written with EJS.
* The server-side of the application is written in Node.js.
* Cloudinary handles the storing of images that are uploaded.
* MongoDB handles the storing of the image URLs that are used to display the images on the client-side.

### Setting Up Our Application

To get started, we have to clone our application from Github and install its dependencies on our machine. Run the following command to clone the application to your machine:

```
git clone https://github.com/hacktivist123/cloudfoundry-nodejs-tutorial-pt-3
```

After cloning the application from Github, you can install the application on your local machine by running:

```
yarn install
```

After installing the project, you’ll need to create a .env file. There’s a .env.sample file with the structure of how your .env file should look and what it should contain in the project root folder. For example:

```
NODE_ENV = production
MONGO_URI = <your mongodb service connection uri>
CLOUDINARY_CLOUD_NAME = <your cloudinary cloud name>
CLOUDINARY_API_KEY = <your cloudinary API key>
CLOUDINARY_API_SECRET = <your cloudinary API Secret>
```

Where:

***NODE_ENV*** = The current deployment environment, i.e development or production.

***MONGO_URI*** = MongoDB service connection URI (this will be provided when we create a Cloud Foundry database service).

***CLOUDINARY_CLOUD_NAME***= This will be available on your Cloudinary dashboard after registration.

***CLOUDINARY_API_KEY*** = This will be available on your Cloudinary dashboard after registration.

***CLOUDINARY_API_SECRET*** = This will be available on your Cloudinary dashboard after registration.

If you run the application by running yarn start on your local machine and with a local MongoDB server, you’ll get the following in your browser when you navigate to ***localhost:8080*** or the **PORT** number you provided in the .***env*** file.

![](https://cdn-images-1.medium.com/max/1600/0*8-Xr2pRncAHtag_q)

While this works locally, we cannot use the local MongoDB server when we deploy our application on Cloud Foundry. We need a database service to help us manage the database when it’s deployed live.

Let’s test this theory by deploying our application on Cloud Foundry.

### Deploying our Application

You can deploy to the application by running the following command:

```
cf push <app name>
```

If you’ve not noticed already when we push the application initially, it throws an error that looks like this:

![](https://cdn-images-1.medium.com/max/1600/0*shfF4yRbxjz3Mw4r)

We are getting this error because Cloud Foundry cannot recognize or see any connection URI for our MongoDB database. We need to create a MongoDB database service to fix this error and use the connection URI it provides for us.

### Creating our MongoDB Database Service

#### Why do we need a database service?

Well, we need a database service because we cannot use a local database server when we deploy our application live and also to persist data. When you ***cf push,*** an entirely new version of your application is deployed and all old data will be deleted. What a database service will do for us is to persist data we’ve uploaded into our application so that even if we push our application on Cloud Foundry over and over again, we’ll still have access to the existing data we’ve uploaded into our application database.

#### Creating the Service

It’s very easy to create a database service with Cloud Foundry; we can do that by running the following command:

```
cf create-service SERVICE PLAN SERVICE_INSTANCE
```

The service and plan depend on the distribution of Cloud Foundry you’re using. Cloud Foundry distributions provide different types of services. For the sake of this tutorial, I’ll be using the anynines MongoDB service by running the following command:

```shell
cf create-service a9s-mongodb34 mongodb-nano cf-database
```

Where:

***a9s-mongodb34*** = The service name

***mongodb-nano*** = The service plan

***cf-database*** = The service instance name

When I run the above command, the following will be displayed:

![](https://cdn-images-1.medium.com/max/1600/0*icaz6wGnz_EsNsQG)

To know if the service has been created successfully, run the following command:

```
cf service cf-database
```

The above command will display the following details about the service:

![](https://cdn-images-1.medium.com/max/1600/0*HBzOd4mNc3elj7N8)

On a side note, you can only make use of the service when the status of the service is “**create succeeded**.”

Now that our service has been created successfully, we have to bind the service to our application so that our application can use the service. We can do that by running the following command:

```
cf bind-service APP_NAME SERVICE_INSTANCE
```

When we run the above command according to our app name and service name, we will see the following in our terminal:

![](https://cdn-images-1.medium.com/max/1600/0*3-VwUwmcsJVIqcjX)

We have successfully bound the database service we created to our application. The next step is to use the **URI** provided by the MongoDB service as our ***MONGO_URI*** in our .env file.

We can find the **URI** by running the following command:

```
cf env <APP_NAME>
```

After running the above command, you should see the following displayed in your terminal:

![](https://cdn-images-1.medium.com/max/1600/0*vzM6nbzHPHjy_gr0)

If you look closely at the JSON file generated by the command, you’ll see the database **URI**, **username,** and also **password**.

Now we need to grab the database URI and use it on our application. We can do that by copying the URI from our terminal and pasting it into our .env file. For example:

```
MONGO_URI = mongodb://a9s-brk-usr-5fce266678f7b5d5061399d079c7cb58e3541b95:a9sfa381ca6ba0d48f166c0299b1ce4d119ff6321e1@mod22bb57-mongodb-0.node.dc1.a9ssvc:27017/mod22bb57
```

### Why is this working?

In our ***index.js file***, we are grabbing the MONGO_URI variable from the env file and using it to start the database connection like so:

```javascript
try {
 mongoose.connect(process.env.MONGO_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true
 })
} catch (error) {
 if (isDevelopment) throw error
}
```

### Pushing our app live with the database service

Now let’s try to push our application again and see whether it throws an error. We can do that by running:

```
cf push <APP_NAME>
```

If we run the above command and wait for a while for it to finish deploying, we’ll see the following message in our terminal:

![](https://cdn-images-1.medium.com/max/1600/0*BEhW_r0lJSZu4HhC)

If we navigate to the route that was created after the deployment, we’ll see our application deployed live without any errors.

![](https://cdn-images-1.medium.com/max/1600/0*-DjuIJZBOCVBrkWL)

### Making a change in our application

Now let’s make a change to our application, redeploy and see if the images in the database will still remain the same. For the change, let’s make the color of the header text “**mini-instagram**” blue.

Navigate to the CSS directory inside the project folder and locate the **style.css** file. Paste the following code in the file:

```css
h1 {
 color: blue
}
```

After adding the above piece of code, we will push our application again so that we can see the changes.

We can do that by running ***cf push <APP_ NAME>***. After pushing, wait for it to deploy and navigate/refresh to the generated route link to see the changes happen.

If you did the above instructions correctly, you should see the header text color change from black to blue like so:

![](https://cdn-images-1.medium.com/max/1600/0*tQeLubgK_2wd7gQN)

We made a change and redeployed our application and we can still see our images (data) available.

Now if you try to upload a random image and also refresh the page, we’d still have the image available to us along with the rest of the existing images.

Here’s a visual representation of the process:

<https://drive.google.com/file/d/1XT7ux9Fktt8HbdW_D7DAdiQX5tqI-cDz/view?usp=sharing>

In the above media, I uploaded a new photo and then refreshed the application over and over again to check if we lost any data but we didn’t. This is the power of the database service we used.

You can find the supporting Repo for this tutorial, [here](https://github.com/hacktivist123/cloudfoundry-nodejs-tutorial-pt-3) and you can also find the video tutorial [here](https://youtu.be/qvso2fRKRy8) if you prefer watching videos instead.

### Conclusion

In this tutorial, we took an application, deployed it on Cloud Foundry, created a MongoDB database service for the application, and then re-deployed it on Cloud Foundry. We also made a few changes to the application and redeployed it to see if we would lose any data but we didn’t, thanks to the power of the database service we used.

Services in Cloud Foundry are really powerful. We can do a whole lot of things with various services that are available to Cloud Foundry users.

Did you enjoy this tutorial? Let me know by dropping comments about your favorite aspect of the tutorial in the comments section. Also, if you have any questions, you can drop one in the comment section and I’ll definitely give a reply.

This article was originally published by me on the [Cloud Foundry Foundation Blog](https://medium.com/cloud-foundry-foundation/approaching-developer-relations-in-an-open-source-foundation-77b1c660bf95)