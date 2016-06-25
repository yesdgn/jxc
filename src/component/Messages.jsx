'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col,Modal } from 'antd';
import {Link} from 'react-router';
const confirm = Modal.confirm;
const  columns= [
    {
      title: '标题',
      dataIndex: 'Title',
      key: 'Title',
      render(text,record,index) {
        return <Link to={`/messages/`+record.ID}>{text}</Link>;
      }
    }, {
      title: '内容',
      dataIndex: 'Body',
      key: 'Body'
    }, {
      title: '发出人',
      dataIndex: 'Name',
      key: 'Name'
    }, {
      title: '模块',
      dataIndex: 'MsgModule',
      key: 'MsgModule'
    }, {
      title: '时间',
      dataIndex: 'CreateTime',
      key: 'CreateTime'
    }, {
      title: '操作',
      key: 'operation',
      render(text, record) {
        return (<span>
              <a>完成</a>
          </span>
        );
      }
    }
  ]

class Messages extends React.Component {
  static defaultProps = {
   };
  static propTypes = {};

  constructor(props) {
    super(props);
  };
  componentDidMount() {
    this.props.onLoad();
  }
  msgDone=(msg,index,mouseEvent)=>{
    const { props: { onMsgDone } } = this
    if (mouseEvent.target.innerText == '完成') {
      confirm({
        title: '提示',
        content: '您确认已完成吗?',
        onOk() {
          onMsgDone(msg.ID)
        },
        onCancel() {}
      } );
    }
  };

  render() {


    return (
      <Row type="flex" justify="center" align="middle"  >
        <Col span="24" >
          <Table columns={columns} onRowClick={this.msgDone}  rowKey={record => 'K'+record.ID}
             dataSource={this.props.dataSource}
             />
        </Col>

      </Row>


  );
  }
};

export default  Messages
