
'use strict';
import  React  from 'react';
import {Row,Col,Form,Input, Button, Checkbox,message  } from 'antd';
import { Link } from 'react-router';
import {userLogin,clearUser,clearResult} from '../redux/actions';
import { connect } from 'react-redux';
import {startsWith,trim}  from 'lodash';
import  {storeL,storeS} from '../common/dgn';

const FormItem = Form.Item;
var hide;
class Login extends React.Component {
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
    componentDidMount() {
      let username=storeL.getItem("user");
      if (username)
      {
        this.props.form.setFieldsValue({userName:username,agreement:true});
      }
    }
    componentWillReceiveProps (nextProps)
    {
      let fieldsValue=this.props.form.getFieldsValue();
      if (fieldsValue.agreement===false)
      {
        storeL.removeItem("user");
      }

    };

    handleReset=(e)=> {
       e.preventDefault();
       this.props.form.resetFields();
    }
    handleSubmit=(e)=> {
      e.preventDefault();
      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }
        this.props.dispatch(userLogin(values, function(data) {
         if (data.returnCode == 0 && data.items.item0[0].result == 'success') {
           //message.success(data.items.item0[0].resultDescribe);
           if (values.agreement===true)
           {storeL.setItem("user",values.userName);}
           storeS.setItem("sessionKey",data.items.item0[0].accessToken);
           storeS.setJson("userInfo", data.items.item1[0] );
           this.context.router.push('/main') ;
          } else {
           message.error(data.items.item0[0].resultDescribe);
         }
       }.bind(this)));

      });

    };
    checkUserName(rule, value, callback) {
      let regex=/^[A-Za-z0-9_@.]{1,30}$/;
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

    render() {
      const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
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

          ],
        });
      return(
        <Row type="flex" justify="center" align="middle" className="loginRow"  >
          <Col span="12" >
              <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}  >
                <FormItem {...formItemLayout} label="用户" hasFeedback required>
                  <Input placeholder="请输入用户名"
                    {...nameProps} />
                </FormItem>
                <FormItem {...formItemLayout} label="密码" required hasFeedback>
                  <Input type="password" placeholder="请输入密码"   autoComplete="off"
             onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                     {...passwdProps}  />
                </FormItem>
                <FormItem  wrapperCol={{ span: 16, offset: 6 }}  >
                  <label className="ant-checkbox-inline">
                    <Checkbox
                      {...getFieldProps('agreement', {valuePropName: 'checked'})}  >
                    记住我
                  </Checkbox>
                  </label>
                </FormItem>
                <FormItem   wrapperCol={{ span: 16, offset: 6 }}   >
                  <Button type="primary" htmlType="submit"  >登录</Button>

                  <Button type="ghost" onClick={this.handleReset}  className="marLeft50">重置</Button>
                </FormItem>
                <FormItem  wrapperCol={{ span: 16, offset: 6 }}   >
                  <label  >
                     <Link to={`/reguser`}>注册</Link>
                  </label>
                  <label className="colLeftPa20" >
                     <Link to={`/newPass`}>忘记密码</Link>
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

Login = Form.create()(Login);
export default connect(mapStateToProps)(Login)
