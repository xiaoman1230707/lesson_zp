// 观察者模式 是经典的设计模式
import {
    Observable
} from 'rxjs';
// 创建一个了一个Observable 对象实例 
// 参数是一个回调函数 
// subscriber 观察者对象
const stream = new Observable((subscriber)=>{
    // 订阅者对象 可以用来发布数据
    // next 发送数据
    // complete 完成数据流
    subscriber.next('hello');
    subscriber.next('world');
    subscriber.complete('111');
})

stream.subscribe((data)=>{
    console.log(data);
})