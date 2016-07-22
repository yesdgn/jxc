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
import  {Chart,Stat,Frame} from 'g2';

class Main extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
  //  store: React.PropTypes.object.isRequired
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
     yearmonth: {
       alias: '月份' // 列定义，定义该属性显示的别名
     },
     amt: {
       alias: '金额'
     }
   });
   chart.interval().position('yearmonth*amt').color('yearmonth')
   chart.render();
 }
 showChart1(data) {
   var Stat = Stat;

   var frame = new Frame(data);
   frame = Frame.sort(frame, 'amt'); // 将数据按照population 进行排序，由大到小
   var chart = new Chart({
     id : 'c2',
     width : 500,
     height : 300,
     plotCfg: {
       margin: [0, 0, 0, 0]
     }
   });
   chart.source(frame);
   chart.axis('yearmonth',{
     title: null
   });
   chart.coord('rect').transpose();
   chart.interval().position('yearmonth*amt');
   chart.render();
}
 showChart2(data)
 {
   var chart = new Chart({
     id: 'c2', // 指定图表容器 ID
     width: 500, // 指定图表宽度
     height: 300 // 指定图表高度
   });
   chart.source(data?data:[], {
     yearmonth: {
       alias: '月份' // 列定义，定义该属性显示的别名
     },
     amt: {
       alias: '金额'
     }
   });
   chart.interval().position('yearmonth*amt').color('yearmonth')
   chart.render();

 }
  componentDidMount() {
  //  this.context.store.dispatch(readMessage());
  //  this.context.store.dispatch(readChartData());
  this.props.onLoad();
  }
 componentWillReceiveProps(nextProps) {
  if ( nextProps.dataSource.item0 && nextProps.dataSource.item0!==this.props.dataSource.item0)
    {this.showChart(nextProps.dataSource.item0);}
  if ( nextProps.dataSource.item1 && nextProps.dataSource.item1!==this.props.dataSource.item1)
      {this.showChart2(nextProps.dataSource.item1);}
 }
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span="12">
            <h3 className="textmiddle">月采购金额</h3>
            <div id="c1"></div>
          </Col>

          <Col span="12">
            <h3 className="textmiddle">月销售金额</h3>
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
