import {
    from 
} from 'rxjs';
//  from 将数据转换为Observable 对象

const stream = from([1,2,3,4,5]);
stream.subscribe((data)=>{
    console.log(data);
})