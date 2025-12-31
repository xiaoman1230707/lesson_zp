import { useRef } from 'react';
export default function CommentBox() {
    //uncontrolled 非受控组件
    const textareaRef = useRef(null);
    const handleSubmit = (e)=>{
        const comment = textareaRef.current.value;
        if(!comment) return alert('请输入评论');
        console.log(comment);
    }

    return(
        <>
            <textarea 
            ref={textareaRef}
            placeholder='请输入评论'
            ></textarea>
            <button onClick={handleSubmit}>提交</button>
        </>
    )
}