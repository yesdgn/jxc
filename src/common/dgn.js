/* 第一种使用：执行函数返回对象
export  const  storeS =s2() ;
function s2()
{return window.sessionStorage;}
*/

/* 第二种使用：自定义对象下的函数
var s={};
s.setItem=function(a,b)
{alert(a);}
export  const  storeS =s ;
*/

//第三种：直接使用
export const storeS = window.sessionStorage;
export const storeL = window.localStorage;
