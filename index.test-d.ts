import {expectType, expectError} from 'tsd';
import perfFn, {perfFnSync, type PerfResult} from './index.js';

const asyncResult = await perfFn(async () => 42);
expectType<PerfResult<number>>(asyncResult);
expectType<number>(asyncResult.result);
expectType<number>(asyncResult.duration);

const syncResult = perfFnSync(() => 'hello');
expectType<PerfResult<string>>(syncResult);
expectType<string>(syncResult.result);
expectType<number>(syncResult.duration);

expectError(perfFn());
expectError(perfFnSync());
