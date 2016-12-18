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
import Notification from 'grommet/components/Notification';
import SocialFacebook from 'grommet/components/icons/base/SocialFacebook';

import {saveFBToken, addUser} from '../../UserActions';

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
        errorMsg: "",
        stateMsg: "",
      };
    }  


    componentWillMount() {
      if(this.props.location.query.token) {
        this.props.saveFBToken(this.props.location.query.token);
      }
    }

    addFBUser = () => {
      let user = this.props.location.query;

      let userMissingAttributes = this.props.location.query.missingAttributes.split(",");
      let errorFields = [];

      userMissingAttributes.forEach((att) => {
        switch (att) {
          case "firstname":
            if(!this.state.firstname) {
              errorFields.push("Firstname");
            } else {
              user.firstname = this.state.firstname;
            }
            break;
          case "lastname":
            if(!this.state.lastname) {
              errorFields.push("Lastname");
            } else {
              user.lastname = this.state.lastname;
            }
            break;
          case "email":
              var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(!this.state.email || !re.test(this.state.email)) {
              errorFields.push("Email");
            } else {
              user.email = this.state.email;
            }
            break;
          case "birthDay":
            if(!this.state.year || !this.state.month || !this.state.day || this.state.day > 31 || this.state.day < 1 || this.state.month > 12 || this.state.month < 1) {
              errorFields.push("Birthdate");
            } else {
              let months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

              let month_int = months.indexOf(this.state.month.value) + 1;
              user.birthdate = new Date(this.state.year.value, month_int, this.state.day.value);

              console.log("birthdate", user.birthdate);
            }
            break;
          default:
            break;
        }
      });

      if(errorFields.length > 0) {

        this.setState({stateMsg: "Error"});
        this.setState({errorMsg: "The following fields require valid values: " + errorFields.toString()});
      
      } else {
        
        this.setState({stateMsg: ""});
        this.setState({errorMsg: ""});

        delete user.missingAttributes;
        for (let attr in user) {
          if (user.hasOwnProperty(attr)) {
            user[attr] = decodeURIComponent(user[attr]);
          }
        }

        console.log("uuuser", user);

        this.props.addUser(user);
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

        let mainNotification = "";


        let missingAttributes = [];

        if(this.props.location.query.missingAttributes) {
          missingAttributes = this.props.location.query.missingAttributes.split(",");
        }

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

        let mainElement = "";

        if(this.props.authenticated) {
          mainElement = <Notification message="Awesome!"
                               state="You're now logged in." 
                               status="ok" />
        }

        if(missingAttributes.length >= 1) {

          mainElement = 
                  <Form onSubmit={(event) => {
                    event.preventDefault();
                    this.addFBUser();
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
                          primary={true} 
                          onClick={() => this.addFBUser()}
                        />
                    </Footer>
                  </Form>
        }

        if(this.state.errorMsg) {
          mainNotification = <Notification state={this.state.errorMsg}
                                    message={this.state.stateMsg}
                                    status="warning" />
        }

        if(this.props.addUserFinished) {
          mainNotification = <div>
                                <Notification message="Awesome!"
                                    state="Please login again to confirm registration." 
                                    status="ok" />
                                <Button icon={<SocialFacebook />}
                                    label="Login with Facebook"
                                    href="/api/login/facebook"
                                    primary={true} />
                              </div> 
        }
        
        if(this.props.addUserError) {
          mainNotification = <Notification message="Oops!"
                                    state="Something went wrong while creating your user..." 
                                    status="critical" />
        }

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"Login"}/>

                <div style={styles.wrapper}>

                {mainNotification}

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
        authenticated: store.user.authenticated,
        attemptedLogin: store.user.attemptedLogin,
        addUserFinished: store.user.addUserFinished,
        addUserError: store.user.addUserError,
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
        addUser: (user) => {
          dispatch(addUser(user));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLoginPage);
