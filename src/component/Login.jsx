
'use strict';
import  React  from 'react';
import {Row,Col,Form,Input, Button, Checkbox,message  } from 'antd';
import { Link } from 'react-router';
import {userLogin,clearUserInfo} from '../redux/actions';
import { connect } from 'react-redux';
import * as lodash   from 'lodash';
import * as dgn from '../common/dgn';

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
      let username=dgn.storeL.getItem("user");
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
        dgn.storeL.removeItem("user");
      }
      if( nextProps.user.userLoginResult &&  nextProps.user.userLoginResult.items[0].item0[0].result=='success')
      {
        if (fieldsValue.agreement===true)
        {
          dgn.storeL.setItem("user",fieldsValue.userName);
        }
        dgn.storeS.setItem("sessionKey",nextProps.user.userLoginResult.items[0].item0[0].accessToken);

        this.context.router.push('/main');
      }
      else if(nextProps.user.userLoginResult &&  nextProps.user.userLoginResult.items[0].item0[0].result=='fail')
      {
        hide = message.error(nextProps.user.userLoginResult.items[0].item0[0].resultDescribe);
        this.props.dispatch(clearUserInfo());
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
        this.props.dispatch(userLogin(values));
        //console.log('收到表单值：', values);
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
        <Row type="flex" justify="center" align="middle"  style={styles.Div}>
          <Col span="18" >
          <Row type="flex" justify="space-between" align="middle"  style={styles.middleDiv}>
            <Col span="14" style={styles.col1} >
              <Form horizontal form={this.props.form} onSubmit={this.handleSubmit} style={{paddingTop:"25px"}}>
                <FormItem {...formItemLayout} label="用户：" hasFeedback required>
                  <Input placeholder="请输入用户名"
                    {...nameProps} />
                </FormItem>
                <FormItem {...formItemLayout} label="密码：" required hasFeedback>
                  <Input type="password" placeholder="请输入密码"   autoComplete="off"
             onContextMenu={this.noop} onPaste={this.noop} onCopy={this.noop} onCut={this.noop}
                     {...passwdProps}  />
                </FormItem>
                <FormItem {...formItemLayout} label=" " >
                  <label className="ant-checkbox-inline">
                    <Checkbox
                      {...getFieldProps('agreement', {valuePropName: 'checked'})}  >
                    记住我
                  </Checkbox>
                  </label>
                </FormItem>
                <FormItem {...formItemLayout} label=" "  >
                  <Button type="primary" htmlType="submit"  >登录</Button>

                  <Button type="ghost" onClick={this.handleReset} style={styles.button} >重置</Button>
                </FormItem>
                <FormItem {...formItemLayout} label=" "  >
                  <label className="ant-checkbox-inline">
                     <Link to={`/reguser`}>注册</Link>
                  </label>
                  <label className="ant-checkbox-inline">
                     <Link to={`/newPass`}>忘记密码</Link>
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

Login = Form.create()(Login);
export default connect(mapStateToProps)(Login)
