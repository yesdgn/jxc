'use strict';
import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox
} from 'antd';
import {Link} from 'react-router';
const FormItem = Form.Item;

class NewPass extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  };
  componentWillMount() {};
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  };
  render() {
    const {getFieldProps} = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 12
      }
    };
    return (
      <Row type="flex" justify="center" align="middle" className="loginRow"  >
        <Col span="12" >
              <Form horizontal onSubmit={this.handleSubmit} style={{
                paddingTop: "25px"
              }}>
                <FormItem {...formItemLayout} label="用户：">
                  <Input placeholder="请输入用户名" {...getFieldProps('userName')}/>
                </FormItem>
                <FormItem  wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }} >
                  <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
                <FormItem  wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }} >
                  <label className="ant-checkbox-inline">
                    <Link to={`/login`}>返回登录页</Link>
                  </label>
                </FormItem>
              </Form>

        </Col>
      </Row>
    );
  }
};


NewPass = Form.create()(NewPass);
export default NewPass
