import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';

import { ThemeContext } from '../../context/ThemeProvider';
import { Container } from '../Container';
import { ReactComponent as FacebookIcon } from '../../assets/svg/facebook_icon.svg';
import { ReactComponent as VkIcon } from '../../assets/svg/vk_icon.svg';
import { ReactComponent as InstagramIcon } from '../../assets/svg/instagram_icon.svg';
import styles from './Footer.module.scss';

const cx = cn.bind(styles);

export const Footer = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <footer
      className={cx('footer', {
        footer_dark: isDarkTheme,
      })}
    >
      <Container>
        <div className={cx('footer__content')}>
          <div className={cx('footer__information')}>
            <p>
              Проект реализован в рамках стажировки <br />
              для Frontend-разработчиков от компании{' '}
              <Link className={cx('footer__link')} to="https://framework.team/" target="_blank">
                Framework Team
              </Link>
            </p>
            <p className={cx('footer__author')}>Каршев Игорь, 2023</p>
          </div>

          <div className={cx('footer__socials')}>
            <Link
              className={cx('footer__link')}
              to="https://www.facebook.com/framework.team"
              target="_blank"
            >
              <FacebookIcon />
            </Link>
            <Link className={cx('footer__link')} to="https://vk.com/frameworkteam" target="_blank">
              <VkIcon />
            </Link>
            <Link
              className={cx('footer__link')}
              to="https://www.instagram.com/framework.team/"
              target="_blank"
            >
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};