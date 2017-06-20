import React from 'react';
import {Link} from 'react-router-dom';
class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <Link to="/" className="navbar-brand">YP's Blog</Link>
                <div className="right-header">
                    <Link to="/create/post">글 쓰기</Link>
                </div>
            </nav>
        );
    }
}

export default Navigation