import {isString,isNaN,isNil,isNull,now,chain,keys,sortBy,value,toUpper}  from 'lodash';
import {MD5} from 'crypto-js';
import    {APP_CONFIG} from '../entry/config';
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
export function ifNull(obj)
{
  if (isString(obj) && obj==='' ) return true;
  if (isNaN(obj)) return true;
  if (isNil(obj)) return true;
  if (isNull(obj)) return true;
  return false;
}


export function getUrl(paramsObj)
{
 let params=paramsObj;
 let stringC='';
 let stringB='';

 params.appid=APP_CONFIG.APPID;
 params.timestamp=now();
 let stringA=chain(params)
 .keys()
 .sortBy()
 .value();

 stringA.map( function(key) {
    if(ifNull(params[key]))
    {
      stringB= (ifNull(stringB)?'':stringB+'&')+key+'='+params[key];
    }
    else {
      stringC= (ifNull(stringC)?'':stringC+'&')+key+'='+params[key];
    }
    return;
  })

 let sign=toUpper(MD5(stringC).toString());
 stringC=APP_CONFIG.APISERVERURL+'/'+params.apiid+'?'+stringC+'&sign='+sign+(ifNull(stringB)?'':stringB);
  return stringC
}
