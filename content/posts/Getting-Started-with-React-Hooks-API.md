---
title: Getting Started With the React Hooks API ⚛️
date: '2020-04-23T22:40:32.169Z'
template: 'post'
draft: false
slug: 'getting-started-with-react-hooks-api'
category: 'React'
tags:
  - 'React'
  - 'Hooks'
  - 'Web Development'
description: 'When React 16.8 was released officially in early February 2019, it shipped with an additional API that lets you use state and other features in React without writing a class. This additional API is called Hooks and they’re becoming popular in the React ecosystem, from open sourced projects to being used in production applications. '
socialImage: ''
---

This article was originally published by myself on [Smashing Magazine](https://www.smashingmagazine.com/2020/04/react-hooks-api-guide/)

## Quick Summary

When React 16.8 was released officially in early February 2019, it shipped with an additional API that lets you use state and other features in React without writing a class. This additional API is called **Hooks** and they’re becoming popular in the React ecosystem, from open sourced projects to being used in production applications.

## Introduction

In this tutorial, you are going to learn and understand what React hooks are, the basic react hooks that are available and also examples on how to write them for your react applications. In the process you will also get to know about some additional hooks that were shipped with React 16.8 and also how to write your own custom react hooks.

React Hooks are completely opt-in which means that you do not need to rewrite existing code, they do not contain any breaking changes and are also available for use with the release of React 16.8. Some curious developers have been making use of the Hooks API even before it was released officially, it was not stable then and was only an experimental feature unlike now that it is stable and recommended for React developers to use.

**Note: We won’t be talking about React or Javascript in general, a good knowledge of ReactJS and Javascript will come in handy as you work through this tutorial.**

## What are React Hooks

React Hooks are in-built functions that allow React developers use state and lifecycle methods inside functional components, they also work together with existing code, so they can easily be adopted into a codebase. The way hooks were pitched to the public was that they allow developers use state in functional components but under the hood, hooks are much more powerful than that. It allows React Developers enjoy the following benefits:

- Improved Code Reuse.
- Better Code Composition.
- Better defaults.
- Sharing non-visual logic with the use of custom hooks.
- Flexibility in moving Up and Down the components tree.

With React hooks, developers get the power to use functional components for almost everything they need to do from just rendering UI to also handling state and also logic which is pretty neat.

## Motivation Behind the Release of React Hooks

According to the [ReactJS official documentation](https://reactjs.org/docs/hooks-intro.html), the following are the motivation behind the release of React Hooks.

- **Reusing stateful logic between components is difficult:** With hooks, you can reuse logics between your components without changing their architecture or structure.

- **Complex components can be difficult to understand:** When components become larger and carry out many operations, it becomes difficult to understand in a long run. Hooks solves this by allowing you separate a particular single component into various smaller functions based upon what pieces of this separated component are related (such as setting up a subscription or fetching data), rather than having to forcing a split based on lifecycle methods.

- **Classes are quite confusing:** Classes are a hindrance to learning React properly, you would need to understand how `this` in javascript works which differs from other languages. React Hooks solves this problem by allowing developers use the best of React features without having to use classes.

## **The Rules of Hooks**

There are two main rules that are strictly to be adhered to as stated by the React core team in which they outlined in the [hooks proposal documentation](https://reactjs.org/docs/hooks-rules.html).

- Make sure to not use Hooks inside loops, conditions, or nested functions
- Only use Hooks from inside React Functions.

## Basic React Hooks

There are 10 in-built hooks that was shipped with React 16.8 but the basic (commonly used) hooks include;

- `useState()`
- `useEffect()`
- `useContext()`
- `useReducer()`

These are the 4 basic hooks that are commonly used by react developers that have adopted React hooks into their codebases.

## `useState()`

The `useState()` hook allows React developers update, handle and manipulate state inside functional components without needing to convert it to a class component. Let’s use the code snippet below is a simple Age counter component and we will use it explain the power and syntax of the `useState()` hook.

```jsx
function App() {
  const [age, setAge] = useState(19);
  const handleClick = () => setAge(age + 1);

  return;
  <div>
    I am {age} Years Old
    <div>
      <button onClick={handleClick}>Increase my age! </button>
    </div>
  </div>;
}
```

If you’ve noticed, our component looks pretty simple, concise and it’s now a functional component and also does not have the level of complexity that a class component would have.

The `useState()` hook receives an initial state as an argument and then returns, by making use of array destructuring in Javascript, the two variables in the array can be named what. The first variable is the actual state, while the second variable is a function that is meant for updating the state by providing a new state.

![Our Finished React App](https://paper-attachments.dropbox.com/s_62C48C64BB345AF8D5E1779E85D525690E7070382AC496119A5EE7DC894AEA2C_1584559275146_Mar-18-2020+20-20-41.gif)

This is how our component should look when it is rendered in our react application. On click on the **Increase my Age** button, the state of the age will change and the component would work just like a class component with state.

## `useEffect()`

The `useEffect()` hook accepts a function that would contain effectful code. In functional components, effects like mutations, subscriptions, timers, logging, and other effects are not allowed to be placed inside a functional component because doing so would lead to a lot of inconsistencies when the UI is rendered and also confusing bugs.
In using the `useEffect()` hook, the effectful function passed into it will execute right after the render has been displayed on the screen. Effects are basically peek into the imperative way of building UIs that is quite different from React’s functional way.
By default, effects are executed mainly after render has been completed, but you have the option to also fire them when certain values change.
The `useEffect()` hook mostly into play for side-effects that are usually used for interactions with the Browser/DOM API or external API like data fetching or subscriptions. Also, if you are already familiar with how React lifecycle methods works you can also think of `useEffect()` hook as component **mounting**, **updating** and **unmounting** all combined in one function. It lets us replicate the lifecycle methods in functional components.
We will use the code snippets below to explain the most basic way that we can use `useEffect()` hook.

### Step 1: Define the State of your application\*\*

```jsx
import React, { useState } from 'react';
function App() {
  //Define State
  const [name, setName] = useState({ firstName: 'name', surname: 'surname' });
  const [title, setTitle] = useState('BIO');

  return (
    <div>
      <h1>Title: {title}</h1>
      <h3>Name: {name.firstName}</h3>
      <h3>Surname: {name.surname}</h3>
    </div>
  );
}
export default App;
```

Just like we discussed in the previous section on how to use the `useState()` hook to handle state inside functional components, we used it in our code snippet to set the state for our app that renders my full name.

### Step 2: Call the useEffect hook

```jsx
import React, {useState, useEffect} from 'react';
   function App() {
      // Define State
      const [name, setName] = useState({firstName: 'name', surname: 'surname'};
      const [title, setTitle] = useState('BIO');

      // Call the use effect hook
      useEffect(() => {
        setName({name: 'Shedrack', surname: 'Akintayo'})
        }, [])//pass in an empty array as a second argument

      return (
          <div>
              <h1>Title: {title}</h1>
              <h3>Name: {name.firstName}</h3>
              <h3>Surname: {name.surame}</h3>
          </div>
        );
    };
  export default App
```

We have now imported the useEffect hook and also made use of the `useEffect()` function to set the state of our the name and surname property which is pretty neat and concise.
If you have noticed the useEffect hook takes in a second argument which is an empty array, this is because it contains a call to the ‘setFullName’ which does not have a list of dependencies. Passing the second argument will prevent an infinite chain of updates (` componentDidUpdate``() `) and it’ll also allow our ` useEffect``() ` hook act as a **componentDidMount** lifecycle method and render once without re-rendering on every change in the tree.

Our React app should now look like this:

![React app using the useEffect hook](https://paper-attachments.dropbox.com/s_62C48C64BB345AF8D5E1779E85D525690E7070382AC496119A5EE7DC894AEA2C_1584820665265_Screenshot+2020-03-21+at+20.42.28.png)

We can also use change the title property of our application inside the ` useEffect``() ` function by calling the `setTitle()` function, like so

```jsx
import React, {useState, useEffect} from 'react';
  function App() {
      // Define State
    const [name, setName] = useState({firstName: 'name', surname: 'surname'});
    const [title, setTitle] = useState('BIO');

    // Call the use effect hook
    useEffect(() => {
      setName({name: 'Shedrack', surname: 'Akintayo'})
      setTitle({'My Full Name'}) //Set Title
        }, [])// pass in an empty array as a second argument

      return (
          <div>
              <h1>Title: {title}</h1>
              <h3>Name: {name.firstName}</h3>
              <h3>Surname: {name.surame}</h3>
          </div>
        );
    };
    export default App
```

Now after our application has rerendered, it now shows the new title.

![Our Finished Project](https://paper-attachments.dropbox.com/s_62C48C64BB345AF8D5E1779E85D525690E7070382AC496119A5EE7DC894AEA2C_1584821160107_Screenshot+2020-03-21+at+21.05.57.png)

## `useContext()`

The `useContext()` hook accepts a context object, i.e the value that is returned from `React.createContext`, and then it returns the current context value for that context.
This hook gives functional components easy access to your React app context. Before the `useContext` hook was introduced you would need to set up a `contextType` or a `<Consumer>` to access your global state passed down from some provider in a class component.

Basically, the `useContext` hook works with the React Context API which is a way to share data deeply throughout your app without the need to manually pass your app props down through various levels. Now, the `useContext()` makes using Context a little easier.

The code snippets below will show how the Context API works and how the `useContext` Hook makes it better.

### The normal way to use Context API

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const NumberContext = React.createContext();
function App() {
  return (
    <NumberContext.Provider value={45}>
      <div>
        <Display />
      </div>
    </NumberContext.Provider>
  );
}

function Display() {
  return (
    <NumberContext.Consumer>
      {(value) => <div>The answer to the question is {value}.</div>}
    </NumberContext.Consumer>
  );
}
ReactDOM.render(<App />, document.querySelector('#root'));
```

Now let’s break down the code snippet and explain each concept

Below we are creating a context called `NumberContext`, it is meant to return a object with two values: `{ Provider, Consumer }`

```js
const NumberContext = React.createContext();
```

Then we use the `Provider` value that was returned from the `NumberContext` we created to make a particular value available to all the children.

```jsx
function App() {
  return (
    <NumberContext.Provider value={45}>
      <div>
        <Display />
      </div>
    </NumberContext.Provider>
  );
}
```

With that, we can use the consumer value that was returned from the `NumberContext` we created to get the value we made available to all children. If you have noticed, this component did not get any props.

```jsx
function Display() {
  return (
    <NumberContext.Consumer>
      {(value) => <div>The answer to the question is {value}.</div>}
    </NumberContext.Consumer>
  );
}
ReactDOM.render(<App />, document.querySelector('#root'));
```

See how we were able to get the value from the `App` component into the `Display` component by wrapping our content in a `NumberContext.Consumer` and the using the render props method to retrieve the value and render it.

Everything works well and the render props method we used is a really good pattern for handling dynamic data, but in the long run, it does introduce some unnecessary nesting and confusion if you’re not used to it.

**Using the useContext method**
To explain the `useContext` method we will rewrite the `Display` component using the useContext hook.

```jsx
// import useContext (or we could write React.useContext)
import React, { useContext } from 'react';

// old code goes here

function Display() {
  const value = useContext(NumberContext);
  return <div>The answer is {value}.</div>;
}
```

That’s all we need to do in other to display our value, pretty neat right? You call the `useContext()` hook and pass in the context object we created and we grab the value from it.

**Note:** _Don’t forget that the argument that is passed to the useContext hook must be the context object itself and any component calling the useContext will always re-render when the context value changes._

## `useReducer`

The `useReducer` hook is used for handling complex state and transitions in state. It takes in a reducer function and also an initial state input and then returns the current state and also a dispatch function as output by the means of array destructuring.
The code below is the proper syntax for using the `useReducer` hook

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

It is sort of an alternative to the `useState` hook, it is usually preferable to `useState` when you have complex state logic that has to do with multiple sub-values or when the next state is dependent on the previous one.

## Other React Hooks Available

- `useCallback`: This hook returns a callback function that is memoized and that only changes if one dependency in the dependency tree changes.

- `useMemo`: This hook returns a memoized value, you can pass in a “create” function and also an array of dependencies. The value it returns will only the memoized value again if one of the dependency in the dependency tree changes.

- `useRef`: This hook returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will be available for the full lifetime of the component.

- `useImperativeHandle`: This hook is used for customizing the instance value that is made available for parent components when using refs in react.

- `useLayoutEffect`: This hook similar to the `useEffect` hook, however, it fires synchronously after all DOM mutations. It also renders in the same way as `componentDidUpdate` and `componentDidMount`

- `useDebugValue`: This hook can be used to display a label for custom hooks in the React Dev Tools. It is very useful for debugging with the React Dev Tools.

## Custom React Hooks

A custom Hook is a javascript function whose names is prefixed with the word “use” and can be used to call other hooks, it also lets you extract component logic into reusable functions. They are normal javascript functions that can make use of other hooks inside of it and it they also contain a common stateful logic that can be made use of within multiple components.
The code snippets below demonstrates an example of a custom react hook for implementing infinite scroll by [Paulo Levy](https://github.com/pflevy).

```jsx
import { useState } from 'react';

export const useInfiniteScroll = (start = 30, pace = 10) => {
  const [limit, setLimit] = useState(start);
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLimit(limit + pace);
    }
  };
  return limit;
};
```

This custom hook accepts 2 arguments which are `start` and `pace`. The start argument is the starting number of elements to be rendered while the pace argument is the subsequent number of elements that are to be rendered. By default, the start and pace arguments are set to 30 and 10 respectively which means you can actually call the hook without any arguments and those default values will be used instead.
In other to use this hook in a react app, we would use it like so with an online API that returns fake data.

```jsx
import React, { useState, useEffect } from 'react';
import { useInfiniteScroll } from './useInfiniteScroll';

const App = () => {
  let infiniteScroll = useInfiniteScroll();

  const [tableContent, setTableContent] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then((response) => response.json())
      .then((json) => setTableContent(json));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {tableContent.slice(0, infiniteScroll).map((content) => {
            return (
              <tr key={content.id}>
                <td style={{ paddingTop: '10px' }}>{content.userId}</td>
                <td style={{ paddingTop: '10px' }}>{content.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
```

The code above will render a list of fake data { userID and a title } that make use of the infinite scroll hook to display the initial number of data on the screen.

## Conclusion

I hope you enjoyed working through this tutorial, you could always read more on React Hooks from the references below. If you have any questions, you can leave it in the comments section below and i’ll be happy to answer every single one.

- The supporting repo for this article is available on [Github](https://github.com/hacktivist123/React-Hooks-Project)

## Resources

- [Official Hooks Documentation](https://reactjs.org/docs/hooks-reference.htm)

- [Usehooks.com](http://usehooks.com)

- [“React Hooks”](https://www.robinwieruch.de/react-hooks/) Robin Wieruch

- [“Use Context Hook”](https://daveceddia.com/usecontext-hook/) Dave Ceddia

- [“How to use useeffect”](https://medium.com/javascript-in-plain-english/react-hooks-how-to-use-useeffect-ecea3e90d84f) by Hossein Ahmadi

- [“Writing Your Own Custom React Hooks”](https://blog.bitsrc.io/writing-your-own-custom-hooks-4fbcf77e112e) by Aayush Jaiswal
