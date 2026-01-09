import {
  useEffect,
  useState,
} from 'react';
import {chat} from './api/index.js';
import {useGitDiff} from './hooks/useGitDiff.js';

export default function App() {
//   useEffect(()=>{
//   //  fetch('http://localhost:3000/chat',{
//   //   method:'POST',
//   //   headers:{
//   //     'Content-Type':'application/json'
//   //   },
//   //   body:JSON.stringify({
//   //     message:'你好'
//   //   })
//   //  })
//   //  .then(res=>res.json())
//   //  .then(data=>console.log(data))
//   // 
//   (async ()=>{
//     const res = await chat('我喜欢滑着走');
//     console.log(res.data);
//   })()
// },[])
  const {loading,content} = useGitDiff();
  console.log(content);
  return (
  <>
  <div className="flex">
    {loading?'loading':content}
  </div>
  </>
  );
}
