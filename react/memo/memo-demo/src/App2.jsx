import { 
  useState,
  useMemo,//性能优化
 } from 'react'

 //昂贵的计算
 function slowSum(n){
  console.log('计算中');
  let sum = 0;
  for(let i = 0;i< n * 100000;i++){
    sum += i;
  }
  return sum;
 }

export default function App(){
  //count 和 keyword 不相关
  //状态改变，组件函数的重新执行
  //useEffect ,useMemo , useCallback 标记一下不用运行
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const list = ['apple','orange','peach','banana'];
  //缓存计算结果
  // const filterList = list.filter(item => {
  //   console.log('filter 执行');//count 改变时，filter 也会执行
  //   return item.includes(keyword);
  // });
  const filterList = useMemo(() => {
    // computed
    console.log('filter 执行');// 依赖项 keyword 改变时，filter 才会执行
    return list.filter(item => item.includes(keyword));
  },[keyword]);
  // 缓存昂贵的计算结果
  const result = useMemo(() => {
    return slowSum(count);
  },[count]);

  return(
    <>
    <div>
      <p>结果{result}</p>
      <input 
      type="text"
      value={keyword}
      onChange={e => setKeyword(e.target.value)}
      />
      {count}
      <button onClick={()=> setCount(count+1)}>count+1</button>
      {filterList.map(item => (<li key={item}>{item}</li>))}
    </div>
    </>
  )
}