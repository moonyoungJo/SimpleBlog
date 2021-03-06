import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoginModal from 'components/modal/LoginModal';
import * as baseActions from 'store/modules/base';

class LoginModalContainer extends Component{
  state={
    userid: '',
    password: '',
  }
  handleLogin = async () => {
    const {BaseActions} = this.props;
    const {userid, password} = this.state;

    try{
      await BaseActions.login(userid, password);
      BaseActions.hideModal('login');
      localStorage.logged = 'true';
    }catch(e){
      console.log(e);
    }
  }
  handleCancel = () => {
    const {BaseActions} = this.props;
    BaseActions.hideModal('login');
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleKeyPress = (e) => {
    if(e.key === 'Enter')
      this.handleLogin();
  }
  handleJoinUs = (e) => {
    const {BaseActions} = this.props;
    BaseActions.changeModal();
  }
  render() {
    const {handleLogin, handleCancel, handleChange, handleKeyPress, handleJoinUs} = this;
    const {visible, error} = this.props;
    const {userid, password} = this.state;

    return(
      <LoginModal
        onLogin={handleLogin}
        onCancel={handleCancel}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onJoinUs = {handleJoinUs}
        visible={visible}
        error = {error}
        userid = {userid}
        password = {password}
      />
    )
  }
}
export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'login']),
    error: state.base.getIn(['loginModal', 'error'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(LoginModalContainer);