// T类型参数,类型参数 
export function getStorages<T>(key:string,defauletValue:T):T{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defauletValue;
}

export function setStorages<T>(key:string,value:T){
    localStorage.setItem(key,JSON.stringify(value));
}