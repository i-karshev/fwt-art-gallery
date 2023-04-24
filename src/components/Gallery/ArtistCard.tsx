import React, { useContext } from 'react';
import styles from './Gallery.module.scss';
import { ReactComponent as ArrowIcon } from '../../assets/svg/arrow_icon_v2.svg';
import { ThemeContext } from '../../context/ThemeProvider';
// import { Artist } from '@/src/components/Gallery/Gallery';

// interface ArtistCardProps {
//   artist: Artist;
// }
// export const ArtistCard: FC<ArtistCardProps> = ({ artist })

export const ArtistCard = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <li className={`${styles.artist} ${isDarkTheme ? styles.artist_dark : ''}`}>
      <img
        loading="lazy"
        src="https://internship-front.framework.team/images/62e148214df711d4f7f68f4d/image.webp"
        alt="Jean-Honore Fragonard"
      />
      <div className={styles.artist__info}>
        <div className={styles.artist__text}>
          <p className={styles.artist__name}>Jean-Honore Fragonard</p>
          <p className={styles.artist__yearsOfLife}>1732 - 1806</p>
        </div>
        <div className={styles.artist__btn}>
          <ArrowIcon />
        </div>
      </div>
    </li>
  );
};
