import { useState } from 'react'
import './App.css'
import Greeting from './components/Greeting.jsx'
import Modal from './components/Modal.jsx'
import Card from './components/Card.jsx'

const MyHeader = ()=>{
  return(
    <h2 style={{margin:0 ,color:'blue'}}>自定义标题</h2>
  )
}
const MyFooter = ()=>{
  return(
    <div style={{textAlign:'right'}}>
      <button onClick={()=> alert('关闭弹窗')}
        style={{padding:'0.5rem 1rem'}}
        >关闭</button>
    </div>
  )
}


function App() {
  return (
  
     <div>
     111
    {/* 自定义组件 */}
      {/* <Greeting name="张三" message="欢迎加入mihoyo!!"/> */}
      {/* <Greeting name="张三" message="欢迎来到字节" showIcon={true}/> */}
      {/* <Modal 
      HeaderComponent={MyHeader}
      FooterComponent={MyFooter}
      >
        <p>这是一个弹窗</p>
        <p>你可以在这里显示任何JSX。</p>
    </Modal> */}
    {/* jsx 是js 而class 是js的关键字 */}
    <Card className="user-card">
      <h2>张三</h2>
        <p>高级前端工程师</p>
        <button>查看详情</button>
    </Card>
    </div>

   
  )
}

export default App
