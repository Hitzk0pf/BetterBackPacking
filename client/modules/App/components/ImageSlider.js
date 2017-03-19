import React, {Component, PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Hero from 'grommet/components/Hero';
import Heading from 'grommet/components/Heading';
import Carousel from 'grommet/components/Carousel';
import img1 from './guide.JPG';

export class ImageSlider extends Component {

    render() {

        const styles = {

            wrapper: {
                display: "inline-block",
                margin: "auto",
                textAlign: "left"
            }

        };

        // console.log('img', img1)

        return (
            <div style={{textAlign: "center"}}>

            <Box size={{"height": "medium"}}>

                <Carousel persistentNav={false}>
                    <Hero backgroundColorIndex='dark'>
                        <Box direction='row' size={{"height": "medium"}} justify='center' align='center' texture={img1}>
                            <Box basis='1/2' align='end' pad='medium'/>
                            <Box basis='1/2' align='start' pad='medium'>
                                <Heading margin='none'>
                                    <div style={{color: 'white'}}>
                                        Connect with Localguides
                                    </div>
                                </Heading>
                            </Box>
                        </Box>
                    </Hero>
                    <Hero backgroundColorIndex='dark'>
                        <Box direction='row' size={{"height": "medium"}} justify='center' align='center' texture={img1}>
                            <Box basis='1/2' align='end' pad='medium'/>
                            <Box basis='1/2' align='start' pad='medium'>
                                <Heading margin='none'>
                                    <div style={{color: 'white'}}>
                                        Experience Adventure
                                    </div>
                                </Heading>
                            </Box>
                        </Box>
                    </Hero>
                    <Hero backgroundColorIndex='dark'>
                        <Box direction='row' size={{"height": "medium"}} justify='center' align='center' texture={img1}>
                            <Box basis='1/2' align='end' pad='medium'/>
                            <Box basis='1/2' align='start' pad='medium'>
                                <Heading margin='none'>
                                    <div style={{color: 'white'}}>
                                        Study new Cultures
                                    </div>
                                </Heading>
                            </Box>
                        </Box>
                    </Hero>
                </Carousel>

            </Box>

            </div>
        );

    }

}

export default (ImageSlider);
