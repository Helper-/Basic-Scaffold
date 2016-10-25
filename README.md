# Starter Basic Scaffold

## Getting Started

Make sure you have the latest packages installed

```
npm install
```

Note: If you don't have `npm` installed, please go to
[node](http://nodejs.com) and install it.

The above steps will download all the required software to
build and run this app, such as [grunt](http://gruntjs.com)
and [jquery](http://jquery.com).

## Running the server

You can run your app using `grunt serve`. This will start a
server on `http://localhost:9000` and open a browser to this location.

Any modification on the html, css, or javascript will be detected
and if you reload the page you will see those changes.  If you would like your browser to auto reload you can download [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) from the chrome web store.

TODO: If you'd like to run the compiled version (without reloading),
run `grunt serve:prod`.

## Building the application

Running `grunt` by itself will run through all of the steps of
linting the javascript, building out dependencies and ultimately
creating all the files in the folder `/dist/`.

## Tests

TODO

## Deploying your application on a server

Assuming you're already ran `npm install`, the only pieces
required to run the application in its built state is running
`grunt` and copy the files in dist in the correct location.

## TODO

This is a very basic scaffold for webapps.  I am still working
on having the `dist` folder be looked at correctly from the html page when you want to test production use.  
