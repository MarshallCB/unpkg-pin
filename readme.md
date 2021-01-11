<div align="center">
  <img src="https://github.com/marshallcb/unpkg-pin/raw/main/meta/unpkg-pin.png" alt="unpkg-pin Logo" width="300" />
</div>

<h1 align="center">unpkg-pin</h1>

<h3 align="center">Convert NPM imports into UNPKG Pinned URL's</h3>

<div align="center">
  <a href="https://npmjs.org/package/unpkg-pin">
    <img src="https://badgen.now.sh/npm/v/unpkg-pin" alt="version" />
  </a>
  <a href="https://packagephobia.com/result?p=unpkg-pin">
    <img src="https://badgen.net/packagephobia/install/unpkg-pin" alt="install size" />
  </a>
  <a href="https://bundlephobia.com/result?p=unpkg-pin">
    <img src="https://img.badgesize.io/MarshallCB/unpkg-pin/main/es.js?compression=brotli" alt="browser size" />
  </a>
</div>


## About

UNPKG is a CDN built for JS packages. This module converts npm module id's into the optimized UNPKG URL for optimal performance.

## Usage

**NodeJS**
```js
import { unpkg } from 'unpkg-pin';

// Uses version of package found in node_modules (if it exists - otherwise 'latest')
await unpkg('hueman')
// ~> https://cdn.skypack.dev/pin/hueman@v2.1.1-ElNqhC8YFxLlgRtjjL9o/min/hueman.js

await unpkg('hueman', { pin: false })
// ~> https://cdn.skypack.dev/hueman@2.1.1

await unpkg('hueman', { min: false })
// ~> https://cdn.skypack.dev/hueman@2.1.1

// Specify version directly
await unpkg('hueman@2.0.0')
// ~> https://cdn.skypack.dev/pin/hueman@v2.0.0-Eh8v1x3dV0iEyJ9rG915/min/hueman.js

```

**Browser** [Codepen](https://codepen.io/marshallcb/pen/qBaaJRY?editors=0011)
```js
import { unpkg } from 'https://unpkg.com/unpkg-pin?module'

await unpkg('hueman')
```

## API

#### `unpkg(module_id, is_module)` -> `URL`
- `module_id`: String that identifies the package in npm (`hueman`, `uhtml@latest`, `themepark@1.0.0`, etc.) (version number optional)
- `is_module`: Whether or not to append `?module` to the URL. See [unpkg](https://unpkg.com) for more information
- **Returns**: Promise that resolves to URL that can be used as an import statement in the browser

Uses the version of the package found in `node_modules`. Requires that the module has been installed to the current working directory. May take a few seconds if the package has not been "pinned" on skypack before.

## References

- [Unpkg](https://unpkg.com/)

## License

MIT © [Marshall Brandt](https://m4r.sh)
