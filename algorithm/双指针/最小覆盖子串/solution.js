/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
   let ori = new Map();// 0为阈值，正数意为还差，负数意为超出，0为刚好
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
    if(ori.get(tar) === 0){// 此元素减去后 map中value为0，字母类型数量减一
        typenum--;
    }
    while(typenum === 0){
// map中全部类型子组都小于等于0，即此时l ~ r+1 中包含所有t中需要的字符数量，开始移动左指针，寻找更小的区间
        let ter = s[l];
        const newstr = s.substring(l,r + 1);// 左闭右开
        if(newstr.length < res.length || !res){// 此时的区间长度小于存储长度则替换
            res = newstr;
        }
        if(ori.has(ter)){// l++在后面，所以此时l指向应该被挤出去的元素，而更新长度在前面，不会影响到
        // 如果l挤掉的元素在map中存过，那么map 中+1，字符类型+1
            if(ori.get(ter) === 0) // 可能为负，代表区间中不止有一个此字符，挤掉一个无伤大雅，类型不变
            typenum++;// 真的为0了才要+1，即为缺少了某一个类型字符
            ori.set(ter,ori.get(ter) + 1)
        }
        l++
    }
    r++
   }
   return res;
};