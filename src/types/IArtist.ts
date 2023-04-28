import { IImage } from './IImage';

<<<<<<<<< Temporary merge branch 1
export interface IArtistStatic {
=========
export interface Artist {
>>>>>>>>> Temporary merge branch 2
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
<<<<<<<<< Temporary merge branch 1
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
=========
  avatar?: IImage;
}

export interface IArtistStatic {
>>>>>>>>> Temporary merge branch 2
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
<<<<<<<<< Temporary merge branch 1
  avatar?: IImage;
=========
  __v?: number;
  mainPainting: {
    _id: string;
    name: string;
    yearOfCreation: string;
    image: IImage;
    artist: string;
  };
>>>>>>>>> Temporary merge branch 2
}
