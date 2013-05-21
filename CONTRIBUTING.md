# Contributing to Primality

``` bash
$ npm install -g grunt-cli
$ git clone https://github.com/KenanY/primality.git
$ cd primality
$ npm install
```

## Building

Generates docs, minifies, and tests:

``` bash
$ grunt
```

## Testing

Using PhantomJS:

``` bash
$ grunt test
```

Using web browsers:

``` bash
$ testem
```

## Releasing

Don't do this in pull requests.

``` bash
$ grunt upgrade:1.0.0 default
$ npm publish
```