
'use strict';
import  React  from 'react';
import {   Icon } from 'antd';


class Bottom extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state={
        };
    };
    componentWillMount() {
    };

    render() {
      return(
        <ul style={styles.bootomdiv}>
            <li style={styles.bottomli}>
              <h2>GitHub</h2>
              <a target="_blank " href="https://github.com/ant-design/ant-design">仓库</a>
              <a target="_blank" href="https://github.com/ant-design/antd-init">脚手架</a>
              <a target="_blank" href="http://ant-tool.github.io/">开发工具</a>
            </li>
            <li style={styles.bottomli}>
              <h2>关于我们</h2>
              <a target="_blank" href="https://github.com/ant-ued/blog">博客 - Ant UED</a>
            </li>
            <li style={styles.bottomli}>
              <h2>联系我们</h2>
              <a target="_blank" href="https://github.com/ant-design/ant-design/issues">反馈和建议</a>
              <a target="_blank" href="https://gitter.im/ant-design/ant-design">讨论</a>
              <a target="_blank" href="http://dwz.cn/2AF9ao">报告 Bug</a>
            </li>
            <li style={styles.bottomli}>
              <div>©2015 蚂蚁金服体验技术部出品</div>
              <div>文档版本：
              </div>
            </li>
          </ul>
        );
    }
};

const styles={
  bottomli:{
    float: "left",
    width: "25%",
    padding:" 5px 2% 15px"
  },
  bootomdiv:{
    clear:"both"
  }
}

export default Bottom
