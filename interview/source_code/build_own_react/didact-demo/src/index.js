console.log('手搓React源码');

function createElement(type, props, ...children) {
    // console.log( type, props, children);// 需要有return
    return{
        type,
        props: {
            ...props,
            children:children.map(child => 
                typeof child === 'object' ? child // 递归子节点为 虚拟DOM 对象 element
                 : createTextElement(child) // 退出条件 遇到文本节点
            ),
        },
        ...children,
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    }
}

function render(element,container){
    // console.log("render",element);
    const dom = 
        element.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(element.type);
    // 过滤 children 属性
    const isProperty = key => key !== 'children';
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            // console.log(name);
            dom[name] = element.props[name];
        })
    element.props.children.forEach(child => render(child,dom));
    container.appendChild(dom);
}

window.Didact = {
    createElement,// 负责创建虚拟DOM ，会返回一个虚拟DOM对象 
    render,// 负责渲染虚拟DOM
}

// 意为 告诉babel 用 classic 模式 转换 JSX
// 并指定 Didact.createElement 为转换函数
/** @jsxRuntime classic */ 
/** @jsx Didact.createElement */
const element = (
    <div style="background:salmon">
        <h1>hello React</h1>
        <h2 style="text-align:right">hello Didact</h2>
    </div>
)

const container = document.getElementById('root')
Didact.render(element,container);