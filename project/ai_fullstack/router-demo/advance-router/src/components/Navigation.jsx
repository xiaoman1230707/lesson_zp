import { use } from 'react';
import {
    Link,
    useResolvedPath,
    useMatch
} from 'react-router-dom';

export default function Navigation() {
  const isActive = (to)=>{
    const resolvePath = useResolvedPath(to);
    const match = useMatch({
      path: resolvePath.pathname,
      end: true,
    });
    // console.log(resolvePath,'///');
    // console.log(to,'/////')
    return match ? 'active' : ''
  }
    return (
        <>
             <nav>
            <ul>
              <li>
                <Link to="/" className={isActive('/')}>Home</Link>
              </li>
              <li>
                <Link to="/about" className={isActive('/about')}>About</Link>
              </li>
              <li>
                <Link to="/user/1234" className={isActive('/user/1234')}> UserProfile</Link>
              </li>
              <li>
                <Link to="/product/1234" className={isActive('/product/1234')}>ProductDetail</Link>
              </li>
              <li>
                <Link to="/product/new" className={isActive('/product/new')}>NewProduct</Link>
              </li>
              <li>
                <Link to="/pay" className={isActive('/pay')}>Pay</Link>
              </li>
              

            </ul>
          </nav>
        </>
    )
}
