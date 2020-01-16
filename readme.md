# Backbone.js TodoMVC Example

> Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.

> _[Backbone.js - backbonejs.org](http://backbonejs.org)_


## Learning Backbone.js

The [Backbone.js website](http://backbonejs.org) is a great resource for getting started.

Here are some links you may find helpful:

* [Annotated source code](http://backbonejs.org/docs/backbone.html)
* [Applications built with Backbone.js](http://backbonejs.org/#examples)
* [FAQ](http://backbonejs.org/#faq)

Articles and guides from the community:

* [Developing Backbone.js Applications](http://addyosmani.github.io/backbone-fundamentals)
* [Collection of tutorials, blog posts, and example sites](https://github.com/documentcloud/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites)

Get help from other Backbone.js users:

* [Backbone.js on StackOverflow](http://stackoverflow.com/questions/tagged/backbone.js)
* [Google Groups mailing list](https://groups.google.com/forum/#!forum/backbonejs)
* [Backbone.js on Twitter](http://twitter.com/documentcloud)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._


## Med parcel
- `npm install parcel-bundler -g`
- `parcel app.js` så bygges filen til `dist/app.js`, og den inkluderes i html-filen.
- Den filen skal funke som før, men kode av type: `var app = app || {};` må erstattes med: `var app = window.app || {};`. Dette gjelder alle filer.
- Filer kan da importes i app.js som `import './view/app-view'`, og man kan fjerne script-tagen i index.html.
- Man kan flytte en og en fil av gangen over til `app.js`, og appen vil likvel funke. 
- Alle filer som lastes inn som en del av `app.js` vil ha tilgang til full es6-funksjonalitet (men usikker på om polyfills er inkludert)