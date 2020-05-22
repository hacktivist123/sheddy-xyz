---
title: "Practical Introduction to Javascript Debugger 🚨"
date: "2018-04-06"
template: "post"
draft: false
slug: "practical-introduction-to-javascript-debugger"
category: "Javascript"
tags:
  - "Javascript"
  - "Web Development"

description: The JavaScript Debugger Statement is used to debug our javascript code. It can be placed inside a function so as to help debug the function whenever we need to.
socialImage: "https://cdn-images-1.medium.com/max/640/1*tVfk4Wueo1g3dik7jpGvGQ.jpeg"
---
![hero image](https://cdn-images-1.medium.com/max/640/1*tVfk4Wueo1g3dik7jpGvGQ.jpeg)

Yo! I’m going to give us tips on how to use the JavaScript {Debugger;} statement effectively to debug our javaScript code effectively.

### What is JavaScript Debugger;

The JavaScript Debugger Statement is used to debug our javascript code. It can be placed inside a function so as to help debug the function whenever we need to.

### How it Work

![?????](https://cdn-images-1.medium.com/max/225/1*uUd-wqwPagw5mxEolBaN6w.jpeg)

For Example, Let’s try reversing a string with javascript and Use the debugger statement to debug it.

![This snippet uses the ES5 syntax as Rev(Reversed) and char(Character)](https://cdn-images-1.medium.com/max/729/1*OfYFmnK5NOnBvUxgZC9tbg.png)
Now we’ve established our code, ooh and if you noticed I’m using the ES5 syntax don’t be scared if you haven’t ported to ES5 you can still use the statement.

Now lets drop in our debugger Statement. The debugger statement is to be put just before the main logic of the function. This is done because as we all know the computer reads from TOP to BOTTOM and from LEFT to RIGHT. So when the computer gets to reading the code and encounters the debugger statement it will because in execution and give us a chance to inspect some of the different variables that is in our program.

![yaay! we put in our Debugger statement](https://cdn-images-1.medium.com/max/735/1*t-aCS6h4C1xzVSrONmCn5A.png)

This makes it extremely useful for debugging our code or developing and Algorithm solution.

**To be able to use the debugger statement in a function, we’ll have to call the function after defining it like so;**

![so we are initializing the function with ‘asdf’](https://cdn-images-1.medium.com/max/748/1*-63G4_r_g0K77SrKEu3pUQ.png)

If we run this in debugger mode , when the computer reaches the debugger statement it will pause at execution and allow us to inspect the different variables in our code. (I know I’m Repeating myself Goddammit , It’s for ya’ll to understand the key concept).

### Debugger Mode in the Terminal.

Now to test our debugger statement we’ll be using a Terminal for those with Linux and Mac-OS you’re safe and for the Windows guys I don’t advice you using the Command Prompt, I advice using the [Git Bash (That](https://git-scm.com/downloads)’s if you haven’t already done it).

Now, Having installed the required things, Head over to your Terminal and make sure you have installed [Node](https://nodejs.org).

To go in Debugger mode, Navigate to your working directory and type

```bash
cd \<your project folder\>
```

While in your project folder Run

```bash
node inspect \<file you want to debug inside the folder\> e.g node inspect index.js
```

when you’ve run it this should be the output

![This a mac-OS terminal, Git bash might be different or the linux terminal](https://cdn-images-1.medium.com/max/989/1*zUFWbqs0T5JA3lnT-w7RUA.png)

You see where the debug statement is that’s where we’ll write our commands

So we just Launched that file in Debugger Mode.

### WHAT NEXT

To tell the Debugger to Continue Debugging our code you can run the command

```js
Continue //or Cont //or C
```

If you run the command this should be our output

![](https://cdn-images-1.medium.com/max/1006/1*G3ty7DpLL5GtJlHWreUH6Q.png)

In the terminal, you will see our entire function displayed and the debugger statement highlighted in Green. That’s how sweet the debugger statement is.

To inspect a variable let’s say the (str), you can’t just write str and expect it to work, if ‘str’ is entered here is what will be displayed

![](https://cdn-images-1.medium.com/max/1005/1*gP8UeKBlk17CuWhcCml3zg.png)
To be able to make this work we’ll have to enter the REPL mode which stands for READ EDIT something something(whatever)!

To enter the REPL mode we run the commamnd

```js
repl
```

This should be the output

![](https://cdn-images-1.medium.com/max/949/1*ZwfEdNcesfW7XS1907hMiQ.png)

### Inspecting our Variables In REPL mode

When you are in REPL mode, It opens a JavaScript console that you can use to inspect variables now lets inspect our String

Typing str should bring out ‘asdf’ because we assigned asdf as our str in our code.

![it returns str i.e our variable assignment work](https://cdn-images-1.medium.com/max/987/1*1M9A_5aClHfDlJAYoikNfg.png)

Now what if we Put in the main logic of our function i.e we reverse the string ‘asdf’ , if our function works, it will return ‘fdsa’ so lets try it out . If i copy

```js
str.split('').reduce((rev, char)=\> char + rev, '');
```

and paste it in the repl console it should return the reversed string like this

![code](https://cdn-images-1.medium.com/max/844/1*Pp_aZ0KXXdUplAw8oD6Juw.png)

Remember to copy and paste in a terminal is

```js
ctrl + Alt + C //Copy ctrl + Alt + V //Paste
```

To leave REPL mode and go back to debug mode hit **_Ctrl + C_**

When in debug mode we’ll run the code again just to show us another issue, in a single session the debugger can run for as many times as where the debugger statement appears

Since i assigned it in only one function this is the output when put in  **_C_**

![It shows nothing](https://cdn-images-1.medium.com/max/997/1*yn4j6x8gL8YTaCMk2D8Ijw.png)<figcaption>It shows nothing</figcaption>

It shows just that message because there is no Debugger statement in our Code.

To Leave the Debugger type **_exit_**

And That’s it , **A Practical Intro to Javascript Debugger;**

![meme](https://cdn-images-1.medium.com/max/260/1*eOCkAJeeX_UZXj2YvTtSJw.jpeg)

Hit me up on [twitter](https://twitter.com/coder_blvck) to say HI! or Ask a Question.
