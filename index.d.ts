export type PerfResult<T> = {
	/**
	The return value of the measured function.
	*/
	result: T;

	/**
	The execution time in milliseconds.
	*/
	duration: number;
};

/**
Measure the execution time of an async function using the Performance API.

@param function_ - The async function to measure.
@returns The result and duration in milliseconds.

@example
```
import perfFn from 'perf-fn';

const {result, duration} = await perfFn(async () => {
	const response = await fetch('https://example.com');
	return response.status;
});

console.log(`Took ${duration}ms`);
```
*/
export default function perfFn<T>(function_: () => T | Promise<T>): Promise<PerfResult<Awaited<T>>>;

/**
Measure the execution time of a synchronous function using the Performance API.

@param function_ - The sync function to measure.
@returns The result and duration in milliseconds.

@example
```
import {perfFnSync} from 'perf-fn';

const {result, duration} = perfFnSync(() => JSON.parse('{"key": "value"}'));

console.log(`Took ${duration}ms`);
```
*/
export function perfFnSync<T>(function_: () => T): PerfResult<T>;
