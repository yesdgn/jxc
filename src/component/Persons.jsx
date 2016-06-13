'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col,Modal } from 'antd';
import {Link} from 'react-router';
const confirm = Modal.confirm;
const  columns= [
    {
      title: '人员代码',
      dataIndex: 'Code',
      key: 'Code'
    }, {
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name'
    }, {
      title: '电子邮箱',
      dataIndex: 'Email',
      key: 'Email'
    }, {
      title: '手机',
      dataIndex: 'Mobile',
      key: 'Mobile'
    }, {
      title: '头像',
      dataIndex: 'UserImages',
      key: 'UserImages'
    }, {
      title: '操作',
      key: 'operation',
      render(text, record) {
        return (<span>
          <Link to={`/person/`+record.UserID}>编辑</Link>
          </span>
        );
      }
    }
  ]

class Persons extends React.Component {
  static defaultProps = {
   };
  static propTypes = {};

  constructor(props) {
    super(props);
  };
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <Row type="flex" justify="center" align="middle"  >
        <Col span="24" >
          <Table columns={columns}   rowKey={record => 'K'+record.UserID}
             dataSource={this.props.personsDataSource}
             />
        </Col>
      </Row>
  );
  }
};

export default  Persons
