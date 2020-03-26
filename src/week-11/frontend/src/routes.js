import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={LogIn} exact />
                <Route path="/signup" component={SignUp} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}