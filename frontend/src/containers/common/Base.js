import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoginModalContainer from 'containers/modal/LoginModalContainer';
import JoinusModalContainer from 'containers/modal/JoinusModalContainer';
import * as baseActions from 'store/modules/base';

class Base extends Component {
  initialize = async () => {
    const {BaseActions} = this.props;
    if(localStorage.logged === 'true'){
      BaseActions.tempLogin();
    }
    BaseActions.checkLogin();
  }
  componentDidMount() {
    this.initialize();
  }
  render() {
    const {isLogin} = this.props;
    return(
      <div>
        {
          isLogin
          ?(<LoginModalContainer />)
          :(<JoinusModalContainer />)
        }
      </div>
    )
  }
}
export default connect(
  (state) => ({
    isLogin: state.base.getIn(['modal', 'loginMode'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);