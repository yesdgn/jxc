
'use strict';
import  React  from 'react';
import {Row,Col,Form,Input, Button, Checkbox,message  } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {userReg,clearUser} from '../redux/actions';
import  {startsWith,trim}   from 'lodash';


const FormItem = Form.Item;

var hide;
class RegUser extends React.Component {
    static defaultProps = {
    };
    static propTypes = {

    };
    static contextTypes = {
      router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
        };
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
        this.props.dispatch(userReg(values, function(data) {
         if (data.returnCode == 0 && data.items[0].result == 'success') {
           message.success(data.items[0].resultDescribe);
           this.context.router.push('/login');
         } else {
           message.error(data.items[0].resultDescribe);
         }
       }.bind(this)));
      });
    };
    checkUserName(rule, value, callback) {
      let regex=/^[A-Za-z0-9_@.]{3,30}$/;
      let isOK=regex.test(value);
      let firstStr=startsWith(value,'@') || startsWith(value,'.') || startsWith(value,'_') ;
      if (trim(value) === '') {
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
        <Row type="flex" justify="center" align="middle" className="loginRow"  >
          <Col span="12" >
            <Form horizontal form={this.props.form}   onSubmit={this.handleSubmit}  >
                <FormItem {...formItemLayout} label="用户"  hasFeedback required>
                  <Input placeholder="请输入用户名"
                      {...nameProps} />
                </FormItem>
                <FormItem {...formItemLayout} label="密码"  hasFeedback required>
                  <Input type="password" placeholder="请输入密码" autoComplete="off"
            onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                    {...passwdProps} />
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码"  hasFeedback required>
                  <Input type="password" placeholder="请再次输入密码" autoComplete="off"
            onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                    {...rePasswdProps} />
                </FormItem>
                <FormItem  wrapperCol={{ span: 16, offset: 6 }}    >
                  <Button type="primary" htmlType="submit">注册</Button>
                  <Button type="ghost" onClick={this.handleReset} className="marLeft50"  >重置</Button>
                </FormItem>
                <FormItem  wrapperCol={{ span: 16, offset: 6 }}    >
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


function mapStateToProps(state) {
  const { user } = state
  return {
    user:user
  }
}
RegUser = Form.create()(RegUser);
export default  connect(mapStateToProps)(RegUser)
