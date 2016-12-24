/**
 * Created by Administrator on 2016-12-15.
 */
import React from 'react';
import { Link } from 'react-router';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleLogin() {
        let id = this.state.username;
        let pwd = this.state.password;
        this.props.onLogin(id, pwd).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        )
    }
    render() {
        const inputBoxes= (
          <div>
              <div className='input-field col s12 username'>
                  <label>Username</label>
                  <input
                      name='username'
                      type='text'
                      className='validate'/>
              </div>
              <div className='input-field col s12'>
                  <label>Password</label>
                  <input
                      name='password'
                      type='password'
                      className='validate'/>
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
                        <div className="right" >
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
                    <a className="waves-effect waves-light btn">CREATE</a>
                </div>
            </div>
        );
        return (
            <div className='container auth'>
                <Link className='logo' to='/'>MEMOPAD</Link>
                <div className='card'>
                    <div className='header blue white-text center'>
                        <div className='card-content'>{this.props.mode ? 'LOGIN' : 'REGISTER'}</div>
                    </div>
                    {this.props.mode ? loginView : registerView}
                </div>
            </div>
        );
    }
}

export default Authentication;