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
import {connect} from 'react-redux'
import {readInStorageList} from '../../redux/actions';
import {storeS} from '../../common/dgn';

const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
  {
    title: '单据编号',
    dataIndex: 'FormID',
    key: 'FormID'
  }, {
    title: '仓库',
    dataIndex: 'WarehouseName',
    key: 'WarehouseName'
  }, {
    title: '入库日期',
    dataIndex: 'InDate',
    key: 'InDate'
  }, {
    title: '单据状态',
    dataIndex: 'FormStateName',
    key: 'FormStateName'
  }, {
    title: '操作人',
    dataIndex: 'OperatorName',
    key: 'OperatorName'
  }, {
    title: '操作时间',
    dataIndex: 'OperationTime',
    key: 'OperationTime'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/inStorage/` + record.FormID}>编辑</Link>
        </span>
      );
    }
  }
]

class InStorageList extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  };
  componentWillMount() {
    let paginationPage = storeS.getItem("pagination");
    if (paginationPage && this.props.route.path == JSON.parse(paginationPage).path) {
      this.setState({currentPage: JSON.parse(paginationPage).currentPage})
      this.props.dispatch(readInStorageList(pageSize, JSON.parse(paginationPage).currentPage));
    } else {
      this.props.dispatch(readInStorageList(pageSize, this.state.currentPage));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readInStorageList(pageSize, current));
  }
  render() {
    const pagination = {
      total: this.props.dataSource0?  this.props.dataSource0.length:0,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/inStorage/0">
              <Button type="primary">新增</Button>
            </Link>
          </Col>
          <Col span="2">
            <Button type="primary">导出</Button>
          </Col>
        </Row>
        <Table columns={columns} rowKey={record => 'K' + record.ID} dataSource={this.props.dataSource0} pagination={pagination}/>
      </div>
    );
  }
};
function mapStateToProps(state) {
  const {inStorage} = state;
  let dataSource0=inStorage.inStorageList;
  return {dataSource0}
}
export default  connect(mapStateToProps)(InStorageList)
