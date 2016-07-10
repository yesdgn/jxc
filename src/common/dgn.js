import {isString,isNaN,isNil,isNull,now,chain,keys,sortBy,value,toUpper,isArray,size,isPlainObject}  from 'lodash';
import {MD5} from 'crypto-js';
import {APP_CONFIG} from '../entry/config';

/* 第一种使用：执行函数返回对象
export  const  storeS =s2() ;
function s2()
{return window.sessionStorage;}
*/

//  第二种使用：自定义对象下的函数
var  storeStemp={};
storeStemp.getItem=function(item)
{ return window.sessionStorage.getItem(item);}

storeStemp.setItem=function(item,value)
{ window.sessionStorage.setItem(item,value) ;}
storeStemp.removeItem=function(item)
{ window.sessionStorage.removeItem(item) ;}
storeStemp.getJson=function(item)
{ return JSON.parse(window.sessionStorage.getItem(item));}

storeStemp.setJson=function(item,value)
{ window.sessionStorage.setItem(item,JSON.stringify(value)) ;}

export  const  storeS= storeStemp ;


//第三种：直接使用
//export const storeS = window.sessionStorage;
export const storeL = window.localStorage;
export function ifNull(obj)
{
  if (isString(obj) && obj==='' ) return true;
  if (isArray(obj) && obj.length===0 ) return true;
  if (obj===undefined ) return true;
  if (isPlainObject(obj) && size(obj)<=0)  return true;
  if (isNaN(obj)) return true;
  if (isNil(obj)) return true;
  if (isNull(obj)) return true;
  return false;
}

export function getRand() {
  let n=now().toString()+generateMixedNum(5);
   return  n;
}
export function getRandomNum(Min,Max)
{
  let Range = Max - Min;
  let Rand = Math.random();
  return(Min + Math.round(Rand * Range));
}

const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
export function generateMixedStr(length) {
     var res = "";
     for(var i = 0; i < length ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}
const chars1 = ['0','1','2','3','4','5','6','7','8','9'];
export function generateMixedNum(length) {
     var res = "";
     for(var i = 0; i < length ; i ++) {
         var id = Math.ceil(Math.random()*9);
         res += chars1[id];
     }
     return res;
}


export function getUrl(type,paramsObj)
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
      stringB= (ifNull(stringB)?'':stringB+'&')+key+'=';
    }
    else {
      stringC= (ifNull(stringC)?'':stringC+'&')+key+'='+encodeURIComponent(params[key]);
    }
    return;
  })

 let sign=toUpper(MD5(stringC).toString());
 if (type=='get')
  {
    stringC=APP_CONFIG.APISERVERURL+'/'+params.apiid+'?'+stringC+'&sign='+sign+(ifNull(stringB)?'':'&'+stringB);
  }
  else if (type=='post')
  {
        stringC= stringC+'&sign='+sign+(ifNull(stringB)?'':'&'+stringB);
  }
  return stringC
}
