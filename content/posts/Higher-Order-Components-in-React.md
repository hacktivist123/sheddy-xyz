---
title: Higher Order Components in React
date: '2020-05-04'
template: 'post'
draft: false
slug: 'higher-order-components-in-react'
category: 'React'
tags:
  - 'React'
  - 'Javascript'
  - 'Web Development'

description: 'React is a fantastic Javascript library for building rich user interfaces, it provides a great component abstraction for organising your interfaces into well-functioning code but what about the look and feel of the app? In the browser, the look and feel of the app are mostly defined by CSS which is a means of styling our web applications and websites. There are various ways of styling React components from using stylesheets to using external styling libraries etc.'
---

## Quick Summary

In this tutorial, we are going to learn what higher-order components are, the syntax of a higher order component as well as use cases for them. In the process, we will also build an example higher order component out of an existing React component. At the end of this tutorial, the readers would understand all the basics of what Higher-Order Components are and how to build them.

## Introduction

Higher-Order Components in React was introduced with Higher-order functions in Javascript as an inspiration. A Higher-Order Component (HOC) is an advanced technique in React for reusing logic in React Components. They are a pattern that was created out of React’s compositional nature.

Higher-Order components basically incorporate the DRY (Do Not Repeat Yourself) concept in programming that you most likely have across at some point in your career as a software developer. It is one of the most popular concepts/methodologies in software development and it is very important to observe this methodology when building applications or writing code in general.

In this tutorial, we will learn what higher-order components are, the basic structure of a higher-order component, some basic use cases of HOCs and finally an example of a higher-order component.

Note: Basic knowledge of ReactJS and Javascript will come in handy as you work through this tutorial.

## Higher-Order Functions in Javascript

Before we jump into higher-order components in React, we will discuss briefly what higher-order functions in javascript are. This is very important because we need to understand the main concept behind higher-order components which is higher-order functions.

Higher-order functions in Javascript are functions that take in other functions as arguments and return another function. They allow us to abstract over _actions_, not just values, They come in several forms and help us write less amount of code when trying to operate on functions and even array.

The most interesting part of making use of higher-order functions is composition.
We can write small functions that handle one piece of logic. Then, we can compose complex functions by making use of the different small functions we have created.
This particular technique helps to reduce bugs in our codebase and it makes our code much easier to read and understand.

Javascript has some of these functions already inbuilt and some examples of Higher-order Functions include;

- `.forEach()` : is used to iterate over every element in an array with the same code o but does not change/mutate the array and it returns undefined.

- `.map()`: The map method transforms an array by applying a function to all of its elements and building a new array from the returned values.

- `.reduce()`: The reduce() method executes a provided function for each value of the array (from left-to-right).

- `.filter()`: .This checks every single element in an array to see if it meets certain criteria as specified in the filter method and then it returns a new array with the elements that match the criteria.

There are so many inbuilt higher-order functions in Javascript, and you can also make your own custom higher-order functions.

## What is a Higher-Order Component

A Higher-Order Component (HOC) is an advanced technique in React for reusing logic in React Components. It involves components that take another component or components as an argument(s) and then returns a new upgraded component. Sounds familiar right? They are similar to higher-order functions that take other functions as an argument and produce a new function.
HOCs are commonly used sometimes for designing components that share certain behaviors in a way that makes them connected differently than just the normal state to props pattern.

## Facts about HOCs

1. We don’t modify or mutate the component. We create new ones.
2. A HOC is used to compose components for code reuse.
3. A HOC is a pure function. That means it has no side effects, it only returns a new component.

### Some examples of real world HOCs that you may have come across

- _react-redux_: `connect(mapStateToProps, mapDispatchToProps)(UserPage)`
- _react-router_: `withRouter(UserPage)`
- _material-ui_: `withStyles(styles)(UserPage)`

## Structure of a Higher-Order Component

A higher-order component is structured like a higher-order function, it;

- Is a component,
- Takes in another component as an argument,
- Then it returns a new component,
- The component it returns can also render the original component that was passed into it.

The code snippet below is how a higher-order component is structured in React:

```jsx
import React from 'react';
// Take in a component as argument WrappedComponent
const higherOrderComponent = (WrappedComponent) => {
  // And return a new anonymous component
  class HOC extends React.Component {
    render() {
      return <WrappedComponent />;
    }
  }
  return HOC;
};
```

From the code above you can see that `higherOrderComponent` takes in a component (`WrappedComponent`) and then returns a new anonymous component inside of it. With this technique, whenever we will need to reuse a particular component’s logic for something we can create a HOC out of that component and use it wherever we like.

## Certain Use Cases for Higher-Order components

In my experience as a frontend engineer that has been writing React for a while now, here are some use cases for Higher-Order Components in React.

1. **Showing a loader while a component waits for data:** Most of the time whenever we are building web applications we would always need to use a loader of some sort that would be displayed while a component is waiting for data to be passed into its props. We could easily use an in-component solution to render the loader which will work too, but it won’t be the most elegant solution. The idea is to write a common HOC, that can track those props and while those props haven’t been injected or are in an empty state, it can then show a loading state.
2. **Conditionally rendering components:** For example, you have a component that needs to be rendered only when a user is authenticated - it is a protected component. You can create a HOC called `WithAuth()` that we can use to wrap that protected component and then make a check inside the HOC that will only render that particular component if the user has been authenticated.
3. **Managing common user-interaction states:** UI states like hover, focus, etc can be displayed beautifully, without having repeated handlers in each component, by writing a HOC which can have an event hook to upgrade the wrapped component with a state-specific flag which could be any of the UI states.
4. **Providing components with specific styling:** Continuing from the use case above, based on whatever UI state you get from the HOC, you can render specific style for specific UI states. For example, if the need arises at multiple places, for styles like `backgroundColor`, `fontSize` etc. they can be provided via a HOC by wrapping the component with one, that just injects props with the specific `className`.
5. **Providing a component with just any prop that you want:** This is a popular use case for HOCs, we can study your codebase and then take note of what reusable prop is needed across different components in your codebase. Then you can have a wrapper HOC to provide those components with the reusable prop.

## Let’s Build a Higher-Order Component

In this section of this tutorial, we will be building a higher-order component that takes in a component that has a name prop and then we make use of the name prop inside our HOC.

So generate a new react app with `create-react-app` like so:

```bash
npx create-react-app my-app
```

After generating a new React app, replace the code in your `index.js` with the following code snippet.

```jsx
import React from 'react';
import { render } from 'react-dom';
const Hello = ({ name }) => <h1>Hello {name}!</h1>;

function withName(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent name='Smashing Magazine' {...this.props} />;
    }
  };
}
const NewComponent = withName(Hello);
const App = () => (
  <div>
    <NewComponent />
  </div>
);
render(<App />, document.getElementById('root'));
```

After you have replaced the code in your `index.js` file, you should see the following displayed on your screen.

![Our React App](https://paper-attachments.dropbox.com/s_6C66A9AA67CF6D2E007FA4DD770C3DCF7AC9477AE61508C606816C79C97D1C1E_1588341576720_Screenshot+2020-05-01+at+14.59.31.png)

Now let’s explain the code snippet we used bit by bit.

```jsx
const Hello = ({ name }) => <h1>Hello {name}!</h1>;
```

Here, we are creating a functional component that has a prop called `name`, in this functional component, we are now rendering the Hello + the value of the name prop inside `<h1/>` tag.

```jsx
function withName(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent name='Smashing Magazine' {...this.props} />;
    }
  };
}
```

Here, we are creating a higher-order functional component called `withName()`, then we are returning an anonymous class component inside that renders the component wrapped inside the HOC and also assigning a value to the prop of the wrapped component.

```js
const NewComponent = withName(Hello);
```

Here, we are creating a new component called `NewComponent` and using the HOC we created and assigning to it the functional component we created at the start of the codebase called `hello`.

```jsx
const App = () => (
  <div>
    <NewComponent />
  </div>
);
render(<App />, document.getElementById('root'));
```

All we are doing here is we are creating another functional component called `App` that will render the `NewComponent` that we upgraded with our HOC in a `<div>` and then we are using the react-dom function `render` in other to display the component in our browser.

And that’s all we need to do! Our `withName` function takes a component as an argument and returns a higher order component. Few months from now, if we decide to change things around, we only have to edit our HOC.

## Conclusion

I hope you enjoyed working through this tutorial, you could always read more on Higher Order Components from the references below. If you have any questions, you can leave it in the comments section below and i’ll be happy to answer every single one.

## Resources and References

- [Higher Order Functions](https://eloquentjavascript.net/05_higher_order.html) from The Eloquent Javascript Book.
- [Introduction to HOCs](https://dev.to/ogwurujohnson/introduction-to-higher-order-components-hocs-in-react-273f) by Johnson Ogwuru
- [React Higher Order Components](https://tylermcginnis.com/react-higher-order-components/) by Tyler Mcginnis
- [Simple Explanation](https://blog.jakoblind.no/simple-explanation-of-higher-order-components-hoc/) of HOCs by Jackob Linkd
- [Higher Order Components](https://alligator.io/react/higher-order-components/) by Alligator.io
