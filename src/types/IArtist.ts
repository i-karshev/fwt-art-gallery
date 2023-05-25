import { IImage } from '@/types/IImage';
import { IPainting } from '@/types/IPainting';
import { IGenre } from '@/types/IGenre';

export interface Artist {
  genres: IGenre[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar?: IImage;
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
