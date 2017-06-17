import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
            </div>
        )
    }
}

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">YP's Blog</a>
                </div>
            </nav>
        );
    }
}

export default App;