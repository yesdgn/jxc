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
readPerson,savePerson
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
    if (this.props.params.personID != 0) {
      this.props.dispatch(readPerson(this.props.params.personID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.personID !== this.props.params.personID) {
      this.props.dispatch(readPerson(nextProps.params.personID));
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
      let formArr = [];
      let form0Arr = [];
      form0Arr.push(form0);
      formArr.push(form0Arr);
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
              <FormItem {...formItemLayout} label="备注">
                <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="头像">
                <UploadImage images={this.props.person.personImgs} imgGuid={imgGuid}></UploadImage>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
};

function mapPropsToFields(props) {
  if (props.params.personID == 0) {
    if (!mainDataHasModify) {
      primaryKey = getRand();
      imgGuid = getRand();
      fileGuid = getRand();
      userInfo = storeS.getJson('userInfo');
      mainData = {
        UserID: {
          value: primaryKey
        }
      }
    }
    return mainData;
  } else if (props.person.person) {
    if (!mainDataHasModify) {
      primaryKey = props.person.person.item0[0].UserID;
      imgGuid = props.person.person.item0[0].UserImages;
      if (ifNull(imgGuid)) {
        imgGuid = getRand();
      }
      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.person.person.item0[0].ID
        },
        UserID: {
          value: props.person.person.item0[0].UserID
        },
        Code: {
          value: props.person.person.item0[0].Code
        },
        Name: {
          value: props.person.person.item0[0].Name
        },
        Email: {
          value: props.person.person.item0[0].Email
        },
        Mobile: {
          value: props.person.person.item0[0].Mobile
        },
        Remark: {
          value:  props.person.person.item0[0].Remark
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
  const {common, person} = state
  return {common,person}
}
Person = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Person);
export default connect(mapStateToProps)(Person)
