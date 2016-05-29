'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col } from 'antd';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {messageFinished,readMessage} from '../redux/actions';


class Messages extends React.Component {
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
            return <Link to={`/messages/`+record.ID}>{text}</Link>;
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
          title: '模块',
          dataIndex: 'MsgModule',
          key: 'MsgModule'
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
        <Col span="24" >
          <Table columns={columns} onRowClick={onMsgDone }
             dataSource={this.props.user.userMessage?this.props.user.userMessage.items:[]}
             />
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
export default connect(mapStateToProps)(Messages)
