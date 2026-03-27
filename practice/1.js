const { useEffect, useState } = require("react");

const createStore = (createState)=>{
    let state;
    let listeners = new Set();
    const getState = ()=>state;
    const setState = (partical,replace=false)=>{
        const newstate = typeof partical === "function" ? partical(state) : partical;
        const prestate = state;
        if(!replace){
            state = typeof newstate === "object" ? Object.assign({},newstate,state) : newstate;
        }else{
            state = newstate;
        }
        listeners.forEach(listener=>listener(state,prestate))
    }
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=> listeners.delete(listener);
    }
    const distory = ()=>{
        listeners.clear();
    }
    const api = {
        getState,
        setState,
        distory,
        subscribe
    }
    state = createState(getState,setState);
    return api;
}

const useStor = (api,select)=>{
    const [,forceRender] = useState();
    useEffect(()=>{
        api.subscribe((state,prestate)=>{
            const newstate = select(state);
            const oldstate = select(prestate);
            if(newstate !== oldstate)
                forceRender(Data.now());
        })
    },[]);
    return select(api.getState);
}

export const create = (createState)=>{
    const api = createStore(createState);
    const useBoundStore = (selector)=>{
        return useStor(api,selector);
    }
    useBoundStore = Object.assign(useBoundStore,api);
    return useBoundStore;
}
