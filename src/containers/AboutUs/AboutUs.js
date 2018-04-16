import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';


class AboutUs extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
    }



    render () {

        return (
            <Aux>
                  <div>
                    here will be some info about the company!
                  </div>

            </Aux>
        );
    }
}


export default AboutUs;
