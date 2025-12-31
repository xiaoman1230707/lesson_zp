import { useState } from 'react';
export default function LoginForm(){
    const [form,setForm] = useState({
        username:'',
        password:''
    })
    const handleChange = (e)=>{
        const {name,value} = e.target;
        //返回一个新的对象
        setForm({
            ...form,
            [name]:value
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(form)
    }
    
    return(
        <>
        <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder='请输入用户名'
        name='username'
        onChange={handleChange}
        value={form.username}
        />
        <input type="password" 
        placeholder='请输入密码'
        name='password'
        onChange={handleChange}
        value={form.password}
        />
        <button type='submit'>注册</button>
        </form>
        
        </>
    )
}