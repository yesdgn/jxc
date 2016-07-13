'use strict';
import React from 'react';
import {APP_CONFIG} from '../entry/config';
import {storeS, getRand, ifNull} from '../common/dgn';
import {getUploadControlImgData} from '../common/dgnControlAssist';
import {
  Upload,
  Icon,
  Modal,
  message
} from 'antd';

import {removeFile} from '../redux/actions';
var userInfo;
class UploadImages extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired
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
  componentWillMount() {
    userInfo = storeS.getJson('userInfo');
  }
  handleCancel = () => {
    this.setState({priviewVisible: false});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.images !== this.props.images) {
      this.setState({
        fileList: getUploadControlImgData(nextProps.images)
      })
    }
  }
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
      this.context.store.dispatch(removeFile(info.file.uid));
    }
  }

  render() {
    let props = {
      name: 'img',
      action: APP_CONFIG.WEBSERVERURL + '/upload/img',
      listType: 'picture-card',
      multiple: false,
      data: {
        userid: userInfo.UserID?userInfo.UserID:0,
        imgguid: this.props.imgGuid,
        thumbSize: 150,
        watermark:this.props.watermark
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
    return (

              <div className="clearfix">
                <Upload {...props}>
                  <Icon type="plus"/>
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
                <Modal visible={this.state.priviewVisible} width={this.state.width + 30} footer={null} onCancel={this.handleCancel}>
                  <img alt="priviewImage" src={this.state.priviewImage}/>
                </Modal>
              </div>
    );
  }
};



export default UploadImages
