---
template: post
title: Consuming REST APIs in React With Fetch and Axios
slug: consuming-rest-apis-in-react
draft: false
date: 2020-06-04T21:19:07.221Z
description: 'In this tutorial, we are going to learn about how to consume REST APIs in React using the fetch API and the Axios client. In the process, we will also build a simple react applications that is consuming an API. At the end of this tutorial, the readers would understand what a REST API is and how to consume them in React with the best practices.'
category: React
tags:
  - React
  - APIS
  - Web Development
---
This article was originally published by myself on [Smashing Magazine](https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/)

## Quick Summary

In this tutorial, we are going to learn about how to consume REST APIs in React using the fetch API and the Axios client. In the process, we will also build a simple react applications that is consuming an API. At the end of this tutorial, the readers would understand what a REST API is and how to consume them in React with the best practices.

## Introduction

Consuming REST APIs in a React Application can be done in various ways but in this tutorial, we will be discussing how we can consume REST APIs using the most popular methods. These popular methods includes:

- A Promise-Based HTTP client called Axios.
- A browser in-built Web API called Fetch API.

We will be discussing and implementing each of the above methods in-depth and show the cool features each of the methods possess.

APIs are what we can use to supercharge our React applications with data. There are certain operations that can’t be done on the client-side, so these operations are implemented on the server-side and then we can use APIs to consume the data on the client-side.

APIs consists of a set of data, that is often in JSON format with specified endpoints. When we access data from an API, we want to access specific endpoints within that API framework. We can also say that an API is a contractual agreement between two services over the shape of request and response. The code is just a byproduct. It also contains the terms of this data exchange.
In React, there are various ways we can consume REST APIs in our applications, these ways include using the javascript inbuilt `fetch()` method and Axios which is a Promise based HTTP client for the browser and Node.js.

**Note:** We won’t be talking about React or Javascript in general, a good knowledge of ReactJS, React Hooks, Javascript and CSS will come in handy as you work through this tutorial. This tutorial is targeted towards React developers who will like to learn how they can start consuming APIs in their React applications - React developers who have only worked on React applications like to-do apps will find this useful. We’ll get started with learning about REST API.

## What is a REST API

A [REST API](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/) is an API that follows that is structured in accordance with the [REST Structure](http://gtjourney.gatech.edu/gt-devhub/documentation/restful-api-structure) for APIs. REST stands for “Representational State Transfer”. It consists of various rules that developers follow when creating APIs.

## Benefits of REST APIs

1. Very easy to learn and understand.
2. It provides developers the ability to organize complicated applications into simple resources.
3. It easy for external clients to build on your REST API without any complications.
4. It is very easy to scale.
5. A REST API is not language or platform-specific, it can be consumed with any language or run on any platform.

## Example of a REST API Response

The way a REST API is structured depends on the product it’s been made for but the rules of REST must be followed, the sample response below is from the [Github Open API](https://developer.github.com/v3) and we’ll be using this API to build a React app later in this tutorial.

```json
{
  "login": "hacktivist123",
  "id": 26572907,
  "node_id": "MDQ6VXNlcjI2NTcyOTA3",
  "avatar_url": "https://avatars3.githubusercontent.com/u/26572907?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/hacktivist123",
  "html_url": "https://github.com/hacktivist123",
  "followers_url": "https://api.github.com/users/hacktivist123/followers",
  "following_url": "https://api.github.com/users/hacktivist123/following{/other_user}",
  "gists_url": "https://api.github.com/users/hacktivist123/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/hacktivist123/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/hacktivist123/subscriptions",
  "organizations_url": "https://api.github.com/users/hacktivist123/orgs",
  "repos_url": "https://api.github.com/users/hacktivist123/repos",
  "events_url": "https://api.github.com/users/hacktivist123/events{/privacy}",
  "received_events_url": "https://api.github.com/users/hacktivist123/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Shedrack akintayo",
  "company": null,
  "blog": "https://sheddy.xyz",
  "location": "Lagos, Nigeria ",
  "email": null,
  "hireable": true,
  "bio": "☕ Software Engineer | | Developer Advocate🥑|| ❤ Everything JavaScript",
  "public_repos": 68,
  "public_gists": 1,
  "followers": 130,
  "following": 246,
  "created_at": "2017-03-21T12:55:48Z",
  "updated_at": "2020-05-11T13:02:57Z"
}
```

The response above is from the Github REST API when I make a `GET` request to the following endpoint https://api.github.com/users/hacktivist123 , it returns all the stored data about a user called **hacktivist123.** With this response, we can decide to render it however we like in our React app.

## Consuming APIs using the Fetch API

The `fetch()` API is an inbuilt javascript method for getting resources from a server or an API endpoint. It’s similar to [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), but the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provides a more powerful and flexible feature set.
It defines concepts such as [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and the [HTTP Origin header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) semantics, supplanting their separate definitions elsewhere.
The `fetch()` \***\*API \*\***method always takes in a compulsory argument, which is the path or URL to the resource you want to fetch. It returns a promise that points to the response from the request, whether the request is successful or not. You can also optionally pass in an init options object as the second argument.
Once a response has been fetched, there are several inbuilt methods available to define what the body content is and how it should be handled.

**Difference between the Fetch API and** [jQuery Ajax](https://api.jquery.com/jquery.ajax/)
The Fetch API is different from jQuery Ajax in three main ways, which are:

- The promise returned from a `fetch()` request will not reject when there's an HTTP error, no matter the nature of the response status. Instead, it will resolve the request normally, if the response status code is a 400 or 500 type code, it’ll set the ok status. A request will only be rejected either because of network failure or if something is preventing the request from completing
- `fetch()` will not allow the use of cross-site cookies i.e you cannot carry out a cross-site session using `fetch()`
- `fetch()` will also not send cookies by default unless you set the `credentials` in the init option.

### Parameters for the Fetch API

- **resource**: This is the path to the resource you want to fetch, this can either be a direct link to the resource path or a request object
- **init:** This is an object containing any custom setting or credentials you’ll like to provide for your fetch() request. The following are a few of the possible options that can be contained in the init object:
  - `method`: This is for specifying the HTTP request method e.g GET, POST, etc.
    - `headers`: This is for specifying any headers you would like to add to your request, usually contained in an object or an object literal.
    - `body`: This is for specifying a body that you want to add to your request: this can be a `Blob`, `BufferSource`, `FormData`, `URLSearchParams`, `USVString`, or `ReadableStream` object
    - `mode`: This is for specifying the mode you want to use for the request, e.g., `cors`, `no-cors`, or `same-origin`.
    - `credentials`: This for specifying the request credentials you want to use for the request, this option must be provided if you consider sending cookies automatically for the current domain.

### Basic Syntax for Using the Fetch() API

A basic fetch request is really simple to write, take a look at the following code:

```jsx
fetch('https://api.github.com/users/hacktivist123/repos')
  .then((response) => response.json())
  .then((data) => console.log(data));
```

In the code above, we are fetching data from a URL that returns data as JSON and then printing it to the console. The simplest form of using fetch() often takes just one argument which is the path to the resource you want to fetch and then return a promise containing the response from the fetch request. This response is an object.

The response is just a regular HTTP response and not the actual JSON. In other to get the JSON body content from the response, we’d have to change the response to actual JSON using the json() method on the response.

**Using Fetch API in React Apps**
Using the Fetch API in React Apps is the normal way we’d use the Fetch API in javascript, there is no change in syntax, the only issue is deciding where to make the fetch request in our React App. Most fetch requests or any HTTP request of any sort is usually done in a React Component.
This request can either be made inside a [Lifecycle Method](https://reactjs.org/docs/react-component.html#the-component-lifecycle) if your component is a Class Component or inside a [useEffect()](https://www.smashingmagazine.com/2020/04/react-hooks-api-guide/) [React Hook](https://www.smashingmagazine.com/2020/04/react-hooks-api-guide/) if your component is a Functional Component.

For example, In the code below, we will make a fetch request inside a class component,awhich means we’ll have to do it inside a lifecycle method. In this particular case, our fetch request will be made inside a `componentDidMount()` lifecycle method because we want to make the request just after our React Component has mounted.

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentDidMount() {
    const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}
export default myComponent;
```

In the code above, we are creating a very simple class component that makes a fetch request that logs the final data from the fetch request we have made to the API URL into the browser console after the React component has finished mounting.

The `fetch()` method takes in the path to the resource we want to fetch, which is assigned to a variable called `apiUrl`. After the fetch request has been completed it returns a promise that contains a response object. Then, we are extracting the JSON body content from the response using the `json()` method, finally we log the final data from the promise into the console.

## Let’s Consume a REST API with Fetch Method

In this section, we will be building a simple react application that consumes an external API, we will be using the Fetch method to consume the API.
The simple application will display all the repositories and their description that belongs to a particular user. For this tutorial, I’ll be using my GitHub username, you can also use yours if you wish.

The first thing we need to do is to generate our React App by using **create-react-app**

```js

npx create-react-app myRepos

```

The command above will bootstrap a new react app for us. After our new react app has been created all we need to is run the following command and begin coding

```js
npm start
```

If our React is created properly we should see this in our browser window when we navigate to `localhost:3000` after running the above command

![Initial App Screen](https://paper-attachments.dropbox.com/s_AFA8A5FDFCE734B5E1A7E082C10F23D7A49D1869105006FCA4EDEA2BFC55E3D0_1589417933525_appscreen.png)

In your **src** folder, create a new folder called **component**, this folder will hold all of our React components. In the new folder, create two files titled **List.js,** and **withListLoading.js,** these two files will hold the components that will be needed in our App.

The **List.js** file will handle the display of our Repositories in the form of a list, and the **withListLoading.js** file will hold a higher-order component that will be displayed when the Fetch request we will be making is still ongoing.

In the **List.js** file we created inside the components folder, let’s paste in the following code:

```jsx
import React from 'react';
const List = (props) => {
  const { repos } = props;
  if (repos.length === 0 || !repos) return <p>No repos, sorry</p>;
  return (
    <ul>
      <h2 className='list-head'>Available Public Repositories</h2>
      {repos.map((repo) => {
        return (
          <li key={repo.id} className='list'>
            <span className='repo-text'>{repo.name} </span>
            <span className='repo-description'>{repo.description}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default List;
```

The code above is a basic React list component that would display the data, in this case, the repositories name and their descriptions in a list.

Now, Let me explain the code bit by bit.

```jsx
const { repos } = props;
```

We are initializing a prop for the component called repos.

```jsx
if (repos.length === 0 || !repos) return <p>No repos, sorry</p>;
```

Here, all we are doing is making a conditional statement that will render a message when the length of the repos we get from the request we make is equal to zero.

```jsx
return (
  <ul>
    <h2 className='list-head'>Available Public Repositories</h2>
    {repos.map((repo) => {
      return (
        <li key={repo.id} className='list'>
          <span className='repo-text'>{repo.name} </span>
          <span className='repo-description'>{repo.description}</span>
        </li>
      );
    })}
  </ul>
);
```

Here, we are mapping through each of the repositories that will be provided by the API request we make and extracting each of the repositories names and their descriptions then we are displaying each of them in a list.

```jsx
export default List;
```

Here we are exporting our `List` component so that we can use it somewhere else.

In the **withListLoading.js** file we created inside the components folder, let’s paste in the following code:

```jsx
import React from 'react';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        Hold on, fetching data may take some time :)
      </p>
    );
  };
}
export default WithListLoading;
```

The code above is a higher-order React component that takes in another component and then returns some logic. In our case, our higher component will wait to check if the current `isLoading` state of the component it takes is `true` or `false`. If the current `isLoading` state is true, it will display a message _Hold on, fetching data may take some time :)_. Immediately the `isLoading` state changes to `false` it’ll render the component it took in. In our case, it’ll render the **List** component.

In your **App.js** file inside the **src** folder, let’s paste in the following code:

```jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';
function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);
  return (
    <div className='App'>
      <div className='container'>
        <h1>My Repositories</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
      <footer>
        <div className='footer'>
          Built{' '}
          <span role='img' aria-label='love'>
            💚
          </span>{' '}
          with by Shedrack Akintayo
        </div>
      </footer>
    </div>
  );
}
export default App;
```

Our App.js is a functional component that makes use of React Hooks for handling state and also side effects. If you’re not familiar with React Hooks, read my [Getting Started with React Hooks Guide.](https://www.smashingmagazine.com/2020/04/react-hooks-api-guide/)

Let me explain the code above bit by bit.

```jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';
```

Here, we are importing all the external files we need and also the components we created in our components folder. We are also importing the React Hooks we need from React.

```jsx
const ListLoading = withListLoading(List);
const [appState, setAppState] = useState({
  loading: false,
  repos: null,
});
```

Here, we are creating a new component called `ListLoading` and assigning our `withListLoading` higher-order component wrapped around our list component. We are then creating our state values `loading` and `repos` using the `useState()` React Hook.

```jsx
useEffect(() => {
  setAppState({ loading: true });
  const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((repos) => {
      setAppState({ loading: false, repos: repos });
    });
}, [setAppState]);
```

Here, we are initializing a `useEffect()` React Hook. In the `useEffect()` hook, we are setting our initial loading state to true, while this is true, our higher-order component will display a message.
We are then creating a constant variable called `apiUrl` and assigning the API URL we’ll be getting the repositories data from.

We are then making a basic `fetch()` request like we discussed above and then after the request is done we are setting the app loading state to false and populating the repos state with the data we got from the request.

```jsx
return (
  <div className='App'>
    <div className='container'>
      <h1>My Repositories</h1>
    </div>
    <div className='repo-container'>
      <ListLoading isLoading={appState.loading} repos={appState.repos} />
    </div>
  </div>
);
export default App;
```

Here are a basically just rendering the Component we assigned our higher order component to and also filling the `isLoading` prop and `repos` prop with their state value.

Now, we should see this in our browser, when the fetch request is still being made, courtesy of our `withListLoading` higher-order component:

![App Loading State](https://paper-attachments.dropbox.com/s_AFA8A5FDFCE734B5E1A7E082C10F23D7A49D1869105006FCA4EDEA2BFC55E3D0_1589809489893_Screenshot+2020-05-18+at+14.44.42.png)

Now, when the fetch request has completed successfully, we should see the repositories displayed in a list format like below:

![Finished App](https://paper-attachments.dropbox.com/s_AFA8A5FDFCE734B5E1A7E082C10F23D7A49D1869105006FCA4EDEA2BFC55E3D0_1589809384900_Screenshot+2020-05-18+at+14.42.58.png)

Now, let’s style our project a little bit, in your App.css file, copy and paste this code.

```scss
@import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');
:root {
  --basic-color: #23cc71;
}
.App {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Amiri', serif;
  overflow: hidden;
}
.container {
  display: flex;
  flex-direction: row;
}
.container h1 {
  font-size: 60px;
  text-align: center;
  color: var(--basic-color);
}
.repo-container {
  width: 50%;
  height: 700px;
  margin: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  overflow: scroll;
}
@media screen and (max-width: 600px) {
  .repo-container {
    width: 100%;
    margin: 0;
    box-shadow: none;
  }
}
.repo-text {
  font-weight: 600;
}
.repo-description {
  font-weight: 600;
  font-style: bold;
  color: var(--basic-color);
}
.list-head {
  text-align: center;
  font-weight: 800;
  text-transform: uppercase;
}
.footer {
  font-size: 15px;
  font-weight: 600;
}
.list {
  list-style: circle;
}
```

So in the code above, we are styling our app to look more pleasing to the eyes, we have assigned various class names to each element in our **App.js** file and thus we are using these class names to style our app.

So now our App should look like this after we’ve applied our styling:

![Styled App](https://paper-attachments.dropbox.com/s_AFA8A5FDFCE734B5E1A7E082C10F23D7A49D1869105006FCA4EDEA2BFC55E3D0_1589810000399_Screenshot+2020-05-18+at+13.58.55.png)

So that’s how we can use the Fetch API to consume a REST API. In the next section, we’ll be discussing Axios and how we can use it to consume the same API in the same App.

## Consuming APIs with Axios

Axios is an easy to use promise-based HTTP client for the browser and node.js. Since Axios is promise-based, we can take advantage of async and await for more readable and asynchronous code. With Axios, we get the ability to intercept and cancel request, it also has a built-in feature that provides client-side protection against cross-site request forgery.

### Features of Axios

- Request and response interception
- Streamlined error handling
- Protection against **XSRF**
- Support for upload progress
- Response timeout
- The ability to cancel requests
- Support for older browsers
- Automatic JSON data transformation

### Making Requests with Axios

Making HTTP Requests with axios is quite easy, the code below is basically how to make an HTTP request with axios.

```js
// Make a GET request
axios({
  method: 'get',
  url: 'https://api.github.com/users/hacktivist123',
});

// Make a Post Request
axios({
  method: 'post',
  url: '/login',
  data: {
    firstName: 'shedrack',
    lastName: 'akintayo',
  },
});
```

The code above shows the basic ways we can make a GET and POST HTTP request with axios.

Axios also provides a set of shorthand method for performing different HTTP requests. The Methods are as follows:

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

For example, if we want to make a similar request like the example code above but with the shorthand methods we can do it like so:

```js
// Make a GET request with a shorthand method
axios.get('https://api.github.com/users/hacktivist123');

// Make a Post Request with a shorthand method
axios.post('/signup', {
  firstName: 'shedrack',
  lastName: 'akintayo',
});
```

In the code above, we are making the same request as what we did above but this time with the shorthand method. Axios provides flexibility and makes your HTTP requests even more readable.

### Making Multiple Requests with Axios

Axios provides developers the ability to make and handle simultaneous HTTP requests using the `axios.all()` method. This method takes in an array of arguments and it returns a single promise object that resolves only when all arguments passed in the array have resolved.

For example, we can make multiple requests to the GitHub api using the `axios.all()` method like so:

```js
axios
  .all([
    axios.get('https://api.github.com/users/hacktivist123'),
    axios.get('https://api.github.com/users/adenekan41'),
  ])
  .then((response) => {
    console.log('Date created: ', response[0].data.created_at);
    console.log('Date created: ', response[1].data.created_at);
  });
```

The code above makes simultaneous requests to an array of arguments in parallel and returns the response data, in our case, it will log to the console the `created_at` object from each of the api responses.

## Let’s Consume a REST API with Axios Client

In this section, all we’ll be doing is replacing `fetch()` method with Axios in our existing React Application. All we need to do is to install axios and then use it in our App.js file for making the HTTP request to the GitHub API.

Now let’s install Axios in our React App by running either of the following

with npm

```js
npm install axios
```

with yarn

```js
yarn add axios
```

After installation is complete, we have to import axios into our App.js. In our App.js we’ll add the following line to the top of our App.js file:

```jsx
import axios from 'axios';
```

After adding the line of code our App.js all we have to do inside our `useEffect()` is to write the following code:

```jsx
useEffect(() => {
  setAppState({ loading: true });
  const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
  axios.get(apiUrl).then((repos) => {
    const allRepos = repos.data;
    setAppState({ loading: false, repos: allRepos });
  });
}, [setAppState]);
```

If you’ve noticed, we have replaced the fetch API there with the axios shorthand method `axios.get` to make a get request to the API.

```jsx
axios.get(apiUrl).then((repos) => {
  const allRepos = repos.data;
  setAppState({ loading: false, repos: allRepos });
});
```

In this block of code, we are making a GET request then we are returning a promise that contains the repos data and assigning the data to a constant variable called `allRepos`. We are then setting the current loading state to false and also passing the data from the request to the repos state variable.

If we did everything correctly, we should see our App still render the same way without any change.

![App with Axios](https://paper-attachments.dropbox.com/s_AFA8A5FDFCE734B5E1A7E082C10F23D7A49D1869105006FCA4EDEA2BFC55E3D0_1589815181885_Screenshot+2020-05-18+at+13.58.55.png)

So This is how we can use Axios client to consume a REST API.

## Fetch vs Axios

In this section, I will be listing our certain features and then I’ll talk about how well Fetch and Axios support these features.

1. **Basic Syntax:** Both Fetch and Axios have very simple syntaxes for making requests. But Axios has an upper hand because Axios automatically converts a response to JSON, so when using Axios we skip the step of converting the response to JSON, unlike Fetch() where we’d still have to convert the response to JSON. Lastly, Axios shorthand methods allow us to make specific HTTP Requests easier.

2. **Browser Compatibility:** One of the many reasons why developers would prefer Axios over Fetch is because Axios is supported across major browsers and versions unlike Fetch that is only supported in Chrome 42+, Firefox 39+, Edge 14+, and Safari 10.1+

3. **Handling Response Timeout**: Setting a timeout for responses is very easy to do in Axios by making use of the `timeout` option inside the request object. But in Fetch, it is not that easy to do this. Fetch provides a similar feature by using the `AbortController()` interface but it takes more time to implement and can get confusing.

4. **Intercepting HTTP Requests:** Axios allows developers to intercept HTTP requests. HTTP interceptors are needed when we need to change HTTP requests from our application to the server. Interceptors give us the ability to do that without having to write extra code.

5. **Making Multiple Requests Simultaneously**: Axios allows us to make multiple HTTP requests with the use of the `axios.all()` method ( I talked about this above). `fetch()` provides the same feature with the use of the `promise.all()` method, we can make multiple `fetch()` requests inside it.

## Conclusion

Axios and `fetch()` are all great ways of consuming APIs but I advise you to use `fetch()` when building relatively small applications and make use of Axios when building large applications for scalability reasons.
I hope you enjoyed working through this tutorial, you could always read more on Consuming REST APIs with either Fetch or Axios from the references below. If you have any questions, you can leave it in the comments section below and I’ll be happy to answer every single one.

- The supporting repo for this article is available on [Github](https://github.com/hacktivist123/consuming-rest-apis)
  [](https://github.com/hacktivist123/consuming-rest-apis)## Resources
- [REST API Structure](http://gtjourney.gatech.edu/gt-devhub/documentation/restful-api-structure)
- [Understanding and Using REST APIs](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/) by Zell Liew
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) by Mozilla Developer Network
- [Using Axios and React](https://alligator.io/react/axios-react/) by Paul Halliday
- [How to make HTTP requests like a pro with Axios](https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/) by Faraz Kelhini
