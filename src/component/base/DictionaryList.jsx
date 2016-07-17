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
import {readDictionaryList} from '../../redux/actions';
import {Link} from 'react-router';
import {storeS} from '../../common/dgn';
const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
  {
    title: '数据字典编号',
    dataIndex: 'DictTypeID',
    key: 'DictTypeID'
  }, {
    title: '数据字典名称',
    dataIndex: 'DictTypeName',
    key: 'DictTypeName'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/dictionary/` + record.DictTypeID}>编辑</Link>
        </span>
      );
    }
  }
]

class DictionaryList extends React.Component {
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
      this.props.dispatch(readDictionaryList(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readDictionaryList(pageSize, this.state.currentPage));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readDictionaryList(pageSize, current));
  }
  render() {
    const pagination = {
      total:  this.props.dataSource0?this.props.dataSource0.length:0,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/dictionary/0">
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
  const {dictionary} = state;
  let dataSource0=dictionary.dictionaryList;
  return {dataSource0}
}
export default  connect(mapStateToProps)(DictionaryList)
