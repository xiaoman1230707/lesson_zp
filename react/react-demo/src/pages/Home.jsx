import {
    //use 开头函数 hooks函数
    useState,//响应式状态管理
    useEffect,//副作用管理 onMounted 挂载后
} from 'react';
const Home = () => {
    const [repos,setRepos] = useState([]);
    //render 是第一位的 
    console.log('组件初始化');
    useEffect(() => {
        //home组件已经可以看到
        console.log('组件挂载后');
        //发送API请求 不会和组件渲染去争抢
        fetch('https://api.github.com/users/shunwuyu/repos')
            .then(res => res.json())
            .then(data => setRepos(data));
    }, []);
    return (
        <div>
            <h1>Home</h1>
            {
                repos.length ? (
                    <ul>
                        {
                            repos.map(repo => (
                                <li key={repo.id}>
                                <a href={repo.html_url} target="_blank" rel="noreferrer">
                                    {repo.name}
                                </a>
                                </li>
                            ))
                        }
                    </ul>
                ):(
                    <p>暂无仓库</p>
                )
            }
        </div>
    )
}
export default Home;