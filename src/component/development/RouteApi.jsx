'use strict';
import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {APP_CONFIG} from '../../entry/config';
var moment = require('moment');
import {sample} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption, checkDate} from '../../common/dgnControlAssist';

import {readDict, readRoute, saveRoute} from '../../redux/actions';
import {READ_DICT_ROUTERETURNTYPE} from '../../redux/actionsType';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Icon,
  message,
  Select,
  Checkbox
} from 'antd';

var primaryKey;
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
class RouteApi extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {}
  };

  componentWillMount() {
    mainDataHasModify = false;
    this.props.dispatch(readDict(READ_DICT_ROUTERETURNTYPE, '6365673372633792594'));
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readRoute(this.props.params.dataID));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readRoute(nextProps.params.dataID));
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

      let formArr = [];
      formArr.push(form0);
      this.props.dispatch(saveRoute(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.context.router.push('/routeapi/' + primaryKey);
          this.props.dispatch(readRoute(primaryKey));
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
              <Input {...getFieldProps('RouteID')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="Api编号" required>
              <Input {...getFieldProps('ApiID', { rules: [ { required: true, message: '请填写ApiID' }, ], })}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="路由名称" required>
              <Input {...getFieldProps('RouteName', { rules: [ { required: true, whitespace: true, message: '请填写路由名称' }, ], })}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="API类型" required>
              <Select id="select" size="large"  {...getFieldProps('TransformJsonType', { rules: [ { required: true, whitespace: true, message: '请选择返回类型' }, ], })}>
                {getSelectOption(this.props.common.RouteReturnType, 'DictCode', 'DictName')}
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="是否禁用">
              <Checkbox {...getFieldProps('IsCancel', { valuePropName: 'checked' })}/>
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="自动生成语句表名集合">
              <Input {...getFieldProps('AutoGenerateSqlTableName')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="是否开放型API">
              <Checkbox {...getFieldProps('IsOpen', { valuePropName: 'checked' })}/>
            </FormItem>
          </Col>
        </Row>
        <Row>

          <Col span="24">
            <FormItem {...singFormItemLayout} label="执行SQL" required>
              <Input type="textarea" rows="4" {...getFieldProps('ApiExecSql', { rules: [ { required: true, whitespace: true, message: '请填写执行SQL' }, ], })}/>
            </FormItem>
          </Col>
        </Row>
      </Form>

    );
  }
};

function mapPropsToFields(props) {
  if (props.params.dataID == 0) {
    if (!mainDataHasModify) {
      primaryKey = getRand();
      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: undefined
        },
        RouteID: {
          value: primaryKey
        },
        AutoGenerateSqlType: {
          value: 'NON'
        },
        IsCancel: {
          value: 0
        },
        IsOpen: {
          value: 0
        }
      }
    }
    return mainData;
  } else if (props.dataSource0 && props.dataSource0.RouteID == props.params.dataID) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.RouteID;
      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        ApiID: {
          value: props.dataSource0.ApiID.toString()
        },
        RouteID: {
          value: props.dataSource0.RouteID
        },
        RouteName: {
          value: props.dataSource0.RouteName
        },
        ApiExecSql: {
          value: props.dataSource0.ApiExecSql
        },
        IsCancel: {
          value: props.dataSource0.IsCancel
        },
        IsOpen: {
          value: props.dataSource0.IsOpen
        },
        TransformJsonType: {
          value: props.dataSource0.TransformJsonType
        },
        AutoGenerateSqlType: {
          value: props.dataSource0.AutoGenerateSqlType
        },
        AutoGenerateSqlTableName: {
          value: props.dataSource0.AutoGenerateSqlTableName
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
  const {common, routeApi} = state;
  let dataSource0 = routeApi.route;
  return {common, dataSource0}
}
RouteApi = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(RouteApi);
export default connect(mapStateToProps)(RouteApi)
