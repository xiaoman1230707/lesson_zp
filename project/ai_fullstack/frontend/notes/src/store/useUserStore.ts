import { 
    create// 创建store实例
 } from 'zustand';
import type { User } from '@/types';

interface UserState{
    isLogin:boolean;
    user:User | null;// 联合类型
    // login:()=>{};
    // logout:()=>{};
}

export const useUserStore = create<UserState>((set) => ({
        isLogin:true,
        user:null
})
)



