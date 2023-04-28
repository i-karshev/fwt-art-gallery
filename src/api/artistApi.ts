import { IArtistStatic } from '@/types/IArtist';
import { apiService } from './index';

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtistsStatic: build.query<IArtistStatic[], null>({
      query: () => ({ method: 'GET', url: '/artists/static' }),
    }),
  }),
});
