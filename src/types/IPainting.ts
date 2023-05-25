import { IImage } from '@/types/IImage';

export interface IPainting {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: IImage;
  artist: string;
}
