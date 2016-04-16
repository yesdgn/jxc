
'use strict';
import  React  from 'react';
import { Row,Col } from 'antd';
class App extends React.Component {
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
          <Row>
            <Col span="12">.col-8</Col>
            <Col span="12" >.col-8</Col>
          </Row>

        );
    }
};

export default App
