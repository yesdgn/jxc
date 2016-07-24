'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col,Modal } from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {storeS } from '../../common/dgn';
import {readMessages,messageFinished} from '../../redux/actions';
const confirm = Modal.confirm;
const pageSize=10;
const  columns= [
    {
      title: '标题',
      dataIndex: 'Title',
      key: 'Title',
      render(text,record,index) {
        return <Link to={`/message/`+record.MsgID}>{text}</Link>;
      }
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
              <a>完成</a>
          </span>
        );
      }
    }
  ]

class Messages extends React.Component {
  static defaultProps = {
   };
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state={
      currentPage:1
    }
  };
  componentWillMount() {
    let paginationPage= storeS.getItem("pagination");
    if (paginationPage && this.props.route.path == JSON.parse(paginationPage).path) {
      this.setState({currentPage: JSON.parse(paginationPage).currentPage})
      this.props.dispatch(readMessages(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readMessages(pageSize, this.state.currentPage ));
    }
  }
componentWillUnmount() {
  storeS.setItem("pagination",JSON.stringify({currentPage:this.state.currentPage,path:this.props.route.path}));
}
handlePageChange=(current)=>{
    this.setState({
      currentPage:current
    })
    this.props.dispatch(readMessages(pageSize,current));
 }
  msgDone=(msg,index,mouseEvent)=>{
    const { props: { dispatch } } = this
    if (mouseEvent.target.innerText == '完成') {
      confirm({
        title: '提示',
        content: '您确认已完成吗?',
        onOk() {
           dispatch(messageFinished(msg.ID));
        },
        onCancel() {}
      } ) ;
    }
  };

  render() {
    const pagination = {
    total: parseInt(this.props.totalCount0),
    defaultCurrent:this.state.currentPage,
    onChange:this.handlePageChange
    };
    return (
      <Row type="flex" justify="center" align="middle"  >
        <Col span="24" >
          <Table columns={columns} onRowClick={this.msgDone}  rowKey={record => 'K'+record.ID}
             dataSource={this.props.dataSource0}  pagination={pagination}
             />
        </Col>

      </Row>


  );
  }
};
function mapStateToProps(state) {
  const {user} = state;
  let totalCount0=user.userMessage?user.userMessage.item0[0].TotalCount:0;
  let dataSource0=user.userMessage?user.userMessage.item1:[];
  return {totalCount0,dataSource0}
}
export default   connect(mapStateToProps)(Messages)
