import React from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.result === "SUCCESS") {
                    let token = this.props.status.token;
                    let username = this.props.status.currentUser;
                    document.cookie = 'token=' + token;
                    Materialize.toast('Welcome, ' + username + '!', 2000);
                    return true
                } else {
                    <div>Incorrect username</div>
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render(){
        return (
            <div>
                <Authentication mode={true}
                onLogin={this.handleLogin}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        result: state.authentication.login.result,
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);