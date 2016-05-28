'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col } from 'antd';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {messageFinished,readMessage} from '../redux/actions';
const Step = Steps.Step;



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
  static defaultProps = {
   };
  static propTypes = {};

  constructor(props) {
    super(props);
  };
  componentDidMount() {
    this.props.dispatch(readMessage());
  }
  MsgDone=(msg,index,mouseEvent)=>{
    if (mouseEvent.target.innerText=='完成')
    {this.props.dispatch(messageFinished(msg.ID));}
  };

  render() {
    const onMsgDone=this.MsgDone;
    const  columns= [
        {
          title: '标题',
          dataIndex: 'Title',
          key: 'Title',
          render(text,record,index) {
            return <Link to={`/message/`+record.ID}>{text}</Link>;
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
          render(text, record) {
            return (<span>
                <a  >完成</a>
              </span>
            );
          }
        }
      ]
    return (
      <Row type="flex" justify="center" align="middle"  >
        <Col span="12" >
          <Table columns={columns} pagination="false" onRowClick={onMsgDone }
             dataSource={this.props.user.userMessage?this.props.user.userMessage.items:[]}
             size="small"/>
        </Col>
        <Col span="1" >
        </Col>
        <Col span="11" >
          订单编号：D201605261301000001
          <Steps size="small" current={1}>{steps}</Steps>
          <br/>
          订单编号：D201605261301000002
          <Steps size="small" current={2}>{steps}</Steps>
        </Col>
      </Row>


  );
  }
};
function mapStateToProps(state) {
  const { user } = state
  return {
    user:user
  }
}
export default connect(mapStateToProps)(Main)
