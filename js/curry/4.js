// 日志函数
const log = type => message => {
    console.log(`[${type}] ${message}`);
}
// 柯理化 固定函数参数
//固定 根据日志类型 函数的语义
const errorlog = log('error');
const infolog = log('info');

errorlog('接口异常');
infolog('页面加载完成')