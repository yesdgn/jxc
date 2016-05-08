
'use strict';
import  React  from 'react';
import {  Table, Icon  } from 'antd';
import { Link } from 'react-router';
const columns = [{
  title: '标题',
  dataIndex: 'name',
  key: 'name',
  render(text) {
    return <Link to={`/login`}>{text}</Link>;
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
  name: 'aaa',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: 'bbbb',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  key: '3',
  name: 'cccc',
  age: 32,
  address: '西湖区湖底公园1号'
}];

class Main extends React.Component {
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



export default Main
