import { apiService } from '@/api';
import { IGenre } from '@/types/IGenre';

export const genreApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    fetchGenres: build.query<IGenre[], null>({
      query: () => ({ method: 'GET', url: '/genres' }),
    }),
  }),
});
