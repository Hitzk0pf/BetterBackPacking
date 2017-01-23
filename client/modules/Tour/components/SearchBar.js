import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import SearchIcon from 'grommet/components/icons/base/Search';

export class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            area: "",
            tourstyle: "",
            difficulty: "",
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

        return (
            <div style={{textAlign: "center"}}>

                <Box direction="row">
                    <Box direction="row" margin="small">
                        <Select placeHolder='Search' 
                        multiple={false} 
                        inline={false} 
                        options={['AUSTRIA', 'RUSSIA', 'CURRY']}
                        onChange={(selection) => {
                            console.log("mystate:", this.state)
                            this.setState({area: selection.value})
                        }}
                        value={this.state.area} />
                    </Box>
                    <Box direction="row" margin="small">
                        <Select placeholder='Search' 
                        multiple={false} 
                        inline={false} 
                        options={['BERLIN', 'RUSSIA', 'three']}
                        value={undefined} />
                    </Box>
                    <Box direction="row" margin="small">
                        <Select placeHolder='Search' 
                        multiple={false} 
                        inline={false} 
                        options={['EASY', 'GIRL', 'COWARD']}
                        value={undefined} />
                    </Box>
                    <Box direction="row" margin="small">
                        <Button icon={<SearchIcon />} label='Search!' onClick={() => this.props.searchTour(this.state.area, this.state.tourstyle, this.state.difficulty)} primary={true} secondary={false} accent={false} plain={false} type='submit' 
                        />
                    </Box>
                </Box>

            </div>
        );

    }

}


export default SearchBar;
