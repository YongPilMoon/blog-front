import React from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router';

class Authentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectToMainPage: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin(){
        let id = this.state.username;
        let pw = this.state.password;
        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success){
                    this.setState({
                        password:""
                    });
                }else{
                    this.setState({ redirectToNewPage: true })
                }
            }
        )
    }

    render() {
        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/"/>
            )
        }

        const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Username</label>
                    <input name="username" type="text" className="validate" onChange={this.handleChange}/>
                </div>
                <div className="input-field col s12 password">
                    <label>Password</label>
                    <input name="password" type="password" className="validate" onChange={this.handleChange}/>
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn"
                        onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>

                <div className="footer">
                    <div className="card-content">
                        <div className="right">
                            New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <a className="waves-effect waves-lightw btn">CREATE</a>
                </div>
            </div>
        );

        return (
            <div className="auth">
                <Link to="/">MYP BLOG</Link>
                <div>
                    <div>
                        <div>{this.props.mode ? "LOGIN" : "SIGNUP"}</div>
                        {this.props.mode ? loginView : registerView}
                    </div>
                </div>
            </div>
        )
    }
}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined");},
    onRegister: (id, pw) => { console.error("register function not defined");}
};

export default Authentication;