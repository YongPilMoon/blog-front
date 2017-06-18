import React from 'react';

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <a className="navbar-brand" href="#">YP's Blog</a>
                <div className="right-header">
                    <a href="#">글 쓰기</a>
                </div>
            </nav>
        );
    }
}

export default Navigation