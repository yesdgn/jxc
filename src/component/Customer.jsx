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
var imgGuid;
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

class Customer extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      priviewVisible: false,
      priviewImage: '',
      fileList: [],
      width: 1200
    }
  };
  handleCancel = () => {
    this.setState({priviewVisible: false});
  }
  componentWillMount() {
    imgGuid = getRand();
    primaryKey = getRand();
    this.props.onLoad();
    if (this.props.params.customerID != 0) {
      this.props.onLoadDataItem();
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.customerID !== this.props.params.customerID) {
      this.props.onLoadDataItem();
    }
    if (nextProps.dataItem.customerImgs !== this.props.dataItem.customerImgs) {
      this.setState({
        fileList: getUploadControlImgData(nextProps.dataItem.customerImgs)
      })
    }
    if (!ifNull(nextProps.dataItem.saveCustomerResult) && nextProps.dataItem.saveCustomerResult.result == 'success') {
      this.context.router.push('/customer/' + primaryKey);
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
      form0.CompImages = imgGuid;
      form0.CompID = primaryKey;
      let form0Arr = [];
      form0Arr.push(form0);
      this.props.saveDataItem(form0Arr);
    });

  };
  handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
      info.file.uid = info.file.response.items[0].FileID;
      info.file.url = APP_CONFIG.FILEURL + info.file.response.items[0].FileUrl;
      info.file.thumbUrl = APP_CONFIG.FILEURL + info.file.response.items[0].thumbUrl;
      info.file.width = info.file.response.items[0].width;
      this.setState({fileList: info.fileList})
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    } else if (info.file.status === 'removed') {
      this.props.removeFile(info.file.uid);
    }
  }
  CompType = () => {
    if (!this.props.common.CompType) {
      return null
    }
    return (this.props.common.CompType.map((x) => {
      return (
        <Option key={x.ID} value={x.DictID}>{x.DictName}</Option>
      )
    }))
  }
  render() {
    const {getFieldProps} = this.props.form;
    const props = {
      name: 'img',
      action: APP_CONFIG.WEBSERVERURL + '/upload/img',
      listType: 'picture-card',
      multiple: false,
      data: {
        userid: storeS.getItem('UserID'),
        imgguid: imgGuid,
        thumbSize: 150
      },
      beforeUpload: function beforeUpload(file) {
        let isImg = (file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isImg) {
          message.error('只能上传 JPG|PNG 文件哦！');
        }
        return isImg;
      },
      onChange: this.handleChange,
      onPreview: (file) => {
        this.setState({
          priviewImage: file.url,
          priviewVisible: true,
          width: file.width
            ? file.width
            : 1200
        });
      },
      fileList: this.state.fileList
    };
    const nameProps = getFieldProps('CompName', {
      rules: [
        {
          required: true,
          min: 1,
          message: '客户名称至少为 1 个字符'
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
            <FormItem {...formItemLayout} label="客户代码">
              <Input {...getFieldProps('CompCode')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="客户名称">
              <Input {...nameProps}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="客户电话">
              <Input {...getFieldProps('CompTel')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="公司类型" required>
              <Select id="select" size="large" defaultValue="6365673372633792535" {...getFieldProps('CompType')}>
                {this.CompType()}
              </Select>

            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="客户描述">
              <Input type="textarea" rows="4" {...getFieldProps('CompDescribe')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="客户照片">
              <div className="clearfix">
                <Upload {...props}>
                  <Icon type="plus"/>
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
                <Modal visible={this.state.priviewVisible} width={this.state.width + 30} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" src={this.state.priviewImage}/>
                </Modal>
              </div>
            </FormItem>
          </Col>
        </Row>

      </Form>

    );
  }
};

function mapPropsToFields(props) {
  if (props.params.customerID == 0 || !props.dataItem.customer) {
    return {};
  } else {
    imgGuid = props.dataItem.customer.CompImages;
    primaryKey = props.dataItem.customer.CompID;
    return {
      ID: {
        value: props.dataItem.customer.ID
      },
      CompCode: {
        value: props.dataItem.customer.CompCode
      },
      CompName: {
        value: props.dataItem.customer.CompName
      },
      CompTel: {
        value: props.dataItem.customer.CompTel
      },
      CompType: {
        value: props.dataItem.customer.CompType
      },
      CompDescribe: {
        value: props.dataItem.customer.CompDescribe
      }
    }
  }

}

Customer = Form.create({mapPropsToFields: mapPropsToFields})(Customer);
export default Customer
