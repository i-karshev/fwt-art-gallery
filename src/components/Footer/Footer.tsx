import React, { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeProvider';
import { ReactComponent as FacebookIcon } from '../../assets/svg/facebook_icon.svg';
import { ReactComponent as VkIcon } from '../../assets/svg/vk_icon.svg';
import { ReactComponent as InstagramIcon } from '../../assets/svg/instagram_icon.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <footer className={`${styles.footer} ${isDarkTheme ? styles.footer_dark : ''}`}>
      <div className={styles.footer__content}>
        <div className={styles.footer__information}>
          <p>
            Проект реализован в рамках стажировки <br />
            для Frontend-разработчиков от компании{' '}
            <a href="https://framework.team/" target="_blank" rel="noreferrer">
              Framework Team
            </a>
          </p>
          <p className={styles.footer__author}>Каршев Игорь, 2023</p>
        </div>

        <div className={styles.footer__socials}>
          <a href="https://www.facebook.com/framework.team" target="_blank" rel="noreferrer">
            <FacebookIcon />
          </a>
          <a href="https://vk.com/frameworkteam" target="_blank" rel="noreferrer">
            <VkIcon />
          </a>
          <a href="https://telegram.me/framework_team" target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};
