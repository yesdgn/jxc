'use strict';
import React from 'react';
import {Link} from 'react-router';
import {APP_CONFIG} from '../entry/config';
import {storeS} from '../common/dgn';
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  Upload,
  Icon,
  Modal,
  message
} from 'antd';
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
class Person extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      priviewVisible: false,
      priviewImage: '',
      imgGuid:Math.random().toString().substring(2)
    }
  };
  handleCancel = () => {
    this.setState({priviewVisible: false});
  }

  render() {
    const {getFieldProps} = this.props.form;
    const props = {
      name: 'img',
      action: APP_CONFIG.WEBSERVERURL + '/upload/img',
      listType: 'picture-card',
      data: {
        userid: storeS.getItem('UserID'),
        imgguid:this.state.imgGuid
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功。`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败。`);
        }
      },
      beforeUpload: function beforeUpload(file) {
        let isImg = (file.type === 'image/jpeg' || file.type === 'image/png');
        if (!isImg) {
          message.error('只能上传 JPG|PNG 文件哦！');
        }
        return isImg;
      },
      defaultFileList: [
        {
          uid: -1,
          name: 'img1',
          status: 'done',
          url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview: (file) => {
        this.setState({priviewImage: file.url, priviewVisible: true});
      }
    };

    return (
      <Form horizontal form={this.props.form}>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="代码">
              <Input/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="姓名">
              <Input/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="手机">
              <Input/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="电子邮箱">
              <Input type="email"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="备注">
              <Input type="textarea" rows="4"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="头像">
              <div className="clearfix">
                <Upload {...props}>
                  <Icon type="plus"/>
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
                <a href="https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png" target="_blank" className="upload-example"></a>
                <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel}>
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

Person = Form.create()(Person);
export default Person
