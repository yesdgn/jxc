import {isString,isNaN,isNil,isNull,now,chain,keys,sortBy,value,toUpper,filter,isArray}  from 'lodash';
import {MD5} from 'crypto-js';
import {APP_CONFIG} from '../entry/config';

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
  if (isArray(obj) && obj.length===0 ) return true;
  if (obj===undefined ) return true;
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
      stringB= (ifNull(stringB)?'':stringB+'&')+key+'=';
    }
    else {
      stringC= (ifNull(stringC)?'':stringC+'&')+key+'='+params[key];
    }
    return;
  })

 let sign=toUpper(MD5(stringC).toString());
 stringC=APP_CONFIG.APISERVERURL+'/'+params.apiid+'?'+stringC+'&sign='+sign+(ifNull(stringB)?'':'&'+stringB);
  return stringC
}


export function getUploadControlImgData(data) {
  if (ifNull(data))
    { return [];}
  let imgArray=[];
  data.item0.map(function (x) {
    let url= filter(data.item1, function(o) { return o.ImageType==0 && o.FileID==x.FileID }) ;
    let thumbUrl= filter(data.item1, function(o) { return o.ImageType==1  && o.FileID==x.FileID }) ;
    imgArray.push(
      {
        uid: x.FileID,
        name: x.UploadFileName,
        status: 'done',
        url: APP_CONFIG.FILEURL+url[0].ImageFileName,
        thumbUrl: APP_CONFIG.FILEURL+thumbUrl[0].ImageFileName
      }
    )

  })

  return imgArray;
}
