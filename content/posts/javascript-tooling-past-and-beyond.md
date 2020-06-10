---
title: 'Javascript Build Tools: Past and Beyond'
date: '2020-06-20'
template: 'post'
draft: false
slug: 'javascript-build-tools-past-and-beyond'
category: 'Javascript'
tags:
  - 'Tooling'
  - 'Javascript'
  - 'Web Development'

description: 'Code used in production is different from development code. In production, you need to build packages that run fast, manage dependencies, automate tasks, load external modules, and more. Tools that make it possible to turn development code into production code are called build tools.'
---

## Table of Contents:

- What are Frontend/Javascript Build Tools?
- Why is Front End “Built” Now?
- Steps Involved in Building Frontend Code
- Categories of Frontend Build Tools
- Grunt and Bower
- CodeKit
- Gulp and Browserify
- Webpack & npm/yarn Scripts
- Parcel
- Rollup

## What are Frontend Build Tools

Code used in production is different from development code. In production, you need to build packages that run fast, manage dependencies, automate tasks, load external modules, and more. Tools that make it possible to turn development code into production code are called **build tools.**

## Why is Front End “Built” Now

The reason why frontend code is built can be explained by discussing the various build steps and their importance.
The steps involved in building frontend code are:

- Transpiling
- Bundling
- Minifying
- Packaging

## Steps Involved in Building Frontend Code

The following steps are involved in a frontend code build process:

### Transpiling

Transpiling lets developers take advantage of the newest, hottest updates to languages and extensions and maintain browser compatibility. e.g Babel
For example:

```js
// arrow function syntax in array map
const double = [1, 2, 3].map((num) => num * 2);
// after being transpiled
const double = [1, 2, 3].map(function(num) {
  return num * 2;
});
```

### Bundling

Bundling is the process of taking all the “import” or “require” statements, finding the matching JavaScript snippets/packages/libraries, adding them to the appropriate scope, and packaging it all into one big JavaScript file.
Examples of Bundlers:

- Browserify
- Webpack
- Parcel

### Minifing

Minifying reduces our final file size by removing white-space and code comments. You can take it a step further by adding an obfuscate step, which changes variable names, method names, obscuring our code so it is less human readable once delivered to the client. e.g Grunt
Example:

```js
// before minifying
const double = [1, 2, 3].map(function(num) {
  return num * 2;
});
// after minifying
const double = [1, 2, 3].map(function(num) {
  return num * 2;
});
```

### Packaging

After all the above steps have finished, the compatible, bundled, minified/obfuscated file has to be put somewhere. Packaging is the process of putting the result of the above steps into somewhere that has been specified by the developer. This is usually done by the bundler.

## Categories of Frontend Build Tools

According to what we have discussed above, Frontend Tooling/Build Tools can be Categorized into the following categories:

- Package Managers e.g. npm, yarn
- Transpilers e.g. Babel etc.
- Bundlers e.g. Webpack, Parcel, Browserify
- Minifiers e.g UglifyJS, Packer, Minify etc.

## Grunt and Bower

Grunt was introduced as a command line tool that provided just one script to specify and configure tasks. Bower followed shortly after as a means to manage client-side packages. The two, along with NPM, seemed to fulfill the majority of automation needs and were used regularly together.
The problem with Grunt was that it didn't provide developers the freedom to configure more complex task chains. While Bower made developers manage twice as much packages as usual because of it's separation of frontend and backend packages **(bower_components vs node_modules).**

**Future of Grunt and Bower:**
Well Grunt and Bower are on their way out of the Javascript Tooling ecosystem but there are number of replacements

## CodeKit

CodeKit came out early 2012 as a GUI tool to get your front-end assets web ready. It helped compile & minify files, compress images, lint files, and assist with other tasks that would be handled by separate tools or the command line. CodeKit was quickly adopted when it came out as it required no command line experience to use and became a must-have in any web developer’s arsenal.
The problem with Codekit was that it was paid for and it is only available for Mac OSX users.

### Future of CodeKit:

CodeKit is still available and now on version 3.12.5, but its popularity has been on a steady decline since 2014, mostly because it is only available for Mac OSX users.

## Gulp and Browserify

A year and a half after Grunt, Gulp was released. It felt natural. Writing a build script in Javascript vs JSON gave freedom. You could write functions, create variables on the fly, use conditionals anywhere - not that this would make for a particularly good looking build script, but nonetheless it was possible. Browserify and Gulp can be used in tandem.
Browserify allowed NPM packages (which are originally for backend Node servers) to be brought into the front-end, making **Bower obsolete**. This looks and feels better as well. One package manager for the front-end and back-end.

### Future of Gulp

Gulp can be improved to match the current popular build tools but this is entirely up to the creators, it is still in use but it is not as popular as it was before.

## Webpack & npm/yarn Scripts

Webpack is the hottest kid on the block in modern frontend development tooling. Webpack is an open-source JavaScript module bundler. It is made primarily for JavaScript, but it can transform front-end assets like HTML, CSS, and images if the corresponding loaders are included. With Webpack, you can also write scripts like gulp and execute them with npm/yarn.

### Future of Webpack:

Webpack is currently the hottest kid of javascript tooling ecosystem, All the JS cool kids are using React and Webpack these days. It is currently in version 4 and it not going anywhere anytime soon.

## Parcel

Parcel is a web application bundler that was launched in 2018, it is differentiated by its developer experience. It offers blazing fast performance utilizing multi-core processing, and requires zero configuration. Parcel is also a new kid in the block but it's adoption hasn't been really fast especially for large applications. Developers still prefer to use webpack over parcel because of the extensive support and customisability that webpack provides.

### Future of Parcel:

Parcel is very easy to use, it is faster than webpack if we measure bundle and build time and it also has a better developer experience. The reason why parcel hasn't been adopted much is maybe because it's still relatively new. Parcel has a very bright future in the Frontend Build tools ecosystem and it is going to be around for a while.

## Rollup

Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It is advisable to use Rollup when building a library with minimal third-party imports.

### Future of Rollup:

Rollup is super cool and it is being adopted rapidly. It has super cool features and it is going to be in frontend tooling ecosystem for a long time.

## Conclusion

The Javascript tooling ecosystem is dynamic, it changes and only the best tools survive. It's a competition. In the future we would be seeing tools with lesser/no configuration, better customisability, extensibility and higher speed.
The kind of tools used for an application's frontend is a personal call that every developer needs to make based on their requirements of the project. It's like choosing what works best for you and most of the time it's a tradeoff.

## References and Related Resources

- [Javascript Tooling: The Evolution and Future of JS/Frontend Build Tools](https://qmo.io/blog/javascript-tooling-the-evolution-and-future-of-js-front-end-build-tools/)
- [Tools and Modern Workflow For Frontend Developers](https://blog.logrocket.com/tools-and-modern-workflow-for-front-end-developers-505c7227e917/)
- [Modern Frontend: The tools and build process explained](https://medium.com/@trevorpoppen/modern-front-end-the-tools-and-build-process-explained-36641b5c1a53)
- [Best Build Tools in Frontend Development](https://www.developerdrive.com/best-build-tools-frontend-development/)
