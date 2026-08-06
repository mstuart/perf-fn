<div align="center">
  <img src="docs/assets/logo.svg" alt="perf-fn — Measure async and sync function execution time using the Performance API" width="720">
</div>

<p align="center"><strong>Measure async and sync function execution time using the Performance API</strong></p>

<p align="center">
  <a href="https://github.com/mstuart/perf-fn/actions/workflows/main.yml"><img src="https://github.com/mstuart/perf-fn/actions/workflows/main.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://www.npmjs.com/package/perf-fn"><img src="https://img.shields.io/npm/v/perf-fn?label=npm" alt="npm"></a>
  <img src="https://img.shields.io/badge/node-%E2%89%A520-339933.svg" alt="Node 20+">
</p>

---
## Install

```sh
npm install perf-fn
```

## Usage

```js
import perfFn, {perfFnSync} from 'perf-fn';

const {result, duration} = await perfFn(async () => {
	const response = await fetch('https://example.com');
	return response.status;
});

console.log(`Took ${duration}ms`);

const {result: data, duration: syncTime} = perfFnSync(() => JSON.parse('{"key": "value"}'));
```

## API

### perfFn(function\_)

Returns a `Promise<{result, duration}>` where `duration` is in milliseconds.

#### function\_

Type: `() => T | Promise<T>`

The async or sync function to measure.

### perfFnSync(function\_)

Returns `{result, duration}` where `duration` is in milliseconds.

#### function\_

Type: `() => T`

The sync function to measure.

## Related

- [abort-timer](https://github.com/mstuart/abort-timer) - Create an AbortSignal that aborts after a timeout

## License

MIT
