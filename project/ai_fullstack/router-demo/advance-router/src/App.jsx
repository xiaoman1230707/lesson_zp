import {
  BrowserRouter as Router,//html5 history
  
} from 'react-router-dom';
import Navigation from './components/Navigation.jsx';// 导航栏
import RouterConfig from './router/index.jsx';// 路由配置




export default function App() {
  return (
   <>
        <Router>
          <Navigation />
          <RouterConfig />
        </Router>
   </>
  );
}