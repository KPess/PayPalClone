import React from 'react';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import {Route, Switch} from 'react-router-dom';

export default (
    <Switch>
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
    </Switch>
)
