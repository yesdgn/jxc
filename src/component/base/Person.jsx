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
readPerson,savePerson,readCompanies
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

class Person extends React.Component {
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
    this.props.dispatch(readCompanies(50, 1));
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readPerson(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readPerson(nextProps.params.dataID));
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
      form0.UserImages = imgGuid;
      //form0.FormFiles = fileGuid;
      if (mainDataHasModify)
      {form0.DgnOperatorType =this.props.params.dataID == 0?'ADD':'UPDATE';}
      let formArr = [];
      formArr.push(form0);
       this.props.dispatch(savePerson(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.context.router.push('/person/' + primaryKey);
          this.props.dispatch(readPerson(primaryKey));
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
                <Input {...getFieldProps('UserID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="代码">
                <Input {...getFieldProps('Code')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="姓名" required>
                <Input { ...getFieldProps('Name', { rules: [ { required: true, whitespace: true, message: '请输入姓名' }, ], })}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="手机">
                <Input {...getFieldProps('Mobile')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="电子邮箱">
                <Input type="email" {...getFieldProps('Email')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">

            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="公司" required>
                <Select id="select" size="large" { ...getFieldProps('CompID', { rules: [ { required: true, whitespace: true, message: '请选择公司' }, ], })} showSearch={true} optionFilterProp="children">
                  {getSelectOption(this.props.company0, 'CompID', 'CompName')}
                </Select>
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
              <FormItem {...formItemLayout} label="头像">
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
      mainData = {
        UserID: {
          value: primaryKey
        },
        CompID: {
            value: userInfo.CompID
          }
      }
    }
    return mainData;
  } else if (props.dataSource0  && props.dataSource0.UserID==props.params.dataID ) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.UserID;
      imgGuid = props.dataSource0.UserImages;
      if (ifNull(imgGuid)) {
        imgGuid = getRand();
      }
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        UserID: {
          value: props.dataSource0.UserID
        },
        CompID: {
          value: props.dataSource0.CompID
        },
        Code: {
          value: props.dataSource0.Code
        },
        Name: {
          value: props.dataSource0.Name
        },
        Email: {
          value: props.dataSource0.Email
        },
        Mobile: {
          value: props.dataSource0.Mobile
        },
        Remark: {
          value:  props.dataSource0.Remark
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
  const {common, person,company} = state;
  let dataSource0=person.person;
  let imgDataSource=person.personImgs;
  let company0=company.companies?company.companies.item1:[];
  return {common,dataSource0,imgDataSource,company0}
}
Person = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Person);
export default connect(mapStateToProps)(Person)
