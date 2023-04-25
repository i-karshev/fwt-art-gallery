import { IArtist } from '../types/IArtist';
import { apiService } from './index';

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtistsStatic: build.query<IArtist[], null>({
      query: () => ({ method: 'GET', url: '/artists/static' }),
    }),
  }),
});
