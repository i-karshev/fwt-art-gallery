import { createSlice } from '@reduxjs/toolkit';
import { IArtist } from '@/types/IArtist';

interface IArtistSliceState {
  artists: IArtist[];
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
