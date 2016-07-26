'use strict';
import React from 'react';
import {Table, Icon} from 'antd';
class NoMatch extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="contentDiv">
          <h3>目前还不支持该功能，请耐心等待，敬请谅解。</h3>
      </div>
    );
  }
};

export default NoMatch
