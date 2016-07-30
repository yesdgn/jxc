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
import {readWarehouses} from '../../redux/actions';
import {storeS} from '../../common/dgn';
const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
 {
    title: '仓库名称',
    dataIndex: 'WarehouseName',
    key: 'WarehouseName',
    render(text,record,index) {
      return <Link to={`/warehouse/`+record.WarehouseID}>{text}</Link>;
    }
  },  {
      title: '仓库代码',
      dataIndex: 'WarehouseCode',
      key: 'WarehouseCode'
    }, {
    title: '仓库地址',
    dataIndex: 'WarehouseAddr',
    key: 'WarehouseAddr'
  }, {
    title: '仓库电话',
    dataIndex: 'WarehouseTel',
    key: 'WarehouseTel'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/warehouse/` + record.WarehouseID}>编辑</Link>
        </span>
      );
    }
  }
]

class Warehouses extends React.Component {
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
      this.props.dispatch(readWarehouses(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readWarehouses(pageSize, this.state.currentPage ));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readWarehouses(pageSize, current));
  }
  render() {
    const pagination = {
      total: this.props.totalCount0,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/warehouse/0">
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
  const {warehouse} = state;
  let totalCount0=warehouse.warehouses?warehouse.warehouses.item0[0].TotalCount:0;
  let dataSource0=warehouse.warehouses?warehouse.warehouses.item1:[];
  return {totalCount0,dataSource0}
}
export default  connect(mapStateToProps)(Warehouses)
