
'use strict';
import  React  from 'react';
import { Menu  } from 'antd';


class Content extends React.Component {
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
        <div style={styles.contentDiv}>
          abcdefg
        </div>
        );
    }
};

const styles={
  contentDiv:{
    width:"240",
    paddingLeft:"240",
    minHeight:"500px"
  }
}

export default Content
