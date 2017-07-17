import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {Navigation, PostList, PostDetail, PostCreate} from "../components";
import {Login} from "../container";

class App extends Component{
    render(){
        return (
            <Router>
                <div>
                    <Route path="/" render={ () => <Navigation
                        isLoggedIn={this.props.isLoggedIn}
                    />}/>
                    <div className="container">
                        <div className="col-md-offset-2 col-md-8">
                            <Route exact path="/" component={PostList}/>
                        </div>
                            <Route path="/post/:id" render={ (props) => <PostDetail
                                isLoggedIn={this.props.isLoggedIn} {...props}

                            />}/>
                            <Route exact path="/create/post" component={PostCreate}/>
                            <Route exact path="/login" component={Login}/>
                    </div>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    };
};

export default connect(mapStateToProps)(App)