import { IImage } from './IImage';

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
    yearOfCreation: number;
    image: IImage;
    artist: string;
  };
}

export interface IArtist {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  avatar?: IImage;
}
