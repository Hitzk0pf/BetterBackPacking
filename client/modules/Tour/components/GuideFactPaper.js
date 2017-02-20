import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Heading from 'grommet/components/Heading';
import StarIcon from 'grommet/components/icons/base/Star';
import StarHalfIcon from 'grommet/components/icons/base/StarHalf';

export class GuideFactPaper extends Component {

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

                <Box direction="row" align="start" pad="medium" margin="small" colorIndex="light-2">
                    <Box basis="1/4" colorIndex="brand">
                        Thumbnail
                    </Box>
                    <Box direction="column" basis="3/4" textAlign="left">
                        <Box direction="row">
                            <Heading tag="h4" strong={true}>
                                Max Muster
                            </Heading>
                        </Box>
                        <Box>
                            <Box>
                                Area: North India
                            </Box>
                            <Box>
                                Difficulty: North India
                            </Box>
                            <Box>
                                Tourstyle: North India
                            </Box>
                            <Box>
                                Languages: North India
                            </Box>
                            <Box>
                                TourName: North India
                            </Box>
                            <Box direction="row">
                                Average Rating:
                                <Box direction="row" alignSelf="center">
                                        <StarIcon size="small" colorIndex="light-1"/>
                                        <StarIcon size="small" colorIndex="light-1"/>
                                        <StarIcon size="small" colorIndex="light-1"/>
                                        <StarHalfIcon size="small" colorIndex="light-1"/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

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

export default connect(mapStateToProps, mapDispatchToProps)(GuideFactPaper);
