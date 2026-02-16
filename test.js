import test from 'ava';
import perfFn, {perfFnSync} from './index.js';

test('perfFn measures async function', async t => {
	const {result, duration} = await perfFn(async () => {
		await new Promise(resolve => {
			setTimeout(resolve, 50);
		});
		return 42;
	});
	t.is(result, 42);
	t.true(duration >= 40);
});

test('perfFn returns duration as a number', async t => {
	const {duration} = await perfFn(async () => 'hello');
	t.is(typeof duration, 'number');
	t.true(duration >= 0);
});

test('perfFn returns the result of the function', async t => {
	const {result} = await perfFn(async () => ({key: 'value'}));
	t.deepEqual(result, {key: 'value'});
});

test('perfFn propagates errors from async functions', async t => {
	await t.throwsAsync(
		() => perfFn(async () => {
			throw new Error('test error');
		}),
		{message: 'test error'},
	);
});

test('perfFn works with sync functions too', async t => {
	const {result, duration} = await perfFn(() => 'sync result');
	t.is(result, 'sync result');
	t.true(duration >= 0);
});

test('perfFnSync measures sync function', t => {
	const {result, duration} = perfFnSync(() => {
		let sum = 0;
		for (let index = 0; index < 1000; index++) {
			sum += index;
		}

		return sum;
	});
	t.is(result, 499_500);
	t.is(typeof duration, 'number');
	t.true(duration >= 0);
});

test('perfFnSync returns the result', t => {
	const {result} = perfFnSync(() => 'hello');
	t.is(result, 'hello');
});

test('perfFnSync returns duration as a positive number', t => {
	const {duration} = perfFnSync(() => null);
	t.is(typeof duration, 'number');
	t.true(duration >= 0);
});

test('perfFnSync propagates errors', t => {
	t.throws(
		() => perfFnSync(() => {
			throw new Error('sync error');
		}),
		{message: 'sync error'},
	);
});

test('perfFn is the default export', t => {
	t.is(typeof perfFn, 'function');
});

test('perfFnSync is a named export', t => {
	t.is(typeof perfFnSync, 'function');
});

test('perfFn result has exactly result and duration properties', async t => {
	const measurement = await perfFn(async () => true);
	t.deepEqual(Object.keys(measurement).sort(), ['duration', 'result']);
});

test('perfFnSync result has exactly result and duration properties', t => {
	const measurement = perfFnSync(() => true);
	t.deepEqual(Object.keys(measurement).sort(), ['duration', 'result']);
});
