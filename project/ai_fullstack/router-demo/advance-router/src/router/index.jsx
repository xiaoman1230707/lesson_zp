import {
  lazy,//懒加载
  Suspense,// 等待组件加载完成 用于包裹懒加载的组件
} from 'react';
import {
  Navigate,// 重定向
  Routes,//一组路由
  Route,//单个路由
} from 'react-router-dom';
import LoadingFallback from '../components/LoadingFallback.jsx';



// import Home from './pages/Home';
// import About from './pages/About';
const About = lazy(() => import('../pages/About'));
const Home = lazy(() => import('../pages/Home'));//分享链接进的About
const UserProfile = lazy(() => import('../pages/UserProfile'));//用户个人中心
const Product = lazy(() => import('../pages/product'));//商品列表
const ProductDetail = lazy(() => import('../pages/product/ProductDetail'));//商品详情
const NewProduct = lazy(() => import('../pages/product/NewProduct'));//新增商品
const Login = lazy(() => import('../pages/Login'));//登录
const Pay = lazy(() => import('../pages/Pay'));//支付
const ProtectRouter = lazy(() => import('../components/ProtectRouter'));// 鉴权组件
const NotFound = lazy(() => import('../pages/NotFound'));// 404 页面
const NewPath = lazy(() => import('../pages/NewPath'));// 新路径

export default function RouterConfig(){
    return(
        <>
         <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* 动态路由 http(s)://www.juejin.cn/user/1234?key=value#/about
                协议://domain/path/:params?queryString#hash
            */}
            <Route path="/user/:id" element={<UserProfile />} />

            <Route path="/product" element={<Product/>}>
             <Route path=":productId" element={<ProductDetail />}/>
             <Route path="new" element={<NewProduct />}/>
            </Route>
            {/* 鉴权的路由 需要先登录才能支付 */}
            <Route path="/login" element={<Login />} />
            <Route path='/old-path' element={<Navigate replace to="/new-path" />} />
            {/* 当访问旧路径时，使用Navigate组件重定向到新路径 重定向路由 */}
            <Route path='/new-path' element={<NewPath />} />
            <Route path="/pay" element={
              <ProtectRouter>
                <Pay />
              </ProtectRouter>
            } />
            {/* 404 页面 */}
            <Route path="*" element={<NotFound />} />
         </Routes>
 
          </Suspense>
        </>
    )
}