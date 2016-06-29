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

class InStorage extends React.Component {
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
    if (this.props.params.formID != 0) {
      this.props.onLoadDataItem();
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.formID !== this.props.params.formID) {
      this.props.onLoadDataItem();
    }
     if (!ifNull(nextProps.dataItem.saveInStorageResult) && nextProps.dataItem.saveInStorageResult.result == 'success') {
      this.context.router.push('/inStorage/' + primaryKey);
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
      form0.FormID = primaryKey;
      let form0Arr = [];
      form0Arr.push(form0);
      this.props.saveDataItem(form0Arr);
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
              <Input {...getFieldProps('FormID')}/>
              <Input {...getFieldProps('CompID')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="仓库">
              <Input {...getFieldProps('WarehouseID')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="供应商">
              <Input {...getFieldProps('SupplierID')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="入库日期">
              <Input {...getFieldProps('StorageDate')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="单据状态">
              <Input  {...getFieldProps('FormState')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="操作人">
              <Input {...getFieldProps('Operator')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="操作时间">
              <Input  {...getFieldProps('OperationTime')}/>
            </FormItem>
          </Col>
        </Row>
       </Form>

    );
  }
};

function mapPropsToFields(props) {
  if (props.params.formID == 0 || !props.dataItem.inStorage) {
    return {};
  } else {
    primaryKey = props.dataItem.inStorage.FormID;
    return {
      ID: {
        value: props.dataItem.inStorage.ID
      },
      WarehouseID: {
        value: props.dataItem.inStorage.WarehouseID
      },
      CompID: {
        value: props.dataItem.inStorage.CompID
      },
      SupplierID: {
        value: props.dataItem.inStorage.SupplierID
      },
      StorageDate: {
        value: props.dataItem.inStorage.StorageDate
      },
      Operator: {
        value: props.dataItem.inStorage.Operator
      },
      OperationTime: {
        value: props.dataItem.inStorage.OperationTime
      }
    }
  }

}

InStorage = Form.create({mapPropsToFields: mapPropsToFields})(InStorage);
export default InStorage
