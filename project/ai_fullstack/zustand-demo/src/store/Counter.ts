import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// 状态存储的规矩和修改的方式,专业的状态管理
// 企业做大后，需要请人管理资产 状态以及修改状态的规矩 
// 重要的数据状态

interface CounterState{
    count: number,
    increment: ()=>void,
    decrement: ()=>void,
    reset: ()=>void,
}

export const useCounterStore = create<CounterState>()(
    persist((set)=>({
    // 列出状态
    // 状态怎么改
    count: 0,
    increment: ()=>set((state:any)=>({count:state.count+1})),
    decrement: ()=>set((state:any)=>({count:state.count-1})),
    reset: ()=>set({count:0})
}),{
    name:'counter-storage',
}
))
