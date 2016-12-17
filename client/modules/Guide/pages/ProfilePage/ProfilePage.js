import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';

import {loginRequest} from '../../GuideActions';

export class LoginPage extends Component {

    render() {

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        return (
            <div style={{textAlign: "center"}}>

                <Helmet title={"GuideProfile"}/>

                <div>
                    <Box direction="row">
                        <Box basis="1/3" size={{"height": {"min": "medium"}}, {"width": {"min": "medium"}}} margin="small" pad="medium" align="center" justify="center" colorIndex="neutral-2">
                            ProfilePic
                        </Box>
                        <Box basis="2/3" size={{"height": {"min": "medium"}}}> 
                            <Box basis="1/4" margin="small" align="start" justify="center" separator="bottom">
                                <Heading>Daryl Dixon</Heading>
                              </Box>
                              <Box basis="3/4" margin="small" align="start" justify="start" textAlign="left">
                                Age: 22 <br />
                                Language(s): English, German <br />
                                Area(s): North India <br />
                                Difficulty: Easy, Medium <br />
                                Tourstyle: City, Sightseeing
                              </Box>
                        </Box>
                    </Box>
                </div>

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
