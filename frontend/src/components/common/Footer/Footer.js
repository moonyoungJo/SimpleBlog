import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const Footer = ({onLoginClick}) => (
  <div className={cx('footer')}>
    <Link to="/" className={cx('brand')}>Simpleblog</Link>
    <div onClick={onLoginClick} className={cx('admin-login')}>관리자 로그인</div>
  </div>
);

export default Footer;