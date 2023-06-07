import { IArtist, IArtistDetail, IArtistParams, IArtistResponse } from '@/types/IArtist';
import { apiService } from '@/api';

export const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ['Artist'],
  })
  .injectEndpoints({
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
        providesTags: ['Artist'],
      }),
      fetchArtists: build.query<IArtistResponse, IArtistParams>({
        query: (params) => ({ method: 'GET', url: '/artists', params }),
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
