import React from "react";

import {Route, Switch, withRouter} from "react-router-dom"
import IndexPage from "./pages/IndexPage";

class App extends React.Component {
    render() {
        return (
            <Switch className="App">
                <Route exact path='/' component={IndexPage}/>
                <Route exact path='/error' component={null}/>
                <Route exact path='/login' component={null}/>
                <Route exact path='/logout' component={null}/>
            </Switch>
        );
    }
}


export default withRouter(App);
