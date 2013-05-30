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

Automatic committing and tagging is horribly unreliable.

``` bash
$ grunt upgrade:1.0.0 doc
$ git commit -am 'Release 1.0.0'
$ git tag -a 1.0.0 -m '1.0.0'
$ npm publish
```

Then update the "Release Notes" section of `README.md` and the
[wiki changelog](https://github.com/KenanY/primality/wiki/Changelog).