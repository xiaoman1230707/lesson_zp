import {
    useEffect,
    useState
} from 'react';
// createStore 创建状态的函数 
// set 第一个参数
// get 第二个参数
// 模块私有的方法
// 暴露的是 create
const createStore = (createState) => {
    let state;// 需要根据createState 初始化状态
    const listeners = new Set();
    const getState = ()=>state;
    const setState = (partial,replace=false)=>{
        const nextState = typeof partial === 'function' ? partial(state) : partial;
        if(!Object.is(state,nextState)){// 值相等则不进入函数
            let prestate = state;
            if(!replace){
                state = typeof nextState !== 'object' ? nextState : Object.assign({}, state, nextState);
            }else {
                state = nextState;
            }
            listeners.forEach(listener=>listener(state,prestate));
        }
    }
    const subscribe = (listener)=>{
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    const destory = ()=>{
        listeners.clear();
    }
    const api = {
        getState,
        setState,
        subscribe,
        destory
    }
    state = createState(setState,getState);
    return api;
}

// 方便任何组件使用这个仓库
const useStore = (api,selector) =>{
    // api 可以拿到仓库里的状态 
    // selector 局部拿到 
    // 局部方法 只需要修改状态的方法
    const [,forceRender] = useState(0);
    useEffect(()=>{
        // 自动订阅 不需要手动subsribe 只更新 改变了的 且是 选择的 状态 
        api.subscribe((state,prestate)=>{
            const newobj = selector(state);// 拿到关心的 状态
            const oldobj = selector(prestate);
            if(newobj !== oldobj){
                forceRender(Date.now()); // 强制组件刷新 
            }
        })
    },[]);
    return selector(api.getState()); 
}

// 高阶函数 
// 返回一个函数 useXxxStore 函数
// useXxxStore 可以接收一个函数 返回一些状态和方法
export const create = (createState)=>{
    // 创建一个状态管理对象
    // 返回subscribe 
    const api = createStore(createState);
    // selector 选择那个属性 那个方法拿到 
    // hooks 函数 函数式编程
    // 方便使用 组件想用就用
    const useBoundStore = (selector) =>{
        return useStore(api,selector);
    }
    Object.assign(useBoundStore,api);
    return useBoundStore;
};
