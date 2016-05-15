
'use strict';
import  React  from 'react';
import {Row,Col,Form,Input, Button, Checkbox  } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;

class NewPass extends React.Component {
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
            wrapperCol: { span: 12 }
          };
      return(
        <Row type="flex" justify="center" align="middle"  style={styles.Div}>
          <Col span="18" >
          <Row type="flex" justify="space-between" align="middle"  style={styles.middleDiv}>
            <Col span="14" style={styles.col1} >
              <Form horizontal  onSubmit={this.handleSubmit} style={{paddingTop:"25px"}}>
                <FormItem {...formItemLayout} label="用户："   >
                  <Input placeholder="请输入用户名"
                    {...getFieldProps('userName')} />
                </FormItem>
                <FormItem {...formItemLayout} label=" "  >
                  <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
                <FormItem {...formItemLayout} label=" "  >
                  <label className="ant-checkbox-inline">
                     <Link to={`/login`}>返回登录页</Link>
                  </label>
                </FormItem>
              </Form>
            </Col>
            <Col span="10" style={styles.col2} >
                  <p style={styles.p}>
                     您可以通过以下途径,获得帮助 <br/>
                     邮　　件: yesdgn@qq.com <br/>
                     手　　机: 15618551880 <br/>
                     在线QQ: 71989555 <br/>
                     本网站支持现代浏览器浏览
                    </p>
            </Col>
          </Row>
        </Col>
        </Row>
        );
    }
};

const styles={
  Div:{
    backgroundColor:"white",
    minHeight:"100%",
    minWidth:"100%",
    position:"absolute"
  },
  middleDiv:{
    height:"300px",
    boxShadow:"0 0 16px #888"
  },
  col1:{
    minHeight:"100%",
  },
  col2:{
    minHeight:"100%",
    backgroundColor:"#2f7dcd",
    fontSize:"14",
    color:"white"
  },
  p:{
    minWidth:"200px",
    lineHeight:"2.2",
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",

  }

}
NewPass = Form.create()(NewPass);
export default NewPass
