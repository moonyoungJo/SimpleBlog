import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

const Footer = ({onLoginClick, logged}) => (
  <div className={cx('footer')}>
    <Link to="/" className={cx('brand')}>Simpleblog</Link>
    <div onClick={onLoginClick} className={cx('admin-login')}>
      {logged?'logout':'admin login'}
    </div>
  </div>
);

export default Footer;