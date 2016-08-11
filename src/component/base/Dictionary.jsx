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
  readDictionary,saveDictionary
} from '../../redux/actions';
import {READ_DICTIONARY, SAVE_DICTIONARY} from '../../redux/actionsType';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Icon,
  Modal,
  message,
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


class Dictionary extends React.Component {
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
      this.props.dispatch(readDictionary(this.props.params.dataID ));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
    deleteID=[];
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readDictionary(nextProps.params.dataID));
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
      form0.DictTypeCategory='业务';
      if (mainDataHasModify)
      {form0.DgnOperatorType =this.props.params.dataID == 0?'ADD':'UPDATE';}
      let formArr = [];
      let form1Arr = this.state.rows;
      deleteID.map(function(x) {
        form1Arr.push({ID:x,DgnOperatorType:'DELETE'})
      })
      formArr.push(form0);
      formArr.push(form1Arr);
      this.props.dispatch(saveDictionary(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          if (this.props.params.dataID==0) {this.context.router.push('/dictionary/' + primaryKey);}
          this.props.dispatch(readDictionary(primaryKey));
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
        DictTypeID: primaryKey,
        DictID: getRand(),
        DictCode:'',
        DictName: '',
        Param1: '',
        Param2: '',
        Param3: ''
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
        key: 'DictTypeID',
        name: '数据字典编号'
      }, {
        key: 'DictID',
        name: '数据编号',
        width:170
      }, {
        key: 'DictCode',
        name: '数据代码',
        editable: true
      }, {
        key: 'DictName',
        name: '数据名称',
        editable: true
      }, {
        key: 'Param1',
        name: '参数一',
        editable: true
      }, {
        key: 'Param2',
        name: '参数二',
        editable: true
      }, {
        key: 'Param3',
        name: '参数三',
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
                <Input {...getFieldProps('DictTypeID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="数据字典名称" required>
                <Input  { ...getFieldProps('DictTypeName', { rules: [{ required: true,  message: '请填写数据字典名称' }, ], })}  />
              </FormItem>
            </Col>
            <Col  span="12">
              <FormItem {...formItemLayout} label="备注">
                <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span="1"></Col>
          <Col span="22">

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
        DictTypeID: {
          value: primaryKey
        }
      }
    }
    return mainData;
  } else if (props.dataSource0 && props.dataSource0.DictTypeID==props.params.dataID) {
    if (!mainDataHasModify) {

      primaryKey = props.dataSource0.DictTypeID;

      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        DictTypeID: {
          value: props.dataSource0.DictTypeID
        },
        DictTypeName: {
          value: props.dataSource0.DictTypeName
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
  if ( ifNull(fields) )
   { return;}
   mainDataHasModify = true;
   forEach(fields, function(value, key) {
     mainData[key]=value ;
   });
}

function mapStateToProps(state) {
  const {dictionary} = state
  let dataSource0=dictionary.dictionary_M;
  let dataSource1=dictionary.dictionary_S;
  return {dataSource0,dataSource1}
}
Dictionary = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Dictionary);
export default connect(mapStateToProps)(Dictionary)
