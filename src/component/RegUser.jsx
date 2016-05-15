
'use strict';
import  React  from 'react';
import {Row,Col,Form,Input, Button, Checkbox  } from 'antd';
import { Link } from 'react-router';
import * as actions from '../redux/actions';
import { connect } from 'react-redux';
var lodash = require('lodash');
const FormItem = Form.Item;

class RegUser extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state={
        };
    };
    componentDidMount() {
    };
    noop() {
      return false;
    }
    handleReset=(e)=> {
       e.preventDefault();
       this.props.form.resetFields();
    }
    handleSubmit=(e)=> {
      e.preventDefault();
      this.props.form.validateFields((errors, values) => {
        //console.log('收到表单值：', values);
        if (!!errors) {
          return;
        }
        this.props.dispatch(actions.userReg(values));
      });
    };
    checkUserName(rule, value, callback) {
      let regex=/^[A-Za-z0-9_@.]{1,30}$/;
      let isOK=regex.test(value);
      let firstStr=lodash.startsWith(value,'@') || lodash.startsWith(value,'.') || lodash.startsWith(value,'_') ;
      if (lodash.trim(value) === '') {
        callback([new Error('请输入用户名。')]);
      }
      else if (firstStr) {
        callback([new Error('首字母只能是字母或数字')]);
      }
      else if (!isOK) {
              callback([new Error('用户名不符合规则。')]);
          }
      else {
            callback();
          }
    };
    checkPass=(rule, value, callback) =>{
      const { validateFields } = this.props.form;
      if (value) {
        validateFields(['rePassword'], { force: true });
      }
      callback();
    };
    checkPass2=(rule, value, callback) =>{
      const { getFieldValue } = this.props.form;
      if (value && value !== getFieldValue('password')) {
        callback('两次输入密码不一致！');
      } else {
        callback();
      }
    };
    render() {
      const {  getFieldProps, getFieldError, isFieldValidating  } = this.props.form;
      const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
          };
      const nameProps = getFieldProps('userName', {
              rules: [
                { validator: this.checkUserName },
              ],
            });
            const passwdProps = getFieldProps('password', {
              rules: [
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass },
              ],
            });
            const rePasswdProps = getFieldProps('rePassword', {
              rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
              }, {
                validator: this.checkPass2,
              }],
            });
      return(
        <Row type="flex" justify="center" align="middle"  style={styles.Div}>
          <Col span="18" >
          <Row type="flex" justify="space-between" align="middle"  style={styles.middleDiv}>
            <Col span="14" style={styles.col1} >
              <Form horizontal form={this.props.form}   onSubmit={this.handleSubmit} style={{paddingTop:"25px"}}>
                <FormItem {...formItemLayout} label="用户："  hasFeedback required
                  help={isFieldValidating('userName') ? '校验中...' : (getFieldError('userName') || []).join(', ')}>
                  <Input placeholder="请输入用户名"
                      {...nameProps} />
                </FormItem>
                <FormItem {...formItemLayout} label="密码："  hasFeedback required>
                  <Input type="password" placeholder="请输入密码" autoComplete="off"
            onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                    {...passwdProps} />
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码："  hasFeedback required>
                  <Input type="password" placeholder="请再次输入密码" autoComplete="off"
            onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                    {...rePasswdProps} />
                </FormItem>
                <FormItem {...formItemLayout} label=" "  >
                  <Button type="primary" htmlType="submit">注册</Button>
                  <Button type="ghost" onClick={this.handleReset} style={styles.button} >重置</Button>
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
  },
  button:{
    marginLeft:"100px"
  }

}
function mapStateToProps(state) {
  const { user } = state
  return {
    user:user
  }
}
RegUser = Form.create()(RegUser);
export default  connect(mapStateToProps)(RegUser)
