import * as lodash   from 'lodash';
import * as APP from '../entry/config';
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
export function isNull(obj)
{
  if (lodash.isString(obj) && obj==='' ) return true;
  if (lodash.isNaN(obj)) return true;
  if (lodash.isNil(obj)) return true;
  if (lodash.isNull(obj)) return true;
  return false;
}


export function getUrl(apiID,paramsObj)
{
 let params=paramsObj;
 let stringC='';
 let stringB='';

 params.appid=APP.APPID;

 let stringA=lodash.chain(params)
 .keys()
 .sortBy()
 .value();

 stringA.map( function(key) {
    if(isNull(params[key]))
    {
      stringB= (isNull(stringB)?'':stringB+'&')+key+'='+params[key];
    }
    else {
      stringC= (isNull(stringC)?'':stringC+'&')+key+'='+params[key];
    }
    return;
  })
 stringC=APP.APISERVERURL+'/'+apiID+'?'+stringC+(isNull(stringB)?'':stringB);
  console.log(stringC);
  return stringC
}
