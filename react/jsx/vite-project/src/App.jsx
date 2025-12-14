//jsx react 文件的后缀
//UI 用户界面工程师 前后端分离
//vue 三部分 功能分离 
//一上来就是组件
//js 没有class,react函数就是组件

function TopArticles(){
  return(
    <div>
      <h2>文章排行</h2>
    </div>
  )
}

function Checkin(){
  return(
    <div>
      <h2>签到</h2>
    </div>
  )
}

function Ariticles(){
  return(
    <div>
      <h2>文章列表</h2>
    </div>
  )
}

//头部组件
function JuejinHeader(){
  return(
    //jsx最外层只能有一个标签  
    <div>    
      <header>
      <h1>掘金首页</h1>
    </header>
   
    </div>

  )
}

//根组件
function App(){
  //xml in js 就是jsx
  //如果一个函数返回jsx 那他就是组件
  //组件是react开发的基本单位
  //html 有标签 css 有rules  建筑里的砖头沙子 传统前端的开发单位
  //react  一下成为包工头先分工 组件化 组件组合起来就成为网页
  //诞生于facebook  
  //子组件们
  return(
    <div>
      {/* <h1>Hello <b>React!</b> </h1> */}
      {/* 头部组件 */}
      <JuejinHeader/>
       <main>
      {/* 组件也和html一样声明 自定义 
          组件化让我们像搭积木一样组合成界面
      */}
      <Ariticles></Ariticles>
      <aside>
        <Checkin></Checkin>
        <TopArticles/>
      </aside>
    </main>
    </div>
  )
}

export default App;



