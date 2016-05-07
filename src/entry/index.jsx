import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { browserHistory,Router, Route, Link } from 'react-router';
import configureStore from '../redux/configureStore'
import App from '../component/App'
import NoMatch from '../component/NoMatch';
import Main from '../component/Main';
import Users from '../component/Users';

const store = configureStore()

let rootElement = document.getElementById('react-body');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ App }  >
        <Route path="/users" component={Users} >
          <Route path="/users/:ID" component={Users} />
        </Route>
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>,
  rootElement
)
