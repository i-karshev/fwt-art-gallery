import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artists: [],
};

const ArtistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
});

export const { reducer: artistReducer, actions: artistActions } = ArtistSlice;
