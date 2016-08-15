'use strict';
import React from 'react';
import {connect} from 'react-redux'
import {
  Table,
  Icon,
  Row,
  Col,
  Modal,
  Button
} from 'antd';
import {readImportExcelConfList} from '../../redux/actions';
import {Link} from 'react-router';
import {storeS} from '../../common/dgn';
const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
 {
    title: '导入编号',
    dataIndex: 'FormID',
    key: 'FormID',
    render(text,record,index) {
      return <Link to={`/importconf/`+record.FormID}>{text}</Link>;
    }
  },  {
      title: 'Sheet名称',
      dataIndex: 'ExcelSheetName',
      key: 'ExcelSheetName'
    },  {
        title: '表名',
        dataIndex: 'TableName',
        key: 'TableName'
      },  {
          title: '主键',
          dataIndex: 'DataPrimaryKey',
          key: 'DataPrimaryKey'
        },  {
            title: '启用',
            dataIndex: 'IsValid',
            key: 'IsValid'
          }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/importconf/` + record.FormID}>编辑</Link>
        </span>
      );
    }
  }
]

class  ImportExcelConfList extends React.Component {
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
      this.props.dispatch(readImportExcelConfList(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readImportExcelConfList(pageSize, this.state.currentPage));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readImportExcelConfList(pageSize, current));
  }
  render() {
    const pagination = {
      total:  this.props.totalCount0,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/importconf/0">
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
  const {importConf} = state;
  let totalCount0=importConf.importConfList?importConf.importConfList.item0[0].TotalCount:0;
  let dataSource0=importConf.importConfList?importConf.importConfList.item1:[];
  return {totalCount0,dataSource0}
}
export default  connect(mapStateToProps)(ImportExcelConfList)
