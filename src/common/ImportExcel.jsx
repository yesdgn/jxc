'use strict';
import React from 'react';
import {APP_CONFIG} from '../entry/config';
import {storeS, getRand, ifNull} from '../common/dgn';
import {
  Upload,
  Icon,
  Modal,
  message,
  Button
} from 'antd';
var userInfo;

class ImportExcel extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state={modalVisible:false,fileList: []}
  };

  handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功。`);

    } else if (info.file.status === 'error') {
      message.error(`提交文件[${info.file.name}]失败。`);
    }
    this.setState({fileList: info.fileList})
  }
 componentWillReceiveProps(nextProps) {
   this.setState({modalVisible:nextProps.visible});
 }
  setModalVisible=(modalVisible)=> {
    this.setState({ modalVisible,fileList:[] });
    if (this.props.hide) {this.props.hide();}
  }
  render() {
    userInfo = storeS.getJson('userInfo');
    let props = {
      name: 'file',
      action: APP_CONFIG.WEBSERVERURL + '/upload/temp',
      multiple: false,
      data: {
        userid: userInfo.UserID?userInfo.UserID:0,
        fileguid: "ImportExcel"
      },
      fileList:this.state.fileList,
      beforeUpload: function beforeUpload(file) {
        let isFile = (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        if (!isFile) {
          message.error('只能上传excel文件哦！');
        }
        return isFile;
      },
      onChange: this.handleChange,
    };
    return (
      <div>
      <Modal
        title="导入"

        visible={this.state.modalVisible}
        onOk={() => this.setModalVisible(false)}
        onCancel={() => this.setModalVisible(false)}
        maskClosable={false}
      >
      <Upload {...props}  >
        <Button type="ghost">
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
      </Modal>
    </div>
    );
  }
};



export default ImportExcel
