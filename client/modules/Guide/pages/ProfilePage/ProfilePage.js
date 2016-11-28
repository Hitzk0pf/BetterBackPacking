import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import LoginForm from 'grommet/components/LoginForm';

import {loginRequest} from '../../GuideActions';

export class LoginPage extends Component {

    render() {

        const styles = {};

        return (
            <div>

                <Helmet title={"Guide Profile"}/>

            </div>
        );

    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
