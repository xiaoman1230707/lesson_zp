export function createStore(){
    let state = { count: 0 };
    const listeners = new Set();
    const getState = () => state;
    // 支持几种可能 不是替换，而是合并 
    // 支持函数
    // 支持 replace
    const setState = (partial) =>{ 
        const nextState = typeof partial === 'function' ? partial(state) : partial; // 函数
        // state = nextState; // 替换 
        state = typeof nextState !== 'object' ? partial : Object.assign({}, state, nextState);// 合并
        listeners.forEach(listener => listener(state));
    }
    const subscribe = (listener) =>{
        listeners.add(listener);
        return () => listeners.delete(listener);
    }

    return {
        getState,
        setState,
        subscribe
    }
}
