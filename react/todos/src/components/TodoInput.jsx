import {useState} from 'react'

export default function TodoInput(props){
  // console.log(props);
  const {onAdd} = props
  // react 不支持v-model那样双向绑定 性能不好
  // react 只支持单向绑定 性能好 + onchange实现数据和视图同步
  //
  const [inputValue, setInputValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputValue.trim() === ''){
      return
    }
    onAdd(inputValue);
    setInputValue('');
  }
      return(
    <form className="todo-input" onSubmit={handleSubmit}>
      <input 
      type="text"
      value={inputValue}
      onChange={e=>setInputValue(e.target.value)}
       />
       <button type="submit">Add</button>
    </form>
  )
}