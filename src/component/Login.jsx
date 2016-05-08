
'use strict';
import  React  from 'react';
import {  Table, Icon  } from 'antd';
class Login extends React.Component {
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
        <div>
          <div >
            登录
          </div>
        </div>
        );
    }
};

const styles={
  parentdiv:{
    position:"relative"
  },
  childdiv:{
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)"
  },
}

export default Login
