'use strict';
import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import ReactDataGridPlugins from 'react-data-grid/addons';
import {APP_CONFIG} from '../entry/config';
var moment = require('moment');
import {storeS, getRand, ifNull} from '../common/dgn';
import {getSelectOption, checkDate} from '../common/dgnControlAssist';
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
const userInfo = storeS.getJson('userInfo');
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
var columns = [
{
  key: 'ID',
  name: 'ID',
  width: 80
},
{
  key: 'GoodsName',
  name: '商品',
  editable : true
}
]
class InStorage extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      rows:[{ID:1,GoodsID:"123",GoodsName:"abc",key:1,Price:1,Quantity:1,Amount:1}, {ID:1,GoodsID:"123",GoodsName:"abc",key:1,Price:1,Quantity:1,Amount:1}]
    }
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
      let form1={ID:undefined,FormID:primaryKey,GoodsID:"6365489664551289797",Price:1,Quantity:1,Amount:1};
      let formArr = [];
      let form0Arr=[];
      let form1Arr=[];
      form0Arr.push(form0);
      form1Arr.push(form1);
      formArr.push(form0Arr);
      formArr.push(form1Arr);
            console.log(formArr);
      this.props.dispatch(saveInStorage(formArr));
    });

  };
  showCombox() {
    alert(1);
  }
  rowGetter(rowIdx){
   return {ID:1,GoodsID:"123",GoodsName:"abc",key:1}
 }
 handleRowUpdated =(e)=>{
    //merge updated row with current row and rerender by setting state
    var rows =  this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  }
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
                <Input {...getFieldProps('FormID')}/>
                <Input {...getFieldProps('CompID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="仓库" required>
                <Select id="select" size="large" { ...getFieldProps('WarehouseID', { rules: [ { required: true, whitespace: true, message: '请选择仓库' }, ], })}>
                  {getSelectOption(this.props.warehouse.warehouses, 'WarehouseID', 'WarehouseName')}
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem {...formItemLayout} label="供应商" required>
                <Select id="select" size="large" { ...getFieldProps('SupplierID', { rules: [ { required: true, whitespace: true, message: '请选择供应商' }, ], })} showSearch={true} optionFilterProp="children">
                  {getSelectOption(this.props.supplier.suppliers, 'CompID', 'CompName')}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="入库日期" required>
                <DatePicker { ...getFieldProps('StorageDate', { rules: [ { validator: checkDate }, ], })} disabledDate={disabledDate}/>
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
                <Select id="select" size="large" disabled {...getFieldProps('Operator')}>
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
          <Row>
            <Col>
              <FormItem {...formItemLayout} label="备注">
                <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span="1"></Col>
          <Col span="4">
            <Input size="large" placeholder="输入商品代码、条码、名称搜索"/>
          </Col>
          <Col span="2">
            <Button type="ghost" size="large" icon="search" onClick={this.showCombox}>弹出商品选择</Button>
          </Col>
        </Row>
        <Row>
          <Col span="24">

        <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter}
           columns={columns} rowsCount={this.state.rows.length} minHeight={500}   onRowUpdated={this.handleRowUpdated} />

          </Col>
        </Row>
      </div>
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
    primaryKey = props.inStorage.inStorage.item0[0].FormID;
    return {
      ID: {
        value: props.inStorage.inStorage.item0[0].ID
      },
      FormID: {
        value: props.inStorage.inStorage.item0[0].FormID
      },
      WarehouseID: {
        value: props.inStorage.inStorage.item0[0].WarehouseID
      },
      CompID: {
        value: props.inStorage.inStorage.item0[0].CompID
      },
      SupplierID: {
        value: props.inStorage.inStorage.item0[0].SupplierID
      },
      StorageDate: {
        value: new Date(props.inStorage.inStorage.item0[0].StorageDate)
      },
      FormState: {
        value: props.inStorage.inStorage.item0[0].FormState
      },
      Operator: {
        value: props.inStorage.inStorage.item0[0].Operator
      },
      OperationTime: {
        value: new Date(props.inStorage.inStorage.item0[0].OperationTime)
      },
      Remark: {
        value: props.inStorage.inStorage.item0[0].Remark
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
