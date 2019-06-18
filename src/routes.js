import React from 'react';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Home from './components/Home'
import {Route, Switch} from 'react-router-dom';

export default (
    <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login}/>
    </Switch>
)
