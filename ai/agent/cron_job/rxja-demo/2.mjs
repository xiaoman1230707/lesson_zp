import{
    from,
    map
} from 'rxjs';

from([1,2,3,4,5])
    .pipe(
        map((data)=>data*2)
    )
    .subscribe((data)=>{
        console.log(data);
    })