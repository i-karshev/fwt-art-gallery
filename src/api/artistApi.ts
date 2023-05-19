import {
  IArtistDetailStatic,
  IArtistParams,
  IArtistResponse,
  IArtistStatic,
} from '@/types/IArtist';
import { apiService } from './index';

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtistsStatic: build.query<IArtistStatic[], null>({
      query: () => ({ method: 'GET', url: '/artists/static' }),
    }),
    fetchArtistStaticById: build.query<IArtistDetailStatic, string>({
      query: (id) => ({ method: 'GET', url: `/artists/static/${id}` }),
    }),
    fetchArtists: build.query<IArtistResponse, IArtistParams>({
      query: () => ({ method: 'GET', url: '/artists' }),
    }),
    fetchArtistById: build.query<IArtistDetailStatic, string>({
      query: (id) => ({ method: 'GET', url: `/artists/${id}` }),
    }),
  }),
});
