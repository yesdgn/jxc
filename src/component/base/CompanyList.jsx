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
import {connect} from 'react-redux'
import {readCompanies} from '../../redux/actions';
import {Link} from 'react-router';
import {storeS} from '../../common/dgn';
const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
 {
    title: '公司名称',
    dataIndex: 'CompName',
    key: 'CompName',
    render(text,record,index) {
      return <Link to={`/company/`+record.CompID}>{text}</Link>;
    }
  }, {
      title: '公司代码',
      dataIndex: 'CompCode',
      key: 'CompCode'
    },  {
    title: '公司地址',
    dataIndex: 'CompAddr',
    key: 'CompAddr'
  }, {
    title: '公司电话',
    dataIndex: 'CompTel',
    key: 'CompTel'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/company/` + record.CompID}>编辑</Link>
        </span>
      );
    }
  }
]

class Companies extends React.Component {
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
      this.props.dispatch(readCompanies(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readCompanies(pageSize, this.state.currentPage ));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readCompanies(pageSize, current));
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

            <Link to="/company/0">
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
  const {company} = state;
  let totalCount0=company.companies?company.companies.item0[0].TotalCount:0;
  let dataSource0=company.companies?company.companies.item1:[];
  return {totalCount0,dataSource0}
}
export default connect(mapStateToProps)(Companies)
