import React from 'react';
import './App.css';
import Login from "./containers/login/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AddNew from "./containers/new/AddNew";
import MovieList from "./containers/list/MovieList";
import Home from "./containers/home/Home";
import {userContext} from './userContext';

class App extends React.Component{
    state={
        user:null
    }

    componentDidMount() {
        if (localStorage.getItem('user')){
            const user = localStorage.getItem('user');
            const obj = JSON.parse(user)
            this.setState({user:obj})

        }


    }




    render() {
        console.log(this.state.user,'ovo je user app.js')
    return (
        <userContext.Provider value={this.state.user}>
        <Router>
            <Switch>
                <PrivateRoute exact={true} path="/home" component={Home}/>
                <Route exact={true} path="/edit/:id" render={(props) => <AddNew {...props}/>}/>
                <PrivateRoute exact={true} path="/list" component={MovieList}/>
                <PrivateRoute exact={true} path="/add-new" component={AddNew}/>
                <Route exact={true} path="/" component={Login}/>
            </Switch>
        </Router>
        </userContext.Provider>
    );
    }
}

export default App;

