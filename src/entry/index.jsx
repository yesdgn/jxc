import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory,Router, Route, Link } from 'react-router';
import App from '../component/App'
import jxcApp from '../component/reducers'
import Content from '../component/Content';
import NoMatch from '../component/NoMatch';
import Main from '../component/Main';
import Users from '../component/Users';

let store = createStore(jxcApp);
let rootElement = document.getElementById('react-body');

// ReactDOM.render(
//   <Provider store={store}>
//     <Content />
//   </Provider>,
//   rootElement
// )

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ Content }  >
        <Route path="/users" component={Users} >
          <Route path="/users/:ID" component={Users} />
        </Route>
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>,
  rootElement
)
