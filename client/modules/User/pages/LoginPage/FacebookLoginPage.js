import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import LoginForm from 'grommet/components/LoginForm';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import DateTime from 'grommet/components/DateTime';
import Select from 'grommet/components/Select';

import {saveFBToken} from '../../UserActions';

export class FacebookLoginPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        firstname: "",
        lastname: "",
        year: "",
        day: "",
        month: "",
        email: "",
      };
    }  


    componentWillMount() {
      if(this.props.params.token.startsWith("JWT")) {
        const token = this.props.params.token.split(",")[0];
        this.props.saveFBToken(token);
      }
    }

    render() {


        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        //let missingAttributes = this.props.params.token.split(",");
        let missingAttributes = this.props.params.token.split(",");
        console.log(missingAttributes);
        //let missingAttributes = ["firstname","birthDay"];
        let formFields = [];

        missingAttributes.forEach((att) => {
          let label;
          let string = "value";
          switch (att) {
            case "firstname":
              formFields.push(
                <FormField label="Vorname" htmlFor={att}>
                  <input id={att} name={att} type="text" value={this.state.firstname} onChange={(event) => this.setState({firstname: event.target.value}) } />
                </FormField>
              );
              break;
            case "lastname":
              formFields.push(
                <FormField label="Nachname" htmlFor={att}>
                  <input id={att} name={att} type="text" value={this.state.lastname} onChange={(event) => this.setState({lastname: event.target.value}) } />
                </FormField>
              );
              break;
            case "email":
              formFields.push(
                <FormField label="Email" htmlFor={att}>
                  <input id={att} name={att} type="text" value={this.state.email} onChange={(event) => this.setState({email: event.target.value}) } />
                </FormField>
              );
              break;
            case "birthDay":
              let currDate = new Date();
              console.log(currDate.getFullYear());
              let years = [];
              let days = [];
              let months = [];

              //compute years
              for (let i = 0; i <= 100; i++) {
                years.push(currDate.getFullYear() - i);
              }

              //hardcode months
              months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

              //hardcode days in a fancy manner
              for (let i = 1; i <= 31; i++) {
                days.push(i);
              }

              formFields.push(
                <FormField label="Geburtsdatum">
                  <Select placeHolder="Day"
                    name="day"
                    inline={false}
                    multiple={false}
                    options={days}
                    value={this.state.day}
                    onChange={string => this.setState({day: string})} 
                  />␃
                  <Select placeHolder="Month"
                    name="month"
                    inline={false}
                    multiple={false}
                    options={months}
                    value={this.state.month}
                    onChange={string => this.setState({month: string})}
                  />␃
                  <Select placeHolder="Year"
                    name="year"
                    inline={false}
                    multiple={false}
                    options={years}
                    value={this.state.year}
                    onChange={string => this.setState({year: string})} 
                  />␃
                </FormField>
              );
              break;
            default:
              label = ""
              break;
          }

        });

        let mainElement = <p>SUCCESS</p>;

        if(missingAttributes.length > 1) {

          mainElement = 
                  <Form onSubmit={() => { 
                    alert(this.state.birthdate);
                  }}>
                    <Header>
                      <h2>Zusätzlich erforderliche Informationen</h2>
                    </Header>
                    <FormFields>
                      <fieldset>
                        {formFields}
                      </fieldset>
                    </FormFields>
                    <Footer pad={{"vertical": "medium"}}>
                        <Button label="Submit"
                          type="submit"
                          primary={true}
                          onClick={(attr) => alert(attr)}/>
                    </Footer>
                  </Form>
        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Login"}/>

                <div style={styles.wrapper}>

                {mainElement}

                </div>


        </div>
    );
    }

}


// Retrieve data from store as props
const mapStateToProps = (store) => {
    return {
        loginSuccess: store.user.loginSuccess,
        loggedIn: store.user.loggedIn,
        attemptedLogin: store.user.attemptedLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveFBToken: (token) => {
            dispatch(saveFBToken(token));
        },
        provideMissingAttributes: (attr) => {
            dispatch(provideMissingAttributes(attr));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLoginPage);
