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
  componentWillMount() {};

  render() {
    return (
      <div>
        <div >
          错误，无法使用此功能。
        </div>
      </div>
    );
  }
};

const styles = {
  parentdiv: {
    position: "relative"
  },
  childdiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
}

export default NoMatch
