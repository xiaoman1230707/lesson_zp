/**
 * 防抖函数选项配置
 * @typedef {Object} DebounceOptions
 * @property {boolean} [leading=false] - 是否在延迟开始前立即执行
 * @property {boolean} [trailing=true] - 是否在延迟结束后执行
 * @property {number} [wait=0] - 延迟时间（毫秒）
 */

/**
 * 防抖函数返回类型，包含控制方法
 * @typedef {Function} DebouncedFunction
 * @property {() => void} cancel - 取消防抖，清空定时器
 * @property {() => void} reset - 重置防抖状态
 * @property {() => void} flush - 立即执行当前待处理的函数
 * @property {() => boolean} pending - 检查是否有待执行的函数
 */

/**
 * 空函数，用于默认回调
 */
const noop = () => {};

/**
 * 企业级防抖函数实现
 *
 * 核心设计思想：
 * 1. 使用闭包维护内部状态（timer, lastCallTime, lastThis, lastArgs等）
 * 2. 通过时间戳计算来控制 leading/trailing 的执行时机
 * 3. 提供完整的控制方法（cancel/reset/flush/pending）
 *
 * @param {Function} func - 需要防抖的函数
 * @param {number} [wait=0] - 延迟时间（毫秒）
 * @param {DebounceOptions} [options={}] - 配置选项
 * @returns {DebouncedFunction} 防抖后的函数，附带控制方法
 */
function debounce(func, wait = 0, options = {}) {
    // 参数校验与规范化
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }

    // 确保 wait 是非负数
    wait = Math.max(0, Number(wait) || 0);

    // 解析配置选项
    const { leading = false, trailing = true } = options;

    // ==================== 内部状态变量 ====================

    /** @type {number|null} 定时器ID */
    let timerId = null;

    /** @type {number|null} 上次调用时间戳 */
    let lastCallTime = null;

    /** @type {number|null} 上次函数执行时间戳 */
    let lastInvokeTime = 0;

    /** @type {any} 上次调用的 this 上下文 */
    let lastThis = undefined;

    /** @type {Array} 上次调用的参数 */
    let lastArgs = undefined;

    /** @type {any} 上次函数执行的结果 */
    let lastResult = undefined;

    /** @type {boolean} 标记是否已执行 leading */
    let isLeadingExecuted = false;

    // ==================== 核心工具函数 ====================

    /**
     * 计算剩余延迟时间
     * @returns {number} 剩余等待时间（毫秒）
     */
    const getRemainingWait = () => {
        const now = Date.now();
        const timeSinceLastCall = now - lastCallTime;
        const timeSinceLastInvoke = now - lastInvokeTime;
        const remaining = wait - timeSinceLastCall;

        // 边界情况：如果系统时间被调整（如 NTP 同步），确保返回正值
        return Math.max(0, remaining);
    };

    /**
     * 判断是否应该执行 leading 调用
     * @returns {boolean}
     */
    const shouldInvokeLeading = () => {
        // 首次调用，或者距离上次执行已经超过 wait 时间
        const now = Date.now();
        const isFirstCall = lastCallTime === null;
        const hasCooldownExpired = now - lastInvokeTime >= wait;

        return leading && (isFirstCall || hasCooldownExpired) && !isLeadingExecuted;
    };

    /**
     * 判断是否应该执行 trailing 调用
     * @returns {boolean}
     */
    const shouldInvokeTrailing = () => {
        return trailing && lastArgs !== undefined;
    };

    /**
     * 执行实际函数
     * @param {Array} args - 执行参数
     * @param {any} thisArg - this 上下文
     * @returns {any} 函数执行结果
     */
    const invokeFunc = (args, thisArg) => {
        lastInvokeTime = Date.now();
        lastArgs = undefined;
        lastThis = undefined;
        isLeadingExecuted = true;

        return func.apply(thisArg, args);
    };

    /**
     * 启动定时器
     */
    const startTimer = () => {
        const remaining = getRemainingWait();

        timerId = setTimeout(() => {
            timerId = null;

            // 检查是否需要执行 trailing 调用
            if (shouldInvokeTrailing()) {
                lastResult = invokeFunc(lastArgs, lastThis);
            }

            // 重置 leading 标记，允许下次 leading 执行
            if (!trailing) {
                isLeadingExecuted = false;
            }
        }, remaining);
    };

    /**
     * 清除定时器
     */
    const clearTimer = () => {
        if (timerId !== null) {
            clearTimeout(timerId);
            timerId = null;
        }
    };

    // ==================== 防抖主函数 ====================

    /**
     * 防抖包装函数
     * @this {any} 调用时的 this 上下文
     * @param {...any} args - 传递给原函数的参数
     * @returns {any} 如果是 leading 执行则返回结果，否则返回上次结果或 undefined
     */
    const debounced = function (...args) {
        const now = Date.now();
        lastCallTime = now;
        lastArgs = args;
        lastThis = this;

        const isFirstCall = lastInvokeTime === 0;
        const isCooldownComplete = now - lastInvokeTime >= wait;

        // 情况1：首次调用且启用 leading
        if (leading && (isFirstCall || isCooldownComplete) && !isLeadingExecuted) {
            clearTimer();
            lastResult = invokeFunc(args, this);
            startTimer();
            return lastResult;
        }

        // 情况2：非首次调用，需要重新计时
        clearTimer();

        // 情况3：启用 trailing，需要设置新的定时器
        if (trailing) {
            startTimer();
        } else {
            // 不启用 trailing，立即执行
            lastResult = invokeFunc(args, this);
        }

        // 返回上次执行结果（如果是 trailing 模式，可能返回旧结果）
        return lastResult;
    };

    // ==================== 控制方法 ====================

    /**
     * 取消防抖
     * 清空定时器，清空待执行参数，不执行函数
     */
    debounced.cancel = function () {
        clearTimer();
        lastArgs = undefined;
        lastThis = undefined;
        lastCallTime = null;
        isLeadingExecuted = false;
    };

    /**
     * 重置防抖状态
     * 完全重置所有内部状态，等同于重新创建实例
     */
    debounced.reset = function () {
        clearTimer();
        lastCallTime = null;
        lastInvokeTime = 0;
        lastThis = undefined;
        lastArgs = undefined;
        lastResult = undefined;
        isLeadingExecuted = false;
    };

    /**
     * 立即执行当前待处理的函数
     * 如果有待执行的函数，立即执行它并返回结果
     * @returns {any} 执行结果，如果没有待执行函数则返回 undefined
     */
    debounced.flush = function () {
        if (timerId !== null || lastArgs !== undefined) {
            clearTimer();
            const result = invokeFunc(lastArgs, lastThis);

            // 如果启用了 trailing，需要重新设置定时器以保持防抖行为
            if (trailing && lastCallTime !== null) {
                const now = Date.now();
                const elapsed = now - lastCallTime;
                if (elapsed < wait) {
                    lastArgs = []; // 清空当前参数
                    lastThis = undefined;
                    isLeadingExecuted = false;
                }
            }

            return result;
        }
        return lastResult;
    };

    /**
     * 检查是否有待执行的函数
     * @returns {boolean} 是否有待执行的函数
     */
    debounced.pending = function () {
        return timerId !== null;
    };

    return debounced;
}

// ==================== 导出 ====================

export default debounce;

// 兼容 CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = debounce;
}
