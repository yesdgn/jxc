'use strict';
import React from 'react';
import {Link} from 'react-router';
import {APP_CONFIG} from '../entry/config';
import {storeS, getRand, ifNull} from '../common/dgn';
import {getUploadControlImgData} from '../common/dgnControlAssist';
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
      fileList:[],
      width:1200
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
    if (nextProps.dataItemImgs!==this.props.dataItemImgs)
    {
      this.setState({fileList:getUploadControlImgData(nextProps.dataItemImgs)})
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      let v= {...values};
      v.UserImages=imgGuid;
      this.props.saveDataItem(v);
    });

  };
  handleChange=(info)=>{
     if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功。`);
        info.file.uid=info.file.response.items[0].FileID;
        info.file.url=APP_CONFIG.FILEURL+info.file.response.items[0].FileUrl;
        info.file.thumbUrl=APP_CONFIG.FILEURL+info.file.response.items[0].thumbUrl;
        info.file.width= info.file.response.items[0].width;
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
        userid: storeS.getItem('userInfo').UserID,
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
        this.setState({priviewImage: file.url, priviewVisible: true,width:file.width?file.width:1200  });
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
                <Modal visible={this.state.priviewVisible} width={this.state.width+30} footer={null} onCancel={this.handleCancel}>
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
  if (!props.dataItem.UserID) {
    return {};
  } else {
    imgGuid = ifNull(props.dataItem.UserImages)
      ? getRand()
      : props.dataItem.UserImages;

    return {
      Code: {
        value: props.dataItem.Code
      },
      UserID: {
        value: props.dataItem.UserID
      },
      Name: {
        value: props.dataItem.Name
      },
      Email: {
        value: props.dataItem.Email
      },
      Mobile: {
        value: props.dataItem.Mobile
      },
      Remark: {
        value: props.dataItem.Remark
      }
    }
  }

}

Person = Form.create({mapPropsToFields: mapPropsToFields})(Person);
export default Person
