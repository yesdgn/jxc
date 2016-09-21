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
readUser,saveUser
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

class User extends React.Component {
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
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readUser(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readUser(nextProps.params.dataID));
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
      form0.StartDate = moment(form0.StartDate).format('YYYY-MM-DD');
      form0.EndDate = moment(form0.EndDate).format('YYYY-MM-DD');
      if (mainDataHasModify)
      {form0.DgnOperatorType =this.props.params.dataID == 0?'ADD':'UPDATE';}
      let formArr = [];
      formArr.push(form0);
       this.props.dispatch(saveUser(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.context.router.push('/user/' + primaryKey);
          this.props.dispatch(readUser(primaryKey));
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
          <Row type="flex" justify="end" >
            <Col span="23"  >
              <FormItem className="floatRight" >
                <Button type="primary" htmlType="submit">保存</Button>
                <Button type="default" className="marLeft10" onClick={()=>this.context.router.push('/changePassword/' + primaryKey)}>修改密码</Button>
              </FormItem>
            </Col>
            <Col span="1">
              <FormItem style={{
                display: 'none'
              }}>
                <Input {...getFieldProps('ID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="姓名"   >
                <Select id="select" size="large" disabled { ...getFieldProps('UserID')} >
                  {getSelectOption(this.props.dataSource0, 'UserID', 'Name')}
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="用户类型"  >
                <Input { ...getFieldProps('UserType')} disabled/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="有效开始日期" required>
                <DatePicker { ...getFieldProps('StartDate', { rules: [ { validator: checkDate,message:'请选择有效开始日期' }, ], })} />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="有效结束日期" required>
                <DatePicker { ...getFieldProps('EndDate', { rules: [ { validator: checkDate ,message:'请选择有效结束日期'}, ], })} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="允许登录">
                <Checkbox {...getFieldProps('IsAllowLogon', { valuePropName: 'checked' })}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="作废">
                <Checkbox {...getFieldProps('IsCancel', { valuePropName: 'checked' })}/>
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
        UserType: {
          value: props.dataSource0.UserType
        },
        IsAllowLogon: {
          value: props.dataSource0.IsAllowLogon
        },
        IsCancel: {
          value: props.dataSource0.IsCancel
        },
        StartDate: {
          value: new Date(props.dataSource0.StartDate)
        },
        EndDate: {
          value: new Date(props.dataSource0.EndDate)
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
  const {user} = state;
  let dataSource0=user.user;
  return {dataSource0}
}
User = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(User);
export default connect(mapStateToProps)(User)
