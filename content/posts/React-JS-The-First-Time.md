---
title: 'ReactJS, The First Time ⚛️'
date: '2020-03-17'
template: 'post'
draft: false
slug: 'react-js-the-first-time'
category: 'React'
tags:
  - 'Javascript'
  - 'REACT'
  - 'Web Development'

description: 'ReactJS is a JavaScript UI library that was built and is being maintained by Facebook. React gives JavaScript developers the ability to think logically and functionally about building user interfaces.'
---

## Table of Contents

1. What is ReactJS?
2. Prerequisites for learning React.
3. Features of ReactJS.
4. The Virtual DOM
5. Basic concepts in ReactJS
6. Using ReactJS (Via CDN or Create-React-App)

## 1. What is ReactJS

ReactJS is a JavaScript UI library that was built and is being maintained by Facebook. React gives JavaScript developers the ability to think logically and functionally about building user interfaces.

React gives JavaScript developers the ability to:

1. Build single-page applications.
2. Build applications that are easy to understand.
3. Build applications that are scalable.
4. Build cross-platform applications

React allows developers to build applications declaratively and it offers a unidirectional flow of data.

## 2. Prerequisites for Learning React

Learning React requires basic knowledge of Javascript, HTML, and CSS. In order to effectively use the power of React, developers have to know basic ES6, functional and object-oriented programming.

While on your machine(computer), you need to have the following installed:

- [NodeJS](https://nodejs.org).
- [npm](https://www.npmjs.com/) (This comes bundled with NodeJS).
- [Yarn](https://yarnpkg.com/) (an alternative for npm)

## 3. Features of React

- **Declarative**: React makes it extremely painless to build interactive user interfaces, design basic views for your application based on various states, and also update and render new views when the data in your application changes.
- **Component-Based**: React gives you the ability to build encapsulated components that can manage their own state, then put them together to build complex UIs. The logic of these components are written in JavaScript instead of templates, so you easily pass actual data and also keep state out of the DOM.

- **Learn once, write anywhere:** React gives you the ability to build for both Mobile(React Native) and Web, No need to rewrite your existing codebase, you can just integrate React with your existing codebase.

- **Virtual DOM:** React introduced a wrapper around the regular DOM called the Virtual DOM. This introduction allows React to render elements and update the state faster than the regular DOM. We’ll talk about this in detail later in the article.

- **Performance:** React has great performance benefits with the help of the Virtual DOM and also it’s one-way flow of data.

## 4. The Virtual DOM

React was shipped with its own DOM(Document Object Model) called the virtual DOM which is like a virtual copy of the original DOM. It offers one-way data binding which makes manipulating and updating the Virtual DOM quicker than updating the original DOM. Virtual DOM has the ability to handle multiple operations in milliseconds without affecting the general page performance.

This Virtual DOM supports the declarative API of React: You basically instruct React on what state you want the UI to be in, and it makes sure that the DOM matches that state.

## 5. Basic Concepts in React

### A. Components

Components are stand-alone and reusable pieces of code. They have the same purpose as Javascript functions, but work in alone and return HTML via an inbuilt render function. They are mainly two types of components, namely:

- **Class Components**: These are components that offer more control in the form of life cycle hooks, Managing and Handling state and API Calls. For example:

```js
class MyComponent extends React.Component {
  render() {
    return <div>This is a class component</div>
  }
}
```

- **Functional Components:** These are components that were meant for just rendering views until [React Hooks](https://reactjs.org/docs/hooks-intro.html) was introduced.

  For example:

```js
Function myComponent() {
  return (
      <div>A functional Component</div>
  )
 }
```

### B. Props

Props in React are like function arguments in JavaScript and also like attributes in HTML, They are read-only. This is an example of how props are used:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

### C. State

React components have a built-in object called state, this is where you store property values that belong to a particular component. If the state of a component changes at any point in time, the component re-renders.
This is an example of how state in ReactJS is used:

```js
class Car extends React.Component {
  constructor(props) {
    super(props)
    this.state = { brand: 'Ford' }
  }
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    )
  }
}
```

### D. JSX

JSX is a syntax extension to JavaScript. It is similar to a template language, but it has the full power of JavaScript. JSX gets compiled to React.createElement() calls which return plain JavaScript objects called “React elements”.

```js
return (
  <div>
    <h1>My Car</h1>
  </div>
)
```

The code in between the return method that looks like HTML is known as JSX

### 6. Using ReactJS (Via CDN or Create-React-App)

There are various ways to install or use ReactJS these could be via:

- Adding its CDN to your HTML file.
- Starting a Blank React App with Create-React-App

### Adding its CDN to your HTML file

You can quickly use in your HTML page by just adding it’s CDN directly to your HTML file using the following steps:

**Step 1:** In the HTML page you want to add React to, add an empty `<div>` tag to create the container where you want to render something with React.

For Example:

```html
<!-- ... old HTML ... -->

<div id="button_container"></div>

<!-- ... old HTML ... -->
```

**Step 2:** Now, include three `<script>` tags to the HTML page just before the closing `</body>` tag.
For Example:

```html
<!-- ... Some other HTML ... -->
  <!-- Initiate React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->

 <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
 <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Load our React component. -->

 <script src="button.js"></script>

</body>
```

The first two script tags load React. The last one will load the code of your React component.

**Step 3:** Create a file called button.js in the same folder as your HTML page, this will hold the code for our React Component.

Now paste the following code inside the button.js file:

```js
'use strict'
const e = React.createElement
class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
  }
  render() {
    if (this.state.clicked) {
      return 'You clicked this button.'
    }
    return e(
      'button',
      { onClick: () => this.setState({ clicked: true }) },
      'Click Me'
    )
  }
}
```

The code above creates a button component that would return a message when the button is clicked.

In other to use this component in our HTML page, you need to add the following code below your Button.js file:

```js
const domContainer = document.querySelector('#button_container')
ReactDOM.render(e(Button), domContainer)
```

The two lines of code above will find the `<div>` we added to our HTML in the first step, and then render our button React component inside of it.

### Starting a Blank React App with Create-React-App

In other to create a blank react app we would make use of [create-react-app](https://create-react-app.dev/docs/getting-started/). It is the officially recommended way to quickly create single-page React applications. It provides a modern build setup with no configuration.

To use create-react-app you can use the following methods from your terminal:

[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b):

(This is the most recommended way to using create-react-app and installing react on your machine)

```js
npx create-react-app my-app
```

[npm](https://npmjs.org):

```js
npm create-react-app my-app
```

[yarn](https://yarnpkg.com):

```js
yarn create-react-app my-app
```

When any of the above commands are run, they would create a new React app called **my-app.**
To run your newly created app, you have to navigate into the app folder by using **cd my-app** in your terminal and running the following commands:
For npm:

```js
npm start
```

For yarn:

```js
Yarn start
```

Any of the above commands will run the app you just created in development mode. You can open `http://localhost:3000` to view it in the browser.

When you navigate to `http://localhost:3000`you should see the page below displayed. Whatever change you make in the react code will automatically render here.

![React App Screen](https://lh4.googleusercontent.com/ztzhjNLIZsKVYd7EbPTHnsbT-N05dsH4K_-N3BYIbtZYvknrpIoJkUmRomz4ke2I9OTuCisgvH27L13IKjtAJ6DwCFSSuWRWOzLmxOZIfDh_7vh6jG2b9LoDKS6Pw--X6zfsL1Sg)

I hope this guide to getting started with ReactJS has been helpful. There are many more things to explore and find in the world of JavaScript and I hope you’ll share what you learn.
