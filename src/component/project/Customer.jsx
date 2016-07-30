'use strict';
import React from 'react';
//import addonsupdate from 'react-addons-update';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import UploadImage from '../../common/UploadImage';
import UploadFile from '../../common/UploadFile';
import {APP_CONFIG} from '../../entry/config';
var moment = require('moment');
import {forEach} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption, checkDate, getUploadControlImgData} from '../../common/dgnControlAssist';
import {
readDict,readCustomer,saveCustomer
} from '../../redux/actions';
import {READ_DICT_COMPTYPE,READ_DICT_CUSTTYPE} from '../../redux/actionsType';
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

class Customer extends React.Component {
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
    mainDataHasModify = false;
    this.props.dispatch(readDict(READ_DICT_COMPTYPE, '6365673372633792525'));
    this.props.dispatch(readDict(READ_DICT_CUSTTYPE, '146864635828377773'));
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readCustomer(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readCustomer(nextProps.params.dataID));
      mainDataHasModify = false;
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
      form0.CompImages = imgGuid;
      //form0.FormFiles = fileGuid;
      let formArr = [];
      formArr.push(form0);
       this.props.dispatch(saveCustomer(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.context.router.push('/customer/' + primaryKey);
          this.props.dispatch(readCustomer(primaryKey));
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
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户代码">
                <Input {...getFieldProps('CompCode')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户名称">
                <Input { ...getFieldProps('CompName', { rules: [ { required: true, whitespace: true, message: '请输入客户名称' }, ], })}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户电话">
                <Input {...getFieldProps('CompTel')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="公司类型"    >
                <Select id="select" size="large"  disabled {...getFieldProps('CompType')}>
                  {getSelectOption(this.props.common.CompType, 'DictCode', 'DictName')}
                </Select>

              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户分类">
                <Select id="select" size="large"   {...getFieldProps('CompCategory')}>
                   {getSelectOption(this.props.common.CustomerCategory, 'DictID', 'DictName')}
                </Select>
              </FormItem>
            </Col>
            <Col span="12">

            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户描述">
                <Input type="textarea" rows="4" {...getFieldProps('CompDescribe')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="客户照片">
                  <UploadImage images={this.props.imgDataSource} imgGuid={imgGuid}></UploadImage>
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
        CompID: {
          value: primaryKey
        },
        CompType: {
          value: "CUSTOMER"
        }
      }
    }
    return mainData;
  } else if (props.dataSource0  && props.dataSource0.CompID==props.params.dataID) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.CompID;
      imgGuid = props.dataSource0.CompImages;
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
        CompName: {
          value: props.dataSource0.CompName
        },
        CompCode: {
          value: props.dataSource0.CompCode
        },
        CompTel: {
          value: props.dataSource0.CompTel
        },
        CompType: {
          value: props.dataSource0.CompType
        },
        CompDescribe: {
          value:  props.dataSource0.CompDescribe
        },
        CompCategory: {
          value:  props.dataSource0.CompCategory
        }
      }
    }
    return mainData
  } else {
    return {};
  }
}

function onFieldsChange(props, fields) {
  if (!props.dataSource0 || props.dataSource0.FormID!=props.params.dataID || ifNull(fields) )
   { return;}
   mainDataHasModify = true;
   forEach(fields, function(value, key) {
     mainData[key]=value ;
   });
}

function mapStateToProps(state) {
  const {common, customer} = state;
  let dataSource0=customer.customer;
  let imgDataSource=customer.customerImgs;
  return {common,dataSource0,imgDataSource}
}
Customer = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Customer);
export default connect(mapStateToProps)(Customer)
