# perf-fn

> Measure async and sync function execution time using the Performance API

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
