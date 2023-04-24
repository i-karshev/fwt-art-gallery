import React from 'react';

import { ArtistCard } from './ArtistCard';

import styles from './Gallery.module.scss';


// interface ArtistListProps {
//   artists: Artist[];
// }
// export const Gallery: FC<ArtistListProps> = ({ artists }) =>

export const Gallery = () => {
  const artists = new Array(6).fill('artist');

  return (
    <div className={styles.gallery}>
      <ul className={styles.gallery__list}>{artists && artists.map(() => <ArtistCard />)}</ul>
    </div>
  );
};
