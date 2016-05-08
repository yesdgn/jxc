
'use strict';
import  React  from 'react';
import {Row,Col,Form,Input, Button, Checkbox  } from 'antd';
const FormItem = Form.Item;

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
    handleSubmit(e) {
      e.preventDefault();
      console.log('收到表单值：', this.props.form.getFieldsValue());
    };
    render() {
      const { getFieldProps } = this.props.form;
      const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };
      return(
        <div>
        <div style={styles.headrow} >
        </div>
        <div>
          <Row type="flex" justify="center" align="middle">
            <Col span="14" style={styles.img} >
              <img src="loginR.jpg"   />
            </Col>
            <Col span="10">
              <Form horizontal  onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="用户：">
                  <Input placeholder="请输入用户名"
                    {...getFieldProps('userName')} />
                </FormItem>
                <FormItem {...formItemLayout} label="密码：">
                  <Input type="password" placeholder="请输入密码"
                    {...getFieldProps('password')} />
                </FormItem>
                <FormItem {...formItemLayout} label=" " >
                  <label className="ant-checkbox-inline">
                    <Checkbox
                      {...getFieldProps('agreement')} />记住我
                  </label>
                </FormItem>
                <FormItem {...formItemLayout} label=" " >
                  <Button type="primary" htmlType="submit">登录</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
        );
    }
};

const styles={
  headrow:{
    height:"80px",
    backgroundColor:"white"
  },
  img:{
    textAlign:"center"
  }
}
Login = Form.create()(Login);
export default Login
