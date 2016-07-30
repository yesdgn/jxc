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
readDict,readMessage
} from '../../redux/actions';
import {READ_DICT_COMPTYPE} from '../../redux/actionsType';
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
const singFormItemLayout = {
  labelCol: {
    span: 3
  },
  wrapperCol: {
    span: 20
  }
};

class Message extends React.Component {
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
      this.props.dispatch(readMessage(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readMessage(nextProps.params.dataID));
      mainDataHasModify = false;
    }


  }

  render() {
    const {getFieldProps} = this.props.form;
    return (
      <div>
        <Form horizontal form={this.props.form} >
          <Row type="flex" justify="end">
            <Col >

            </Col>
            <Col span="1">
              <FormItem style={{
                display: 'none'
              }}>
                <Input {...getFieldProps('ID')}/>
                <Input {...getFieldProps('MsgID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="标题">
                <Input   { ...getFieldProps('Title', { rules: [ { required: true, whitespace: true, message: '请输入客户名称' }, ], })}/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="模块">
                <Input {...getFieldProps('MsgModule')}  />
              </FormItem>
            </Col>
          </Row>
          <Row>

            <Col span="12">
              <FormItem {...formItemLayout} label="发出人"    >
                <Select id="select" size="large"    {...getFieldProps('SendUserID')}>
                  {getSelectOption(this.props.dataSource0, 'SendUserID', 'SendUserName')}
                </Select>

              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="时间">
                <Input {...getFieldProps('CreateTime')}  />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem {...singFormItemLayout} label="信息内容">
                <Input type="textarea" autosize {...getFieldProps('Body')}  />
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
        MsgID: {
          value: primaryKey
        }
      }
    }
    return mainData;
  } else if (props.dataSource0 && props.dataSource0.MsgID==props.params.dataID) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.MsgID;
    //  imgGuid = props.dataSource0.CompImages;
      if (ifNull(imgGuid)) {
        imgGuid = getRand();
      }
      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        MsgID: {
          value: props.dataSource0.MsgID
        },
        Title: {
          value: props.dataSource0.Title
        },
        Body: {
          value: props.dataSource0.Body
        },
        CreateTime: {
          value: props.dataSource0.CreateTime
        },
        MsgModule: {
          value: props.dataSource0.MsgModule
        },
        SendUserID: {
          value:  props.dataSource0.SendUserID
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
  const {common, user} = state;
  let dataSource0=user.message;
  //let imgDataSource=company.compImgs;
  return {common,dataSource0}
}
Message = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Message);
export default connect(mapStateToProps)(Message)
