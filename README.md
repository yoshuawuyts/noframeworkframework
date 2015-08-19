# NOFRAMEWORKFRAMEWORK
It's time to toss frameworks out the window.

## What is a framework?
It depends on who you ask. From a traditional point of view it's a set of
boundries where in programs can communicate with each other. Shell, Node and
HTTP are examples of frameworks. These frameworks are usually focused on
_protocols_.

Though usually when people talk about frameworks they mean something else: a
set of libraries that trade flexibility for opinions, usually coupled with the
promise of efficiency. It's these type of frameworks that we want to throw out.

## How to detect frameworks?
There's an easy verbal test: if you need to use the word "and" to describe a
package, you're dealing with a framework. Example:

> This module implements ES6 compatible promises and adds 40 convenience
> functions to make dealing with them easier.

## Why no frameworks?
A framework is the code version of an author's opinions. Because framework's
concerns are spread wide you'll always end up with more opinions than you
wished for. Instead of frameworks it's better to use single-purpose packages
that do one thing well. That way you can pick and choose the opinions that best
fit the situation without compromising.

Framework proponents will often argue that their method leads to more concise
code. While this is true for smaller projects, once a project grows it will be
inevitable that separate versions of the framework will be run in parallel or
never upgraded at all. One of the observable symptomes of this in larger
systems is the tendency to rewrite from scratch rather than refactor.

## This sounds reasonable. How do I get started?
This guide is here to get you up to speed in coding without frameworks in
JavaScript.

## License
[MIT](https://tldrlegal.com/license/mit-license)
