---
template: post
title: On Building Goignore
slug: on-building-goignore
draft: false
date: 2023-08-08T21:42:25.291Z
description: I took my first step into building a usable and functional Go
  program with GoIgnore after studying Golang for over a month.
category: golang
tags:
  - golang
  - opensource
  - building
---
I took my first step into building a usable and functional Go program with [GoIgnore](https://github.com/hacktivist123/goignore) after studying [Golang](https://go.dev/) for over a month. The concept was straightforward yet useful: a tool that simplifies the process of creating .gitignore files for various programming languages. Building not only introduced me to the intricacies of Go but also allowed me to do a bit of open-source work. 

The repetitive task of crafting [.gitignore](https://git-scm.com/docs/gitignore) files for different programming languages caught my attention. It struck me that automation could be the key and then I thought, why not build something to solve this?

Of course, I'm aware that there might already be several existing solutions for this problem but I wanted to build my own.

### Building the Foundation: Crafting GoIgnore's Building Blocks

* The initial step was structuring the project in an orderly manner. Cobra, the robust library, played a pivotal role in creating a structured command-line application. The core of GoIgnore began to take shape, with root commands like "new" and "list" emerging as distinct functionalities. I plan to make an even better structure in the future.
* To tailor .gitignore files according to different programming languages, I compiled an extensive list of supported languages and their associated file extensions. 
* The usefulness of GoIgnore comes from its ability to detect the primary programming language of a project. Automated testing underscored the importance of graceful error handling. I dived deep into understanding the filesystem, loops, testing, using external libraries and error handling in Go
* For a  better user experience, I introduced an auto-detection feature. Users could now skip specifying a language, allowing GoIgnore to seamlessly identify the project's primary programming language.
* For users initiating new projects, I implemented an option to initialize a Git repository directly from GoIgnore. This thoughtful addition saved time and aligned with the tool's mission of simplifying developers' tasks.

### A Personal Growth Chronicle

The process of creating GoIgnore went beyond just lines of code and building a project. It was an expedition that uncovered the intricacies of Go, the art of debugging, and the craft of ideation. Also, by open-sourcing GoIgnore, I welcomed collaboration from fellow developers. The influx of feedback and suggestions enriched the project's capabilities and refined its user experience.

As I reflect on this journey, I realised that Go's elegance lies not only in its syntax but also in its ability to bring ideas to life in a graceful way. The Go ecosystem is vast, and it offers many concepts and ideologies awaiting exploration.

In conclusion, Whether you're an experienced developer or an eager beginner, the process of building an open-source project like GoIgnore is a pursuit worth embracing—an experience that shapes you into a better developer, showcases all you’ve learned and creates an even better understanding of how a programming language works in the wild.