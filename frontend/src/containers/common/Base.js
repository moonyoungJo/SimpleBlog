import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LoginModalContainer from 'containers/modal/LoginModalContainer';
import * as baseActions from 'store/modules/base';

class Base extends Component {
  initialize = async () => {

  }
  componentDidMount() {
    this.initialize();
  }
  render() {
    return(
      <div>
        <LoginModalContainer />
      </div>
    )
  }
}
export default connect(
  null,
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);