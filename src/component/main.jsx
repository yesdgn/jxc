'use strict';
import React from 'react';
import {
  Icon,
  Row,
  Col,
  Modal,
  Button
} from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {messageFinished, readMessage} from '../redux/actions';
import * as G2 from 'g2';



class Main extends React.Component {
  static defaultProps = {};
  static propTypes = {};
sta
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

  render() {

    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span="12">
            <div id="c1"></div>
          </Col>

          <Col span="12">
            <div id="c2"></div>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span="12">
            <div id="c3"></div>
          </Col>

          <Col span="12">
            <div id="c4"></div>
          </Col>
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
