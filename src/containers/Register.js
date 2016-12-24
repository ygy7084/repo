/**
 * Created by Administrator on 2016-12-15.
 */
import React from 'react';
import { Authentication } from 'components';

class Register extends React.Component {
    render() {
        return (
            <div>
                <Authentication mode={false}/>
            </div>
        );
    }
}

export default Register;