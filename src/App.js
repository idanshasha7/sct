import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Info from './containers/Info/Info';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import AboutUs from './containers/AboutUs/AboutUs';
import Auth from './containers/Auth/Auth';
import AccountSettings from './containers/AccountSettings/AccountSettings';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
    this.props.onTryActivate();
  }
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/orders" component={Orders} />

            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Info} />
            <Route path="/accountsettings" component={AccountSettings} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    onTryActivate: () => dispatch(actions.isActivate())
  };
};

export default withRouter(connect(null, mapDispatchToProps)( App ));
