import React from 'react';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/Add'
import Request from './components/Request'
import Send from './components/Send'
import {Route, Switch} from 'react-router-dom';

export default (
    <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login}/>
        <Route path='/add' component={Add}/>
        <Route path='/send' component={Send}/>
        <Route path='/request' component={Request}/>
    </Switch>
)
