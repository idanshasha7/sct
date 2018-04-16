import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';


class Info extends Component {


    componentDidMount () {
        // console.log(this.props);
    }
    render () {
        return (
            <Aux>
                  <p>
                    what is social market?
                  </p>
                  <p>
                    how it work?
                  </p>
                  <p>
                    market refernces
                  </p>
            </Aux>
        );
    }
}


export default Info;
