import { Home,User,ListOrdered,MessageCircle } from 'lucide-react';// 图标字体库
import {
    useNavigate,//跳转功能
    useLocation//获取当前路由信息
} from 'react-router-dom';
import {cn} from '@/lib/utils';// 分条件组合类名 
import { useUserStore } from '@/store/useUserStore';
import { needsLogin } from '@/App';

export default function BottomNav(){
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {isLogin} = useUserStore();
    // console.log(location);
    const tabs = [
        {
            label:"首页",
            path:"/",
            icon:Home
        },
        {
            label:"订单",
            path:"/order",
            icon:ListOrdered
        },
        {
            label:"聊天",
            path:"/chat",
            icon:MessageCircle
        },
        {
            label:"我的",
            path:"/mine",
            icon:User
        },
    ]
    const handleNav = (path:string) =>{
        if(pathname === path){//如果当前路由和点击的路由相同，就没必要切换
            return;
        }
        if(needsLogin.includes(path) && !isLogin){
            navigate('/login');
            return;
        }
        navigate(path);
    }

    return(
        <>
        <div className="fixed bottom-0 left-0 right-0 h-16
    border-t bg-background flex items-center justify-around
    z-50 safe-area-bottom">
            {
                tabs.map(tab =>{
                    const Icon = tab.icon;
                    const isActive = pathname === tab.path;
                    return <button 
                    key={tab.path}
                    onClick={()=>handleNav(tab.path)}
                    className="flex flex-col items-center justify-center 
          w-full h-full space-y-1"
                    >
                        <Icon 
                        size={24} 
                        className={cn("transition-colors",
                            isActive?"text-primary":"text-muted-foreground")}
                        />
                        <span className={cn("text-xs transition-colors",
                        isActive?"text-primary font-medium":"text-muted-foreground")}
                        >{tab.label}</span>
                    </button>
                })
            }
        </div>
        </>
    )
}