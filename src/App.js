import React from "react";

import {Redirect, Route, Switch, withRouter} from "react-router-dom"
import IndexPage from "./pages/IndexPage";
import {ErrorPage} from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

class App extends React.Component {
    render() {
        return (
            <Switch className="App">
                <Route exact path='/' component={IndexPage}/>
                <Route exact path='/error' component={ErrorPage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/logout' component={Logout}/>
            </Switch>
        );
    }
}

function Logout() {
    localStorage.removeItem('token');
    return <Redirect to={'/login'}/>
}

export default withRouter(App);
