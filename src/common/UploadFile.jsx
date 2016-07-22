'use strict';
import React from 'react';
import {APP_CONFIG} from '../entry/config';
import {storeS, getRand, ifNull} from '../common/dgn';
import {getUploadControlFileData} from '../common/dgnControlAssist';
import {
  Upload,
  Icon,
  Modal,
  message,
  Button
} from 'antd';
var userInfo;
import {removeFile} from '../redux/actions';
class UploadFile extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    }
  };
  componentWillMount() {
      userInfo = storeS.getJson('userInfo');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.files !== this.props.files) {
      this.setState({
        fileList: getUploadControlFileData(nextProps.files)
      })
    }
  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);
      info.file.uid = info.file.response.items[0].FileID;
      info.file.url = APP_CONFIG.FILEURL + info.file.response.items[0].FileUrl;
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败。`);
    } else if (info.file.status === 'removed') {
      this.context.store.dispatch(removeFile(info.file.uid));
    }
    this.setState({fileList: info.fileList})
  }

  render() {
    let props = {
      name: 'file',
      action: APP_CONFIG.WEBSERVERURL + '/upload/file',
      multiple: true,
      data: {
        userid: userInfo.UserID?userInfo.UserID:0,
        fileguid: this.props.fileGuid
      },
      onChange: this.handleChange,
      fileList: this.state.fileList,
      onPreview: (file) => {
        console.log(file);
      }
    };
    return (
              <div className="clearfix">
                <Upload {...props} className="upload-list-inline">
                  <Button type="ghost">
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              </div>
    );
  }
};



export default UploadFile
