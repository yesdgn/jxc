'use strict';
import React from 'react';
//import addonsupdate from 'react-addons-update';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import ReactDataGrid from 'react-data-grid';
import * as ReactDataGridPlugins from 'react-data-grid/addons';
import SearchInput from '../../common/SearchInput';
import {APP_CONFIG} from '../../entry/config';
var moment = require('moment');
import {sample} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {getSelectOption,getUploadControlImgData} from '../../common/dgnControlAssist';

import {
  readDictionary,saveDictionary
} from '../../redux/actions';
import {READ_DICTIONARY, SAVE_DICTIONARY} from '../../redux/actionsType';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Icon,
  Modal,
  message,
} from 'antd';

var primaryKey;
var imgGuid;
var fileGuid;
var mainData;
var mainDataHasModify = false;
var userInfo;
const createForm = Form.create;
const FormItem = Form.Item;
const Toolbar = ReactDataGridPlugins.Toolbar;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};


class Dictionary extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  };

  componentWillMount() {
    if (this.props.params.dataID != 0) {
      this.props.dispatch(readDictionary(this.props.params.dataID ));
    }
  }
  componentWillUnmount() {
    mainDataHasModify = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dataID !== this.props.params.dataID) {
      this.props.dispatch(readDictionary(nextProps.params.dataID));
    }
    //下面为表体数据
    if (nextProps.params.dataID != 0 && ((nextProps.dataSource0 && this.state.rows.length === 0) || (nextProps.dataSource0 && this.props.dataSource0 && nextProps.dataSource1 !== this.props.dataSource1))) {
      this.setState({rows: nextProps.dataSource1});
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
      form0.DictTypeCategory='业务';
      let formArr = [];
      let form0Arr = [];
      let form1Arr = this.state.rows;
      form0Arr.push(form0);
      formArr.push(form0Arr);
      formArr.push(form1Arr);
      this.props.dispatch(saveDictionary(formArr, function(data) {
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          message.success(data.items[0].resultDescribe);
          this.context.router.push('/dictionary/' + primaryKey);
          this.props.dispatch(readDictionary(primaryKey));
          mainDataHasModify = false;
        } else {
          message.error(data.items[0].resultDescribe);
        }
      }.bind(this)));
    });

  };

  rowGetter = (rowIdx) => {
    return this.state.rows[rowIdx];
  }
  handleRowUpdated = (e) => {
    let rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows: rows});
  }
  handleAddRow = (e, rowObj) => {
    let newRow;
    if (rowObj === undefined) {
      newRow = {
        ID: undefined,
        DictTypeID: primaryKey,
        DictID: getRand(),
        DictName: '',
        Param1: '',
        Param2: '',
        Param3: ''
      };
    } else {
      newRow = rowObj;
    }
    //let rows = addonsupdate(this.state.rows, {$push : [newRow]});
    let rows = this.state.rows;
    rows.push(newRow);
    this.setState({rows: rows});
  }

  render() {
    const {getFieldProps} = this.props.form;
    var columns = [
      {
        key: 'ID',
        name: 'ID'
      }, {
        key: 'DictTypeID',
        name: '数据字典编号'
      }, {
        key: 'DictID',
        name: '数据编号'
      }, {
        key: 'DictName',
        name: '数据名称',
        editable: true
      }, {
        key: 'Param1',
        name: '参数一',
        editable: true
      }, {
        key: 'Param2',
        name: '参数二',
        editable: true
      }, {
        key: 'Param3',
        name: '参数三',
        editable: true
      }
    ];

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
                <Input {...getFieldProps('DictTypeID')}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem {...formItemLayout} label="数据字典名称" required>
                <Input  { ...getFieldProps('DictTypeName', { rules: [{ required: true,  message: '请填写数据字典名称' }, ], })}  />
              </FormItem>
            </Col>
            <Col  span="12">
              <FormItem {...formItemLayout} label="备注">
                <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
              </FormItem>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span="1"></Col>
          <Col span="22">

            <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter} columns={columns}
               rowsCount={this.state.rows.length} minHeight={300} toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
               onRowUpdated={this.handleRowUpdated} cellNavigationMode="changeRow"/>

          </Col>
          <Col span="1"></Col>
        </Row>
      </div>
    );
  }
};

function mapPropsToFields(props) {
  if (props.params.dataID == 0) {
    if (!mainDataHasModify) {
      primaryKey = getRand();
      userInfo = storeS.getJson('userInfo');
      mainData = {
        DictTypeID: {
          value: primaryKey
        }
      }
    }
    return mainData;
  } else if (props.dataSource0) {
    if (!mainDataHasModify) {
      primaryKey = props.dataSource0.DictTypeID;

      userInfo = storeS.getJson('userInfo');
      mainData = {
        ID: {
          value: props.dataSource0.ID
        },
        DictTypeID: {
          value: props.dataSource0.DictTypeID
        },
        DictTypeName: {
          value: props.dataSource0.DictTypeName
        },
        Remark: {
          value: props.dataSource0.Remark
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
  const {dictionary} = state
  let dataSource0=dictionary.dictionary_M;
  let dataSource1=dictionary.dictionary_S;
  return {dataSource0,dataSource1}
}
Dictionary = Form.create({mapPropsToFields: mapPropsToFields, onFieldsChange: onFieldsChange})(Dictionary);
export default connect(mapStateToProps)(Dictionary)
