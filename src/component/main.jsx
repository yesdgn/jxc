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
import {messageFinished, readMessage,readGoodsAnalysis} from '../redux/actions';
import  {Chart} from 'g2';

class Main extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  };

 async showChartAsync() {
   try {
      await this.context.store.dispatch(readGoodsAnalysis());
      this.showChart();
   } catch(e) {
     console.log(e);
   }
 }
  showChart() {
   let s=this.context.store.getState();
   var chart = new Chart({
     id: 'c1', // 指定图表容器 ID
     width: 500, // 指定图表宽度
     height: 300 // 指定图表高度
   });
   chart.source(s.chart.goodsAnalysis.items, {
     ProductCategory: {
       alias: '商品类型' // 列定义，定义该属性显示的别名
     },
     qty: {
       alias: '数量'
     }
   });
   chart.interval().position('ProductCategory*qty').color('ProductCategory')
   chart.render();
 }
  componentDidMount() {
    this.context.store.dispatch(readMessage());
    this.showChartAsync();


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

export default  Main
