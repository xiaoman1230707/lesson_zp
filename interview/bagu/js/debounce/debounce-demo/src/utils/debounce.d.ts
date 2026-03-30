/**
 * 防抖函数配置选项
 */
export interface DebounceOptions {
  /**
   * 是否在延迟开始前立即执行函数
   * @default false
   */
  leading?: boolean;

  /**
   * 是否在延迟结束后执行函数
   * @default true
   */
  trailing?: boolean;

  /**
   * 延迟时间（毫秒）
   * @default 0
   */
  wait?: number;
}

/**
 * 防抖函数返回类型，包含控制方法
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  /**
   * 防抖包装后的函数
   * @param thisArg - this 上下文
   * @param args - 传递给原函数的参数
   * @returns 函数执行结果或上次结果
   */
  (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> | undefined;

  /**
   * 取消防抖，清空定时器，不执行待处理函数
   */
  cancel(): void;

  /**
   * 重置防抖状态，完全清空所有内部状态
   */
  reset(): void;

  /**
   * 立即执行当前待处理的函数
   * @returns 执行结果，如果没有待处理函数则返回 undefined
   */
  flush(): ReturnType<T> | undefined;

  /**
   * 检查是否有待执行的函数
   * @returns 是否有待执行的函数
   */
  pending(): boolean;
}

/**
 * 防抖函数
 * @param func - 需要防抖的函数
 * @param wait - 延迟时间（毫秒）
 * @param options - 配置选项
 * @returns 防抖后的函数，附带控制方法
 */
declare function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait?: number,
  options?: DebounceOptions
): DebouncedFunction<T>;

export default debounce;
