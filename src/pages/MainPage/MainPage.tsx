import React from 'react';
import { Gallery } from '@/components/Gallery';
import { artistApi } from '@/api/artistApi';
import { Container } from '@/components/Container';

export const MainPage = () => {
  const { data: artists = [], isLoading, isFetching } = artistApi.useFetchArtistsStaticQuery(null);

  if (isLoading || isFetching) {
    return (
      <Container>
        <p>Loading..</p>
      </Container>
    );
  }

  return (
    <main>
      <Gallery artists={artists.slice(0, 6)} />
    </main>
  );
};
