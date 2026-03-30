/**
 * 手写 Promise.all
 * @param {Iterable} promises - 包含 Promise 或普通值的可迭代对象
 * @returns {Promise}
 */
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 1. 判断是否为可迭代对象 (简单处理数组)
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }

    const result = [];
    let count = 0; // 用于记录成功完成的 Promise 数量
    const length = promises.length;

    // 2. 如果是空数组，直接 resolve
    if (length === 0) {
      return resolve([]);
    }

    // 3. 遍历执行
    promises.forEach((item, index) => {
      // 兼容非 Promise 对象，使用 Promise.resolve 包裹
      Promise.resolve(item)
        .then((value) => {
          // 不能直接 push，因为 Promise 是异步的，必须通过索引保证顺序
          result[index] = value;
          count++;

          // 4. 当所有任务都完成后，resolve 最终结果数组
          if (count === length) {
            resolve(result);
          }
        })
        .catch((err) => {
          // 5. 只要有一个失败，立即 reject
          reject(err);
        });
    });
  });
}

// --- 测试用例 ---

const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const p3 = 3; // 普通值

myPromiseAll([p1, p2, p3])
  .then((res) => {
    console.log('成功结果:', res); // 期望: [1, 2, 3]
  })
  .catch((err) => {
    console.error('失败:', err);
  });

myPromiseAll([p1, Promise.reject('报错了'), p2])
  .then((res) => console.log(res))
  .catch((err) => console.log('捕获错误:', err)); // 期望: 捕获错误: 报错了