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
import {messageFinished, readMessage,readChartData} from '../redux/actions';
import  {Chart,Stat,Frame} from 'g2';

class Main extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  };

  showChart(data) {
   var chart = new Chart({
     id: 'c1', // 指定图表容器 ID
     width: 500, // 指定图表宽度
     height: 300 // 指定图表高度
   });
   chart.source(data?data:[], {
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
 showChart1(data) {
   var Stat = Stat;

   var frame = new Frame(data);
   frame = Frame.sort(frame, 'qty'); // 将数据按照population 进行排序，由大到小
   var chart = new Chart({
     id : 'c2',
     width : 500,
     height : 300,
     plotCfg: {
       margin: [0, 0, 0, 0]
     }
   });
   chart.source(frame);
   chart.axis('District',{
     title: null
   });
   chart.coord('rect').transpose();
   chart.interval().position('District*qty');
   chart.render();
}
 showChart2(data)
 {

  var chart = new Chart({
    id: 'c2',
    width: 500,
    height: 300
  });
  chart.source(data?data:[]);
  // 重要：绘制饼图时，必须声明 theta 坐标系
  chart.coord('theta', {
    radius: 0.8 // 设置饼图的大小
  });
  chart.legend('bottom');
  chart.intervalStack()
    .position(Stat.summary.percent('qty'))
    .color('District')
    .label('District*..percent',function(name, percent){
    percent = (percent * 100).toFixed(2) + '%';
    return name + ' ' + percent;
  });
  chart.render();
  // 设置默认选中
  var geom = chart.getGeoms()[0]; // 获取所有的图形
  var items = geom.getData(); // 获取图形对应的数据
  geom.setSelected(items[1]); // 设置选中
 }
  componentWillMount() {
    this.context.store.dispatch(readMessage());
    this.context.store.dispatch(readChartData());
  }

 componentWillReceiveProps(nextProps) {
  if ( nextProps.chartDataSource.item0 && nextProps.chartDataSource.item0!==this.props.chartDataSource.item0)
    {this.showChart(nextProps.chartDataSource.item0);}
  if ( nextProps.chartDataSource.item1 && nextProps.chartDataSource.item1!==this.props.chartDataSource.item1)
      {this.showChart1(nextProps.chartDataSource.item1);}
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
