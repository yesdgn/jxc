'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col } from 'antd';
import {Link} from 'react-router';
const Step = Steps.Step;

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
    render(text) {
      return <Link to={`/login`}>{text}</Link>;
    }
  }, {
    title: '时间',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: '类别',
    dataIndex: 'address',
    key: 'address'
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
  }
];
const data = [
  {
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
  }
];
const steps = [{
  status: 'saleOrder',
  title: '销售',
}, {
  status: 'process',
  title: '配货',
}, {
  status: 'wait',
  title: '出库',
}, {
  status: 'wait',
  title: '入账',
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

class Main extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  };
  componentWillMount() {};

  render() {
    return (
      <Row type="flex" justify="center" align="middle"  >
        <Col span="12" >
          <Table columns={columns} dataSource={data}/>
        </Col>
        <Col span="12" >
          订单编号：D201605261301000001
          <Steps size="small" current={1}>{steps}</Steps>
          <br/>
          订单编号：D201605261301000002
          <Steps size="small" current={1}>{steps}</Steps>
        </Col>
      </Row>


  );
  }
};

export default Main
