import {
  IArtistDetailStatic,
  IArtistParams,
  IArtistResponse,
  IArtistStatic,
} from '@/types/IArtist';
import { apiService } from '@/api';

export const artistApi = apiService
  .enhanceEndpoints({
    addTagTypes: ['Artist'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchArtistsStatic: build.query<IArtistStatic[], null>({
        query: () => ({ method: 'GET', url: '/artists/static' }),
      }),
      fetchArtistStaticById: build.query<IArtistDetailStatic, string>({
        query: (id) => ({ method: 'GET', url: `/artists/static/${id}` }),
      }),
      fetchArtists: build.query<IArtistResponse, IArtistParams>({
        query: () => ({ method: 'GET', url: '/artists' }),
        providesTags: ['Artist'],
      }),
      fetchArtistById: build.query<IArtistDetailStatic, string>({
        query: (id) => ({ method: 'GET', url: `/artists/${id}` }),
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
