'use strict';
import React from 'react';
// import addonsupdate from 'react-addons-update';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import * as ReactDataGridPlugins from 'react-data-grid/addons';
import SearchInput from '../../common/SearchInput';
const moment = require('moment');
import {forEach} from 'lodash';
import {storeS, getRand, ifNull} from '../../common/dgn';
import {APP_CONFIG} from '../../entry/config';
import {
  readFavoritesList,saveFavoritesList,readMenuSelect
} from '../../redux/actions';
import { READ_FAVORITESLIST } from '../../redux/actionsType';
import {
  Button,
  Row,
  Col,
  message,
  Modal,
} from 'antd';


var userInfo;
var deleteID=[];

var AutoCompleteEditor = ReactDataGridPlugins.Editors.AutoComplete;
var ContextMenu = ReactDataGridPlugins.Menu.ContextMenu;
var MenuItem = ReactDataGridPlugins.Menu.MenuItem;

const searchPageColumns = [
  {
    title: '功能编号',
    dataIndex: 'MenuID',
    key: 'MenuID'
  }, {
    title: '功能名称',
    dataIndex: 'MenuName',
    key: 'MenuName'
  }, {
    title: '链接',
    dataIndex: 'Url',
    key: 'Url'
  }
];

class Favorites extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      saveLoading:false
    }
  };

  componentWillMount() {
    deleteID=[];
    this.props.dispatch(readFavoritesList());
   }
  componentWillUnmount() {
    deleteID=[];
  }
  componentWillReceiveProps(nextProps) {
    //下面为表体数据
    if (nextProps.dataSource1 && nextProps.dataSource1!==this.props.dataSource1)  {
      this.setState({rows: nextProps.dataSource1});
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
      this.setState({saveLoading:true});
      let formArr = [];
      let form1Arr = this.state.rows;
      deleteID.map(function(x) {
        form1Arr.push({ID:x,DgnOperatorType:'DELETE'})
      })
      formArr.push(form1Arr);
      this.props.dispatch(saveFavoritesList(formArr, function(data) {
        this.setState({saveLoading:false});
        if (data.returnCode == 0 && data.items[0].result == 'success') {
          this.props.dispatch(readFavoritesList());
          message.success(data.items[0].resultDescribe);
          deleteID=[];
        } else {
          message.error(data.items[0].resultDescribe);
        }
      }.bind(this)));
    } ;
  rowGetter = (rowIdx) => {
    return this.state.rows[rowIdx];
  }
  handleRowUpdated = (e) => {
    let rows = this.state.rows;
    if (!rows[e.rowIdx].DgnOperatorType)
    {rows[e.rowIdx].DgnOperatorType='UPDATE';}
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows: rows});
  }
  handleAddRow = (e, rowObj) => {
    let newRow;
    userInfo = storeS.getJson('userInfo');
    if (rowObj === undefined) {
      newRow = {
        DgnOperatorType:'ADD',
        ID: undefined,
        Title: '未设置',
        Path: '/',
        Describe: '',
        AppID: APP_CONFIG.APPID,
        UserID: userInfo.UserID,
        IsShare: 0
      };
    } else {
      newRow = rowObj;
    }
    //let rows = addonsupdate(this.state.rows, {$push : [newRow]});
    let rows = this.state.rows;
    rows.push(newRow);
    this.setState({rows: rows});
  }
  deleteRow=(e, data)=> {
    if (this.state.rows[data.rowIdx].ID)
    {deleteID.push(this.state.rows[data.rowIdx].ID);}
    this.state.rows.splice(data.rowIdx, 1);
    this.setState({rows: this.state.rows});
  }
  onSearch = (searchStr,pageSize,curPage) => {
    this.props.dispatch(readMenuSelect(searchStr,pageSize,curPage));
  }
  onSelect = (data) => {
    userInfo = storeS.getJson('userInfo');
    data.map(function(x) {
      let newRow = {
        DgnOperatorType:'ADD',
        ID: undefined,
        Title: x.MenuName,
        Path: x.Url,
        Describe: '',
        AppID: APP_CONFIG.APPID,
        UserID: userInfo.UserID,
        IsShare: 0
      };
      this.handleAddRow(null, newRow);
    }.bind(this));
  }

  render() {
    var columns = [
      {
        key: 'ID',
        name: 'ID'
      }, {
        key: 'Title',
        name: '标题',
        editable: true
      }, {
        key: 'Path',
        name: '链接路径',
        editable: true
      }, {
        key: 'Describe',
        name: '描述',
        editable: true
      }, {
        key: 'IsShare',
        name: '是否共享',
        editable: true
      }
    ];

    return (
      <div>
        <Row type="flex" justify="end">
          <Col >
              <Button type="primary" loading={this.state.saveLoading} onClick={this.handleSubmit}>保存</Button>
          </Col>
          <Col span="1" >
          </Col>
         </Row>
         <Row>
          <Col span="1"></Col>
          <Col span="4">
            <SearchInput placeholder="输入功能名称搜索" style={{
              width: 250,
              marginBottom: 5
            }} onSearch={this.onSearch} dataSource={this.props.searchResult} onSelect={this.onSelect} columns={searchPageColumns}></SearchInput>
          </Col>
        </Row>
        <Row>
          <Col span="1"></Col>
          <Col span="22">
            <ReactDataGrid enableCellSelect={true} rowGetter={this.rowGetter}
               columns={columns} rowsCount={this.state.rows.length} minHeight={500}
               onRowUpdated={this.handleRowUpdated} cellNavigationMode="changeRow"
               contextMenu={<MyContextMenu onRowDelete={this.deleteRow}  />}
               />

          </Col>
          <Col span="1"></Col>
        </Row>
      </div>
    );
  }
};

// Create the context menu.
// Use this.props.rowIdx and this.props.idx to get the row/column where the menu is shown.
var MyContextMenu = React.createClass({
  onRowDelete: function(e, data) {
    if (typeof(this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  },
  render: function() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}}
          onClick={this.onRowDelete}>删除</MenuItem>
      </ContextMenu>
    );
  }
});


function mapStateToProps(state) {
  const {favorites} = state;
  let dataSource1=favorites.favoritesList?favorites.favoritesList.item0:[];
  let searchResult=favorites.searchResult;
  return {dataSource1,searchResult}
}
 export default connect(mapStateToProps)(Favorites)
