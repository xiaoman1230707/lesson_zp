import { Navigate } from 'react-router-dom';

export default function ProtectRouter({ children }) {
    const isLogin = localStorage.getItem('isLogin') === 'true';
    return (
        <>
            {isLogin ? children : <Navigate to="/login" />}
        </>
    );
}
