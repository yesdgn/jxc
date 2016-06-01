'use strict';
import React from 'react';
import {
  Table,
  Icon,
  Steps,
  Row,
  Col,
  Modal,
  Button
} from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {messageFinished, readMessage} from '../redux/actions';
import * as G2 from 'g2';
const confirm = Modal.confirm;
const Step = Steps.Step;

const columns = [
  {
    title: '标题',
    dataIndex: 'Title',
    key: 'Title',
    render(text, record, index) {
      return <Link to={`/messages/` + record.ID}>{text}</Link>;
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
    title: '时间',
    dataIndex: 'CreateTime',
    key: 'CreateTime'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record, index) {
      return (
        <span>
          <a>完成</a>
        </span>
      );
    }
  }
]
const steps = [
  {
    status: 'saleOrder',
    title: '销售'
  }, {
    status: 'process',
    title: '配货'
  }, {
    status: 'wait',
    title: '出库'
  }, {
    status: 'wait',
    title: '入账'
  }
].map((s, i) => <Step key={i} title={s.title} description={s.description}/>);

class Main extends React.Component {
  static defaultProps = {};
  static propTypes = {};

  constructor(props) {
    super(props);
  };
  componentDidMount() {
    this.props.dispatch(readMessage());
    var data = [
      {
        genre: 'S',
        sold: 275
      }, {
        genre: 'Strategy',
        sold: 115
      }, {
        genre: 'Action',
        sold: 120
      }, {
        genre: 'Shooter',
        sold: 350
      }, {
        genre: 'Other',
        sold: 150
      }
    ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    // Step 1: 创建 Chart 对象
    var chart = new G2.Chart({
      id: 'c1', // 指定图表容器 ID
      width: 500, // 指定图表宽度
      height: 300 // 指定图表高度
    });
    // Step 2: 载入数据源
    chart.source(data, {
      genre: {
        alias: '游戏种类' // 列定义，定义该属性显示的别名
      },
      sold: {
        alias: '销售量'
      }
    });
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('genre')
    // Step 4: 渲染图表
    chart.render();
  }
  msgDone = (msg, index, mouseEvent) => {
    const { props: { dispatch } } = this
    if (mouseEvent.target.innerText == '完成') {
      confirm({
        title: '提示',
        content: '您确认已完成吗?',
        onOk() {
           dispatch(messageFinished(msg.ID))
        },
        onCancel() {}
      } );
    }
  };

  render() {

    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span="12">
            <Table columns={columns} pagination="false" onRowClick={this.msgDone} dataSource={this.props.user.userMessage
              ? this.props.user.userMessage.items
              : []} size="small"/>
          </Col>
          <Col span="1"></Col>
          <Col span="11">
            订单编号：D201605261301000001
            <Steps size="small" current={1}>{steps}</Steps>
            <br/>
            订单编号：D201605261301000002
            <Steps size="small" current={2}>{steps}</Steps>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span="12">
            <div id="c1"></div>
          </Col>
          <Col span="1"></Col>
          <Col span="11"></Col>
        </Row>
      </div>
    );
  }
};
function mapStateToProps(state) {
  const {user} = state
  return {user: user}
}
export default connect(mapStateToProps)(Main)
