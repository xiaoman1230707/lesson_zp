function debounce(func,delay){
    let timer = null;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        // this 箭头函数 指向调用者 
        timer = setTimeout(()=>{
            func.apply(this,args);
        },delay);
    }
}