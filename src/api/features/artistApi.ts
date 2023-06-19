import { IArtist, IArtistDetail, IArtistParams, IArtistResponse } from '@/types/IArtist';
import { apiService } from '@/api';

export const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ['Artist'],
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
      }),
      fetchArtistById: build.query<IArtistDetail, { id: string; isAuth: boolean }>({
        query: ({ id, isAuth }) => ({
          method: 'GET',
          url: isAuth ? `/artists/${id}` : `/artists/static/${id}`,
        }),
        providesTags: ['Artist'],
      }),
      editArtistMainPainting: build.mutation<null, { artistId: string; paintingId: string }>({
        query: ({ artistId, paintingId }) => ({
          method: 'PATCH',
          url: `/artists/${artistId}/main-painting`,
          data: { mainPainting: paintingId },
        }),
        invalidatesTags: ['Artist'],
      }),
      createArtistPainting: build.mutation<null, { artistId: string; data: FormData }>({
        query: ({ artistId, data }) => ({
          method: 'POST',
          url: `/artists/${artistId}/paintings`,
          data,
        }),
        invalidatesTags: ['Artist'],
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
        invalidatesTags: ['Artist'],
      }),
      deleteArtistPainting: build.mutation<null, { artistId: string; paintingId: string }>({
        query: ({ artistId, paintingId }) => ({
          method: 'DELETE',
          url: `/artists/${artistId}/paintings/${paintingId}`,
        }),
        invalidatesTags: ['Artist'],
      }),
    }),
  });
