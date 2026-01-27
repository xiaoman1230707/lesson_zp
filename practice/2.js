/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
   let ori = new Map();
   let res = '';
   for(let i = 0; i < t.length; i++){
    let cur = t[i];
    ori.set(cur,ori.get(cur) ? ori.get(cur) + 1 : 1)
   }
   let typenum = ori.size;
   let l = 0,r = 0;
   while(r < s.length){// r不超过最右边 其中最短
    const tar = s[r];
    if(ori.has(tar)){// 新加入元素 那么减掉一个map中有的元素value值
        ori.set(tar,ori.get(tar) - 1)
    }
    if(ori.get(tar) === 0){// 此元素减去后 map中value为0，类型
        typenum--;
    }
    while(typenum === 0){
        let ter = s[l];
        const newstr = s.substring(l,r + 1);// 左闭右开
        if(newstr.length < res.length || !res){
            res = newstr;
        }
        if(ori.has(ter)){
            if(ori.get(ter) === 0) typenum++;
            ori.set(ter,ori.get(ter) + 1)
        }
        l++
    }
    r++
   }
   return res;
};

let s = "ADOBECODEBANC", t = "ABCB";
let res = minWindow(s,t);
console.log(res)