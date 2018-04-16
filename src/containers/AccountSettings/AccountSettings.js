import React, { Component } from 'react';
import { connect } from 'react-redux';


import classes from './AccountSettings.css';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { updateObject } from '../../shared/utility';

class AccountSettings extends Component {

  state = {
      controls: {
          api_key: {
              elementType: 'input',
              elementConfig: {

                  placeholder: 'Please enter your api key'
              },
              value: '',
              validation: {
                  required: true

              },
              valid: false,
              touched: false
          },
      },
      isSignup: true
  }

  componentDidMount () {
      // console.log('is Active before ', this.props)
  }
  checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
          return true;
      }

      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

      return isValid;
  }
  submitHandler = (event) => {

     event.preventDefault();

     this.props.activateAccount(this.state.controls.api_key.value);
  }

  inputChangedHandler = ( event, controlName ) => {
      const updatedControls = updateObject( this.state.controls, {
          [controlName]: updateObject( this.state.controls[controlName], {
              value: event.target.value,
              valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
              touched: true
          } )
      } );
      this.setState( { controls: updatedControls } );
  }


  render () {
      const formElementsArray = [];
      for ( let key in this.state.controls ) {
          formElementsArray.push( {
              id: key,
              config: this.state.controls[key]
          } );
      }

      let form = formElementsArray.map( formElement => (
          <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
      ) );

      if ( this.props.loading ) {
          form = <Spinner />
      }

      let errorMessage = null;

      if ( this.props.error ) {
          errorMessage = (
              <p>{this.props.error.message}</p>
          );
      }
      let from = '';
      // let authRedirect = null;
      if ( this.props.isActivate  ) {
        form = (
            <p>Your account is activate </p>
        );
      }else{
        form = (

              <div className={classes.AccountSettings}>

                  {errorMessage}
                  <form onSubmit={this.submitHandler}>
                      {form}
                      <Button btnType="Success">Activate</Button>
                  </form>

              </div>
        )
      }



      return (
        <div>
          {form}
          </div>
      );
  }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        isActivate: state.auth.activateAccount,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        activateAccount: ( apiKey ) => dispatch( actions.activateAccount( apiKey ) ),
        // isActivate: () => dispatch(actions.isActivate())


    };
};
export default connect( mapStateToProps,mapDispatchToProps )( AccountSettings );
