import React from 'react';
import {Link} from 'react-router-dom';
class Navigation extends React.Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        return (
            <nav className="navbar navbar-default">
                <Link to="/" className="navbar-brand">YP's Blog</Link>
                { isLoggedIn &&
                <div className="right-header">
                    <Link to="/create/post">글 쓰기</Link>
                </div>
                }
                {/*<div className="right-header">*/}
                    {/*<Link to="/login">로그인</Link>*/}
                {/*</div>*/}
            </nav>
        );
    }
}

export default Navigation