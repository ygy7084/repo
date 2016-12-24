/**
 * Created by Administrator on 2016-12-14.
 */
import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render(){
        const loginButton = (
            <li>
                <Link to='login'>
                    <i className='material-icons'>vpn_key</i>
                </Link>
            </li>
        )
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to='/' className='brand-logo center'>MEMOPAD</Link>
                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>
                    <div className="right">
                        <ul>
                            <li>
                                <a><i className="material-icons">vpn_key</i></a>
                            </li>
                            <li>
                                <a><i className="material-icons">lock_open</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;