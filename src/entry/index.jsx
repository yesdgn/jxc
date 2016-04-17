import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory,Router, Route, Link } from 'react-router';
import Content from '../component/Content';
import NoMatch from '../component/NoMatch';
import Main from '../component/Main';
import Users from '../component/Users';

 Content.page=Main;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={ Content }   >
      <Route path="/main" component={Main} />
      <Route path="/users" component={Users} />
      <Route path="*" component={NoMatch} />
    </Route>
    <Route path="*" component={NoMatch} />

  </Router>
), document.getElementById('react-body'));
