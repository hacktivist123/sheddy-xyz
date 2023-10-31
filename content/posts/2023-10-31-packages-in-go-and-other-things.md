---
template: post
title: Packages in Go and Other Things
slug: packages-in-go-and-other-things
draft: false
date: 2023-10-31T14:56:06.876Z
description: In this issue, I share some of my notes on packages, variables and types
category: golang
tags:
  - golang
---
* Packages in Go are the building blocks of Go programs that divide the content into understandable parts
* you can import similar packages in this format

  ```go
  import (

  "github.com/devopsforgo/mypackage"
  jpackage "github.com/johnsilver/mypackage"

  )

  // use it this way
  mypackage.Print()
  jpackage.Send()
  ```
* To import a package that you won’t use mainly because the presence of the package causes something to happen, you can do it by prepending an underscore(_) before the package name like so

  ```go
  package main

  import (
  	"fmt"
  	_ "sync"
  )
  ```
* The entrance point for any Go binary is a package named `main` that has a function called `main()`
* Go is a statically typed language
* In a statically typed language, the type is both what is stored in the variable and what can be stored in the variable.
* **Go Built-in Types**

  * `bool`
  * `string`
  * `struct`
  * byte (alias for uint8)
  * rune (alias for int32) - representation of a utf-8 character. done by adding a single quote before a value
  * float32 float64
  * `int` int8 int16 int32 int64
  * `uint` uint8 uint16 uint32 uint64
  * `uintptr` - holds a pointer address
  * complex64 complex128 - complex numbers

* package level → meaning outside a function
* you can only declare a variable like this within a function

  ```go
  hello := "this is a test"
  ```
* The important thing to remember when using `:=` is that it means create and assign. If the variable already exists, you cannot use `:=`, but you must use `=`, which does only an assignment.
* A scope is the part of a program in which a variable can be seen.
* Go has the following variable scope:

  * Package scope → declared outside a function
  * Function scope → declared in a function
  * Statement scope → declared in a statement within a function (for loop, if/else)

**Best practices for packaging your Go Code**

* make your struct and interfaces in uppercase so that you can access them directly
* The idea is to make sure to have less code in the `main.go` function
* use a pointer when making a change to a variable in a struct and want to persist the change