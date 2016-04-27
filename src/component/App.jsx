import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory,Router, Route, Link } from 'react-router';
import Content from './Content';
import NoMatch from './NoMatch';
import Main from './Main';
import Users from './Users';

class App extends React.Component {
 render() {
   return (
     <Content />
   )}

 }

export default App
