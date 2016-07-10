'use strict';
import React from 'react';
import  addonsupdate  from 'react-addons-update';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import * as ReactDataGridPlugins  from 'react-data-grid/addons';
import  SearchInput  from './SearchInput';
import {APP_CONFIG} from '../entry/config';
var moment = require('moment');
import {sample}  from 'lodash';
import {storeS, getRand, ifNull} from '../common/dgn';
import {getSelectOption, checkDate} from '../common/dgnControlAssist';

import {
  readDict,
  readSuppliers,
  saveInStorage,
  clearResult,
  readInStorage,
  readWarehouses,
  readDictGridSelect,
  readGoodsSelect
} from '../redux/actions';
import {READ_DICT_INSTORAGESTATE,READ_DICT_GRIDSELECT} from '../redux/actionsType';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Upload,
  Icon,
  Modal,
  message,
  Select,
  DatePicker
} from 'antd';

var primaryKey;
var mainData;
var mainDataHasModify =false;
const userInfo = storeS.getJson('userInfo');
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

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
const searchPageColumns = [
  {
    title: '商品编号',
    dataIndex: 'GoodsID',
    key: 'GoodsID'
  },{
    title: '商品名称',
    dataIndex: 'GoodsName',
    key: 'GoodsName'
  },{
    title: '价格',
    dataIndex: 'Price',
    key: 'Price'
  }];

class InStorage extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {rows:[]}
  };

  componentWillMount() {
    primaryKey = getRand();
    this.props.dispatch(readDict(READ_DICT_INSTORAGESTATE, '6365673372633792599'));
    this.props.dispatch(readDictGridSelect(READ_DICT_GRIDSELECT, '6365673372633792600'));
    this.props.dispatch(readSuppliers(50, 0));
    this.props.dispatch(readWarehouses(50, 0));
    if (this.props.params.formID != 0) {
      this.props.dispatch(readInStorage(this.props.params.formID));
    }
  }
componentWillUnmount() {
   mainDataHasModify =false;
}
  componentWillReceiveProps(nextProps){
    if (nextProps.params.formID !== this.props.params.formID) {
      this.props.dispatch(readInStorage(nextProps.params.formID));
    }
    if (!ifNull(nextProps.inStorage.saveInStorageResult) && nextProps.inStorage.saveInStorageResult.result == 'success') {
      this.context.router.push('/inStorage/' + primaryKey);
      this.props.dispatch(readInStorage(primaryKey));
      this.props.dispatch(clearResult());
      mainDataHasModify=false;
    }
    if ( nextProps.params.formID!=0 && ((nextProps.inStorage.inStorage  && this.state.rows.length===0)
    ||  ( nextProps.inStorage.inStorage && this.props.inStorage.inStorage &&  nextProps.inStorage.inStorage.item1!==this.props.inStorage.inStorage.item1))) {
      this.setState({
        rows:nextProps.inStorage.inStorage.item1
      });
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
      form0.StorageDate = moment(form0.StorageDate).format('YYYY-MM-DD');
      form0.OperationTime = moment(form0.OperationTime).format('YYYY-MM-DD HH:mm:ss');
      let formArr = [];
      let form0Arr=[];
      let form1Arr=this.state.rows;
      form0Arr.push(form0);
      formArr.push(form0Arr);
      formArr.push(form1Arr);
      this.props.dispatch(saveInStorage(formArr));
    });

  };

  rowGetter=(rowIdx)=>{
   return this.state.rows[rowIdx];
 }
 handleRowUpdated =(e)=>{
    //merge updated row with current row and rerender by setting state
    let rows =  this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  }
  handleAddRow=(e,rowObj)=>{
    let newRow ;
    if (rowObj===undefined)
    {
        newRow = {
        ID: undefined,
        FormID: primaryKey,
        GoodsID :0,
        GoodsName : '',
        Unit:0,
        Price:0,
        Quantity:0
      };
    }
    else {
      newRow=rowObj;
    }
    //let rows = addonsupdate(this.state.rows, {$push : [newRow]});
    let rows=this.state.rows;
    rows.push(newRow);
    this.setState({rows : rows});
}
  onSearch=(searchStr)=>{
    this.props.dispatch(readGoodsSelect(searchStr));
  }
  onSelect=(data)=>{
    console.log(data);
    data.map(function (x) {
      let newRow = {
        ID: undefined,
        FormID: primaryKey,
        GoodsID :x.GoodsID,
        GoodsName :x.GoodsName,
        Unit:x.Unit,
        Price:x.Price,
        Quantity:0
      };
      this.handleAddRow(null,newRow);
    }.bind(this));
  }
  render() {
    const {getFieldProps} = this.props.form;
    var columns = [
    {
      key: 'ID',
      name: 'ID'
    },
    {
      key: 'FormID',
      name: '单据编号',
    },
    {
      key: 'GoodsID',
      name: '商品编号',
    },
    {
      key: 'GoodsName',
      name: '商品',
    },
    {
      key: 'Unit',
      name: '单位',
      editor : <AutoCompleteEditor options={this.props.common.Unit}/>
    },
    {
      key: 'Price',
      name: '价格',
      editable : true
    },
    {
      key: 'Quantity',
      name: '数量',
      editable : true
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
                <Input {...getFieldProps('CompID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库" required>
                <Select id="select" size="large" { ...getFieldProps('WarehouseID', { rules: [ { required: true, whitespace: true, message: '请选择仓库' }, ], })}>
                  {getSelectOption(this.props.warehouse.warehouses, 'WarehouseID', 'WarehouseName')}
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="供应商" required>
                <Select id="select" size="large" { ...getFieldProps('SupplierID', { rules: [ { required: true, whitespace: true, message: '请选择供应商' }, ], })} showSearch={true} optionFilterProp="children">
                  {getSelectOption(this.props.supplier.suppliers, 'CompID', 'CompName')}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="入库日期" required>
                <DatePicker { ...getFieldProps('StorageDate', { rules: [ { validator: checkDate }, ], })} disabledDate={disabledDate}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="单据状态">
                <Select id="select" size="large" disabled {...getFieldProps('FormState')}>
                  {getSelectOption(this.props.common.InstorageState, 'DictID', 'DictName')}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="操作人">
                <Select id="select" size="large" disabled {...getFieldProps('Operator')}>
                  {getSelectOption(userInfo, 'UserID', 'Name')}
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="操作时间">
                <DatePicker {...getFieldProps('OperationTime')} disabled showTime format="yyyy-MM-dd HH:mm:ss"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12" >
              <FormItem {...formItemLayout} label="备注">
                <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
              </FormItem>
            </Col>
            <Col span="12">
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span="1"></Col>
          <Col span="4">
            <SearchInput placeholder="输入商品代码、条码、名称搜索" style={{ width: 250,marginBottom:5 }}
              onSearch={this.onSearch}  dataSource={this.props.inStorage.searchResult}
              onSelect={this.onSelect}  columns={searchPageColumns}
              ></SearchInput>
           </Col>
        </Row>
        <Row>
          <Col span="1"></Col>
          <Col span="22">

            <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter}
               columns={columns} rowsCount={this.state.rows.length} minHeight={500}
                onRowUpdated={this.handleRowUpdated} cellNavigationMode="changeRow"
               />

          </Col>
          <Col span="1"> </Col>
        </Row>
      </div>
    );
  }
};

function mapPropsToFields(props) {

  if (  props.params.formID == 0) {
    mainData=mainDataHasModify===false?{
      CompID: {
        value: userInfo===undefined?null:userInfo.CompID
      },
      FormID: {
        value: primaryKey
      },
      FormState: {
        value: "6365673372633792602"
      },
      StorageDate: {
        value: new Date()
      },
      Operator: {
        value: userInfo.UserID
      },
      OperationTime: {
        value: new Date()
      }
    }:mainData;
    return mainData ;
  } else if (props.inStorage.inStorage) {
    primaryKey = props.inStorage.inStorage.item0[0].FormID;
    mainData=mainDataHasModify===false?{
      ID: {
        value: props.inStorage.inStorage.item0[0].ID
      },
      FormID: {
        value: props.inStorage.inStorage.item0[0].FormID
      },
      WarehouseID: {
        value: props.inStorage.inStorage.item0[0].WarehouseID
      },
      CompID: {
        value: props.inStorage.inStorage.item0[0].CompID
      },
      SupplierID: {
        value: props.inStorage.inStorage.item0[0].SupplierID
      },
      StorageDate: {
        value: new Date(props.inStorage.inStorage.item0[0].StorageDate)
      },
      FormState: {
        value: props.inStorage.inStorage.item0[0].FormState
      },
      Operator: {
        value: props.inStorage.inStorage.item0[0].Operator
      },
      OperationTime: {
        value: new Date(props.inStorage.inStorage.item0[0].OperationTime)
      },
      Remark: {
        value: props.inStorage.inStorage.item0[0].Remark
      }
    }:mainData;
    return  mainData
  } else {
    return  {};
  }
}

function onFieldsChange(props, fields) {
  if (ifNull(fields))
  {return;}
  mainDataHasModify=true;
  mainData[sample(fields).name]={value:sample(fields).value};
}

function mapStateToProps(state) {
  const {common, supplier, warehouse, inStorage} = state
  return {common, supplier, warehouse, inStorage}
}
InStorage = Form.create({mapPropsToFields: mapPropsToFields,onFieldsChange:onFieldsChange})(InStorage);
export default connect(mapStateToProps)(InStorage)
