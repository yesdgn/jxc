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
  message
} from 'antd';
var imgGuid;
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
      fileList:[]
    }
  };
  handleCancel = () => {
    this.setState({priviewVisible: false});
  }
  componentWillMount() {
    this.props.onLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.personID !== this.props.params.personID) {
      this.props.onLoad();
    }
    if (nextProps.personImgs!==this.props.personImgs)
    {
      this.setState({fileList:getUploadControlImgData(nextProps.personImgs)})
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.savePerson(values);
      console.log('收到表单值：', values);
    });

  };
  handleChange=(info)=>{
     if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功。`);
        info.file.uid=info.file.response.items[0].FileID;
        info.file.url=APP_CONFIG.FILEURL+info.file.response.items[0].FileUrl;
        info.file.thumbUrl=APP_CONFIG.FILEURL+info.file.response.items[0].thumbUrl;
        this.setState({fileList:info.fileList})
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败。`);
      }
      else if (info.file.status==='removed')
      {this.props.removeFile(info.file.uid);}
   }
  render() {
    const {getFieldProps} = this.props.form;
    const props = {
      name: 'img',
      action: APP_CONFIG.WEBSERVERURL + '/upload/img',
      listType: 'picture-card',
      multiple:false,
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
      onChange:this.handleChange,
      onPreview: (file) => {
        this.setState({priviewImage: file.url, priviewVisible: true});
      },
      fileList: this.state.fileList
    };
    const nameProps = getFieldProps('Name', {
      rules: [
        {
          required: true,
          min: 1,
          message: '姓名至少为 1 个字符'
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
              <Input {...getFieldProps('UserID')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="代码">
              <Input {...getFieldProps('Code')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="姓名">
              <Input {...nameProps}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="手机">
              <Input {...getFieldProps('Mobile')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="电子邮箱">
              <Input type="email" {...getFieldProps('Email')}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="备注">
              <Input type="textarea" rows="4" {...getFieldProps('Remark')}/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="头像">
              <div className="clearfix">
                <Upload {...props}>
                  <Icon type="plus"/>
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
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

function mapPropsToFields(props) {
  if (!props.personInfo.item0) {
    return {};
  } else {
    imgGuid = ifNull(props.personInfo.item0[0].UserImages)
      ? getRand()
      : props.personInfo.item0[0].UserImages;

    return {
      Code: {
        value: props.personInfo.item0[0].Code
      },
      UserID: {
        value: props.personInfo.item0[0].UserID
      },
      Name: {
        value: props.personInfo.item0[0].Name
      },
      Email: {
        value: props.personInfo.item0[0].Email
      },
      Mobile: {
        value: props.personInfo.item0[0].Mobile
      },
      Remark: {
        value: props.personInfo.item0[0].Remark
      }
    }
  }

}

Person = Form.create({mapPropsToFields: mapPropsToFields})(Person);
export default Person
