import {
  useState,
  useRef
} from 'react';

export default function App(){
  //受控组件 组件里有被状态控制的表单元素
  //单向数据流 单项绑定
  //状态绑定输入框 输入框被状态控制了
  //状态控制 输入框的值 
  const [value,setValue] = useState('');
  const inuptRef = useRef(null);

  const doLogin = (e)=>{
    e.preventDefault();
    console.log(inuptRef.current.value)
  }
  return (
    <>
    <form onSubmit={doLogin}>
      {value} 
      <input type='text' onChange={(e)=>setValue(e.target.value)} value={value}/>
      <input type="text"  ref={inuptRef}/>
      <button type='submit'>登录</button>
    </form>
    </>
  )
}