import React from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/globalStyle.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {Navigation, PostList, PostDetail, PostCreate} from "./components";
import {Login} from "./container";

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={Navigation}/>
                <div className="container">
                    <div className="col-md-offset-2 col-md-8">
                        <Route exact path="/" component={PostList}/>
                    </div>
                    <Route path="/post/:id" component={PostDetail}/>
                    <Route exact path="/create/post" component={PostCreate}/>
                    <Route exact path="/login" component={Login}/>
                </div>
            </div>
        </Router>
    </Provider>, rootElement);


