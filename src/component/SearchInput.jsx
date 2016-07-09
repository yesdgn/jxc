'use strict';
import React from 'react';
import {Input, Select, Button, Icon} from 'antd';
import {APP_CONFIG} from '../entry/config';
import {getSelectOption} from '../common/dgnControlAssist';

class SearchInput extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: '',
      focus: false
    }
  };
  handleChange = (value) => {
    this.setState({value});
    this.props.onSearch(value);
  }
  handleSelect = (searchStr,e ) => {
  this.props.onSelect(this.props.searchResult[e.props.index]);
  this.setState({value:''});
  }
  render() {

    return (
      <div className="ant-search-input-wrapper" style={this.props.style}>
        <Input.Group >
          <Select combobox value={this.state.value} placeholder={this.props.placeholder}
            notFoundContent="" defaultActiveFirstOption={false}
            showArrow={false} filterOption={false} onChange={this.handleChange}
            onSelect={this.handleSelect}  >
            {getSelectOption(this.props.searchResult, 'GoodsID', 'GoodsName')}
          </Select>
          <div className="ant-input-group-wrap">
            <Button onClick={this.handleSubmit}>
              <Icon type="search"/>
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  }
};

export default SearchInput
