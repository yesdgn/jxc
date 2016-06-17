'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {clearUser,messageFinished,readMessage,setFavorites,readPersons,readMainMenu,readFavorites
  ,readChartData,readPerson,removeFile,savePerson,READ_PERSONFILE,readUploadFile} from '../redux/actions'
import Head from './Head';
import Left from './Left';
import Bottom from './Bottom';
import {storeS} from '../common/dgn';

//不包含左边页、头部页  如登录前页面、个性化页面
const singleComponent = ['/', '/reguser', '/newPass', '/login']
//不包含左边页
const cancelLeftComponent = []

class App extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  };
componentWillReceiveProps(nextProps) {
  if  (nextProps.user.userLogout && nextProps.user.userLogout==true)
  {this.logout(); }
}
  logout=()=>{
    storeS.removeItem("sessionKey");
    storeS.removeItem("UserID");
    this.props.dispatch(clearUser())
    this.context.router.push('/login');
  }
  LeftComponent=(url)=> {
    if (cancelLeftComponent.indexOf(url) >= 0) {
      return (null);
    } else {
      return (<Left  menuData={this.props.common.mainMenu} onLoad={() => this.props.dispatch(readMainMenu())} />);
    }
  }
  onMsgDone=(msgID)=>{
   this.props.dispatch(messageFinished(msgID));
  };
  mainLoad=()=>{
    this.props.dispatch(readChartData());
    this.props.dispatch(readMessage());
  }
  getCustomProps(pathname)
  {
  //console.log(pathname);
      switch (pathname) {
        case 'main':
                return {chartDataSource:this.props.chart.items?this.props.chart.items:[],
                  onLoad:this.mainLoad
                   }
            break;
        case 'messages':
              return {msgDataSource:this.props.user.userMessage?this.props.user.userMessage.items:[]
                ,onMsgDone:this.onMsgDone
                ,onLoad:()=>this.props.dispatch(readMessage())}
          break;
        case 'persons':
                return {personsDataSource:this.props.persons.personList?this.props.persons.personList:[]
                ,onLoad:()=>this.props.dispatch(readPersons())}
            break;
        case '/person/:personID':
                    return {personInfo:this.props.persons.personInfo?this.props.persons.personInfo:[]
                    ,personImgs:this.props.persons.personImgs?this.props.persons.personImgs:[]
                    ,onLoad:()=>this.props.dispatch(readPerson(this.props.params.personID))
                    ,removeFile:(fileid)=>this.props.dispatch(removeFile(fileid))
                    ,savePerson:(data)=>this.props.dispatch(savePerson(data))
                    ,readPersonFile:(formid)=>this.props.dispatch(readUploadFile(READ_PERSONFILE,formid,'img'))
                  }
                break;
        default:
          return {};
      }

  }
  render() {
    const {dispatch, user} = this.props;
    const url = this.props.location.pathname;
    if (singleComponent.indexOf(url) >= 0) {
      return (this.props.children);
    }

    return (
      <div>
        <Head userInfo={user.userInfo} onLoad={()=> dispatch(readFavorites())}
          favMenuData={user.favorites?user.favorites.items:[]}
          msgQty={user.userMessage?user.userMessage.items.length:0}
          addFavorites={() => dispatch(setFavorites())}
          logout={this.logout}
          />
        {this.LeftComponent(url)}
        <div style={styles.contentDiv}>
          <div style={styles.breadcrumb}>
            <Breadcrumb {...this.props} />
          </div>
          {React.cloneElement(this.props.children,this.getCustomProps(this.props.children.props.route.path))}
        </div>
        <Bottom/>
      </div>
    );
  }
};

const styles = {
  contentDiv: {
    margin: "10px 0px 0px 10px",
    minHeight: "500px",
    overflow: "hidden"
  },
  breadcrumb: {
    margin: "0px 0px 10px  10px"
  }
}

//将state.user绑定到props的user
// function mapStateToProps(state) {
//   return {
//     user: state.user
//
//   }
// };
function mapStateToProps(state) {
  const {common, user,chart,persons} = state
  return { common, user,chart,persons}
}

export default connect(mapStateToProps)(App)
