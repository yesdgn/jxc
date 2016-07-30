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
import {storeS} from '../../common/dgn';
import {
  readDict,readGoodses
} from '../../redux/actions';
import { READ_DICT_CUSTTYPE  } from '../../redux/actionsType';

const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
   {
    title: '商品名称',
    dataIndex: 'GoodsName',
    key: 'GoodsName',
    render(text,record,index) {
      return <Link to={`/goods/`+record.GoodsID}>{text}</Link>;
    }
  },{
    title: '商品代码',
    dataIndex: 'GoodsCode',
    key: 'GoodsCode'
  }, {
    title: '商品默认价格',
    dataIndex: 'DefaultPrice',
    key: 'DefaultPrice'
  }, {
    title: '商品分类',
    dataIndex: 'GoodsCategoryName',
    key: 'GoodsCategoryName'
  }, {
    title: '规格',
    dataIndex: 'Specifications',
    key: 'Specifications'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/goods/` + record.GoodsID}>编辑</Link>
        </span>
      );
    }
  }
]

class Goodses extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  };
  componentWillMount() {
    this.props.dispatch(readDict(READ_DICT_CUSTTYPE, '146864635828377773'));
    let paginationPage = storeS.getItem("pagination");
    if (paginationPage && this.props.route.path == JSON.parse(paginationPage).path) {
      this.setState({currentPage: JSON.parse(paginationPage).currentPage})
      this.props.dispatch(readGoodses(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readGoodses(pageSize, this.state.currentPage ));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readGoodses(pageSize, current));
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

            <Link to="/goods/0">
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
  const {goods} = state;
  let totalCount0=goods.goodses?goods.goodses.item0[0].TotalCount:0;
  let dataSource0=goods.goodses?goods.goodses.item1:[];
  return {totalCount0,dataSource0}
}
export default   connect(mapStateToProps)(Goodses)
