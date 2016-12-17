import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import DateTime from 'grommet/components/DateTime';
import {registerRequest} from '../../UserActions';

import {loginRequest} from '../../UserActions';

export class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            birthDate: "",
            email: "",
            password: "",
            passwordRepeat: ""
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    render() {

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        const submit = () => {
            this.props.registerRequest(this.state);
        };

        const handleChange = (event) => {

            var newState = {};
            newState[event.target.name] = event.target.value;
            this.setState(newState);

        };

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Register"}/>

                <div style={styles.wrapper}>

                    <Form>

                        <Header>
                            <Heading>
                                Account erstellen
                            </Heading>
                        </Header>

                        <FormFields>

                            <FormField label="Vorname">
                                <TextInput name="firstName" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label="Nachname">
                                <TextInput name="lastName" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label="Geburtsdatum">
                                <DateTime id="id"
                                          name="birthDate"
                                          format="D/M/YYYY"
                                />
                            </FormField>

                            <FormField label="E-Mail">
                                <TextInput name="email" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label="Passwort">
                                <TextInput name="password" onDOMChange={handleChange}/>
                            </FormField>

                            <FormField label="Passwort wiederholen">
                                <TextInput name="passwordRepeat" onDOMChange={handleChange}/>
                            </FormField>

                        </FormFields>

                        <Footer pad={{"vertical": "medium"}}>
                            <Button label="Submit"
                                    primary={true}
                                    onClick={(data) => submit(data)}/>
                        </Footer>

                    </Form>

                </div>

            </div>
        );
    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (user) => {
            dispatch(registerRequest(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
