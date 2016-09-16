'use strict';
import React from 'react';
// import addonsupdate from 'react-addons-update';
import { Link } from 'react-router';
import { connect } from 'react-redux';
const moment = require('moment');
import {forEach,omit,transform} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption, checkDate, getUploadControlImgData,initTree} from '../../common/dgnControlAssist';

import {
  readMenuList,readMenu,saveMenu,addMenu,dragMenu
} from '../../redux/actions';

import {
  Button,
  Row,
  Col,
  Input,
  Checkbox,
  Form,
  message,
  Select,
  DatePicker,
  Modal,Tabs,Tree
} from 'antd';

var primaryKey;
var mainData;
var mainDataHasModify = false;
var userInfo;
var deleteID=[];
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};
const disabledDate = function(current) {
  return current && current.getTime() > Date.now();
};

class MenuConf extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      saveLoading:false,
      roleRight:[],
      halfRoleRight:[]
    }
  };

  componentWillMount() {
    deleteID=[];
    mainDataHasModify = false;
    this.props.dispatch(readMenuList());
  }
  componentWillUnmount() {
    mainDataHasModify = false;
    deleteID=[];
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.setState({saveLoading:true});
      let form0 = {
        ...values
      };
      if (mainDataHasModify)
      {form0.DgnOperatorType =this.props.dataSource0.ID ===undefined?'ADD':'UPDATE';}
      let formArr = [];
      formArr.push(form0);
      this.props.dispatch(saveMenu(formArr, function(data) {
        this.setState({saveLoading:false});
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.props.dispatch(readMenuList());
          this.props.dispatch(readMenu(primaryKey));
          mainDataHasModify = false;
        } else {
          message.error(data.items[0].resultDescribe);
        }
      }.bind(this)));
    });

  };

onTreeSelect=(selectedKeys,e)=>{
  if (selectedKeys.length>0)
  { mainDataHasModify=false;
    this.props.dispatch(readMenu(selectedKeys[0]));
  }
}
onTreeRightClick=(e)=>{
  mainDataHasModify=false;
  const payload= {"ID":undefined,"MenuID":null,"MenuName":null,
    "PMenuID":e.node.props.value,"Icon":null,"SortNo":null,"Url":null,
    "IsEnabled":1,"IsMenuVisual":1,"IsLeaf":1}
  this.props.dispatch(addMenu(payload));
}
onDragEnter(info) {
  //console.log(info);
  // expandedKeys 需要受控时设置
  // this.setState({
  //   expandedKeys: info.expandedKeys,
  // });
}
onDrop=(info)=> {
  const dragKey = info.dragNode.props.eventKey;
  const dropKey = info.node.props.eventKey;
  // const dragNodesKeys = info.dragNodesKeys;
  this.props.dispatch(dragMenu(dragKey,dropKey,function (data) {
    if (data.returnCode == 0  ) {
      this.props.dispatch(readMenuList());
      mainDataHasModify = false;
    }
  }.bind(this)));
}
  render() {
    const {getFieldProps} = this.props.form;
    return (
      <div className="marLeft10">
        <Row type="flex"  >
          <Col span="4">
            <Tree className="myCls" showLine
              onSelect={this.onTreeSelect} onRightClick={this.onTreeRightClick}
              draggable onDragEnter={this.onDragEnter} onDrop={this.onDrop}
              >
                {initTree(this.props.dataSource1)}
             </Tree>
          </Col>
          <Col span="18">
            <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
          <Row type="flex" justify="end">
            <Col >
              <FormItem >
                <Button type="primary" htmlType="submit" loading={this.state.saveLoading} >保存</Button>

              </FormItem>
            </Col>
            <Col span="1">
              <FormItem style={{
                display: 'none'
              }}>
                <Input {...getFieldProps('ID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
             <Col span="12">
              <FormItem {...formItemLayout} label="菜单编号">
                <Input {...getFieldProps('MenuID')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="菜单名称">
                <Input {...getFieldProps('MenuName')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
             <Col span="12">
              <FormItem {...formItemLayout} label="父菜单编号">
                <Input {...getFieldProps('PMenuID')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="是否有效">
                <Checkbox {...getFieldProps('IsEnabled', { valuePropName: 'checked' })}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
             <Col span="12">
              <FormItem {...formItemLayout} label="字体图标">
                <Input {...getFieldProps('Icon')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="路径URL">
                <Input {...getFieldProps('Url')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
             <Col span="12">
              <FormItem {...formItemLayout} label="排序号">
                <Input {...getFieldProps('SortNo')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="是否叶子节点">
                <Checkbox {...getFieldProps('IsLeaf', { valuePropName: 'checked' })}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="是否显示">
                <Checkbox {...getFieldProps('IsMenuVisual', { valuePropName: 'checked' })}/>
              </FormItem>
            </Col>
            <Col span="12">

            </Col>
           </Row>
        </Form>
          </Col>
        </Row>
       </div>
    );
  }
};

function mapPropsToFields(props) {
  if (props.dataSource0 ) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.MenuID;
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        MenuID: {
          value: props.dataSource0.MenuID
        },
        MenuName: {
          value: props.dataSource0.MenuName
        },
        PMenuID: {
          value: props.dataSource0.PMenuID
        },
        IsEnabled: {
          value: props.dataSource0.IsEnabled
        },
        IsMenuVisual: {
          value: props.dataSource0.IsMenuVisual
        },
        IsLeaf: {
          value: props.dataSource0.IsLeaf
        },
        Url: {
          value: props.dataSource0.Url
        },
        SortNo: {
          value: props.dataSource0.SortNo
        },
        Icon: {
          value: props.dataSource0.Icon
        }

      }
    }
    return mainData
  } else {
    return {};
  }
}

function onFieldsChange(props, fields) {
  if (ifNull(fields) )
   { return;}
   mainDataHasModify = true;
   forEach(fields, function(value, key) {
     mainData[key]=value ;
   });
}

function mapStateToProps(state) {
  userInfo = userInfo?userInfo:storeS.getJson('userInfo');
  const {menu} = state;
  let dataSource0=menu.menu;
  let dataSource1=menu.menuList;
  console.log(dataSource1);
  return {dataSource0,dataSource1}
}
MenuConf = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(MenuConf);
export default connect(mapStateToProps)(MenuConf)
