import React from 'react';

import scLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={scLogo} alt="social crypto" />
    </div>
);

export default logo;
