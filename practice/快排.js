function qu(arr,left,right){
    if(left >= right) return ;
    let position = getp(arr,left,right);
    qu(arr,left,position - 1);
    qu(arr,position + 1,right);
    return arr;
}

function getp(arr,left,right){
    let pov = arr[right];
    let i = left - 1;
    for(let j = left; j < right; j++){
        if(arr[j] < pov){
            i++;
        [arr[i],arr[j]] = [arr[j],arr[i]];
        }
    }
    [arr[i + 1],arr[right]] = [arr[right],arr[i + 1]];
    return i + 1;
}

let a = [13,3,4546,4,7,3,5,9,67,23,3,333,45];
qu(a,0,a.length - 1);
console.log(a);