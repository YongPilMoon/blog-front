import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navigation from "./Navigation";
import PostList from "./PostList";
import PostDetail from "./PostDetail";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Navigation}/>
                    <div className="container">
                        <div className="col-md-offset-2 col-md-8">
                            <Route exact path="/" component={PostList}/>
                            <Route path="/post/:id" component={PostDetail}/>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;