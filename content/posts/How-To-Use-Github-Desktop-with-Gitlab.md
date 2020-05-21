---
title: How to use GitHub Desktop with Gitlab
date: "2018-10-12"
template: "post"
draft: false
slug: "how-to-use-github-desktop-with-gitlab"
category: "Hacks"
tags:
  - "Hacks"
  - "Github"
  - "Gitlab"
description: "When React 16.8 was released officially in early February 2019, it shipped with an additional API that lets you use state and other features in React without writing a class. This additional API is called Hooks and they’re becoming popular in the React ecosystem, from open sourced projects to being used in production applications. "
socialImage: "https://cdn-images-1.medium.com/max/800/1*041IZI22eO8lQqrjME0_YA.jpeg"
---

![](https://cdn-images-1.medium.com/max/800/1*041IZI22eO8lQqrjME0_YA.jpeg)

GitHub Desktop is a fast and easy way to contribute to projects from Windows and OS X, whether you are seasoned user or new user, GitHub Desktop is designed to simplify the all process and workflow in your GitHub. GitHub Desktop is an open source Electron-based GitHub app. It is written in TypeScript and uses React.

> source : [https://www.techefeed.com/internet/get-started-github-desktop/](https://www.techefeed.com/internet/get-started-github-desktop/)

It has many awesome features like:

1. Attributing commits with collaborators easily

2. Checkout branches with pull requests and view CI statuses

3. Syntax highlighted diffs

4. Expanded image diff support

5. Extensive editor & shell integrations

6. It’s open source

I personally prefer to use Github Desktop as my main git client rather than Source Tree or Gitkraken.

Last week, the [company](https://legalrobot.com) I work for, decided to move all it’s codebase from Github to [Gitlab](https://gitlab.com). The reason is because Gitlab has some out of the box Features like integrated devops inbuilt into their system unlike github where you’ll have to do all these yourselves.

Pre-gitlab we were using like 5 different tools and the complexity of integrating them all was getting out of hand and also quite expensive, trying to tie together New Relic, Codeship, Github, Jenkins, Chef, and Terraform was no fun… not to mention Digital Ocean, AWS, Azure, and Mongodb Cloud

I am used to the GitHub environment because that’s all I’ve always worked with but I saw this as a challenge to adapt to a new environment.

I was ready to move to Gitlab but I wasn’t ready to leave GitHub Desktop, so I decided to use Gitlab and GitHub Desktop. I began making research on how to use them both and then my boss gave me a useful resource that helped a lot, see link below:

> [https://community.reclaimhosting.com/t/using-github-desktop-with-gitlab/876](https://community.reclaimhosting.com/t/using-github-desktop-with-gitlab/876)

It helped a lot but it was missing one vital step which was how to use GitHub Desktop with a Gitlab Repo that has 2FA(two-factor authentication) enabled.

so let’s revisit the steps from scratch then I’ll put in the vital step.

> Disclaimer: These steps are valid for only users of the GitHub Desktop Native

**Step one:**

i. Download GitHub Desktop [here](https://desktop.github.com)

ii. Go to your Gitlab repo

iii. Click on settings

![](https://cdn-images-1.medium.com/max/1024/1*w3soMTEc5K0Q0iCzadv3qQ.png)<figcaption>Circled settings</figcaption>

**Step two:**

What we’ll do now is to generate an access token for our GitHub desktop.

After clicking on settings

i. Click on Access Tokens

![](https://cdn-images-1.medium.com/max/1024/1*XMmRvjhDqy0XXygAJnlpTg.png)

ii. Generate an access token

![](https://cdn-images-1.medium.com/max/1024/1*dddg6tBT8yqSPURwiPcqsA.png)

iii. Copy your new access token and store it somewhere as we’ll use it later:

![](https://cdn-images-1.medium.com/max/1024/1*YglJK_c8xxKTwBzvj_-q_w.png)

**Step three:**

i. Head over to your repository and select https and copy the link,

![](https://cdn-images-1.medium.com/max/1024/1*CCSybMcpqoSO2yEzEWVXDA.png)

ii. open GitHub Desktop from the file bar, select clone repository

![](https://cdn-images-1.medium.com/max/1024/1*m9ca14FUXJJoTCfy-xN6sg.png)

iii. After selecting it, a modal would pop up, select URL and place the https link we copied from gitlab inside the URL field and select the destination folder.

![](https://cdn-images-1.medium.com/max/1024/1*5Hs2sv0w9MHwhk8ozqp5TQ.png)

iv. After filling all those fields, select clone

v. While cloning, it would pop up a modal titled _authentication failed,_ you would then be required to put in your username and password.

**N/B:** Your username is mostly your email address or whatever username you used to access your gitlab organization or repo.

vi. Then your password would be the personal access token we created before, so head over to wherever you may have stored it and paste it.

vii. After that click login or authenticate and if all goes well you should see something like this

![](https://cdn-images-1.medium.com/max/1024/1*iyX9y9Vt9-DOIq6VNjOIHg.png)<figcaption>cloning (name of your project repo)</figcaption>

After that you would see this

![](https://cdn-images-1.medium.com/max/1024/1*QLnUBwAQtYyuwUNuG7S_3w.png)

Then you can fetch from the origin, see all branches and use it as your preferred git client.

**And that’s how to use Gitlab with GitHub Desktop.**

If you have any question or you don’t understand any step feel free to reach out to me on [twitter](https://twitter.com/coder_blvck) or drop your questions in the comments section.

Thanks!!!
