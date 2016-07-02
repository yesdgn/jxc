'use strict';
import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {APP_CONFIG} from '../entry/config';
var moment = require('moment');
import {storeS, getRand, ifNull} from '../common/dgn';
import {getSelectOption,checkDate} from '../common/dgnControlAssist';
import {
  readDict,
  readSuppliers,
  saveInStorage,
  clearResult,
  readInStorage,
  readWarehouses
} from '../redux/actions';
import {READ_DICT_INSTORAGESTATE} from '../redux/actionsType';
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
const disabledDate = function(current) {
  return current && current.getTime() > Date.now();
};
const userInfo = storeS.getJson('userInfo');
class InStorage extends React.Component {
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
    primaryKey = getRand();
    this.props.dispatch(readDict(READ_DICT_INSTORAGESTATE, '6365673372633792599'));
    this.props.dispatch(readSuppliers(100, 0));
    this.props.dispatch(readWarehouses(100, 0));
    if (this.props.params.formID != 0) {
      this.props.dispatch(readInStorage(this.props.params.formID));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.formID !== this.props.params.formID) {
      this.props.dispatch(readInStorage(nextProps.params.formID));
    }
    if (!ifNull(nextProps.inStorage.saveInStorageResult) && nextProps.inStorage.saveInStorageResult.result == 'success') {
      this.context.router.push('/inStorage/' + primaryKey);
      this.props.dispatch(clearResult());
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
      form0.StorageDate = moment(form0.StorageDate).format('YYYY-MM-DD');
      form0.OperationTime = moment(form0.OperationTime).format('YYYY-MM-DD HH:mm:ss');
      console.log(form0);
      let form0Arr = [];
      form0Arr.push(form0);
      this.props.dispatch(saveInStorage(form0Arr));
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
            <FormItem {...formItemLayout} label="仓库" required>
              <Select id="select" size="large" { ...getFieldProps('WarehouseID', {
                rules: [
                  { required: true, whitespace: true, message: '请选择仓库' },
                ],
              })}>
                {getSelectOption(this.props.warehouse.warehouses, 'WarehouseID', 'WarehouseName')}
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="供应商" required  >
              <Select id="select" size="large" { ...getFieldProps('SupplierID', {
                rules: [
                  { required: true, whitespace: true, message: '请选择供应商' },
                ],
              })} showSearch={true} optionFilterProp="children"  >
                {getSelectOption(this.props.supplier.suppliers, 'CompID', 'CompName')}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="入库日期" required>
              <DatePicker { ...getFieldProps('StorageDate', {
                rules: [
                  { validator: checkDate },
                ],
              })}   disabledDate={disabledDate} />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="单据状态">
              <Select id="select" size="large" disabled {...getFieldProps('FormState')}>
                {getSelectOption(this.props.common.InstorageState, 'DictID', 'DictName')}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="操作人">
              <Select id="select" size="large" disabled {...getFieldProps('Operator')} defaultValue={userInfo.UserID}>
                {getSelectOption(userInfo, 'UserID', 'Name')}
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="操作时间">
              <DatePicker {...getFieldProps('OperationTime')} disabled showTime format="yyyy-MM-dd HH:mm:ss"/>
            </FormItem>
          </Col>
        </Row>
      </Form>

    );
  }
};

function mapPropsToFields(props) {
  if (props.params.formID == 0) {
    return {
      CompID: {
        value: userInfo.CompID
      },
      FormID: {
        value: primaryKey
      },
      FormState: {
        value: "6365673372633792602"
      },
      StorageDate: {
        value: new Date()
      },
      Operator: {
        value: userInfo.UserID
      },
      OperationTime: {
        value: new Date()
      }
    };
  } else if (props.inStorage.inStorage) {
    primaryKey=props.inStorage.inStorage.FormID;
    return {
      ID: {
        value: props.inStorage.inStorage.ID
      },
      FormID: {
        value: props.inStorage.inStorage.FormID
      },
      WarehouseID: {
        value: props.inStorage.inStorage.WarehouseID
      },
      CompID: {
        value: props.inStorage.inStorage.CompID
      },
      SupplierID: {
        value: props.inStorage.inStorage.SupplierID
      },
      StorageDate: {
        value: new Date(props.inStorage.inStorage.StorageDate)
      },
      FormState: {
        value: props.inStorage.inStorage.FormState
      },
      Operator: {
        value: props.inStorage.inStorage.Operator
      },
      OperationTime: {
        value: new Date(props.inStorage.inStorage.OperationTime)
      }
    }
  } else {
    return {};
  }
}

function mapStateToProps(state) {
  const {common, supplier, warehouse, inStorage} = state
  return {common, supplier, warehouse, inStorage}
}
InStorage = Form.create({mapPropsToFields: mapPropsToFields})(InStorage);
export default connect(mapStateToProps)(InStorage)
