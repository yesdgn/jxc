'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col,Modal,Button } from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {readPersons} from '../../redux/actions';
import {storeS } from '../../common/dgn';
const confirm = Modal.confirm;

const pageSize=10;
const  columns= [
     {
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name',
      render(text,record,index) {
        return <Link to={`/person/`+record.UserID}>{text}</Link>;
      }
    },{
      title: '人员代码',
      dataIndex: 'Code',
      key: 'Code'
    }, {
      title: '电子邮箱',
      dataIndex: 'Email',
      key: 'Email'
    }, {
      title: '手机',
      dataIndex: 'Mobile',
      key: 'Mobile'
    } , {
      title: '操作',
      key: 'operation',
      render(text, record) {
        return (<span>
          <Link to={`/person/`+record.UserID}>编辑</Link>
          </span>
        );
      }
    }
  ]



class Persons extends React.Component {
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
      this.props.dispatch(readPersons(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readPersons(pageSize, this.state.currentPage ));
    }
  }
componentWillUnmount() {
  storeS.setItem("pagination",JSON.stringify({currentPage:this.state.currentPage,path:this.props.route.path}));
}
 handlePageChange=(current)=>{
     this.setState({
       currentPage:current
     })
     this.props.dispatch(readPersons(pageSize,current));
  }
  render() {
    const pagination = {
    total: this.props.totalCount0,
    defaultCurrent:this.state.currentPage,
    onChange:this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/person/0">
              <Button type="primary">新增</Button>
            </Link>

          </Col>
          <Col span="2">
            <Button type="primary">导出</Button>
          </Col>
        </Row>
        <Table columns={columns} rowKey={record => 'K' + record.ID}
          dataSource={this.props.dataSource0} pagination={pagination} />
      </div>
   );
  }
};
function mapStateToProps(state) {
  const {person} = state;
  let totalCount0=person.personList?person.personList.item0[0].TotalCount:0;
  let dataSource0=person.personList?person.personList.item1:[];
  return {totalCount0,dataSource0}
}
export default   connect(mapStateToProps)(Persons)
