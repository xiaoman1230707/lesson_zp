export function createStore(){
    let state = { count: 0 }
    // 不重复的数据 新的数据结构 确保不重复关注
    // 建立订阅者关系的容器
    const listeners = new Set(); // 所有的订阅者 
    const getState = ()=> state;
    const setState = (newState)=>{
        state = newState;
        // 状态改变时 通知所有的订阅者 执行订阅函数
        listeners.forEach(listener => listener(state));
    }
    const subscribe =(listener)=>{
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    return {
        getState,
        setState,
        subscribe
    };
}