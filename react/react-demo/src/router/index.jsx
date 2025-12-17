import{
    Router,//前端路由总管
    Route,
    Routes,//路由实例
} from 'react-router-dom';
import Home from '../pages/Home';//首页
import About from '../pages/About';//关于页

//路由组件
export default function AppRouters(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}
