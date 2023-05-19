import { IImage } from '@/types/IImage';
import { IPainting } from '@/types/IPainting';
import { IGenre } from '@/types/IGenre';

export interface IArtist {
  genres: IGenre[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar: IImage;
}
export interface IArtistParams {
  sortBy?: string;
  name?: string;
  orderBy?: 'asc' | 'desc';
  perPage?: number;
  genres?: string[];
  pageNumber?: number;
}

export interface IArtistResponse {
  data: IArtist[];
  meta: {
    count: number;
    pageNumber: number;
    perPage: number;
  };
}

export interface IArtistStatic {
  genres: IGenre[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  __v?: number;
  mainPainting: IPainting;
}

export interface IArtistDetailStatic {
  paintings: IPainting[];
  genres: IGenre[];
  _id: string;
  name: string;
  yearsOfLife: string;
  description: string;
  avatar: IImage;
  mainPainting: IPainting;
}
