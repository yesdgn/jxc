'use strict';
import React from 'react';
import {Input, Select, Button, Icon,Table,Popover } from 'antd';
import {APP_CONFIG} from '../entry/config';
import {indexOf}  from 'lodash';

class SearchInput extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: '',
      hasChange: true,
      selectedRowKeys:[],
      curPage:1
    }
  };
componentWillReceiveProps(nextProps) {
  if (nextProps.dataSource!==this.props.dataSource)
  {
    this.setState({
      hasChange:false
    });
  }

}
  handleInputChange=(e)=> {
      this.setState({
        value: e.target.value,
        visible:false,
        hasChange:true
      });
    }

  handleSearch = () => {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }
  handleSelect = (searchStr,e ) => {
    let rowKeys=this.state.selectedRowKeys
    let rowsData=this.props.dataSource.filter(function (x) {
      if (indexOf(rowKeys,'K'+x.ID)==-1)
      {return false;}
      else {return true;}
    })
   this.props.onSelect(rowsData);
   this.handleClose();
  }
  onSelectChange=(selectedRowKeys)=>{
  this.setState({ selectedRowKeys });
}
  handleClose=()=>{
    this.setState({
      hasChange:true,
      visible:false,
      selectedRowKeys:[],
      value:"",
      curPage:1
    });
  }
  handlePageChange=(current)=>{
    this.setState({
      curPage:current
    })
  }
 tableData=()=> {
   const {selectedRowKeys} = this.state;
   const rowSelection = {
     selectedRowKeys,
     onChange: this.onSelectChange,
   };
   const pagination = {
     current: this.state.curPage,
    onChange: this.handlePageChange
   };
     const hasSelected = selectedRowKeys.length > 0;
     return (
       <div><Table  size="small" rowSelection={rowSelection}   columns={this.props.columns} rowKey={record => 'K' + record.ID}
      dataSource={this.getSearchResult()} pagination={pagination} />
    <Button type="primary"  disabled={!hasSelected} onClick={this.handleSelect} >确认选择</Button> <Button  onClick={this.handleClose} >关闭</Button>
</div>
)
  }
  getSearchResult=()=>{
    if (this.props.dataSource && this.props.dataSource.length>1 && !this.state.visible  && !this.state.hasChange )
    {this.setState({visible:true})
    return this.props.dataSource
  }
    else if (this.props.dataSource && this.props.dataSource.length<=1  && !this.state.hasChange ) {
      if (this.state.visible)
      {this.setState({visible:false})}
      if (this.props.dataSource.length==1 )
      {
          this.props.onSelect(this.props.dataSource);
          this.handleClose();
          return null;
      }
    }
  else {
    return this.props.dataSource
  }
  }
  render() {
    return (
      <div className="ant-search-input-wrapper" style={this.props.style}>
        <Input.Group className="ant-search-input">
        {/*  <Select combobox value={this.state.value} placeholder={this.props.placeholder}
            notFoundContent="" defaultActiveFirstOption={false}
            showArrow={false} filterOption={false} onChange={this.handleChange} onSearch={this.onSearch}
            onSelect={this.handleSelect}  onPressEnter={this.handlePressEnter}>
            {getSelectOption(this.props.searchResult, 'GoodsID', 'GoodsName')}
          </Select>
          */}
          <Input placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleInputChange}
            onPressEnter={this.handleSearch}
         />
          <Popover placement="bottomLeft" content={this.tableData()} title="请选择" trigger="click"  visible={this.state.visible} >
              <span></span>
          </Popover>
          <div className="ant-input-group-wrap">
            <Button onClick={this.handleSearch} className="ant-search-btn">
              <Icon type="search"/>
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  }
};

export default SearchInput
