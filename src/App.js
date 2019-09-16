import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Nav from './pages/nav/Nav'
import City from './pages/city/City'
import Search from './pages/search/Search'
import Place from './pages/place/Place'
import Store from './Store'
import { Provider } from 'react-redux'


export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <HashRouter>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        <Route path="/city" component={City}></Route>
                        <Route path="/search" component={Search}></Route>
                        <Route path="/place" component={Place}></Route>
                        <Route path="/" exact component={Nav}></Route>
                        <Route component={Nav} />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}
