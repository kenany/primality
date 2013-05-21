# Contributing to Primality

``` bash
$ npm install -g grunt-cli
$ git clone https://github.com/KenanY/primality.git
$ cd primality
$ npm install
```

## Building

Documents, minifies, and tests:

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
$ grunt upgrade:1.0.0 release
```

Then update the "Release Notes" section of `README.md` and the
[wiki changelog](https://github.com/KenanY/primality/wiki/Changelog).