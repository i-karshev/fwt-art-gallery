import { IImage } from './IImage';

export interface Artist {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar?: IImage;
}

export interface IArtistStatic {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  __v?: number;
  mainPainting: {
    _id: string;
    name: string;
    yearOfCreation: string;
    image: IImage;
    artist: string;
  };
}