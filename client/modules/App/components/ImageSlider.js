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

            <Box direction="row" size={{"height": "medium"}}>

                <Carousel persistentNav={false}>
                    <Hero size='medium' backgroundColorIndex='dark'>
                        <Box direction='row' justify='center' align='center' texture={img1} style={{border: '1rem solid red'}}>
                            <Box basis='1/2' align='end' pad='medium' style={{border: '1rem solid ýellow'}}/>
                            <Box basis='1/2' align='start' pad='medium' style={{border: '1rem solid blue'}}>
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
