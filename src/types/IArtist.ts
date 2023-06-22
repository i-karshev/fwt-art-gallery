import { IImage } from '@/types/IImage';
import { IPainting } from '@/types/IPainting';
import { IGenre } from '@/types/IGenre';

export interface IArtist {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  mainPainting: IPainting;
}
export interface IArtistParams {
  sortBy?: string;
  name?: string;
  orderBy?: 'asc' | 'desc';
  perPage?: string;
  genres?: string;
  pageNumber?: string;
}

export interface IArtistResponse {
  data: IArtist[];
  meta?: IArtistMetaResponse;
}

export interface IArtistDetail {
  paintings: IPainting[];
  genres: IGenre[];
  _id: string;
  name: string;
  yearsOfLife: string;
  description: string;
  avatar: IImage;
  mainPainting: IPainting;
}

export interface IArtistMetaResponse {
  count: number;
  pageNumber: number;
  perPage: number;
}
