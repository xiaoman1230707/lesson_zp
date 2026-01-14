import * as React from 'react';

interface Props{
    onAdd:(title:string)=>void;
}

const TodoInput: React.FC<Props> = ({onAdd}) => {
    const [inputValue, setInputValue] = React.useState<string>('')
    const handleSubmit = ()=>{
        if(!inputValue.trim()) return;
        onAdd(inputValue);
        setInputValue('');
    }
    return(
        <>
       
            <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
        
        </>
    )
}

export default TodoInput;