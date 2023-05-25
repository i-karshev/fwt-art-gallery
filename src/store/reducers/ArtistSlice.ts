import { createSlice } from '@reduxjs/toolkit';
import { IArtistStatic } from '@/types/IArtist';

interface IArtistSliceState {
  artists: IArtistStatic[];
}

const initialState: IArtistSliceState = {
  artists: [],
};

const ArtistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
});

export const { reducer: artistReducer, actions: artistActions } = ArtistSlice;
