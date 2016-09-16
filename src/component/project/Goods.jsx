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
 readGoods,saveGoods,readDictGridSelect
} from '../../redux/actions';
import {READ_DICT_GOODSCATEGORY, READ_DICT_CUSTTYPE,READ_DICT_UNIT } from '../../redux/actionsType';
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
var deleteID=[];
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const Toolbar = ReactDataGridPlugins.Toolbar;
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

class Goods extends React.Component {
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
    this.props.dispatch(readDict(READ_DICT_CUSTTYPE, '146864635828377773'));
    this.props.dispatch(readDict(READ_DICT_GOODSCATEGORY, '6365673372633792522'));
    this.props.dispatch(readDict(READ_DICT_UNIT, '6365673372633792600'));
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readGoods(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
    deleteID=[];
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readGoods(nextProps.params.dataID));
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
      form0.GoodsImages = imgGuid;
  //    form0.FormFiles = fileGuid;
      if (mainDataHasModify)
      {form0.DgnOperatorType =this.props.params.dataID == 0?'ADD':'UPDATE';}
      let formArr = [];
      let form1Arr = this.state.rows;
      deleteID.map(function(x) {
        form1Arr.push({ID:x,DgnOperatorType:'DELETE'})
      })
      formArr.push(form0);
      formArr.push(form1Arr);
      this.props.dispatch(saveGoods(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          if (this.props.params.dataID==0) {this.context.router.push('/goods/' + primaryKey);}
          this.props.dispatch(readGoods(primaryKey));
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
        GoodsID:primaryKey,
        CustomerType: 0,
        Price: 0,
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
        name: 'ID'
      } , {
        key: 'GoodsID',
        name: '商品编号'
      } , {
        key: 'CustomerType',
        name: '客户类型',
        editor: <AutoCompleteEditor options={this.props.common.CustomerCategory} label="DictName" />
      }, {
        key: 'Price',
        name: '价格',
        editable: true
      }
    ];

    return (
      <div>
        <Form horizontal  onSubmit={this.handleSubmit}>
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
                <Input {...getFieldProps('GoodsID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="商品代码">
                <Input {...getFieldProps('GoodsCode')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="商品名称">
                <Input { ...getFieldProps('GoodsName', { rules: [ { required: true, whitespace: true, message: '请输入商品名称' }, ], })}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="缺省价格">
                <Input {...getFieldProps('DefaultPrice')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="商品分类">
                <Select id="select" size="large" defaultValue="lucy" {...getFieldProps('GoodsCategory')}>
                   {getSelectOption(this.props.common.GoodsCategory, 'DictID', 'DictName')}
                </Select>

              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="条码">
                <Input {...getFieldProps('BarCode')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="单位">
                <Select id="select" size="large" defaultValue="lucy" {...getFieldProps('Unit')}>
                   {getSelectOption(this.props.common.Unit, 'DictCode', 'DictName')}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">

            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="规格">
                <Input {...getFieldProps('Specifications')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="商品描述">
                <Input type="textarea" rows="4" {...getFieldProps('GoodsDescribe')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="商品图像">
                 <UploadImage images={this.props.imgDataSource} imgGuid={imgGuid}></UploadImage>
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span="1"></Col>
          <Col span="22">

            <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter}  toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
              columns={columns} rowsCount={this.state.rows.length} minHeight={300} onRowUpdated={this.handleRowUpdated} cellNavigationMode="changeRow"
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
      imgGuid = getRand();
      fileGuid = getRand();
      mainData = {
        GoodsID: {
          value: primaryKey
        }
      }
    }
    return mainData;
  } else if (props.dataSource0 && props.dataSource0.GoodsID==props.params.dataID) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.GoodsID;
      imgGuid = props.dataSource0.GoodsImages;
      if (ifNull(imgGuid)) {
        imgGuid = getRand();
      }
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        GoodsID: {
          value: props.dataSource0.GoodsID
        },
        GoodsCode: {
          value: props.dataSource0.GoodsCode
        },
        GoodsName: {
          value: props.dataSource0.GoodsName
        },
        DefaultPrice: {
          value: props.dataSource0.DefaultPrice
        } ,
        GoodsCategory: {
          value: props.dataSource0.GoodsCategory
        },
        GoodsDescribe: {
          value: props.dataSource0.GoodsDescribe
        } ,
        Remark: {
          value: props.dataSource0.Remark
        },
        BarCode: {
          value: props.dataSource0.BarCode
        },
        Unit: {
          value: props.dataSource0.Unit
        },
        Specifications: {
          value: props.dataSource0.Specifications
        }
      }
    }
    return mainData
  } else {
    return {};
  }
}

function onFieldsChange(props, fields) {
  if (  ifNull(fields) )
   { return;}
   mainDataHasModify = true;
   forEach(fields, function(value, key) {
     mainData[key]=value ;
   });
}

function mapStateToProps(state) {
  userInfo = userInfo?userInfo:storeS.getJson('userInfo');
  const {common, goods} = state;
  let dataSource0=goods.goods_M;
  let dataSource1=goods.goods_S;
  let imgDataSource=goods.goodsImgs;
  return {common, dataSource0,imgDataSource,dataSource1}
}
Goods = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Goods);
export default connect(mapStateToProps)(Goods)
