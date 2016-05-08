
'use strict';
import  React  from 'react';
import {  Table, Icon  } from 'antd';
import { Link } from 'react-router';
const columns = [{
  title: '标题',
  dataIndex: 'name',
  key: 'name',
  render(text) {
    return <Link to={`/users/1`}>{text}</Link>;
  }
}, {
  title: '时间',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '类别',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '操作',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <a href="#">操作一</a>

      </span>
    );
  }
}];
const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];

class Users extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state={
        };
    };
    componentWillMount() {
    };

    render() {
      return(
        <Table columns={columns} dataSource={data} />
        );
    }
};



export default Users
