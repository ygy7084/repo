/**
 * Created by Administrator on 2016-12-15.
 */
import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(id, pwd) {
        return this.props.loginRequest(id,pwd).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    console.log('hi');
                    Materialize.toast('Welcome, ' + id + '!', 2000);
                    browserHistory.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        )
    }
    render() {
        return (
            <div>
                <Authentication mode={true}
                onLogin={this.handleLogin}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id,pwd) => {
            return dispatch(loginRequest(id,pwd));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);