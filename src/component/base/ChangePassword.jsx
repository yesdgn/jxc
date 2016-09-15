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
changePassword
} from '../../redux/actions';

import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Checkbox,
  Icon,
  Modal,
  message,
  Select,
  DatePicker
} from 'antd';

var mainData;
var userInfo;
var primaryKey;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 6
  }
};

class ChangePassword extends React.Component {
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      let form0 = {
        ...values
      };

       this.props.dispatch(changePassword(form0.UserID,form0.OldPassword,form0.NewPassword, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
        } else {
          message.error(data.items[0].resultDescribe);
        }
      }.bind(this)));
    });

  };
  checkPass2=(rule, value, callback)=> {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('NewPassword')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  render() {
    const {getFieldProps} = this.props.form;

    return (
      <div>
        <Form horizontal   onSubmit={this.handleSubmit}>
          <Row type="flex" justify="end">
            <Col span="1">
              <FormItem >
                <Button type="primary" htmlType="submit">修改密码</Button>
              </FormItem>
            </Col>
            <Col span="1">
              <FormItem style={{
                display: 'none'
              }}>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem {...formItemLayout} label="姓名"   >
                <Select id="select" size="large" disabled { ...getFieldProps('UserID')} >
                  {getSelectOption(this.props.dataSource0, 'UserID', 'Name')}
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...formItemLayout} label="原密码"  >
                <Input { ...getFieldProps('OldPassword', { rules: [ { required: true, whitespace: true, message: '请输入原密码' }, ], })}   type="password" />
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...formItemLayout} label="新密码"  >
                <Input { ...getFieldProps('NewPassword', { rules: [ { required: true, whitespace: true, message: '请输入新密码' }, ], })}  type="password"/>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem {...formItemLayout} label="确认新密码"  >
                <Input { ...getFieldProps('NewPassword2', { rules: [ { required: true, whitespace: true, message: '请输入确认新密码' },{validator: this.checkPass2,} ], })}   type="password"/>
              </FormItem>
            </Col>
          </Row>

        </Form>
      </div>
    );
  }
};

function mapPropsToFields(props) {
  if (props.dataSource0  && props.dataSource0.UserID ) {
      primaryKey = props.dataSource0.UserID;
      mainData = {
        UserID: {
          value: props.dataSource0.UserID
        }
      }
    return mainData
  } else {
    return {};
  }
}


function mapStateToProps(state,props) {
  userInfo = userInfo?userInfo:storeS.getJson('userInfo');
  const {user} = state;
  let dataSource0;
  if  (props.params.dataID==0 )
    {dataSource0=userInfo;}
  else {dataSource0=user.user;}
  return {dataSource0}
}
ChangePassword = Form.create({mapPropsToFields: mapPropsToFields})(ChangePassword);
export default connect(mapStateToProps)(ChangePassword)
