import React from 'react';
import styles from './JoinusModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const JoinusModal = ({
  visible, userid, password, username, email, error, onCancel, onChange, onJoinUs, onLogin, onKeyPress
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx('form')}>
      <div onClick={onCancel} className={cx('close')}>&times;</div>
      <div className={cx('title')}>회원가입</div>
      <div className={cx('description')}>아이디</div>
      <input autoFocus type='text' name='userid' placeholder='아이디' value={userid} onChange={onChange} onKeyPress={onKeyPress} />
      <div className={cx('description')}>비밀번호</div>
      <input autoFocus type='password' name='password' placeholder='비밀번호' value={password} onChange={onChange} onKeyPress={onKeyPress} />
      <div className={cx('description')}>이름</div>
      <input autoFocus type='text' name='username' placeholder='이름' value={username} onChange={onChange} onKeyPress={onKeyPress} />
      <div className={cx('description')}>이메일</div>
      <input autoFocus type='text' name='email' placeholder='이메일' value={email} onChange={onChange} onKeyPress={onKeyPress} />
      {error && <div className={cx('error')}>회원가입 실패</div>}
      <div className={cx('buttons')}>
        <Button onClick={onJoinUs}>회원가입</Button>
        <Button onClick={onLogin}>로그인 창으로</Button>
      </div>
    </div>
  </ModalWrapper>
);

export default JoinusModal;