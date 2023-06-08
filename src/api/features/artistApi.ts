import { IArtist, IArtistDetail, IArtistParams, IArtistResponse } from '@/types/IArtist';
import { apiService } from '@/api';

export const artistApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchArtistsStatic: build.query<IArtistResponse, null>({
      query: () => ({ method: 'GET', url: '/artists/static' }),
      transformResponse: (response: IArtist[]): IArtistResponse => ({ data: response }),
    }),
    fetchArtistById: build.query<IArtistDetail, { id: string; isAuth: boolean }>({
      query: ({ id, isAuth }) => ({
        method: 'GET',
        url: isAuth ? `/artists/${id}` : `/artists/static/${id}`,
      }),
    }),
    fetchArtists: build.query<IArtistResponse, IArtistParams>({
      query: (params) => ({ method: 'GET', url: '/artists', params }),
    }),
    createArtist: build.mutation<null, FormData>({
      query: (data) => ({ method: 'POST', url: '/artists', data }),
    }),
    editArtist: build.mutation<null, { artistId: string; data: FormData }>({
      query: ({ artistId, data }) => ({ method: 'PUT', url: `/artists/${artistId}`, data }),
    }),
  }),
});
