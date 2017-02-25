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
                        <Select placeholder='Area' 
                        multiple={false} 
                        inline={false} 
                        options={['Northern India', 'RUSSIA', 'CURRY']}
                        onChange={(selection) => {
                            console.log("mystate:", this.state)
                            this.setState({area: selection.value})
                        }}
                        value={this.state.area} />
                    </Box>
                    <Box direction="row" margin="small">
                        <Select placeholder='Tourstyle' 
                        multiple={false} 
                        inline={false} 
                        options={['Camping', 'City', 'three']}
                        onChange={(selection) => {
                            console.log("mystate:", this.state)
                            this.setState({tourstyle: selection.value})
                        }}
                        value={this.state.tourstyle} />
                    </Box>
                    <Box direction="row" margin="small">
                        <Select placeholder='Difficulty' 
                        multiple={false} 
                        inline={false} 
                        options={['one', 'two', 'three']}
                        onChange={(selection) => {
                            console.log("mystate:", this.state)
                            this.setState({difficulty: selection.value})
                        }}
                        value={this.state.difficulty} />
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
