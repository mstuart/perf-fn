export default async function perfFn(function_) {
	const start = performance.now();
	const result = await function_();
	const duration = performance.now() - start;
	return {result, duration};
}

export function perfFnSync(function_) {
	const start = performance.now();
	const result = function_();
	const duration = performance.now() - start;
	return {result, duration};
}
