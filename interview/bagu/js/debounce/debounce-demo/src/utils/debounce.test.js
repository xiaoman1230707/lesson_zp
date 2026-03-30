/**
 * debounce 函数测试用例
 * 覆盖所有功能点和边界情况
 */

import debounce from './debounce';

// ==================== 测试工具函数 ====================

/**
 * 模拟延迟
 * @param {number} ms - 延迟毫秒数
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 创建计数器函数，便于追踪调用次数
 * @returns {{fn: Function, count: number, calls: Array}}
 */
const createCounter = () => {
    const calls = [];
    const fn = jest.fn(function (...args) {
        calls.push({
            timestamp: Date.now(),
            args: args,
            thisArg: this,
        });
        return args.length;
    });
    return { fn, calls };
};

// ==================== 测试用例 ====================

describe('debounce - 基础功能', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('应该返回一个可调用函数', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        expect(typeof debounced).toBe('function');
        expect(typeof debounced.cancel).toBe('function');
        expect(typeof debounced.reset).toBe('function');
        expect(typeof debounced.flush).toBe('function');
        expect(typeof debounced.pending).toBe('function');
    });

    test('基础防抖：多次调用只执行最后一次', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        debounced('a');
        debounced('b');
        debounced('c');

        expect(fn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith('c');
    });

    test('应该正确透传参数', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        debounced(1, 2, 3);
        debounced('a', 'b', 'c');

        jest.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledWith('a', 'b', 'c');
    });

    test('应该正确绑定 this', () => {
        const fn = jest.fn(function () { return this; });
        const debounced = debounce(fn, 100);
        const context = { name: 'test' };

        debounced.call(context);
        jest.advanceTimersByTime(100);

        expect(fn).toHaveReturnedWith(context);
    });

    test('应该返回正确的值（leading 模式）', () => {
        const fn = jest.fn((x) => x * 2);
        const debounced = debounce(fn, 100, { leading: true, trailing: false });

        const result1 = debounced(5);
        expect(result1).toBe(10);

        const result2 = debounced(3);
        expect(result2).toBe(10); // trailing 为 false，返回上次结果
    });
});

describe('debounce - leading 选项', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('leading=true: 首次调用立即执行', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true });

        debounced('first');
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith('first');
    });

    test('leading=true: 后续调用在延迟结束后执行', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true, trailing: true });

        debounced('first');
        debounced('second');
        expect(fn).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith('second');
    });

    test('leading=true, trailing=false: 只执行首次调用', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true, trailing: false });

        debounced('a');
        debounced('b');
        debounced('c');

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith('a');

        jest.advanceTimersByTime(200);

        expect(fn).toHaveBeenCalledTimes(1); // 不再执行
    });
});

describe('debounce - trailing 选项', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('trailing=false: 不执行延迟结束后的调用', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { trailing: false });

        debounced('a');
        expect(fn).toHaveBeenCalledTimes(1); // 立即执行

        debounced('b');
        expect(fn).toHaveBeenCalledTimes(2); // 立即执行

        jest.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalledTimes(2); // 不再执行
    });
});

describe('debounce - leading + trailing 同时为 true', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('leading 和 trailing 同时为 true', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true, trailing: true });

        // 第一次调用，立即执行
        debounced('first');
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith('first');

        // 连续触发
        debounced('second');
        debounced('third');
        expect(fn).toHaveBeenCalledTimes(1);

        // 延迟结束，执行最后一次
        jest.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith('third');
    });

    test('等待期结束后，新的调用触发 leading', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true, trailing: true });

        debounced('call1');
        jest.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(2); // leading + trailing

        // 等待期结束后
        jest.advanceTimersByTime(150);

        // 新调用应该触发 leading
        debounced('call2');
        expect(fn).toHaveBeenCalledTimes(3);
    });
});

describe('debounce - 控制方法', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('cancel(): 取消待执行的调用', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        debounced('a');
        debounced.cancel();

        jest.advanceTimersByTime(200);

        expect(fn).not.toHaveBeenCalled();
    });

    test('cancel(): 重置 leading 状态', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true });

        debounced('first');
        expect(fn).toHaveBeenCalledTimes(1);

        debounced.cancel();

        // cancel 后，leading 状态被重置，下次调用应该是 leading
        debounced('second');
        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith('second');
    });

    test('reset(): 完全重置状态', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true });

        debounced('a');
        debounced('b');

        debounced.reset();

        jest.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalledTimes(1); // 只有第一次的 leading

        debounced('c');
        expect(fn).toHaveBeenCalledTimes(2); // reset 后，leading 可再次触发
    });

    test('flush(): 立即执行待处理的函数', () => {
        const fn = jest.fn((x) => x * 2);
        const debounced = debounce(fn, 100);

        debounced(5);
        debounced(3);

        const result = debounced.flush();

        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith(3);
        expect(result).toBe(6);
    });

    test('flush(): 没有待执行函数时返回 undefined', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        const result = debounced.flush();
        expect(result).toBeUndefined();
    });

    test('pending(): 检查是否有待执行函数', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        expect(debounced.pending()).toBe(false);

        debounced('a');
        expect(debounced.pending()).toBe(true);

        jest.advanceTimersByTime(100);
        expect(debounced.pending()).toBe(false);
    });

    test('pending(): leading 模式首次调用后为 false', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true, trailing: false });

        debounced('a');
        expect(debounced.pending()).toBe(false);
    });
});

describe('debounce - 边界情况', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('连续快速触发', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        // 快速连续触发 10 次
        for (let i = 0; i < 10; i++) {
            debounced(i);
            jest.advanceTimersByTime(50); // 每次都不到 100ms
        }

        expect(fn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenLastCalledWith(9);
    });

    test('wait = 0 时的行为', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 0);

        debounced('a');
        debounced('b');

        // 使用 Promise.resolve 等待微任务队列
        Promise.resolve().then(() => {
            expect(fn).toHaveBeenCalled();
        });
    });

    test('传递非函数应抛出 TypeError', () => {
        expect(() => debounce(null, 100)).toThrow(TypeError);
        expect(() => debounce('string', 100)).toThrow(TypeError);
        expect(() => debounce({}, 100)).toThrow(TypeError);
    });

    test('wait 为负数时应视为 0', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, -100);

        expect(() => debounced()).not.toThrow();
    });

    test('flush 后可以继续正常使用', () => {
        const fn = jest.fn((x) => x);
        const debounced = debounce(fn, 100);

        debounced('a');
        debounced.flush();

        debounced('b');
        jest.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledTimes(2);
        expect(fn).toHaveBeenLastCalledWith('b');
    });

    test('多次 cancel 不会报错', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);

        debounced('a');
        debounced.cancel();
        debounced.cancel();
        debounced.cancel();

        expect(() => debounced.cancel()).not.toThrow();
    });

    test('leading 调用后，在等待期间再次调用不触发新的 leading', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100, { leading: true, trailing: false });

        debounced('a'); // leading 执行
        expect(fn).toHaveBeenCalledTimes(1);

        debounced('b'); // 在等待期间，不执行
        debounced('c'); // 在等待期间，不执行
        expect(fn).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(150);

        debounced('d'); // 等待期结束，新的 leading 执行
        expect(fn).toHaveBeenCalledTimes(2);
    });
});

describe('debounce - 实际使用场景', () => {
    test('搜索输入防抖', async () => {
        const searchApi = jest.fn((query) => `results for ${query}`);
        const debouncedSearch = debounce(searchApi, 300);

        // 模拟用户快速输入
        debouncedSearch('r');
        debouncedSearch('re');
        debouncedSearch('rea');
        debouncedSearch('reac');
        debouncedSearch('react');

        await sleep(350);

        expect(searchApi).toHaveBeenCalledTimes(1);
        expect(searchApi).toHaveBeenLastCalledWith('react');
    });

    test('窗口 resize 防抖（leading + trailing）', async () => {
        const handleResize = jest.fn();
        const debouncedResize = debounce(handleResize, 200, {
            leading: true,
            trailing: true,
        });

        // 首次 resize，立即执行
        debouncedResize();
        expect(handleResize).toHaveBeenCalledTimes(1);

        // 连续 resize
        debouncedResize();
        debouncedResize();
        expect(handleResize).toHaveBeenCalledTimes(1);

        await sleep(250);
        // 延迟结束后执行最后一次
        expect(handleResize).toHaveBeenCalledTimes(2);
    });

    test('按钮点击防抖（leading 模式）', async () => {
        let count = 0;
        const increment = () => { count++; };
        const debouncedIncrement = debounce(increment, 500, {
            leading: true,
            trailing: false,
        });

        // 快速点击多次
        debouncedIncrement();
        debouncedIncrement();
        debouncedIncrement();
        debouncedIncrement();

        expect(count).toBe(1); // 只执行第一次

        await sleep(600);

        // 可以再次点击
        debouncedIncrement();
        expect(count).toBe(2);
    });
});

// ==================== 手动测试示例 ====================

console.log('=== debounce 手动测试 ===\n');

// 示例1: 基础用法
console.log('示例1: 基础防抖');
const basicFn = (msg) => console.log('执行:', msg);
const basicDebounce = debounce(basicFn, 300);

basicDebounce('a');
basicDebounce('b');
basicDebounce('c');
// 300ms 后输出: 执行: c

// 示例2: leading 模式
console.log('\n示例2: leading 模式');
const leadingFn = (msg) => console.log('leading 执行:', msg);
const leadingDebounce = debounce(leadingFn, 300, { leading: true });

leadingDebounce('第一次'); // 立即执行
leadingDebounce('第二次'); // 不执行
// 300ms 后执行: 第二次

// 示例3: 使用控制方法
console.log('\n示例3: 控制方法');
const controlFn = () => console.log('执行了！');
const controlDebounce = debounce(controlFn, 1000);

controlDebounce();
console.log('pending:', controlDebounce.pending()); // true

controlDebounce.cancel();
console.log('cancel 后 pending:', controlDebounce.pending()); // false

// 示例4: flush
console.log('\n示例4: flush');
const flushFn = (x) => console.log('flush 执行:', x);
const flushDebounce = debounce(flushFn, 1000);

flushDebounce('参数');
flushDebounce.flush(); // 立即执行: flush 执行: 参数
