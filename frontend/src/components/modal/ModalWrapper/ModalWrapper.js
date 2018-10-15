import React, {Component} from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
  render() {
    const {children} = this.props;
    return(
      <div>
        <div classNames={cx('gray-background')} />
        <div className={cx('modal-wrapper')}>
          <div classNames={cx('modal')}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default ModalWrapper;