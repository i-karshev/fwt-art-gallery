import {
  IArtistDetail,
  IArtistParams,
  IArtistMainResponse,
  IArtistResponse,
  IArtistStatic,
} from '@/types/IArtist';
import { apiService } from '@/api';

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtistsStatic: build.query<IArtistMainResponse, null>({
      query: () => ({ method: 'GET', url: '/artists/static' }),
      transformResponse: (response: IArtistStatic[]): IArtistMainResponse => ({
        data: response.map(({ genres, _id, name, description, yearsOfLife, mainPainting }) => ({
          genres,
          id: _id,
          name,
          description,
          yearsOfLife,
          image: mainPainting.image,
        })),
      }),
    }),
    fetchArtistById: build.query<IArtistDetail, { id: string; isAuth: boolean }>({
      query: ({ id, isAuth }) => ({
        method: 'GET',
        url: `/artists/${!isAuth ? 'static/' : ''}${id}`,
      }),
    }),
    fetchArtists: build.query<IArtistMainResponse, IArtistParams>({
      query: () => ({ method: 'GET', url: '/artists' }),
      transformResponse: ({ data, meta }: IArtistResponse): IArtistMainResponse => ({
        data: data.map(({ genres, _id, name, description, yearsOfLife, avatar }) => ({
          genres,
          id: _id,
          name,
          description,
          yearsOfLife,
          image: avatar,
        })),
        meta,
      }),
    }),
  }),
});
