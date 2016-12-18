import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';

import InfoIcon from 'grommet/components/icons/base/Info';

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
                        <Box basis="1/3" size={{"height": {"min": "medium"}}, {"width": {"min": "medium"}}} margin="small" pad="medium" align="center" justify="center">
                            <Box basis="3/4" size={{"height": {"min": "medium"}}, {"width": {"min": "medium"}}} colorIndex="neutral-1">
                                ProfilePic
                            </Box>
                            <Box basis="1/4" size={{"width": {"min": "medium"}}} pad="medium" colorIndex="neutral-2">
                                Rating
                            </Box>
                        </Box>
                        <Box basis="2/3" size={{"height": {"min": "medium"}}}> 
                            <Box basis="1/4" margin="small" align="start" justify="center" separator="bottom">
                                <Heading>Daryl Dixon</Heading>
                            </Box>
                            <Box basis="1/2" margin="small" align="start" justify="start" textAlign="left">
                                Age: 22 <br />
                                Language(s): English, German <br />
                                Area(s): North India <br />
                                Difficulty: Easy, Medium <br />
                                Tourstyle: City, Sightseeing
                            </Box>
                            <Box basis="1/4">
                                <Button label="Contact Me" href="#" accent={false} secondary={false} primary={true}/>
                            </Box>
                        </Box>
                    </Box>
                </div>

                <div>
                    <Box direction="column" justify="center" align="center">
                        <Box size={{"height": {"min": "medium"}}, {"width": {"max": "medium"}}} margin="small" align="center" justify="center" separator="bottom">
                            <Heading strong={true}>
                                About Me
                            </Heading>
                        </Box>
                        <Box direction="row" size={{"height": {"min": "medium"}}, {"width": {"min": "large"}}} align="center" justify="center">
                            <Box basis="1/3" colorIndex="light-2" margin="medium" pad="medium">
                                <Box direction="column" align="center" justify="center">
                                    <Box>
                                        <InfoIcon size="large" colorIndex="accent-2"/>
                                    </Box>
                                    <Box size={{"width": {"max": "small"}}} separator="bottom">
                                        <Heading tag="h3">
                                            Title
                                        </Heading>
                                    </Box>
                                    <Paragraph size="medium">
                                        This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box basis="1/3" colorIndex="light-2" margin="medium" pad="medium">
                                <Box direction="column" align="center" justify="center">
                                    <Box>
                                        <InfoIcon size="large" colorIndex="accent-2"/>
                                    </Box>
                                    <Box size={{"width": {"max": "small"}}} separator="bottom">
                                        <Heading tag="h3">
                                            Title
                                        </Heading>
                                    </Box>
                                    <Paragraph size="medium">
                                        This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
                                    </Paragraph>
                                </Box>
                            </Box>
                            <Box basis="1/3" colorIndex="light-2" margin="medium" pad="medium">
                                <Box direction="column" align="center" justify="center">
                                    <Box>
                                        <InfoIcon size="large" colorIndex="accent-2"/>
                                    </Box>
                                    <Box size={{"width": {"max": "small"}}} separator="bottom">
                                        <Heading tag="h3">
                                            Title
                                        </Heading>
                                    </Box>
                                    <Paragraph size="medium">
                                        This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph! This is a paragraph!
                                    </Paragraph>
                                </Box>
                            </Box>
                        </Box>
                        <Box size={{"width": {"min": "small"}}}>
                            <Button label="Get in touch" href="#" accent={false} secondary={false} primary={true}/>
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
