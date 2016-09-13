'use strict';
import React from 'react';
// import addonsupdate from 'react-addons-update';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import * as ReactDataGridPlugins from 'react-data-grid/addons';
import SearchInput from '../../common/SearchInput';
const moment = require('moment');
import {forEach,omit,transform} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption, checkDate, getUploadControlImgData,initTree} from '../../common/dgnControlAssist';

import {
  readRole,
  saveRole,readRoleUserSelect,readRoleMainMenu,readRoleRight
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
var imgGuid;
var fileGuid;
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

var AutoCompleteEditor = ReactDataGridPlugins.Editors.AutoComplete;
var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
var MenuItem = ReactDataGridPlugins.Menu.MenuItem;

const searchPageColumns = [
  {
    title: '人员编号',
    dataIndex: 'UserID',
    key: 'UserID'
  }, {
    title: '人员代码',
    dataIndex: 'Code',
    key: 'Code'
  }, {
    title: '人员姓名',
    dataIndex: 'Name',
    key: 'Name'
  }
];

class Role extends React.Component {
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
    this.props.dispatch(readRoleMainMenu());
     if (this.props.params.dataID != 0) {
      this.props.dispatch(readRole(this.props.params.dataID));
      this.props.dispatch(readRoleRight(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
    deleteID=[];
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readRole(nextProps.params.dataID));
      mainDataHasModify = false;
      deleteID=[];
    }
    //下面为表体数据
    if (nextProps.params.dataID==primaryKey  &&  (this.state.rows.length === 0 || nextProps.dataSource1!==this.props.dataSource1)  ) {
      this.setState({rows: nextProps.dataSource1});
    }
    //角色权限
    if (nextProps.params.dataID==primaryKey && nextProps.roleRight &&  (this.state.roleRight.length === 0 || nextProps.roleRight!==this.props.roleRight)  ) {
      let roleRight=[];
      nextProps.roleRight.map(function (x) {
        roleRight.push(x.DataID);
      })
      this.setState({roleRight: roleRight});
      let halfRoleRight=[];
      nextProps.halfRoleRight.map(function (x) {
        halfRoleRight.push(x.DataID);
      })
      this.setState({halfRoleRight: halfRoleRight});
    }


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
      {form0.DgnOperatorType =this.props.params.dataID == 0?'ADD':'UPDATE';}
      let formArr = [];
      let form1Arr = this.state.rows;
      //去掉表体中不需要保存的显示列
      form1Arr=transform(form1Arr, function(result, value) {
        result.push(omit(value,['UserName']));
        return true;
      },[]);
      deleteID.map(function(x) {
        form1Arr.push({ID:x,DgnOperatorType:'DELETE'})
      })
      let tempRoleRight = this.state.roleRight;
      let form2Arr=[];
      tempRoleRight.map(function (x) {
        form2Arr.push({ID:undefined,DgnOperatorType:'ADD',RoleID:primaryKey,DataID:x,Type:'all'});
      })
      tempRoleRight = this.state.halfRoleRight;
      tempRoleRight.map(function (x) {
        form2Arr.push({ID:undefined,DgnOperatorType:'ADD',RoleID:primaryKey,DataID:x,Type:'half'});
      })
      formArr.push(form0);
      formArr.push(form1Arr);
      formArr.push(form2Arr);
      this.props.dispatch(saveRole(primaryKey,formArr, function(data) {
        this.setState({saveLoading:false});
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          if (this.props.params.dataID==0) {this.context.router.push('/role/' + primaryKey);}
          this.props.dispatch(readRole(primaryKey));
          mainDataHasModify = false;
          deleteID=[];
        } else {
          message.error(data.items[0].resultDescribe);
        }
      }.bind(this)));
    });

  };
handleDelete=(e)=>{
  let that=this;
  Modal.confirm({
    title: '提示',
    content: '您确认要删除吗?',
    onOk:function() {  that.props.dispatch(deleteRole(primaryKey, function(data) {
      if (data.returnCode == 0 && data.items[0].result == 'success') {
        message.success(data.items[0].resultDescribe);
        mainDataHasModify = false;
        deleteID=[];
        that.context.router.push('/roleList');
      } else {
        message.error(data.items[0].resultDescribe);
      }
    }));   },
    onCancel() {}
  })
}
  rowGetter = (rowIdx) => {
    return this.state.rows[rowIdx];
  }
  handleRowUpdated = (e) => {
    let rows = this.state.rows;
    if (!rows[e.rowIdx].DgnOperatorType)
    {rows[e.rowIdx].DgnOperatorType='UPDATE';}
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows: rows});
  }
  handleAddRow = (e, rowObj) => {
    let newRow;
    if (rowObj === undefined) {
      newRow = {
        DgnOperatorType:'ADD',
        ID: undefined,
        RoleID: primaryKey
      };
    } else {
      newRow = rowObj;
    }
    //let rows = addonsupdate(this.state.rows, {$push : [newRow]});
    let rows = this.state.rows;
    rows.push(newRow);
    this.setState({rows: rows});
  }
  deleteRow=(e, data)=> {
    if (this.state.rows[data.rowIdx].ID)
    {deleteID.push(this.state.rows[data.rowIdx].ID);}
    this.state.rows.splice(data.rowIdx, 1);
    this.setState({rows: this.state.rows});
  }
  onSearch = (searchStr,pageSize,curPage) => {
    this.props.dispatch(readRoleUserSelect(searchStr,pageSize,curPage));
  }
  onSelect = (data) => {
    data.map(function(x) {
      let newRow = {
        DgnOperatorType:'ADD',
        ID: undefined,
        RoleID: primaryKey,
        UserID: x.UserID,
        UserName: x.Name,
      };
      this.handleAddRow(null, newRow);
    }.bind(this));
  }
  onRightCheck=(checkedKeys,e)=> {
    this.setState({
      roleRight:checkedKeys,
      halfRoleRight:e.halfCheckedKeys
    });
  }
  render() {
    const {getFieldProps} = this.props.form;
    var columns = [
      {
        key: 'ID',
        name: 'ID'
      }, {
        key: 'RoleID',
        name: '角色编号'
      }, {
        key: 'UserID',
        name: '人员编号'
      }, {
        key: 'UserName',
        name: '人员姓名'
      }
    ];

    return (
      <div>
        <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
          <Row type="flex" justify="end">
            <Col >
              <FormItem >
                <Button type="primary" htmlType="submit" loading={this.state.saveLoading} >保存</Button>
                <Button type="default" onClick={this.handleDelete} >禁用</Button>
              </FormItem>
            </Col>
            <Col span="1">
              <FormItem style={{
                display: 'none'
              }}>
                <Input {...getFieldProps('ID')}/>
                <Input {...getFieldProps('RoleID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
             <Col span="12">
              <FormItem {...formItemLayout} label="角色代码">
                <Input {...getFieldProps('RoleCode')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="角色名称">
                <Input {...getFieldProps('RoleName')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="备注">
                <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="是否有效">
                <Checkbox {...getFieldProps('IsValid', { valuePropName: 'checked' })}/>
              </FormItem>
            </Col>
           </Row>
        </Form>
        <Tabs tabPosition={this.state.tabPosition}>
         <TabPane tab="角色组人员" key="1">
           <SearchInput placeholder="输入人员姓名、代码搜索" style={{
             width: 250,
             marginBottom: 5,
             marginLeft:10
           }} onSearch={this.onSearch} dataSource={this.props.searchResult}
            onSelect={this.onSelect} columns={searchPageColumns}>
           </SearchInput>
           <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter}
              columns={columns} rowsCount={this.state.rows.length} minHeight={500}
              onRowUpdated={this.handleRowUpdated} cellNavigationMode="changeRow"
              contextMenu={<MyContextMenu onRowDelete={this.deleteRow}  />}
              />

         </TabPane>
         <TabPane tab="角色组权限" key="2">
           <Tree className="myCls" showLine checkable defaultExpandAll
               checkedKeys={this.state.roleRight}
               onCheck={this.onRightCheck}
               >
               {initTree(this.props.roleMenu)}
            </Tree>
         </TabPane>
       </Tabs>
       </div>
    );
  }
};

// Create the context menu.
// Use this.props.rowIdx and this.props.idx to get the row/column where the menu is shown.
var MyContextMenu = React.createClass({
  onRowDelete: function(e, data) {
    if (typeof(this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  },
  render: function() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}}
          onClick={this.onRowDelete}>删除</MenuItem>
      </ContextMenu>
    );
  }
});

function mapPropsToFields(props) {
  if (props.params.dataID == 0) {
    if (!mainDataHasModify) {
      primaryKey = getRand();
      mainData = {
        RoleID: {
          value: primaryKey
        }
      }
    }
    return mainData;
  } else if (props.dataSource0 && props.dataSource0.RoleID==props.params.dataID) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.RoleID;
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        RoleID: {
          value: props.dataSource0.RoleID
        },
        RoleCode: {
          value: props.dataSource0.RoleCode
        },
        RoleName: {
          value: props.dataSource0.RoleName
        },
        IsValid: {
          value: props.dataSource0.IsValid
        },
        Remark: {
          value: props.dataSource0.Remark
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
  const {role} = state;
  let dataSource0=role.role;
  let dataSource1=role.role_user;
  let roleMenu=role.roleMenu;
  let roleRight=role.roleRight?role.roleRight.item0:[];
  let halfRoleRight=role.roleRight?role.roleRight.item1:[];
  let searchResult=role.searchUserResult;
  return {dataSource0,dataSource1,searchResult,roleMenu,roleRight,halfRoleRight}
}
Role = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Role);
export default connect(mapStateToProps)(Role)
