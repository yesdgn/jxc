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
import {readRoutes} from '../../redux/actions';
import {storeS} from '../../common/dgn';
const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
  {
    title: 'ApiID',
    dataIndex: 'ApiID',
    key: 'ApiID'
  },{
    title: 'RouteName',
    dataIndex: 'RouteName',
    key: 'RouteName'
  }, {
    title: '执行SQL',
    dataIndex: 'ApiExecSql',
    key: 'ApiExecSql',
    width:500
  }, {
    title: '是否开放API',
    dataIndex: 'IsOpen',
    key: 'IsOpen'
  }
  , {
    title: '返回类型',
    dataIndex: 'TransformJsonType',
    key: 'RouterStr'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/routeapi/` + record.RouteID}>编辑</Link>
        </span>
      );
    }
  }
]

class RouteApis extends React.Component {
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
      this.props.dispatch(readRoutes(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readRoutes(pageSize, this.state.currentPage ));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readRoutes(pageSize, current));
  }
  render() {
    const pagination = {
      total: this.props.totalCount0 ,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/routeApi/0">
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
  const {routeApi} = state;
  let totalCount0=routeApi.routes?routeApi.routes.item0[0].TotalCount:0;
  let dataSource0=routeApi.routes?routeApi.routes.item1:[];
  return {totalCount0,dataSource0}
}
export default  connect(mapStateToProps)(RouteApis)
