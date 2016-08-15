'use strict';
import React from 'react';
//import addonsupdate from 'react-addons-update';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import * as ReactDataGridPlugins from 'react-data-grid/addons';
import SearchInput from '../../common/SearchInput';
import {APP_CONFIG} from '../../entry/config';
var moment = require('moment');
import {forEach} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption,getUploadControlImgData} from '../../common/dgnControlAssist';

import {
  readImportExcelConf,saveImportExcelConf
} from '../../redux/actions';
import {READ_IMPORTEXCELCONF} from '../../redux/actionsType';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Icon,
  Modal,
  message,
  Checkbox
} from 'antd';

var primaryKey;
var imgGuid;
var fileGuid;
var mainData;
var mainDataHasModify = false;
var userInfo;
var deleteID=[];
const createForm = Form.create;
const FormItem = Form.Item;
const Toolbar = ReactDataGridPlugins.Toolbar;
var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
var MenuItem = ReactDataGridPlugins.Menu.MenuItem;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};


class ImportExcelConf extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  };

  componentWillMount() {
    mainDataHasModify = false;
    deleteID=[];
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readImportExcelConf(this.props.params.dataID ));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
    deleteID=[];
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readImportExcelConf(nextProps.params.dataID));
      mainDataHasModify = false;
      deleteID=[];
    }
    //下面为表体数据
    if (nextProps.params.dataID==primaryKey  &&  (this.state.rows.length === 0 || nextProps.dataSource1!==this.props.dataSource1)  ) {
      this.setState({rows: nextProps.dataSource1});
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      let form0 = {
        ...values
      };
    //  form0.DictTypeCategory='业务';
      if (mainDataHasModify)
      {form0.DgnOperatorType =this.props.params.dataID == 0?'ADD':'UPDATE';}
      let formArr = [];
      let form1Arr = this.state.rows;
      deleteID.map(function(x) {
        form1Arr.push({ID:x,DgnOperatorType:'DELETE'})
      })
      formArr.push(form0);
      formArr.push(form1Arr);
      this.props.dispatch(saveImportExcelConf(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          if (this.props.params.dataID==0) {this.context.router.push('/importconf/' + primaryKey);}
          this.props.dispatch(readImportExcelConf(primaryKey));
          mainDataHasModify = false;
          deleteID=[];
        } else {
          message.error(data.items[0].resultDescribe);
        }
      }.bind(this)));
    });

  };

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
        FormID: primaryKey,
        IsValid: 1,
        IsAllowInsert:1,
        IsAllowUpdate:1,
        IsJoin: 0
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
  render() {
    const {getFieldProps} = this.props.form;
    var columns = [
      {
        key: 'ID',
        name: 'ID',
        width:50
      }, {
        key: 'FormID',
        name: '导入编号',
        width:170
      }, {
        key: 'ExcelColName',
        name: 'excel列名',
        editable: true
      }, {
        key: 'TableColName',
        name: '表列名',
        editable: true
      }, {
        key: 'IsValid',
        name: '启用',
        editable: true
      }, {
        key: 'IsAllowInsert',
        name: '允许插入',
        editable: true
      }, {
        key: 'IsAllowUpdate',
        name: '允许更新',
        editable: true
      }, {
        key: 'DefaultValue',
        name: '缺省值',
        editable: true
      }, {
        key: 'IsJoin',
        name: '是否关联',
        editable: true
      }, {
        key: 'JoinTableSql',
        name: '关联表SQL',
        editable: true
      }, {
        key: 'JoinCondition',
        name: '关联表条件',
        editable: true
      }, {
        key: 'IsValid',
        name: '启用',
        editable: true
      }
    ];
    return (
      <div>
        <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
          <Row type="flex" justify="end">
            <Col >
              <FormItem >
                <Button type="primary" htmlType="submit">保存</Button>
              </FormItem>
            </Col>
            <Col span="1">
              <FormItem style={{
                display: 'none'
              }}>
                <Input {...getFieldProps('ID')}/>
                <Input {...getFieldProps('FormID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="Sheet名称" required>
                <Input  { ...getFieldProps('ExcelSheetName', { rules: [{ required: true,  message: '请填写Sheet名称' }, ], })}  />
              </FormItem>
            </Col>
            <Col  span="12">
              <FormItem {...formItemLayout} label="对应表名" required>
                <Input  { ...getFieldProps('TableName', { rules: [{ required: true,  message: '请填写对应表名' }, ], })}  />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="主键" required>
                <Input  { ...getFieldProps('DataPrimaryKey', { rules: [{ required: true,  message: '请填写主键' }, ], })}  />
              </FormItem>
            </Col>
            <Col  span="12">
              <FormItem {...formItemLayout} label="启用"  >
                <Checkbox  { ...getFieldProps('IsValid', { valuePropName: 'checked' })}  />
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span="1"></Col>
          <Col span="22">
            <p>excel表别名为a,对应表别名为b</p>
            <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter} columns={columns}
               rowsCount={this.state.rows.length} minHeight={300} toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
               onRowUpdated={this.handleRowUpdated} cellNavigationMode="changeRow"
               contextMenu={<MyContextMenu onRowDelete={this.deleteRow}  />}
               />
          </Col>
          <Col span="1"></Col>
        </Row>
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
      userInfo = storeS.getJson('userInfo');
      mainData = {
        FormID: {
          value: primaryKey
        }
      }
    }
    return mainData;
  } else if (props.dataSource0 && props.dataSource0.FormID==props.params.dataID) {
    if (!mainDataHasModify) {

      primaryKey = props.dataSource0.FormID;

      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        FormID: {
          value: props.dataSource0.FormID
        },
        ExcelSheetName: {
          value: props.dataSource0.ExcelSheetName
        },
        TableName: {
          value: props.dataSource0.TableName
        },
        IsValid: {
          value: props.dataSource0.IsValid
        },
        DataPrimaryKey: {
          value: props.dataSource0.DataPrimaryKey
        }
      }
    }
    return mainData
  } else {
    return {};
  }
}

function onFieldsChange(props, fields) {
  if ( ifNull(fields) )
   { return;}
   mainDataHasModify = true;
   forEach(fields, function(value, key) {
     mainData[key]=value ;
   });
}

function mapStateToProps(state) {
  const {importConf} = state
  let dataSource0=importConf.importConf_M;
  let dataSource1=importConf.importConf_S;
  return {dataSource0,dataSource1}
}
ImportExcelConf = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(ImportExcelConf);
export default connect(mapStateToProps)(ImportExcelConf)
