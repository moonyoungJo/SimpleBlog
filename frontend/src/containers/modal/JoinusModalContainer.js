import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import JoinusModal from 'components/modal/JoinusModal';
import * as baseActions from 'store/modules/base';

class JoinusModalContainer extends Component{
  state={
    userid: '',
    password: '',
    username: '',
    email: '',
  }
  handleLogin = () => {
    const {BaseActions} = this.props;
    BaseActions.changeModal();
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
      this.handleJoinUs();
  }
  handleJoinUs = async (e) => {
    const {BaseActions} = this.props;
    const {userid, password, username, email} = this.state;

    try{
      await BaseActions.joinus(userid, password, username, email);
      BaseActions.hideModal('login');
      localStorage.logged = 'true';
    }catch(e){
      console.log(e);
    }
  }
  render() {
    const {handleLogin, handleCancel, handleChange, handleKeyPress, handleJoinUs} = this;
    const {visible, error} = this.props;
    const {userid, password} = this.state;

    return(
      <JoinusModal
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
    error: state.base.getIn(['joinusModal', 'error'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(JoinusModalContainer);