'use strict';
import React from 'react';
import {Link} from 'react-router';
import {APP_CONFIG} from '../../entry/config';
import {storeS, getRand, ifNull} from '../../common/dgn';

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
  Select
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
  handleCancel = () => {
    this.setState({priviewVisible: false});
  }
  componentWillMount() {
    primaryKey = getRand();
    //this.props.onLoad();
    if (this.props.params.warehouseID != 0) {
      this.props.onLoadDataItem();
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.warehouseID !== this.props.params.warehouseID) {
      this.props.onLoadDataItem();
    }
     if (!ifNull(nextProps.dataItem.saveWarehouseResult) && nextProps.dataItem.saveWarehouseResult.result == 'success') {
      this.context.router.push('/warehouse/' + primaryKey);
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
      form0.WarehouseID = primaryKey;
      let form0Arr = [];
      form0Arr.push(form0);
      this.props.saveDataItem(form0Arr);
    });

  };


  render() {
    const {getFieldProps} = this.props.form;
    const nameProps = getFieldProps('WarehouseName', {
      rules: [
        {
          required: true,
          min: 1,
          message: '仓库名称至少为 1 个字符'
        }
      ]
    });

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
            <FormItem {...formItemLayout} label="仓库代码">
              <Input {...getFieldProps('WarehouseCode')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="仓库名称">
              <Input {...nameProps}/>
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
            <FormItem {...formItemLayout} label="供应商描述">
              <Input type="textarea" rows="4" {...getFieldProps('CompDescribe')}/>
            </FormItem>
          </Col>
        </Row>
       </Form>

    );
  }
};

function mapPropsToFields(props) {
  if (props.params.warehouseID == 0 || !props.dataItem.warehouse) {
    return {};
  } else {
    primaryKey = props.dataItem.warehouse.WarehouseID;
    return {
      ID: {
        value: props.dataItem.warehouse.ID
      },
      WarehouseCode: {
        value: props.dataItem.warehouse.WarehouseCode
      },
      WarehouseName: {
        value: props.dataItem.warehouse.WarehouseName
      },
      WarehouseTel: {
        value: props.dataItem.warehouse.WarehouseTel
      },
      WarehouseDescribe: {
        value: props.dataItem.warehouse.WarehouseDescribe
      }
    }
  }

}

Warehouse = Form.create({mapPropsToFields: mapPropsToFields})(Warehouse);
export default Warehouse
