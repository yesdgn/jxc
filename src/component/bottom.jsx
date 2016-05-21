'use strict';
import React from 'react';
import {Icon} from 'antd';

class Bottom extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  };
  componentWillMount() {};

  render() {
    return (
      <div style={styles.parentdiv}>
        <div style={styles.childdiv}>
          <span>上海</span>
        </div>
      </div>
    );
  }
};

const styles = {
  parentdiv: {
    clear: "both",
    height: "60px",
    position: "relative"
  },
  childdiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  }
}

export default Bottom
