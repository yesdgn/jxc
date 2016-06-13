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
  componentWillMount() {
    this.props.onLoad();
  }
  componentWillReceiveProps(nextProps) {
     if(nextProps.params.personID!==this.props.params.personID)
     {
         this.props.onLoad();
     }
  }


  render() {
    const {getFieldProps} = this.props.form;
    const props = {
      name: 'img',
      action: APP_CONFIG.WEBSERVERURL + '/upload/img',
      listType: 'picture-card',
      data: {
        userid: storeS.getItem('UserID'),
        imgguid:this.state.imgGuid,
        thumbSize:150,
        watermark:"system(432347897983241)\r\n2016-06-10 21:28:30\r\n12.213213,28.123211"
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
    const nameProps = getFieldProps('Name', {
      rules: [
        { required: true, min: 1, message: '姓名至少为 1 个字符' },

      ],
    });
    return (

      <Form horizontal form={this.props.form} >
        <Row type="flex" justify="end"   >
          <Col  span="12">
            <FormItem    >
             <Button type="primary" htmlType="submit">保存</Button>
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
                <Upload {...props} {...getFieldProps('UserImages')} >
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

function mapPropsToFields(props) {
 return {
   Code:{value :props.personDataSource.item0?props.personDataSource.item0[0].Code:[]},
   Name:{value :props.personDataSource.item0?props.personDataSource.item0[0].Name:[]},
   Email:{value :props.personDataSource.item0?props.personDataSource.item0[0].Email:[]},
   Mobile:{value :props.personDataSource.item0?props.personDataSource.item0[0].Mobile:[]},
   Remark:{value :props.personDataSource.item0?props.personDataSource.item0[0].Remark:[]},
  }
}

Person = Form.create({mapPropsToFields:mapPropsToFields})(Person);
export default Person
