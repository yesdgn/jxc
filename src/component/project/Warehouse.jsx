'use strict';
import React from 'react';
//import addonsupdate from 'react-addons-update';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import UploadImage from '../../common/UploadImage';
import UploadFile from '../../common/UploadFile';
import {APP_CONFIG} from '../../entry/config';
var moment = require('moment');
import {sample} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption, checkDate, getUploadControlImgData} from '../../common/dgnControlAssist';
import {
readWarehouse,saveWarehouse
} from '../../redux/actions';

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

class Warehouse extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  componentWillMount() {
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readWarehouse(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readWarehouse(nextProps.params.dataID));
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
      //form0.CompImages = imgGuid;
      //form0.FormFiles = fileGuid;
      let formArr = [];
      let form0Arr = [];
      form0Arr.push(form0);
      formArr.push(form0Arr);
       this.props.dispatch(saveWarehouse(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.context.router.push('/warehouse/' + primaryKey);
          this.props.dispatch(readWarehouse(primaryKey));
          mainDataHasModify = false;
        } else {
          message.error(data.items[0].resultDescribe);
        }
      }.bind(this)));
    });

  };

  render() {
    const {getFieldProps} = this.props.form;
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
                <Input {...getFieldProps('CompID')}/>
                <Input {...getFieldProps('WarehouseID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库代码">
                <Input {...getFieldProps('WarehouseCode')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库名称">
                <Input { ...getFieldProps('WarehouseName', { rules: [ { required: true, whitespace: true, message: '请输入仓库名称' }, ], })}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库电话">
                <Input {...getFieldProps('WarehouseTel')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库地址">
                <Input {...getFieldProps('WarehouseAddr')}/>
              </FormItem>
            </Col>

          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库描述">
                <Input type="textarea" rows="4" {...getFieldProps('WarehouseDescribe')}/>
              </FormItem>
            </Col>
          </Row>
        </Form>
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
        WarehouseID: {
          value: primaryKey
        },
        CompID: {
          value: userInfo.CompID
        }
      }
    }
    return mainData;
  } else if (props.dataSource0) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.WarehouseID;
      //imgGuid = props.warehouse.warehouse.item0[0].CompImages;
      if (ifNull(imgGuid)) {
        imgGuid = getRand();
      }
      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        CompID: {
          value: props.dataSource0.CompID
        },
        WarehouseID: {
          value: props.dataSource0.WarehouseID
        },
        WarehouseCode: {
          value: props.dataSource0.WarehouseCode
        },
        WarehouseName: {
          value: props.dataSource0.WarehouseName
        },
        WarehouseTel: {
          value: props.dataSource0.WarehouseTel
        },
        WarehouseAddr: {
          value: props.dataSource0.WarehouseAddr
        },
        WarehouseDescribe: {
          value:  props.dataSource0.WarehouseDescribe
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
  const {warehouse} = state;
  let dataSource0=warehouse.warehouse;
  return {dataSource0}
}
Warehouse = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Warehouse);
export default connect(mapStateToProps)(Warehouse)
