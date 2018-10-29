import React, {Component} from 'react';
import Header from 'components/common/Header';
import {withRouter} from 'react-router-dom';
import queyrString from 'query-string';
import * as baseActions from 'store/modules/base';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HeaderContainer extends Component {
  handleRemove = () => {
    const {BaseActions} = this.props;
    BaseActions.showModal('remove');
  }
  render(){
    const {handleRemove} = this;
    const {match, userid, postUserId} = this.props;
    const {id} = match.params;
    
    return(
      <Header
        postId={id}
        onRemove={handleRemove}
        userid={userid}
        postUserId = {postUserId}
      />
    )
  }
}

export default connect(
  (state) => ({
    userid: state.base.get('userid'),
    postUserId: state.post.getIn(['post','userid'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer));