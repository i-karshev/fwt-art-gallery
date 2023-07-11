import { IArtist, IArtistDetail, IArtistParams, IArtistResponse } from '@/types/IArtist';
import { apiService } from '@/api';

export const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ['Artists', 'ArtistsDetail'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArtists: build.query<IArtistResponse, { isAuth: boolean; params: IArtistParams }>({
        query: ({ isAuth, params }) => ({
          method: 'GET',
          url: isAuth ? '/artists' : '/artists/static',
          params,
        }),
        transformResponse: (
          response: IArtist[] | IArtistResponse,
          meta,
          { isAuth }
        ): IArtistResponse => (isAuth ? response : { data: response }) as IArtistResponse,
        providesTags: ['Artists'],
      }),
      fetchArtistById: build.query<IArtistDetail, { id: string; isAuth: boolean }>({
        query: ({ id, isAuth }) => ({
          method: 'GET',
          url: isAuth ? `/artists/${id}` : `/artists/static/${id}`,
        }),
        providesTags: ['ArtistsDetail'],
      }),
      editArtistMainPainting: build.mutation<null, { artistId: string; paintingId: string }>({
        query: ({ artistId, paintingId }) => ({
          method: 'PATCH',
          url: `/artists/${artistId}/main-painting`,
          data: { mainPainting: paintingId },
        }),
        invalidatesTags: ['ArtistsDetail', 'Artists'],
      }),
      createArtistPainting: build.mutation<null, { artistId: string; data: FormData }>({
        query: ({ artistId, data }) => ({
          method: 'POST',
          url: `/artists/${artistId}/paintings`,
          data,
        }),
        invalidatesTags: ['ArtistsDetail', 'Artists'],
      }),
      editArtistPainting: build.mutation<
        null,
        { artistId: string; paintingId: string; data: FormData }
      >({
        query: ({ artistId, paintingId, data }) => ({
          method: 'PUT',
          url: `/artists/${artistId}/paintings/${paintingId}`,
          data,
        }),
        invalidatesTags: ['ArtistsDetail'],
      }),
      deleteArtistPainting: build.mutation<null, { artistId: string; paintingId: string }>({
        query: ({ artistId, paintingId }) => ({
          method: 'DELETE',
          url: `/artists/${artistId}/paintings/${paintingId}`,
        }),
        invalidatesTags: ['ArtistsDetail'],
      }),
      createArtist: build.mutation<null, FormData>({
        query: (data) => ({ method: 'POST', url: '/artists', data }),
        invalidatesTags: ['Artists'],
      }),
      editArtist: build.mutation<null, { artistId: string; data: FormData }>({
        query: ({ artistId, data }) => ({ method: 'PUT', url: `/artists/${artistId}`, data }),
        invalidatesTags: ['ArtistsDetail', 'Artists'],
      }),
      deleteArtist: build.mutation<null, string>({
        query: (artistId) => ({ method: 'DELETE', url: `/artists/${artistId}` }),
        invalidatesTags: ['Artists'],
      }),
    }),
  });
