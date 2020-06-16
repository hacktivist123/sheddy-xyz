---
template: post
title: Build a Slack Bot with n8n Webhooks node and Github API
slug: slack-bot-with-n8n-webhooks
draft: false
date: '2020-06-16T14:52:21.155Z'
category: Automation
tags:
  - API
  - Workflow
  - Automation
  - Javascript
description: 'n8n is a free and open fair-code licensed node-based workflow automation tool, the main aim of n8n is to allow people automate processes with little or no-code. With n8n you can build a lot of interesting workflows and automate a lot of processes from event registrations, to sharing updates when an event happens etc.'
---
## Introduction

We humans enjoy automating processes a lot and we try to do it as much we possibly can, basically because it saves a lot of time and it’s actually pretty cool. 

I enjoy automating stuff too and I recently discovered a really interesting workflow automation tool called [n8n](https://n8n.io/) (pronounced nodemation). 

**[n8n](http://n8n.io)** is a free and open fair-code licensed node-based workflow automation tool, the main aim of n8n is to allow people automate processes with little or no-code.

With **n8n** you can build a lot of interesting workflows and automate a lot of processes from event registrations, to sharing updates when an event happens etc. Just by checking the [integrations](https://n8n.io/integrations) page of n8n, you would see a growing number of third party APIs available for you to use.

In other to demonstrate how cool **n8n(nodemation)** is, we will building a slack bot that allows us get certain details of a particular user through their github username. Our slack bot is going to have a [slash command](https://api.slack.com/interactivity/slash-commands) which we will call then followed by the user’s github username we want to get their details.

### Prerequisites

* You need to have [Node.js](https://nodejs.org/en/) installed.
* You need to have [npm](https://www.npmjs.com/get-npm) installed.
* You need to setup [n8n](https://docs.n8n.io/#/setup).

## Setup

Once you have installed or already have nodejs and npm installed, you can move ahead to installing **n8n** by running:

```
npm install n8n -g
```

This will install n8n globally. If you just want to test it out real quick without installing it at all then you can run the following command:

```
npx n8n
```

It will download everything that is needed to start **n8n**.

Alternatively, if you are a fan of docker you can also use docker to get started quickly by running this command:

```
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n
```

If you used option one you can access **n8n** by running the following command:

```
n8n
```

or

```
n8n --tunnel
```

Either of the above will immediately start up the n8n server and you can then open n8n in your browser by either clicking the letter o or navigating to [localhost:5678](http://localhost:5678). Adding ```--``tunnel``` is useful for using webhooks for trigger nodes of external services like GitHub etc, it exposes n8n to the web.

If you went with option two or three, you can access **n8n** in your browser by just navigating to [localhost:5678](http://localhost:5678). 

**Note**: using `n8n --tunnel` is only meant for local development and testing. It should not be used in production!

After navigating to [localhost:5678](http://localhost:5678), you will see the following user interface:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1591931567660_Screenshot+2020-06-12+at+04.12.42.png)

The above user interface is called the n8n user interface, this is where all the workflow automation process will be done.

## n8n Basics

There are certain keywords that will be used in this article as we move forward so I’ll like to talk about them briefly.

* **Node**: A node is an entry point for getting data, it could also be a function to process data or an exit for sending data. You can connect multiple nodes, which allows you to create simple and complex workflows. Nodes for external services like Slack, Github, etc are available for users.
* **Connection:** A connection is a link that connects nodes together, it also the passage of data from one node to another. With a connection, a single node can be connected to several other nodes.
* **Trigger Node**: A trigger node is that is meant to trigger an action or event as the name implies. They usually start a workflow and also provide the initial data to the workflow. 
* **Workflow**: A Workflow consists of a collection of nodes, trigger nodes that are connected to each other. It is the entire process combined and it ends only when all active and connected nodes have processed their data or an error occurs with one of the nodes.

## Building a Slack Bot with n8n

Now that we have setup n8n and we also understand the important keywords in the n8n community, let’s move forward to build a slack bot that will have a [slash command](https://api.slack.com/interactivity/slash-commands) which we will call then followed by the user’s GitHub username we want to get their details, the slack bot will make an HTTP request to the GitHub users open API courtesy of an HTTP Request n8n trigger node and then return to slack certain details we will specify via another n8n node.  

The first thing we will need to do is add a webhook trigger node, a webhook node will allow us to send automated messages from applications like slack, etc. This webhook node will be our trigger node and the workflow will only start if our webhook node runs successfully. To create a workflow node, click on the + button on the top right. Select the ‘Webhook’ node under the ‘Triggers’ section. This adds a new Webhook node. 

Here’s a visual demonstration of adding the webhook trigger node:

![Adding WebHook Node](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1591933507439_add-webhook.gif)

After adding the webhook node, we need to fill in certain details into the node like the HTTP Method type, we need to select POST since we’ll POST a message to the webhook link and also we need to copy the webhook URL since that is what we’ll be using as the request URL for the slash command of our slack bot. 

Here’s a visual demonstration of me carrying out the process:

![Update Webhook node](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1591934520223_fill-webhook-details.gif)

make sure to copy the test URL because we are still in test mode and it is essential for getting the data we need from the payload.

**Note**: The webhook path must be slack/events when creating a slack-bot, this is for the slack API to recognize the webhook as an event just like *[*event subscriptions*](https://api.slack.com/events-api)* in the slack API.* 

**Creating the Slack Bot on Slack API page** We will now proceed to create our new slack bot, in other to do that we would have to visit the [Slack Apps](https://api.slack.com/apps) [](https://api.slack.com/apps?new_app=1)web page, then go ahead to click on the new app button, fill in the required details and create the new app. 

**Note**: Slack Bot are called Slack Apps.*

Here is a visual demonstration of the process:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1591935741481_Create-Slack-App.gif)

You can name your slack app whatever you wish to and you also have to choose the slack workspace that will be used for testing and developing the slack-bot. After creating your App, you should have access to the development dashboard for the app where you can add slash commands, install the app in a workspace and also read the documentation about certain slack bot features. 

Here is a photo of how the slack bot development dashboard looks like:

![Slack Bot Development Dashboard](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1591976676862_Slack+Bot+Development+Dashboard.png)

I labeled all the important menus and sections that we will be making use of in this tutorial, for ease of use and to guide us visually.

Next, we need to scroll down and give our app description, and also a background color then click on save changes. This is just for users to know what our app is meant to do. 

Here is a visual demonstration of the process:

![Add App Description](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592012162970_Add-Slack-App-Secription.gif)

After doing the above, we need to add Token Scopes to our bot by navigating to the **Oauth and Permissions** menu in the sidebar, it is under the **Features** section. Token Scopes gives our bot permissions to carry out certain actions we specify. For this particular bot we need the following token scopes:

* **channels:join** - Allows our bot to join public channels in the workspace
* **chat:write** - Allows our bot to send messages
* **commands** - Allows our bot to add shortcuts and slash commands people can use
* **links:write** - Allow our bot to preview URLs
* **incoming:webhook** - Allows our bot to post messages to specific channels.

Here is a visual demonstration of the process:

![Add Bot Tokens](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592013488382_add-tokens.gif)

After doing that we need to create our slash command, we need our slash command to send commands to slack and our webhook. we can do this by clicking on the slash command menu and when it loads click on **Create New Command,** after that, we’ll be required to fill in some input fields, here is a breakdown of what needs to be in the input fields:

* **Command** **\-** This should contain the command you would like to use.
* **Request URL** **\-** This should contain the URL where the slack API will post the details of the slash command when we use it. In our case, the request URL is the **test webhook URL** we grabbed from the **webhook trigger node** we created earlier on.
* **Short Description -** This should contain a very short description of how to slash command should do
* **Usage Hint -** This should contain a very short text on how to use the slash command.

Here is a visual demonstration of the process:

![Create Slash Command](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592014640198_creating+slash+command.gif)

Now, what we need to do is to install the app in a slack workspace we can use to test our slack bot in. In other to do this, click on the **install app** menu on the sidebar and follow the steps.

After creating the slack bot/app, we have to go back to our n8n workflow and begin to receive data from the webhook.

**Workflow Nodes** Here is a list of n8n nodes we’ll be making use of onwards to complete the workflow:

1. **Webhook Node** to receive POST messages from slack
2. **HTTP Request** Nodes to get the users data from the Github open API
3. **Function Item** Node to get the users email
4. **Set** Node to filter the API responses for the data we need
5. **Slack** Node to send the user details back to slack

**Webhook Node and HTTP Request Nodes**

For this workflow, we will be making two HTTP requests with a value from the webhook node, the first one is for grabbing details from the user profile which is `https://api.github.com/users/<username>/` and the second one is to grab an email associated to the user via the user public commits which is `https://api.github.com/users/<username>/events/public`.

The HTTP Request node will allow us to make an HTTP Request to an API endpoint and also receive a response from the request. It is this response we will be using to fill the second endpoint.

Now when we go to our slack workspace and make a command /gitails <username>, this will send a post a request to our webhook and this API response will be returned and it’s from this API response in our webhook node we’ll grab the GitHub username and make the request in our HTTP Nodes

The following response will be returned to our webhook node when I go to slack and type “/gitails hacktivist123” in the message field. 

![Webhook Response](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592018038983_Screenshot+2020-06-13+at+04.12.35.png)

If you have noticed, this API response is an object and it has a key called text which value is the username we typed in slack, now this is the key we’ll put into our HTTP Request node so that whenever we make a request with any username, it’ll run successfully.

Now let’s create an HTTP Request node that will make a request with the user details by clicking on the + button on the top right of the n8n UI. In the node configuration view search for ‘HTTP Request’ click on it, it will be created. Now enter the following URL:

```
https://api.github.com/users/<username>/
```

Here is a visual demonstration of the process:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592018920694_HTTP+Request+node.gif)

What we did is we made a get request to the GitHub API by grabbing data from the webhook node and we also set the header as requested from GitHub, the value of the header should be your GitHub username.

**n8n lets us take data from other nodes and use it in different fields.**

When we click on Execute Node, we should get an API response similar to this:

![API Response](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592019151121_Screenshot+2020-06-13+at+04.31.53.png)

Now, we need to make another HTTP request by creating another HTTP request node to get the user’s public commits with this API endpoint `https://api.github.com/users/<username>/events/public`, this is to get an email associated with the user’s account. Once you have created the HTTP request node, you need to carry out the same process with did with the first node by grabbing the username in the API response from the webhook node. If you did that right, the API response in the node should look like this:

![API Response](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592019664252_Screenshot+2020-06-13+at+04.40.58.png)

So far, our workflow is almost complete and it should look like this:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592019802740_Screenshot+2020-06-13+at+04.43.16.png)

**Function Item Node**

The Function Item Node allows us to write a custom javascript code that gets executed once per item. the item is the entire result of the from the previous node, we can manipulate this result and transform the data into whatever we want. we can add the function node like so:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592020300284_function-item-node.gif)

In this workflow, we want to grab an email from the API response of the previous node. We are going to write a javascript expression that will grab **penultimate** object in the array of objects and returning the **payload** property in it that contains an email address. All we need to do is to paste the code below into the text area in the function node and execute the node. 

```
return item[item.length-3].payload
```

Here is a visual demonstration of the process:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592020564333_function-item-node-fill.gif)

So we have grabbed what we need, what we need to do now is to grab the data requests we’ve gotten from the first webhook node and the function item node and return just the data we need.

**Set Node**

We need a set node for the next process because a set node-set values on items and also removes values too. So we can create a set node through the normal process of clicking on the + button on the top right of the n8n UI. In the node configuration view search for ‘Set’ click on it, it will be created.  Now click on the set node, in the set node we need to set values by clicking on the add value button when you do it’ll tell you to choose if it is a string, number, or boolean. For this tutorial, all values will be strings Make sure to use any of the two HTTP Request nodes to fill up the value field of each of the values we are setting. Now set the following values:

* **login** - user’s username. This can be gotten from the first HTTP Request node by adding it as an expression.
* **name -** user’s full name. This can be gotten from the first HTTP Request node by adding it as an expression.
* **email -** any email address associated with the user**.** This can be gotten from the second HTTP Request node by adding it as an expression.
* **company** - user’s company if there’s any. This can be gotten from the first HTTP Request node by adding it as an expression.
* **location** - user’s location. This can be gotten from the first HTTP Request node by adding it as an expression.
* **photo -** user’s profile photo. This can be gotten from the first HTTP Request node by adding it as an expression.
* **profile created at** - This is when the user’s profile was created This can be gotten from the first HTTP Request node by adding it as an expression.

If everything is done correctly, your Set node should look like this: 

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592021537726_Set.gif)

When we trigger the workflow, we should see the following returned:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592022354586_Screenshot+2020-06-13+at+05.25.40.png)

***Note:*** *Not every field will have a value returned because some users might not supply these data or the data isn’t just available.*

After that has been done, our workflow should now look like this, and sending that data to slack is the last process in our workflow.

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592022468862_Screenshot+2020-06-13+at+05.27.28.png)

**Slack Node**

The last part of our workflow is to use the data from the previous node and send a message to slack. The first thing we need to do is to grab the access token of our slack bot and then create a slack node the regular way. It is located in the **Oauth and Permissions** menu in our slack bot development dashboard.

Here is a photo of where our slack access token can be found:

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592022943821_Screenshot+2020-06-13+at+05.32.59.png)

Now create a slack node and then Add the access token in the slack node.  Here is a visual demonstration: 

![](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592024291988_Slack+API.gif)

After adding the access token, we need to specify the channel the message we are sending will go to. Therefore in the Channel field, type in general, you can add in any slack channel of your choice.

Now we need to style and structure the message that’ll be sent to slack. We can do this by adding various attachments. The first attachments we will be adding are the text, that will be sent. Now click on Add attachment, after then click on add attachment item and select Text, then in the text field, click on the gears icon close to it and then add expression. You can structure the message that is to be sent however you like it when the slash command is called. Here is how i decided to structure mine:

```
I found the following details for this username:
*Username:* {{$node["Set"].json["login"]}}
*Name:* {{$node["Set"].json["name"]}}
*Email:* {{$node["Set].json["email"]}}
*Location:* {{$node["Set"].json["location"]}}
*Company:* {{$node["Set"].json["company"]}}
*Followers:* {{$node["Set"].json["followers"]}}
*Profile Created at:* {{$node["Set"].json["profile created at"]}}
```

Now go ahead to add a color for the message by clicking on the add item button and select color, choose whatever color you like. I ended up choosing #040202 as my preferred color. 

Also, add a Title for the message by clicking on the add item button and select title, in the title field, choose whatever title you want for the message by click on the gears icon close to the field and then add expression. This is how i structured my title:

```
Github Details for {{$node["Set"].json["login"]}}
```

Also, add a Thumbnail for the message, this should hold the image of the user. You can do this by clicking on the add attachment item button and select Thumbnail, in the title field, choose whatever title you want for the message by click on the gears icon close to the field and then add expression in the text area, paste the following:

```
{{$node["Set"].json["Photo"]}}
```

Then lastly, add a footer. This footer should contain the date the user’s profile was created. You can do this by clicking on the add item button and select footer, in the title field, choose whatever title you want for the message by click on the gears icon close to the field and then add expression in the text area, paste the following:

```
Profile was last updated at: {{$node["HTTP Request"].json["updated_at"]}}
```

Our final workflow should look like this:

![Final Workflow](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592026246991_Screenshot+2020-06-13+at+06.30.31.png)

Now if you click on ‘Execute Node’, this should send a message to the Slack channel you chose in the slack node.

Now that we are done with our workflow, all we need to do is activate the workflow so that we can see it work without having to click on the execute workflow button all the time. 

Here is how to activate the workflow:

![Activate Workflow](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592026104763_Activate-Workflow-Bot.gif)

Now let’s test our slack-bot, Here’s a GIF of me issuing the command on slack and getting the user details 😄.

![Testing Bot](https://paper-attachments.dropbox.com/s_52381EE565B8B743F3A47A17386F92DAE92763EFD327125AADF5E5E7644F1F29_1592026851204_Test-Slack-Bot.gif)

Yess!!!!! 🥳 , we have successfully created a slack-bot with n8n, slack, and Github REST API, the gitails Workflow! Now, to make sure that the workflow runs permanently without having to press the ‘Execute Workflow’ button before every slash command on Slack, we’ll need to use the Production webhook. To do that, you’ll just need to get the Production webhook URL from the Webhook node, update the URL for the slash command on Slack. Now our workflow is ready for use.

## Conclusion

n8n is a useful tool, imagine the cool workflows one can create. we can create various types of workflows to do a lot of things from a Slack bot to a telegram bot or even a conference scheduling workflow, so many possibilities. n8n is here to stay and it’s going to be around for a long time.

**Link to the published workflow**: <https://n8n.io/workflows/403>

## More Resources

* [Webhooks Fun with Mattermost](https://hackernoon.com/webhooks-fun-with-n8n-and-mattermost-upb53yw0), **Tanay Pant**
* [Workflow Automation with n8n.io](https://blog.logrocket.com/workflow-automation-with-n8n-io/), **Daniel Phiri** 
* [n8n official documentation](http://docs.n8n.io), **n8n.io**