'use strict';
import React from 'react';
import {
  Table,
  Icon,
  Steps,
  Row,
  Col,
  Modal,
  Button,Form,Input,DatePicker,Select
} from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {storeS} from '../../common/dgn';
import ImportExcel from '../../common/ImportExcel';
import {
  readDict,readGoodses,exportExcel
} from '../../redux/actions';
import {APP_CONFIG} from '../../entry/config';
import {getSelectOption} from '../../common/dgnControlAssist';
import {READ_DICT_GOODSCATEGORY } from '../../redux/actionsType';
const confirm = Modal.confirm;
const FormItem = Form.Item;
const pageSize = 10;
const createForm = Form.create;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};

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
      currentPage: 1,
      importExcelVisible:false,
      exportLoading:false
    }
  };
  componentWillMount() {
    this.props.dispatch(readDict(READ_DICT_GOODSCATEGORY, '6365673372633792522'));
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

  btnImportExcel=()=>{
    this.setState({importExcelVisible:true});
  }
  btnExportExcel=()=>{
     this.setState({exportLoading:true});
     this.props.dispatch(exportExcel(33,"商品资料,第二个sheet名称",function (data){
       if (data.returnCode==0)
       {window.location = APP_CONFIG.WEBSERVERURL+data.url;}
       this.setState({exportLoading:false});
     }.bind(this)));
  }
  handleSearch=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      let searchCondition = {
        ...values
      };
      console.log(searchCondition);
  })
}
  render() {
    const {getFieldProps} = this.props.form;
    const pagination = {
      total: this.props.totalCount0,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSearch} >
          <Row type="flex"  >
            <Col  span="7">
              <FormItem
                label="商品名称"
                 {...formItemLayout}
              >
                <Input {...getFieldProps('GoodsName')} size="default" />
              </FormItem>
            </Col>
            <Col   span="7" >
              <FormItem
                label="商品分类"
                 {...formItemLayout}
              >
              <Select id="select" size="default"   {...getFieldProps('GoodsCategory')}>
                 {getSelectOption(this.props.common.GoodsCategory, 'DictID', 'DictName')}
              </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="1"></Col>
            <Col   span="7" >
              <Button type="primary" htmlType="submit">搜索</Button>
            </Col>
          </Row>
        </Form>
        <ImportExcel visible={this.state.importExcelVisible}
          hide={()=>this.setState({importExcelVisible:false})} >
        </ImportExcel>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/goods/0">
              <Button type="primary">新增</Button>
            </Link>

          </Col>
          <Col span="2">
            <Button type="default" onClick={this.btnImportExcel}>导入</Button>
          </Col>
          <Col span="2">
            <Button type="default" onClick={this.btnExportExcel} loading={this.state.exportLoading} >导出</Button>
          </Col>
        </Row>
        <Table columns={columns} rowKey={record => 'K' + record.ID} dataSource={this.props.dataSource0} pagination={pagination}/>
      </div>
    );
  }
};
function mapStateToProps(state) {
  const {goods,common} = state;
  let totalCount0=goods.goodses?goods.goodses.item0[0].TotalCount:0;
  let dataSource0=goods.goodses?goods.goodses.item1:[];
  return {totalCount0,dataSource0,common}
}

Goodses = Form.create({})(Goodses);
export default   connect(mapStateToProps)(Goodses)
