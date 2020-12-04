import React from "react";

import {Route, Switch, withRouter} from "react-router-dom"

class App extends React.Component {
    render() {
        return (
            <Switch className="App">
                <Route exact path='/' component={null}/>
                <Route exact path='/dashboards' component={null}/>
                <Route exact path='/login' component={null}/>
                <Route exact path='/user' component={null}/>
            </Switch>
        );
    }
}


export default withRouter(App);
