import {
    useNavigate
} from 'react-router-dom';
import {
    useEffect
} from 'react';

const NotFound = ()=>{
    // Link 点击跳转到首页
    let navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/');
        },3000);
    })
    return(
        <>
            <h2>404 Not Found</h2>
        </>
    )
}

export default NotFound;