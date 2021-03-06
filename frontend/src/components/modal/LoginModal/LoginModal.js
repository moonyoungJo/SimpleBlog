import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const LoginModal = ({
  visible, userid, password, error, onCancel, onLogin, onChange, onKeyPress, onJoinUs
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx('form')}>
      <div onClick={onCancel} className={cx('close')}>&times;</div>
      <div className={cx('title')}>로그인</div>
      <div className={cx('description')}>아이디</div>
      <input autoFocus type='text' name='userid' placeholder='아이디' value={userid} onChange={onChange} onKeyPress={onKeyPress} />
      <div className={cx('description')}>비밀번호</div>
      <input autoFocus type='password' name='password' placeholder='비밀번호' value={password} onChange={onChange} onKeyPress={onKeyPress} />
      {error && <div className={cx('error')}>로그인 실패</div>}
      <div className={cx('buttons')}>
        <Button onClick={onLogin}>로그인</Button>
        <Button onClick={onJoinUs}>회원가입</Button>
      </div>
    </div>
  </ModalWrapper>
);

export default LoginModal;