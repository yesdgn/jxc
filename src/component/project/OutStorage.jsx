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
import {sample} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption, checkDate, getUploadControlImgData} from '../../common/dgnControlAssist';

import {
  readDict,
  readCustomers,
  saveOutStorage,
  readOutStorage,
  readWarehouses,
  readDictGridSelect,
  readGoodsSelect
} from '../../redux/actions';
import {READ_DICT_OUTSTORAGESTATE, READ_DICT_GRIDUNIT} from '../../redux/actionsType';
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
    this.props.dispatch(readDict(READ_DICT_OUTSTORAGESTATE, '146841280001118121'));
    this.props.dispatch(readDictGridSelect(READ_DICT_GRIDUNIT, '6365673372633792600'));
    this.props.dispatch(readCustomers(50, 0));
    this.props.dispatch(readWarehouses(50, 0));
    if (this.props.params.formID != 0) {
      this.props.dispatch(readOutStorage(this.props.params.formID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.formID !== this.props.params.formID) {
      this.props.dispatch(readOutStorage(nextProps.params.formID));
    }
    //下面为表体数据
    if (nextProps.params.formID != 0 && ((nextProps.outStorage.outStorage && this.state.rows.length === 0) || (nextProps.outStorage.outStorage && this.props.outStorage.outStorage && nextProps.outStorage.outStorage.item1 !== this.props.outStorage.outStorage.item1))) {
      this.setState({rows: nextProps.outStorage.outStorage.item1});
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
      let form0Arr = [];
      let form1Arr = this.state.rows;
      form0Arr.push(form0);
      formArr.push(form0Arr);
      formArr.push(form1Arr);
      this.props.dispatch(saveOutStorage(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.context.router.push('/outStorage/' + primaryKey);
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
  onSearch = (searchStr) => {
    this.props.dispatch(readGoodsSelect(searchStr));
  }
  onSelect = (data) => {
    data.map(function(x) {
      let newRow = {
        ID: undefined,
        FormID: primaryKey,
        GoodsID: x.GoodsID,
        GoodsName: x.GoodsName,
        Unit: x.Unit,
        Price: x.Price,
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
        editor: <AutoCompleteEditor options={this.props.common.GridUnit}/>
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
                  {getSelectOption(this.props.warehouse.warehouses, 'WarehouseID', 'WarehouseName')}
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户" required>
                <Select id="select" size="large" { ...getFieldProps('CustomerID', { rules: [ { required: true, whitespace: true, message: '请选择供应商' }, ], })} showSearch={true} optionFilterProp="children">
                  {getSelectOption(this.props.customer.customers, 'CompID', 'CompName')}
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
                <UploadImage images={this.props.outStorage.formImgs} imgGuid={imgGuid}></UploadImage>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12"></Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="单据相关附件">
                <UploadFile files={this.props.outStorage.formFiles} fileGuid={fileGuid}></UploadFile>
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
            }} onSearch={this.onSearch} dataSource={this.props.outStorage.searchResult} onSelect={this.onSelect} columns={searchPageColumns}></SearchInput>
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
  if (props.params.formID == 0) {
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
  } else if (props.outStorage.outStorage) {
    if (!mainDataHasModify) {
      primaryKey = props.outStorage.outStorage.item0[0].FormID;
      imgGuid = props.outStorage.outStorage.item0[0].FormImages;
      if (ifNull(imgGuid)) {
        imgGuid = getRand();
      }
      fileGuid = props.outStorage.outStorage.item0[0].FormFiles;
      if (ifNull(fileGuid)) {
        fileGuid = getRand();
      }
      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.outStorage.outStorage.item0[0].ID
        },
        FormID: {
          value: props.outStorage.outStorage.item0[0].FormID
        },
        WarehouseID: {
          value: props.outStorage.outStorage.item0[0].WarehouseID
        },
        CompID: {
          value: props.outStorage.outStorage.item0[0].CompID
        },
        CustomerID: {
          value: props.outStorage.outStorage.item0[0].CustomerID
        },
        OutDate: {
          value: new Date(props.outStorage.outStorage.item0[0].OutDate)
        },
        FormState: {
          value: props.outStorage.outStorage.item0[0].FormState
        },
        Operator: {
          value: props.outStorage.outStorage.item0[0].Operator
        },
        OperationTime: {
          value: new Date(props.outStorage.outStorage.item0[0].OperationTime)
        },
        Remark: {
          value: props.outStorage.outStorage.item0[0].Remark
        }
      }
    }
    return mainData
  } else {
    return {};
  }
}

function onFieldsChange(props, fields) {
  if (ifNull(fields)) {
    return;
  }
  mainDataHasModify = true;
  mainData[sample(fields).name] = {
    value: sample(fields).value
  };
}

function mapStateToProps(state) {
  const {common, customer, warehouse, outStorage} = state
  return {common, customer, warehouse, outStorage}
}
OutStorage = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(OutStorage);
export default connect(mapStateToProps)(OutStorage)
