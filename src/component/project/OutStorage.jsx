'use strict';
import React from 'react';
//import addonsupdate from 'react-addons-update';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import * as ReactDataGridPlugins from 'react-data-grid/addons';
import SearchInput from '../../common/SearchInput';
import UploadImage from '../../common/UploadImage';
import UploadFile from '../../common/UploadFile';
import {APP_CONFIG} from '../../entry/config';
var moment = require('moment');
import {forEach} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption, checkDate, getUploadControlImgData} from '../../common/dgnControlAssist';

import {
  readDict,
  readCustomers,
  saveOutStorage,
  readOutStorage,
  readWarehouses,
  readOutstorageGoods
} from '../../redux/actions';
import {READ_DICT_OUTSTORAGESTATE, READ_DICT_UNIT} from '../../redux/actionsType';
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
var imgGuid;
var fileGuid;
var mainData;
var mainDataHasModify = false;
var userInfo;
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
  }, {
    title: '商品名称',
    dataIndex: 'GoodsName',
    key: 'GoodsName'
  }, {
    title: '价格',
    dataIndex: 'Price',
    key: 'Price'
  }, {
    title: '单位',
    dataIndex: 'Unit',
    key: 'Unit'
  }
];

class OutStorage extends React.Component {
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
    this.props.dispatch(readDict(READ_DICT_OUTSTORAGESTATE, '146841280001118121'));
    this.props.dispatch(readCustomers(50, 1));
    this.props.dispatch(readWarehouses(50, 1));
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readOutStorage(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readOutStorage(nextProps.params.dataID));
      mainDataHasModify = false;
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
      form0.FormImages = imgGuid;
      form0.FormFiles = fileGuid;
      form0.OutDate = moment(form0.OutDate).format('YYYY-MM-DD');
      form0.OperationTime = moment(form0.OperationTime).format('YYYY-MM-DD HH:mm:ss');
      let formArr = [];
      let form1Arr = this.state.rows;
      formArr.push(form0);
      formArr.push(form1Arr);
      this.props.dispatch(saveOutStorage(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          if (this.props.params.dataID==0) {this.context.router.push('/outStorage/' + primaryKey);}
          this.props.dispatch(readOutStorage(primaryKey));
          mainDataHasModify = false;
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
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows: rows});
  }
  handleAddRow = (e, rowObj) => {
    let newRow;
    if (rowObj === undefined) {
      newRow = {
        ID: undefined,
        FormID: primaryKey,
        GoodsID: 0,
        GoodsName: '',
        Unit: 0,
        Price: 0,
        Quantity: 0
      };
    } else {
      newRow = rowObj;
    }
    //let rows = addonsupdate(this.state.rows, {$push : [newRow]});
    let rows = this.state.rows;
    rows.push(newRow);
    this.setState({rows: rows});
  }
  onSearch = (searchStr,pageSize,curPage) => {
    let fieldValue=this.props.form.getFieldValue('CustomerID');
    if (!fieldValue)
    {message.error('请先选择客户');return;}
    this.props.dispatch(readOutstorageGoods(fieldValue,searchStr,pageSize,curPage));
  }
  onSelect = (data) => {
    data.map(function(x) {
      let newRow = {
        ID: undefined,
        FormID: primaryKey,
        GoodsID: x.GoodsID,
        GoodsName: x.GoodsName,
        Unit: x.Unit,
        Price: x.DefaultPrice,
        Quantity: 0
      };
      this.handleAddRow(null, newRow);
    }.bind(this));
  }
  render() {
    const {getFieldProps} = this.props.form;
    var columns = [
      {
        key: 'ID',
        name: 'ID'
      }, {
        key: 'FormID',
        name: '单据编号'
      }, {
        key: 'GoodsID',
        name: '商品编号'
      }, {
        key: 'GoodsName',
        name: '商品'
      }, {
        key: 'Unit',
        name: '单位',
        editor: <AutoCompleteEditor options={this.props.common.Unit} label="DictCode"/>
      }, {
        key: 'Price',
        name: '价格',
        editable: true
      }, {
        key: 'Quantity',
        name: '数量',
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
                <Input {...getFieldProps('CompID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库" required>
                <Select id="select" size="large" { ...getFieldProps('WarehouseID', { rules: [ { required: true, whitespace: true, message: '请选择仓库' }, ], })}>
                  {getSelectOption(this.props.warehouse0, 'WarehouseID', 'WarehouseName')}
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户" required>
                <Select id="select" size="large" { ...getFieldProps('CustomerID', { rules: [ { required: true, whitespace: true, message: '请选择供应商' }, ], })} showSearch={true} optionFilterProp="children">
                  {getSelectOption(this.props.customer0, 'CompID', 'CompName')}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="入库日期" required>
                <DatePicker { ...getFieldProps('OutDate', { rules: [ { validator: checkDate }, ], })} disabledDate={disabledDate}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="单据状态">
                <Select id="select" size="large" disabled {...getFieldProps('FormState')}>
                  {getSelectOption(this.props.common.OutstorageState, 'DictID', 'DictName')}
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
            <Col span="12">
              <FormItem {...formItemLayout} label="备注">
                <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="单据相关照片">
                <UploadImage images={this.props.imgDataSource} imgGuid={imgGuid}></UploadImage>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12"></Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="单据相关附件">
                <UploadFile files={this.props.fileDataSource} fileGuid={fileGuid}></UploadFile>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span="1"></Col>
          <Col span="4">
            <SearchInput placeholder="输入商品代码、条码、名称搜索" style={{
              width: 250,
              marginBottom: 5
            }} onSearch={this.onSearch} dataSource={this.props.searchResult} onSelect={this.onSelect} columns={searchPageColumns}></SearchInput>
          </Col>
        </Row>
        <Row>
          <Col span="1"></Col>
          <Col span="22">

            <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter} columns={columns} rowsCount={this.state.rows.length} minHeight={500} onRowUpdated={this.handleRowUpdated} cellNavigationMode="changeRow"/>

          </Col>
          <Col span="1"></Col>
        </Row>
      </div>
    );
  }
};

function mapPropsToFields(props) {
  if (props.params.dataID == 0) {
    if (!mainDataHasModify) {
      primaryKey = getRand();
      imgGuid = getRand();
      fileGuid = getRand();
      userInfo = storeS.getJson('userInfo');
      mainData = {
        CompID: {
          value: userInfo.CompID
        },
        FormID: {
          value: primaryKey
        },
        FormState: {
          value: "146841280136394938"
        },
        OutDate: {
          value: new Date()
        },
        Operator: {
          value: userInfo.UserID
        },
        OperationTime: {
          value: new Date()
        }
      }
    }
    return mainData;
  } else if (props.dataSource0 && props.dataSource0.FormID==props.params.dataID ) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.FormID;
      imgGuid = props.dataSource0.FormImages;
      if (ifNull(imgGuid)) {
        imgGuid = getRand();
      }
      fileGuid = props.dataSource0.FormFiles;
      if (ifNull(fileGuid)) {
        fileGuid = getRand();
      }
      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        FormID: {
          value: props.dataSource0.FormID
        },
        WarehouseID: {
          value: props.dataSource0.WarehouseID
        },
        CompID: {
          value: props.dataSource0.CompID
        },
        CustomerID: {
          value: props.dataSource0.CustomerID
        },
        OutDate: {
          value: new Date(props.dataSource0.OutDate)
        },
        FormState: {
          value: props.dataSource0.FormState
        },
        Operator: {
          value: props.dataSource0.Operator
        },
        OperationTime: {
          value: new Date(moment(props.dataSource0.OperationTime).format('YYYY/MM/DD HH:mm:ss'))
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
  const {common, customer, warehouse, outStorage} = state;
  let dataSource0=outStorage.outStorage_M;
  let dataSource1=outStorage.outStorage_S;
  let imgDataSource=outStorage.formImgs;
  let fileDataSource=outStorage.formFiles;
  let searchResult=outStorage.searchResult;
  let customer0=customer.customers?customer.customers.item1:[];
  let warehouse0=warehouse.warehouses?warehouse.warehouses.item1:[];
  return {common, customer0, warehouse0, dataSource0,dataSource1,imgDataSource,fileDataSource,searchResult}
}
OutStorage = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(OutStorage);
export default connect(mapStateToProps)(OutStorage)
