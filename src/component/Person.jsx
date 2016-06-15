'use strict';
import React from 'react';
import {Link} from 'react-router';
import {APP_CONFIG} from '../entry/config';
import {storeS,getRand,ifNull,getUploadControlImgData} from '../common/dgn';
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
     if(nextProps.params.personID!==this.props.params.personID)
     {
         this.props.onLoad();
     }



  }
  handleSubmit=(e)=> {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

       console.log('收到表单值：', values);
    });

  };

  render() {
    const {getFieldProps} = this.props.form;
    let props = {
      name: 'img',
      action: APP_CONFIG.WEBSERVERURL + '/upload/img',
      listType: 'picture-card',
      data: {
        userid: storeS.getItem('UserID'),
        imgguid: imgGuid,
        thumbSize:150
      },
      fileList:getUploadControlImgData(this.props.personImgs),
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
      onPreview: (file) => {
        this.setState({priviewImage: file.url, priviewVisible: true});
      }
    };
    const nameProps = getFieldProps('Name', {
      rules: [
        { required: true, min: 1, message: '姓名至少为 1 个字符' },

      ],
    });
    return (

      <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
        <Row    type="flex" justify="end" >
          <Col   >
            <FormItem    >
             <Button type="primary" htmlType="submit">保存</Button>
           </FormItem>
          </Col>
          <Col span="1">
            <FormItem style={{display:'none'}} >
              <Input  {...getFieldProps('UserID')} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem {...formItemLayout} label="代码">
              <Input  {...getFieldProps('Code')} />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} label="姓名">
              <Input {...nameProps} />
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
                <Upload {...props} {...getFieldProps('UserImages')}  >
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
  if (!props.personInfo.item0)
  {
    return {};
  }
  else {
    imgGuid=ifNull(props.personInfo.item0[0].UserImages)?getRand():props.personInfo.item0[0].UserImages;

     return {
      Code:{value :props.personInfo.item0[0].Code},
      UserID:{value :props.personInfo.item0[0].UserID},
      Name:{value :props.personInfo.item0[0].Name},
      Email:{value :props.personInfo.item0[0].Email},
      Mobile:{value :props.personInfo.item0[0].Mobile},
      Remark:{value :props.personInfo.item0[0].Remark},
      UserImages:{value:imgGuid}
     }
  }

}

Person = Form.create({mapPropsToFields:mapPropsToFields})(Person);
export default Person
