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

        return (
            <div style={{textAlign: "center"}}>

            <Box direction="row" size={{"height": "medium"}}>

                <Carousel persistentNav={false}>
                    <Hero backgroundImage={<Image src={img1} fit='cover' align={{"top": true}} />} size='medium' backgroundColorIndex='dark'>
                        <Box direction='row' justify='center' align='center'>
                            <Box basis='1/2' align='end' pad='medium' />
                            <Box basis='1/2' align='start' pad='medium'>
                                <Heading margin='none'>
                                    Connect with Localguides
                                </Heading>
                            </Box>
                        </Box>
                    </Hero>
                    <Image src={img1} />
                    <Image src={img1} />
                </Carousel>

            </Box>

            </div>
        );

    }

}

export default (ImageSlider);
