import {ifNull} from '../common/dgn';
import {APP_CONFIG} from '../entry/config';
import {filter,isArray}  from 'lodash';
import React from 'react';
import {
  Select,Tree,Icon,Popover,Button
} from 'antd';
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export function  checkDate (rule, value, callback) {
  if  (!value)
  {callback(rule.message);return;}
  callback();
}

export function getSelectOption(datasource,id,name){
  if (ifNull(datasource) || id==undefined || name==undefined ) {
    return null
  }
 if (isArray(datasource))
 {
   return (datasource.map((x) => {
     return (
       <Option key={x[id]} value={x[id]}>{x[name]}</Option>
     )
   }))
 }
else {
  return (
    <Option key={datasource[id]} value={datasource[id]}>{datasource[name]}</Option>
  )
}

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
        thumbUrl: APP_CONFIG.FILEURL+thumbUrl[0].ImageFileName,
        width:x.Width
      }
    )

  })

  return imgArray;
}

export function getUploadControlFileData(data) {
  if (ifNull(data))
    { return [];}
  let fileArray=[];
  data.item0.map(function (x) {
   fileArray.push(
      {
        uid: x.FileID,
        name: x.UploadFileName,
        status: 'done',
        url: APP_CONFIG.FILEURL+x.NewFileName
      }
    )

  })

  return fileArray;
}

export function initTree(treeData) {
  if (!treeData) return (null)
  return (treeData.map((x) => {
    if (x.children) {
      return (
        <TreeNode key={x.MenuID} value={x.MenuID} title={x.MenuName}>
          {initTree(x.children)}
        </TreeNode>
      )
    } else {
      return (
        <TreeNode key={x.MenuID} value={x.MenuID} title={x.MenuName}>
        </TreeNode>
      )
    }
  }))
};
 
