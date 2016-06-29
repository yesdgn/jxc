'use strict';
import React from 'react';
import {Link} from 'react-router';
import {APP_CONFIG} from '../entry/config';
import {storeS, getRand, ifNull, getUploadControlImgData} from '../common/dgn';
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
  Select,Checkbox,Switch
} from 'antd';
var primaryKey;
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

class RouteApi extends React.Component {
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
  handleCancel = () => {
    this.setState({priviewVisible: false});
  }
  componentWillMount() {
    primaryKey = getRand();
    this.props.onLoad();
    if (this.props.params.routeID != 0) {
      this.props.onLoadDataItem();
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.routeID !== this.props.params.routeID) {
      this.props.onLoadDataItem();
    }
     if (!ifNull(nextProps.dataItem.saveRouteResult) && nextProps.dataItem.saveRouteResult.result == 'success') {
      this.context.router.push('/routeApi/' + primaryKey);
      this.props.onLoadDataItem();
      this.props.clearResult()
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
      form0.RouteID = primaryKey;
      let form0Arr = [];
      form0Arr.push(form0);
      this.props.saveDataItem(form0Arr);
    });

  };

  RouteReturnType = () => {
    if (!this.props.common.RouteReturnType) {
      return null
    }
    return (this.props.common.RouteReturnType.map((x) => {
      return (
        <Option key={x.ID} value={x.DictName}>{x.DictName}</Option>
      )
    }))
  }
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
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="ApiID">
              <Input {...getFieldProps('ApiID')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="路由名称">
              <Input {...getFieldProps('RouteName')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="返回类型">
                <Select id="select" size="large" defaultValue="VIEW" {...getFieldProps('TransformJsonType')}>
                  {this.RouteReturnType()}
                </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="是否禁用">
              <Checkbox  {...getFieldProps('IsCancel', { valuePropName: 'checked' })} />
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="是否开放型API">
              <Checkbox  {...getFieldProps('IsOpen', { valuePropName: 'checked' })} />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="是否自动生成SQL语句">
              <Checkbox  {...getFieldProps('IsAutoGenerateSql', { valuePropName: 'checked' })} />
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
            <FormItem {...formItemLayout} label="执行SQL">
              <Input type="textarea" rows="4" {...getFieldProps('ApiExecSql')}/>
            </FormItem>
          </Col>
        </Row>
       </Form>

    );
  }
};

function mapPropsToFields(props) {
  if (props.params.ID == 0 || !props.dataItem.route) {
    return {};
  } else {
    primaryKey = props.dataItem.route.RouteID;
    return {
      ID: {
        value: props.dataItem.route.ID
      },
      ApiID: {
        value: props.dataItem.route.ApiID
      },
      RouteName: {
        value: props.dataItem.route.RouteName
      },
      ApiExecSql: {
        value: props.dataItem.route.ApiExecSql
      },
      IsCancel: {
        value:props.dataItem.route.IsCancel
      },
      IsOpen: {
        value: props.dataItem.route.IsOpen
      },
      TransformJsonType: {
        value: props.dataItem.route.TransformJsonType
      },
      IsAutoGenerateSql: {
        value: props.dataItem.route.IsAutoGenerateSql
      },
      AutoGenerateSqlTableName: {
        value: props.dataItem.route.AutoGenerateSqlTableName
      }
    }
  }

}

RouteApi = Form.create({mapPropsToFields: mapPropsToFields})(RouteApi);
export default RouteApi
